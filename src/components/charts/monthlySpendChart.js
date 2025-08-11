import React from 'react';
import { Paper, Typography } from '@mui/material';
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,} from 'recharts';
import { parse, format } from 'date-fns';

const MonthlySpendChart = ({ spendEntries }) => {
  const monthlyData = {};

  spendEntries.forEach((entry) => {
    const date = parse(entry.date, 'MM/dd/yyyy', new Date());
    const month = format(date, 'MMM yyyy');
    if (monthlyData[month]) {
      monthlyData[month] += entry.amount;
    } else {
      monthlyData[month] = entry.amount;
    }
  });

  const data = Object.keys(monthlyData)
    .map((month) => ({
      month,
      amount: monthlyData[month],
    }))
    .sort((a, b) => new Date(a.month) - new Date(b.month));

  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Monthly Spending
      </Typography>
      {data.length === 0 ? (
        <Typography>No spending data available.</Typography>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default MonthlySpendChart;
