import { Task } from "@/types/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";
import { useState } from "react";

interface TaskCalendarProps {
  tasks: Task[];
  onDateSelect?: (date: Date) => void;
}

const getPriorityDot = (priority: Task["priority"]) => {
  switch (priority) {
    case "High":
      return "bg-priority-high";
    case "Medium":
      return "bg-priority-medium";
    case "Low":
      return "bg-priority-low";
  }
};

export const TaskCalendar = ({ tasks, onDateSelect }: TaskCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => isSameDay(new Date(task.dueDate), date));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h3>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
          {daysInMonth.map((day) => {
            const dayTasks = getTasksForDate(day);
            const hasHighPriority = dayTasks.some((t) => t.priority === "High");
            const hasMediumPriority = dayTasks.some((t) => t.priority === "Medium");
            const hasLowPriority = dayTasks.some((t) => t.priority === "Low");

            return (
              <div
                key={day.toISOString()}
                onClick={() => onDateSelect?.(day)}
                className={`min-h-[80px] p-2 border rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                  isToday(day) ? "bg-primary/10 border-primary" : "border-border/50"
                }`}
              >
                <div className="text-sm font-medium mb-1">{format(day, "d")}</div>
                {dayTasks.length > 0 && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {hasHighPriority && <div className={`h-2 w-2 rounded-full ${getPriorityDot("High")}`} />}
                      {hasMediumPriority && <div className={`h-2 w-2 rounded-full ${getPriorityDot("Medium")}`} />}
                      {hasLowPriority && <div className={`h-2 w-2 rounded-full ${getPriorityDot("Low")}`} />}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {dayTasks.length} task{dayTasks.length > 1 ? "s" : ""}
                    </Badge>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
