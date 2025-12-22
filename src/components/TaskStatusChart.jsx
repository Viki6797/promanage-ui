import { Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "To Do", value: 24 },
  { name: "In Progress", value: 40 },
  { name: "Completed", value: 23 },
];

const COLORS = ["#42a5f5", "#ab47bc", "#66bb6a"];

const TaskStatusChart = () => {
  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Task Status Breakdown
        </Typography>
        <PieChart width={300} height={200}>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </CardContent>
    </Card>
  );
};

export default TaskStatusChart;
