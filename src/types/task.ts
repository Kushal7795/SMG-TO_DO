export type TaskStatus = "pending" | "completed";
export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  priority: TaskPriority;
  userId: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  userId: string;
}
