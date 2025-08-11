// src/components/charts/TodaySpend.js
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { format } from 'date-fns';

const TodaySpend = ({ spendEntries }) => {
  const today = new Date();
  const formattedToday = format(today, 'MM/dd/yyyy');

  const todayEntries = spendEntries.filter((entry) => entry.date === formattedToday);
  const totalToday = todayEntries.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Today's Total Spending
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" color="error">
          ${totalToday.toFixed(2)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TodaySpend;