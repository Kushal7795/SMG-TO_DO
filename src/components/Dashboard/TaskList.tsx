import { Task } from "@/types/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit2, Trash2, Plus } from "lucide-react";
import { format } from "date-fns";

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const getPriorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "High":
      return "border-l-4 border-l-priority-high";
    case "Medium":
      return "border-l-4 border-l-priority-medium";
    case "Low":
      return "border-l-4 border-l-priority-low";
  }
};

const getPriorityBadgeVariant = (priority: Task["priority"]) => {
  switch (priority) {
    case "High":
      return "destructive";
    case "Medium":
      return "default";
    case "Low":
      return "secondary";
  }
};

export const TaskList = ({ tasks, onToggleStatus, onEdit, onDelete, onAdd }: TaskListProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>All Tasks</CardTitle>
        <Button onClick={onAdd} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No tasks yet. Create one to get started!</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-start gap-4 rounded-lg border bg-card p-4 transition-all hover:bg-accent/5 ${getPriorityColor(
                  task.priority
                )}`}
              >
                <Checkbox
                  checked={task.status === "completed"}
                  onCheckedChange={() => onToggleStatus(task.id)}
                  className="mt-1"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`font-medium ${
                        task.status === "completed" ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {task.title}
                    </h4>
                    <Badge variant={getPriorityBadgeVariant(task.priority)} className="text-xs">
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(task)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
