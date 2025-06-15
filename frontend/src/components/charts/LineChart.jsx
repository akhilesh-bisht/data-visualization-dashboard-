import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  // Process data to group by year and calculate average likelihood
  const processedData = data.reduce((acc, item) => {
    if (item.end_year && item.likelihood) {
      const year = item.end_year.toString();
      if (!acc[year]) {
        acc[year] = { total: 0, count: 0 };
      }
      acc[year].total += item.likelihood;
      acc[year].count += 1;
    }
    return acc;
  }, {});

  const years = Object.keys(processedData).sort();
  const likelihoods = years.map(year => 
    Math.round((processedData[year].total / processedData[year].count) * 100) / 100
  );

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Average Likelihood',
        data: likelihoods,
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Inter, system-ui, sans-serif',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        titleFont: {
          family: 'Inter, system-ui, sans-serif',
        },
        bodyFont: {
          family: 'Inter, system-ui, sans-serif',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.3)',
        },
        ticks: {
          font: {
            family: 'Inter, system-ui, sans-serif',
          },
        },
      },
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.3)',
        },
        ticks: {
          font: {
            family: 'Inter, system-ui, sans-serif',
          },
        },
      },
    },
  };

  if (years.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-lg">No data available</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;