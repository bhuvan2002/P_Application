// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Paper } from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MonthlySpendChart from '../components/charts/monthlySpendChart';
import CategoryPieChart from '../components/charts/categoryPieChart';
import TodaySpend from '../components/charts/todaySpend';
import './dashboard.css';

const Dashboard = () => {
  const [spendEntries, setSpendEntries] = useState([]);
  const [earnedEntries, setEarnedEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to fetch entries from localStorage
  const fetchEntries = () => {
    const storedSpend = JSON.parse(localStorage.getItem('spendEntries')) || [];
    const storedEarned = JSON.parse(localStorage.getItem('earnedEntries')) || [];
    setSpendEntries(storedSpend);
    setEarnedEntries(storedEarned);
  };

  useEffect(() => {
    fetchEntries();

    // Listen for storage changes (e.g., from other tabs)
    const handleStorageChange = () => {
      fetchEntries();
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Optional: If you have a global state or context, trigger fetchEntries when entries change

  // Calculate totals
  const totalEarned = earnedEntries.reduce((acc, entry) => acc + entry.amount, 0);
  const totalSpent = spendEntries.reduce((acc, entry) => acc + entry.amount, 0);

  // Get current month name
  const currentDate = new Date();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Filter entries for selected date
  const filteredSpendEntries = spendEntries.filter(entry => {
    const entryDate = new Date(entry.date);
    return (
      entryDate.getDate() === selectedDate.getDate() &&
      entryDate.getMonth() === selectedDate.getMonth() &&
      entryDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const filteredEarnedEntries = earnedEntries.filter(entry => {
    const entryDate = new Date(entry.date);
    return (
      entryDate.getDate() === selectedDate.getDate() &&
      entryDate.getMonth() === selectedDate.getMonth() &&
      entryDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const combinedFilteredEntries = [...filteredSpendEntries, ...filteredEarnedEntries];

  return (
    <Box className="dashboard-container">
      {/* Header Section */}
      <Paper elevation={3} className="dashboard-header">
        <Grid container spacing={4} justifyContent="space-around">
          <Grid item xs={12} md={3} className="header-item">
            <Typography variant="h6" className="header-title">Total Earned</Typography>
            <Typography variant="h4" className="header-amount earned">
              ₹{totalEarned.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3} className="header-item">
            <Typography variant="h6" className="header-title">Total Spent</Typography>
            <Typography variant="h4" className="header-amount spent">
              ₹{totalSpent.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3} className="header-item">
            <Typography variant="h6" className="header-title">Month</Typography>
            <Typography variant="h4" className="header-month">{monthName}</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Calendar and Charts Section */}
      <Grid container spacing={4}>
        {/* Calendar Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="dashboard-calendar">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateCalendar
                date={selectedDate}
                onChange={handleDateChange}
                sx={{
                  width: '100%',
                  '& .MuiPickersCalendarHeader-root': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
              />
            </LocalizationProvider>
          </Paper>
        </Grid>

        {/* Charts Section */}
        <Grid item xs={12} md={8} className="dashboard-charts">
          <Paper elevation={3} className="chart-card">
            <MonthlySpendChart
              spendEntries={spendEntries}
              earnedEntries={earnedEntries}
            />
          </Paper>
          <Paper elevation={3} className="chart-card">
            <CategoryPieChart
              spendEntries={spendEntries}
              earnedEntries={earnedEntries}
            />
          </Paper>
          <Paper elevation={3} className="full-width-chart">
            <TodaySpend spendEntries={combinedFilteredEntries} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;