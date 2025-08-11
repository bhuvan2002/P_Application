// src/components/charts/CategoryPieChart.js
import React from 'react';
import { Paper, Typography } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF4081'];

const CategoryPieChart = ({ spendEntries }) => {
  // Aggregate spend per category
  const categoryData = {};

  spendEntries.forEach((entry) => {
    if (categoryData[entry.category]) {
      categoryData[entry.category] += entry.amount;
    } else {
      categoryData[entry.category] = entry.amount;
    }
  });

  const data = Object.keys(categoryData).map((category) => ({
    name: category,
    value: categoryData[category],
  }));

  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Spending by Category
      </Typography>
      {data.length === 0 ? (
        <Typography>No spending data available.</Typography>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default CategoryPieChart;