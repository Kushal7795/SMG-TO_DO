import { Task } from "@/types/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, ListTodo } from "lucide-react";

interface SummaryCardsProps {
  tasks: Task[];
}

export const SummaryCards = ({ tasks }: SummaryCardsProps) => {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;

  const cards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: ListTodo,
      gradient: "from-primary/20 to-primary/5",
    },
    {
      title: "Tasks Pending",
      value: pendingTasks,
      icon: Circle,
      gradient: "from-status-pending/20 to-status-pending/5",
    },
    {
      title: "Tasks Completed",
      value: completedTasks,
      icon: CheckCircle2,
      gradient: "from-status-completed/20 to-status-completed/5",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="border-border/50 transition-all hover:border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
              <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${card.gradient}`} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
