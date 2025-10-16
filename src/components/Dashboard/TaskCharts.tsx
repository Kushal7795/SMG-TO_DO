import { Task } from "@/types/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";

interface TaskChartsProps {
  tasks: Task[];
}

const PRIORITY_COLORS = {
  High: "hsl(var(--priority-high))",
  Medium: "hsl(var(--priority-medium))",
  Low: "hsl(var(--priority-low))",
};

const STATUS_COLORS = {
  pending: "hsl(var(--status-pending))",
  completed: "hsl(var(--status-completed))",
};

export const TaskCharts = ({ tasks }: TaskChartsProps) => {
  const priorityData = [
    {
      name: "High Priority",
      value: tasks.filter((t) => t.priority === "High").length,
      color: PRIORITY_COLORS.High,
    },
    {
      name: "Medium Priority",
      value: tasks.filter((t) => t.priority === "Medium").length,
      color: PRIORITY_COLORS.Medium,
    },
    {
      name: "Low Priority",
      value: tasks.filter((t) => t.priority === "Low").length,
      color: PRIORITY_COLORS.Low,
    },
  ].filter((item) => item.value > 0);

  const statusData = [
    {
      name: "Pending",
      value: tasks.filter((t) => t.status === "pending").length,
      color: STATUS_COLORS.pending,
    },
    {
      name: "Completed",
      value: tasks.filter((t) => t.status === "completed").length,
      color: STATUS_COLORS.completed,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Priority Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Task Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
