import { supabase } from "@/integrations/supabase/client";
import { Task, TaskFormData } from "@/types/task";

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("due_date", { ascending: true });

    if (error) throw error;

    return data.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status as "pending" | "completed",
      dueDate: task.due_date,
      priority: task.priority as "Low" | "Medium" | "High",
      userId: task.user_id,
    }));
  },

  async createTask(taskData: TaskFormData, userId: string): Promise<Task> {
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        user_id: userId,
        title: taskData.title,
        description: taskData.description,
        status: "pending",
        due_date: new Date(taskData.dueDate).toISOString(),
        priority: taskData.priority,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      status: data.status as "pending" | "completed",
      dueDate: data.due_date,
      priority: data.priority as "Low" | "Medium" | "High",
      userId: data.user_id,
    };
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<void> {
    const dbUpdates: any = {};
    if (updates.title) dbUpdates.title = updates.title;
    if (updates.description) dbUpdates.description = updates.description;
    if (updates.status) dbUpdates.status = updates.status;
    if (updates.dueDate) dbUpdates.due_date = new Date(updates.dueDate).toISOString();
    if (updates.priority) dbUpdates.priority = updates.priority;

    const { error } = await supabase.from("tasks").update(dbUpdates).eq("id", id);

    if (error) throw error;
  },

  async deleteTask(id: string): Promise<void> {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) throw error;
  },

  async toggleTaskStatus(id: string, currentStatus: "pending" | "completed"): Promise<void> {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    const { error } = await supabase.from("tasks").update({ status: newStatus }).eq("id", id);

    if (error) throw error;
  },
};
