import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  // Process data to count topics
  const topicCounts = data.reduce((acc, item) => {
    if (item.topic) {
      acc[item.topic] = (acc[item.topic] || 0) + 1;
    }
    return acc;
  }, {});

  // Get top 8 topics and group others
  const sortedTopics = Object.entries(topicCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  const otherCount = Object.values(topicCounts).reduce((sum, count) => sum + count, 0) - 
    sortedTopics.reduce((sum, [, count]) => sum + count, 0);

  const labels = sortedTopics.map(([topic]) => topic);
  const values = sortedTopics.map(([, count]) => count);

  if (otherCount > 0) {
    labels.push('Others');
    values.push(otherCount);
  }

  const colors = [
    'rgba(59, 130, 246, 0.8)',
    'rgba(16, 185, 129, 0.8)',
    'rgba(99, 102, 241, 0.8)',
    'rgba(245, 158, 11, 0.8)',
    'rgba(239, 68, 68, 0.8)',
    'rgba(139, 92, 246, 0.8)',
    'rgba(6, 182, 212, 0.8)',
    'rgba(236, 72, 153, 0.8)',
    'rgba(107, 114, 128, 0.8)',
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: colors.slice(0, labels.length).map(color => color.replace('0.8', '1')),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 11,
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
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
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      },
    },
  };

  if (labels.length === 0) {
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
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;