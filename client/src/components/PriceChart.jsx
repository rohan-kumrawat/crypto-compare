import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
//import { useTheme } from '../contexts/ThemeContext';
import { useTheme } from '../contexts/ThemeContext';

Chart.register(...registerables);

const PriceChart = ({ data }) => {
  const { isDark } = useTheme();

  const chartData = {
    labels: data?.map(entry => new Date(entry[0]).toLocaleDateString()),
    datasets: [{
      label: 'Price History',
      data: data?.map(entry => entry[1]),
      borderColor: isDark ? '#818cf8' : '#4f46e5',
      backgroundColor: isDark ? 'rgba(129, 140, 248, 0.2)' : 'rgba(79, 70, 229, 0.2)',
      tension: 0.4
    }]
  };

  return (
    <div className="mt-8 p-6 bg-white dark:bg-dark-800 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 dark:text-white">
        7-Day Price History
      </h3>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              labels: { color: isDark ? '#fff' : '#000' }
            }
          },
          scales: {
            x: { 
              ticks: { color: isDark ? '#94a3b8' : '#64748b' },
              grid: { color: isDark ? '#334155' : '#e2e8f0' }
            },
            y: { 
              ticks: { color: isDark ? '#94a3b8' : '#64748b' },
              grid: { color: isDark ? '#334155' : '#e2e8f0' }
            }
          }
        }}
      />
    </div>
  );
};

export default PriceChart;