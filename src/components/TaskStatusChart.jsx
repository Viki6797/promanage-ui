import { Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#60A5FA", "#A78BFA", "#34D399"]; // Blue, Purple, Green

const TaskStatusChart = ({ data }) => {
  const chartData = [
    { name: "To Do", value: data.todo },
    { name: "In Progress", value: data.inProgress },
    { name: "Completed", value: data.completed },
  ];

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        backdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.8)",
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          Task Status Breakdown
        </Typography>

        <PieChart width={330} height={240}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={70}
            innerRadius={40}
            paddingAngle={3}
            animationDuration={900}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`slice-${index}`}
                fill={COLORS[index]}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => `${value} tasks`}
            contentStyle={{
              borderRadius: 10,
              backdropFilter: "blur(10px)",
            }}
          />

          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ marginTop: 10 }}
          />
        </PieChart>
      </CardContent>
    </Card>
  );
};

export default TaskStatusChart;
