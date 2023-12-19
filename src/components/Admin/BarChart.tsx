import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
);

interface IProps {
  graph_booking?: [
    {
      label: string;
      total: number;
    },
  ];
}

const BarChart = (props: IProps) => {
  const { graph_booking } = props;

  const labels = graph_booking?.map((booking) => booking.label);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        // ticks: {
        //   display: false,
        // },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Total transactions",
        data: graph_booking!.map((booking) => booking.total),
        borderRadius: 15,
        backgroundColor: "#FFDE59",
        hoverBackgroundColor: "#0F5FC2",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
