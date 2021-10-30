import { ChartDataset } from "chart.js";
import { Radar } from "react-chartjs-2";

const defaultdb = [
  {
    fill: true,
    backgroundColor: "rgba(244, 114, 182, 0.2)",
    borderColor: "rgb(244, 114, 182)",
    pointBackgroundColor: "rgb(244, 114, 182)",
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgb(244, 114, 182)",
  },
  {
    fill: true,
    backgroundColor: "rgba(129, 140, 248, 0.2)",
    borderColor: "rgb(129, 140, 248)",
    pointBackgroundColor: "rgb(129, 140, 248)",
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgb(129, 140, 248)",
  },
  {
    fill: true,
    backgroundColor: "rgba(52, 211, 153, 0.2)",
    borderColor: "rgb(52, 211, 153)",
    pointBackgroundColor: "rgb(52, 211, 153)",
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgb(52, 211, 153)",
  },
  {
    fill: true,
    backgroundColor: "rgba(167, 139, 250, 0.2)",
    borderColor: "rgb(167, 139, 250)",
    pointBackgroundColor: "rgb(167, 139, 250)",
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgb(167, 139, 250)",
  },
];

export function ChartRadar(props: {
  data: { data: number[]; label: string }[];
  labels: string[];
}) {
  return (
    <Radar
      options={{
        scales: {
          r: {},
        },
      }}
      data={{
        labels: props.labels,
        datasets: props.data.map((item, index) => ({
          label: item.label,
          data: item.data,
          ...defaultdb[index],
        })),
      }}
    />
  );
}
