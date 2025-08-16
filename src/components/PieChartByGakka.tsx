import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";

// データの定義
const data = [
  { name: "機械工学科", value: 0, fill: "#e60012" },
  { name: "電気電子工学科", value: 5, fill: "#e6a000" },
  { name: "電子制御工学科", value: 2, fill: "#009b63" },
  { name: "制御情報工学科", value: 15, fill: "#6357a3" },
  { name: "物質工学科", value: 1, fill: "#007bbb" },
];

// 合計人数を計算
const total = data.reduce((sum, item) => sum + item.value, 0);

// ラベル表示用関数（割合を1桁表示）
const renderCustomizedLabel = ({ percent }: { percent: number }) => {
  // 割合が0%の場合は表示しない
  if (percent === 0) {
    return "";
  }
  return `${(percent * 100).toFixed(1)}%`;
};

// 詳細表示のカスタムツールチップ
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

// 円グラフコンポーネント
const PieChartByGrade = () => {
  return (
    // 親コンポーネントの相対位置を確保
    <div className="m-8 w-full mx-auto">
      <div className="relative h-full w-full" style={{ height: 300 }}>
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
              outerRadius={100}
              innerRadius={50}
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
          </PieChart>
        </ResponsiveContainer>

        {/* 合計を中央に表示 */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
          <span className="text-lg font-sans font-bold text-text-base bg-background px-2 rounded-md">
            計{total}人
          </span>
        </div>
      </div>

      {/* 凡例を別組で作成 */}
      <div className="flex flex-wrap justify-center mt-4">
        {data.map((entry, index) => (
          <div
            key={`legend-item-${index}`}
            className="flex items-center m-1 p-2 rounded-md"
          >
            <span
              className="w-3 h-3 mr-2 inline-block rounded-full"
              style={{ backgroundColor: entry.fill }}
            />
            <span className="text-sm font-bold text-text-base">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartByGrade;
