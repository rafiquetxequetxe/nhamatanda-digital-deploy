"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type MiniChartProps = {
  titulo: string;
  periodo: string;
  destaque: string;
  dados: { ano: string; valor: number }[];
  tipo: "linha" | "barra" | "area";
};

function TooltipCustom({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-bold text-[#1F6F4A]">
        {payload[0].value}
      </p>
    </div>
  );
}

export default function MiniChart({
  titulo,
  periodo,
  destaque,
  dados,
  tipo,
}: MiniChartProps) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        {tipo === "linha" ? (
          <LineChart
            data={dados}
            margin={{
              top: 4,
              right: 2,
              left: 0,
              bottom: 0,
            }}
          >
            <Tooltip
              content={<TooltipCustom />}
              cursor={{
                stroke: "#1F6F4A",
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
            />

            <Line
              type="monotone"
              dataKey="valor"
              stroke="#1F6F4A"
              strokeWidth={2}
              dot={{
                r: 3,
                fill: "#1F6F4A",
              }}
              activeDot={{
                r: 5,
                fill: "#1F6F4A",
                stroke: "white",
                strokeWidth: 2,
              }}
            />

            <XAxis
              dataKey="ano"
              tick={{
                fontSize: 9,
                fill: "#9ca3af",
              }}
              axisLine={false}
              tickLine={false}
              tickMargin={5}
            />
          </LineChart>
        ) : tipo === "barra" ? (
          <BarChart
            data={dados}
            margin={{
              top: 4,
              right: 2,
              left: 0,
              bottom: 0,
            }}
          >
            <Tooltip
              content={<TooltipCustom />}
              cursor={{
                fill: "#1F6F4A",
                fillOpacity: 0.08,
              }}
            />

            <Bar
              dataKey="valor"
              fill="#94a3b8"
              radius={[2, 2, 0, 0]}
              activeBar={{
                fill: "#1F6F4A",
              }}
            />

            <XAxis
              dataKey="ano"
              tick={{
                fontSize: 9,
                fill: "#9ca3af",
              }}
              axisLine={false}
              tickLine={false}
              tickMargin={5}
            />
          </BarChart>
        ) : (
          <AreaChart
            data={dados}
            margin={{
              top: 4,
              right: 2,
              left: 0,
              bottom: 0,
            }}
          >
            <Tooltip
              content={<TooltipCustom />}
              cursor={{
                stroke: "#1F6F4A",
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
            />

            <Area
              type="monotone"
              dataKey="valor"
              stroke="#1F6F4A"
              fill="#1F6F4A"
              fillOpacity={0.15}
              strokeWidth={2}
            />

            <XAxis
              dataKey="ano"
              tick={{
                fontSize: 9,
                fill: "#9ca3af",
              }}
              axisLine={false}
              tickLine={false}
              tickMargin={5}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}