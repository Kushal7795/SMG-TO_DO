import { useState, useEffect } from "react";
import { Task, TaskFormData } from "@/types/task";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch tasks from database
  const fetchTasks = async () => {
    if (!user) {
      setTasks([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform database tasks to match our Task type
      const transformedTasks: Task[] = (data || []).map((dbTask) => ({
        id: dbTask.id,
        title: dbTask.title,
        description: dbTask.description,
        status: dbTask.status as "pending" | "completed",
        dueDate: dbTask.due_date,
        priority: dbTask.priority as "Low" | "Medium" | "High",
        userId: dbTask.user_id,
      }));

      setTasks(transformedTasks);
    } catch (error: any) {
      toast({
        title: "Error loading tasks",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const addTask = async (taskData: TaskFormData) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert({
          user_id: user.id,
          title: taskData.title,
          description: taskData.description,
          due_date: new Date(taskData.dueDate).toISOString(),
          priority: taskData.priority,
          status: "pending",
        })
        .select()
        .single();

      if (error) throw error;

      // Add to local state
      const newTask: Task = {
        id: data.id,
        title: data.title,
        description: data.description,
        status: data.status as "pending" | "completed",
        dueDate: data.due_date,
        priority: data.priority as "Low" | "Medium" | "High",
        userId: data.user_id,
      };

      setTasks([newTask, ...tasks]);
    } catch (error: any) {
      toast({
        title: "Error creating task",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateTask = async (id: string, taskData: Partial<Task>) => {
    if (!user) return;

    try {
      const updateData: any = {};
      if (taskData.title !== undefined) updateData.title = taskData.title;
      if (taskData.description !== undefined) updateData.description = taskData.description;
      if (taskData.dueDate !== undefined)
        updateData.due_date = new Date(taskData.dueDate).toISOString();
      if (taskData.priority !== undefined) updateData.priority = taskData.priority;
      if (taskData.status !== undefined) updateData.status = taskData.status;

      const { error } = await supabase.from("tasks").update(updateData).eq("id", id);

      if (error) throw error;

      // Update local state
      setTasks(tasks.map((task) => (task.id === id ? { ...task, ...taskData } : task)));
    } catch (error: any) {
      toast({
        title: "Error updating task",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteTask = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);

      if (error) throw error;

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error: any) {
      toast({
        title: "Error deleting task",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleTaskStatus = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task || !user) return;

    const newStatus = task.status === "pending" ? "completed" : "pending";
    await updateTask(id, { status: newStatus });
  };

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
  };
};
