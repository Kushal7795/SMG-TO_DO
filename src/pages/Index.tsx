import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useTasks } from "@/hooks/useTasks";
import { SummaryCards } from "@/components/Dashboard/SummaryCards";
import { TaskList } from "@/components/Dashboard/TaskList";
import { TaskCalendar } from "@/components/Dashboard/TaskCalendar";
import { TaskCharts } from "@/components/Dashboard/TaskCharts";
import { TaskModal } from "@/components/Dashboard/TaskModal";
import { Task, TaskFormData } from "@/types/task";
import { toast } from "@/hooks/use-toast";
import { LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isSameDay } from "date-fns";

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { tasks, isLoading, addTask, updateTask, deleteTask, toggleTaskStatus } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [dateFilter, setDateFilter] = useState<Date | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const displayTasks = dateFilter
    ? tasks.filter((task) => isSameDay(new Date(task.dueDate), dateFilter))
    : tasks;

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      toast({
        title: "Task updated",
        description: "Your task has been updated successfully.",
      });
    } else {
      addTask(taskData);
      toast({
        title: "Task created",
        description: "Your new task has been created successfully.",
      });
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    toast({
      title: "Task deleted",
      description: "The task has been removed.",
    });
  };

  const handleDateSelect = (date: Date) => {
    setDateFilter(isSameDay(dateFilter || new Date(), date) ? null : date);
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Task Management Dashboard</h1>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-6">
        {/* Summary Cards */}
        <SummaryCards tasks={tasks} />

        {/* Charts */}
        <TaskCharts tasks={tasks} />

        {/* Calendar and Task List */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TaskList
              tasks={displayTasks}
              onToggleStatus={toggleTaskStatus}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onAdd={handleAddTask}
            />
          </div>
          <div>
            <TaskCalendar tasks={tasks} onDateSelect={handleDateSelect} />
          </div>
        </div>
      </main>

      {/* Task Modal */}
      <TaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
};

export default Index;
