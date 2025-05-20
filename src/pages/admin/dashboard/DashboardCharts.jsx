
import React from 'react';
import {
  BarElement,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  Chart as ChartJS
} from 'chart.js';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip
} from 'recharts';

// Register ChartJS components
ChartJS.register(
  BarElement,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
);

const DashboardCharts = ({ stats }) => {
  const overviewData = [
    { name: 'Books', value: stats.totalBooks || 0 },
    { name: 'Users', value: stats.totalUsers || 0 },
    { name: 'Borrows', value: stats.totalBorrows || 0 },
    { name: 'Reservations', value: stats.totalReservations || 0 }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white dark:bg-darkMainCardBg dark:text-white p-4 rounded-lg shadow md:col-span-2">
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={overviewData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} /> {/* Purple-600 */}
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="name"
            stroke="currentColor"
            className="text-gray-700 dark:text-gray-300"
          />
          <YAxis
            allowDecimals={false}
            stroke="currentColor"
            className="text-gray-700 dark:text-gray-300"
          />
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <RechartsTooltip
            contentStyle={{
              backgroundColor: 'var(--tooltip-bg)',
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
            labelStyle={{ color: '#7c3aed' }}  // Purple for label
            itemStyle={{ color: '#7c3aed' }} 
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#7c3aed" // Purple
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
  );
};

export default DashboardCharts;
