import { useEffect, useRef } from "react";
import { D4DJChartRenderer } from "utils/chartRenderer";

export function ChartViewer({
  chartData,
}: {
  chartData: { result: object } | any;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) {
      //@ts-ignore
      new D4DJChartRenderer(ref.current).renderChart(chartData);
    }
  }, [chartData]);
  return (
    <div className="bg-gray-800 overflow-x-scroll">
      <canvas ref={ref} height="750px"></canvas>
    </div>
  );
}
