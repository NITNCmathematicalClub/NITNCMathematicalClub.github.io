import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
  type LegendProps,
} from "recharts";
// import type { getLegendProps } from "recharts/types/util/getLegendProps";

const data = [
  { name: "機械工学科", value: 0, fill: "#e60012" },
  { name: "電気電子工学科", value: 5, fill: "#e6a000" },
  { name: "電子制御工学科", value: 2, fill: "#009b63" },
  { name: "制御情報工学科", value: 15, fill: "#6357a3" },
  { name: "物質工学科", value: 1, fill: "#007bbb" },
];

const total = data.reduce((sum, item) => sum + item.value, 0);

// ラベル表示用関数（割合を1桁表示）
const renderCustomizedLabel = ({ percent }: { percent: number }) =>
  `${(percent * 100).toFixed(1)}%`;

// 詳細表示のカスタム
const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex items-center bg-background text-sm text-text-accent p-3 rounded-md shadow-md font-bold">
        <span
          className="w-2 h-7 mr-1 block"
          style={{ backgroundColor: payload[0].payload.fill }}
        ></span>
        {payload[0].name}: {payload[0].value}人
      </div>
    );
  }
  return null;
};

// 下の項目一覧をカスタム
const CustomLegend = ({ payload }: LegendProps) => {
  return (
    <ul className="flex flex-wrap justify-center mt-4">
      {payload?.map((entry, index) => (
        <li
          key={`item-${index}`}
          className="mx-1 text font-bold text-text-base flex items-center"
        >
          <span
            className="w-3 h-3 mr-2 inline-block"
            style={{ backgroundColor: entry.color }}
          />
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

const PieChartByGrade = () => {
  return (
    <div className="relative w-full md:w-2/3 h-100 mx-auto">
      {/* <div className="relative w-full md:w-2/3 h-100 mx-auto"> */}
      {/* 合計を中央に表示 */}
      <div className="absolute left-1/2 top-[45%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
        <span className="text-lg font-sans font-bold text-text-base bg-background px-2 rounded-md">
          計{total}名
        </span>
      </div>

      {/* グラフ本体 */}
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
            outerRadius={120}
            innerRadius={70}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.fill}
                stroke="var(--color-background)"
                strokeWidth={3}
              />
            ))}
          </Pie>
          <Tooltip content={CustomTooltip} />
          <Legend verticalAlign="bottom" content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartByGrade;
