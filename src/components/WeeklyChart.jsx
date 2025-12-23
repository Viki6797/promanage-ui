import { Card, CardContent, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const WeeklyChart = ({ data }) => {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        p: 2,
        backdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.85)",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          Weekly Productivity
        </Typography>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
          >
            {/* Soft grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(0,0,0,0.1)"
            />

            {/* X Axis */}
            <XAxis
              dataKey="day"
              tick={{ fill: "#555", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#ccc" }}
            />

            {/* Y Axis */}
            <YAxis
              tick={{ fill: "#555", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={30}
            />

            {/* Tooltips */}
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                backdropFilter: "blur(10px)",
              }}
            />

            {/* Fancy gradient line */}
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
              </linearGradient>
            </defs>

            {/* Smooth animated curve */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2 }}
              activeDot={{
                r: 7,
                stroke: "#3b82f6",
                strokeWidth: 2,
                fill: "white",
              }}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WeeklyChart;
