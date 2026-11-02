import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const DEFAULT_COLORS = [
  "#2563EB", // Primary Electric Blue
  "#7655E9", // Accent Purple
  "#38BDF8", // Info Cyan
  "#22C55E", // Success Green
  "#FBBF24", // Warning Amber
  "#F87171", // Error Red
  "#8B5CF6", // Violet
  "#1D4ED8", // Deep Blue
];

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors = DEFAULT_COLORS,
  showTextAnchor = true,
}) => {
  const hasValues = data && data.some((item) => Number(item.amount) > 0);
  const displayData = hasValues
    ? data
    : [{ name: "No Activity", amount: 1 }];
  const displayColors = hasValues ? colors : ["#20202E"];

  return (
    <div
      style={{
        backgroundColor: "transparent",
        padding: "10px 0",
      }}
    >
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={displayData}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            innerRadius={showTextAnchor ? 72 : 45}
            paddingAngle={hasValues ? 3 : 0}
            cornerRadius={6}
            labelLine={false}
            label={({ cx, cy }) =>
              showTextAnchor ? (
                <>
                  <text
                    x={cx}
                    y={cy - 12}
                    textAnchor="middle"
                    fill="#9292A3"
                    fontSize="12px"
                    fontWeight="500"
                  >
                    {label}
                  </text>
                  <text
                    x={cx}
                    y={cy + 16}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="20px"
                    fontWeight="600"
                  >
                    {totalAmount}
                  </text>
                </>
              ) : null
            }
          >
            {displayData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={displayColors[index % displayColors.length]}
                stroke="var(--card)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          {hasValues && (
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{
                outline: "none",
              }}
            />
          )}
          {hasValues && (
            <Legend
              content={<CustomLegend />}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;