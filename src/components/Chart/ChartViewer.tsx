import axios from "axios";
import { useEffect, useRef } from "react";
import { pad } from "utils";
import { D4DJChartRenderer } from "utils/chartRenderer";

export function ChartViewer({ chartID }: { chartID: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    (async () => {
      if (ref.current) {
        const res = await axios.get(
          `https://asset.d4dj.info/ondemand/chart/chart_${pad(chartID, 8)}`
        );
        //@ts-ignore
        new D4DJChartRenderer(ref.current).renderChart(res.data);
      }
    })();
  }, [chartID]);
  return (
    <div className="bg-gray-800 overflow-x-scroll">
      <canvas ref={ref} height="750px"></canvas>
    </div>
  );
}
