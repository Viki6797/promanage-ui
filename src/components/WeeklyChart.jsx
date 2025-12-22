import { Card, CardContent, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const dummyData = [
  { week: "Mon", tasks: 3 },
  { week: "Tue", tasks: 5 },
  { week: "Wed", tasks: 2 },
  { week: "Thu", tasks: 6 },
  { week: "Fri", tasks: 4 },
  { week: "Sat", tasks: 1 },
  { week: "Sun", tasks: 0 },
];

const WeeklyChart = () => {
  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Weekly Productivity
        </Typography>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dummyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="tasks" stroke="#1976d2" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WeeklyChart;
