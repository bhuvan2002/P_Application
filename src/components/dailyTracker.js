import React, { useState, useEffect } from 'react';
import {Box,Tabs,Tab,Typography,Grid,TextField,MenuItem,Button,Paper,List,ListItem,ListItemText,IconButton,Divider,Snackbar,Alert,} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import './dailyTracker.css'; 

function a11yProps(index) {
  return {
    id: `dailytracker-tab-${index}`,
    'aria-controls': `dailytracker-tabpanel-${index}`,
  };
}

const DailyTracker = () => {
  const [activeTab, setActiveTab] = useState('Spend');
  const [spendEntries, setSpendEntries] = useState([]);
  const [earnedEntries, setEarnedEntries] = useState([]);

  const [form, setForm] = useState({
    details: '',
    amount: '',
    category: '',
    customCategory: '',
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const storedSpend = JSON.parse(localStorage.getItem('spendEntries')) || [];
    const storedEarned = JSON.parse(localStorage.getItem('earnedEntries')) || [];
    setSpendEntries(storedSpend);
    setEarnedEntries(storedEarned);
  }, []);

  useEffect(() => {
    localStorage.setItem('spendEntries', JSON.stringify(spendEntries));
  }, [spendEntries]);

  useEffect(() => {
    localStorage.setItem('earnedEntries', JSON.stringify(earnedEntries));
  }, [earnedEntries]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setForm({
      details: '',   
      amount: '',
      category: '',
      customCategory: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const spendCategories = ['Groceries', 'Bills', 'Entertainment', 'Transport', 'Other'];
  const earnedCategories = ['Salary', 'Loan', 'Trading'];

  const handleAddEntry = (e) => {
    if (e) e.preventDefault();
    const { details, amount, category, customCategory } = form;

    if (activeTab === 'Spend') {
      if (!details || !amount || !category) {
        setSnackbar({ open: true, message: 'Please fill in all required fields.', severity: 'error' });
        return;
      }
    } else {
      if (!amount || !category) {
        setSnackbar({ open: true, message: 'Please fill in all required fields.', severity: 'error' });
        return;
      }
    }

    if (parseFloat(amount) <= 0) {
      setSnackbar({ open: true, message: 'Amount must be greater than zero.', severity: 'error' });
      return;
    }

    const entryDate = format(selectedDate, 'MM/dd/yyyy');

    const entry = {
      id: Date.now(),
      amount: parseFloat(amount),
      category: category === 'Other' ? customCategory : category,
      date: entryDate,
      type: activeTab,
    };

    if (activeTab === 'Spend') {
      entry.details = details;
      setSpendEntries([entry, ...spendEntries]);
    } else {
      setEarnedEntries([entry, ...earnedEntries]);
    }

    setForm({
      details: '',
      amount: '',
      category: '',
      customCategory: '',
    });

    setSnackbar({ open: true, message: 'Entry added successfully!', severity: 'success' });
  };

  const handleDeleteEntry = (id, type) => {
    if (type === 'Spend') {
      setSpendEntries(spendEntries.filter((entry) => entry.id !== id));
    } else {
      setEarnedEntries(earnedEntries.filter((entry) => entry.id !== id));
    }
    setSnackbar({ open: true, message: 'Entry deleted successfully!', severity: 'info' });
  };

  const formattedDate = format(selectedDate, 'MM/dd/yyyy');
  const filteredSpendEntries = spendEntries.filter((entry) => entry.date === formattedDate);
  const filteredEarnedEntries = earnedEntries.filter((entry) => entry.date === formattedDate);
  const totalSpent = filteredSpendEntries.reduce((acc, curr) => acc + curr.amount, 0);
  const totalEarned = filteredEarnedEntries.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalEarned - totalSpent;

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box className="daily-tracker-container">
      <Paper elevation={3} className="daily-tracker-paper">
        <Typography variant="h4" className="tracker-header">
          Daily Tracker
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container justifyContent="flex-end" className="calendar-container">
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newValue) => {
                setSelectedDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </Grid>
        </LocalizationProvider>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          className="tabs-container"
        >
          <Tab label="Spend" value="Spend" {...a11yProps(0)} />
          <Tab label="Earned" value="Earned" {...a11yProps(1)} />
        </Tabs>
        <Grid container justifyContent="flex-end" className="add-button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEntry}
            className="submit-button"
          >
            Add {activeTab === 'Spend' ? 'Spend' : 'Earned'}
          </Button>
        </Grid>
        <form onSubmit={handleAddEntry} className="form-container">
          <Grid container spacing={2}>
            {activeTab === 'Spend' && (
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Details"
                  name="details"
                  value={form.details}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  required={activeTab === 'Spend'}
                  size="small"
                  className="form-textfield"
                />
              </Grid>
            )}
            <Grid item xs={12} sm={activeTab === 'Spend' ? 6 : 12}>
              <TextField
                label="Amount ($)"
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
                inputProps={{ step: '0.01', min: '0' }}
                size="small"
                className="form-textfield"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Category"
                name="category"
                value={form.category}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
                size="small"
                className="form-textfield"
              >
                <MenuItem value="">
                  <em>Select Category</em>
                </MenuItem>
                {(activeTab === 'Spend' ? spendCategories : earnedCategories).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {activeTab === 'Spend' && form.category === 'Other' && (
              <Grid item xs={12}>
                <TextField
                  label="Custom Category"
                  name="customCategory"
                  value={form.customCategory}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  className="form-textfield"
                />
              </Grid>
            )}
          </Grid>
        </form>
        <Box className="summary-container">
          <Typography variant="h6" gutterBottom>
            Summary for {formattedDate}
          </Typography>
          <Grid container spacing={2}>
            {activeTab === 'Spend' ? (
              <>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="error" className="summary-text">
                    Total Spent: ${totalSpent.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" className="summary-text">
                    Balance: ${balance.toFixed(2)}
                  </Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="success.main" className="summary-text">
                    Total Earned: ${totalEarned.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" className="summary-text">
                    Balance: ${balance.toFixed(2)}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        <Box className="recent-entries-container">
          <Typography variant="h6" gutterBottom>
            {activeTab === 'Spend' ? 'Spent' : 'Earned'} Entries on {formattedDate}
          </Typography>
          <List>
            {(activeTab === 'Spend' ? filteredSpendEntries : filteredEarnedEntries).length === 0 ? (
              <Typography>No entries for the selected date.</Typography>
            ) : (
              (activeTab === 'Spend' ? filteredSpendEntries : filteredEarnedEntries).map((entry) => (
                <React.Fragment key={entry.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteEntry(entry.id, activeTab)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={
                        activeTab === 'Spend'
                          ? `${entry.details} - $${entry.amount.toFixed(2)}`
                          : `Earned: $${entry.amount.toFixed(2)}`
                      }
                      secondary={`Category: ${entry.category} | Date: ${entry.date}`}
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))
            )}
          </List>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default DailyTracker;