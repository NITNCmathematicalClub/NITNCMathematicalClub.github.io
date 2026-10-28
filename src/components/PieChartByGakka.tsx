import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { TooltipProps } from "recharts";

// 構成員（学科別）のデータ。更新時はこの配列を書き換える
const data = [
  { name: "機械工学科", value: 0, fill: "#e60012" },
  { name: "電気電子工学科", value: 5, fill: "#e6a000" },
  { name: "電子制御工学科", value: 2, fill: "#009b63" },
  { name: "制御情報工学科", value: 15, fill: "#6357a3" },
  { name: "物質工学科", value: 1, fill: "#007bbb" },
];

const total = data.reduce((sum, item) => sum + item.value, 0);

const renderLabel = ({ percent }: { percent?: number }) => {
  if (!percent || percent === 0) return "";
  return `${(percent * 100).toFixed(1)}%`;
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex items-center rounded-md bg-white p-3 text-sm font-bold text-ink shadow-md">
        <span
          className="mr-2 block h-7 w-2"
          style={{ backgroundColor: payload[0].payload.fill }}
        />
        {payload[0].name}: {payload[0].value}人
      </div>
    );
  }
  return null;
};

export default function PieChartByGakka() {
  return (
    <div className="mx-auto my-8 w-full">
      <div className="relative" style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              outerRadius={100}
              innerRadius={50}
              label={renderLabel}
              labelLine={false}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} stroke="#faf9f6" strokeWidth={3} />
              ))}
            </Pie>
            <Tooltip content={CustomTooltip} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <span className="rounded-md bg-base px-2 text-lg font-bold">計{total}人</span>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap justify-center">
        {data.map((entry) => (
          <div key={entry.name} className="m-1 flex items-center rounded-md p-2">
            <span
              className="mr-2 inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.fill }}
            />
            <span className="text-sm font-bold">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
