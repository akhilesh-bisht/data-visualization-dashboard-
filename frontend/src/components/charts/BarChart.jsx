import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  // Process data to group by year and calculate average intensity
  const processedData = data.reduce((acc, item) => {
    if (item.end_year && item.intensity) {
      const year = item.end_year.toString();
      if (!acc[year]) {
        acc[year] = { total: 0, count: 0 };
      }
      acc[year].total += item.intensity;
      acc[year].count += 1;
    }
    return acc;
  }, {});

  const years = Object.keys(processedData).sort();
  const intensities = years.map(year => 
    Math.round((processedData[year].total / processedData[year].count) * 100) / 100
  );

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Average Intensity',
        data: intensities,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
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
        borderColor: 'rgba(59, 130, 246, 1)',
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
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;