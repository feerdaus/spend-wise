"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  BarElement,
  Title,
  CategoryScale,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardProps {
  data1: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
  data2: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Expenses by Category",
    },
  },
};

export const options1 = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Allocated Amounts by Category",
    },
  },
};

export const Dashboard: React.FC<DashboardProps> = ({ data1, data2 }) => {
  return (
    <div className="md:grid grid-cols-12 gap-x-12">
      <div className="col-span-5 mb-6 md:mb-0">
        <Pie height={300} options={options1} data={data1} />
      </div>
      <div className="col-span-5">
        <Bar height={300} options={options} data={data2} />
      </div>
    </div>
  );
};
