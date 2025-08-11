// src/components/Trading.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const Trading = () => {
  const [trades, setTrades] = useState([]);
  const [form, setForm] = useState({
    tradeName: '',
    quantity: '',
    buyPrice: '',
    sellPrice: '',
    date: '',
    result: 'Profit',
  });

  useEffect(() => {
    const storedTrades = JSON.parse(localStorage.getItem('trades'));
    if (storedTrades) setTrades(storedTrades);
  }, []);

  useEffect(() => {
    localStorage.setItem('trades', JSON.stringify(trades));
  }, [trades]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddTrade = (e) => {
    e.preventDefault();
    const { tradeName, quantity, buyPrice, sellPrice, date, result } = form;

    if (!tradeName || !quantity || !buyPrice || !sellPrice || !date || !result) {
      alert('Please fill in all fields.');
      return;
    }

    const qty = parseFloat(quantity);
    const buy = parseFloat(buyPrice);
    const sell = parseFloat(sellPrice);

    if (isNaN(qty) || isNaN(buy) || isNaN(sell) || qty <= 0 || buy <= 0 || sell <= 0) {
      alert('Please enter valid positive numbers for Quantity, Buy Price, and Sell Price.');
      return;
    }

    const isProfit = result === 'Profit';
    const total = parseFloat(((sell - buy) * qty).toFixed(2));

    const newTrade = {
      id: Date.now(),
      tradeName,
      quantity: qty,
      buyPrice: buy,
      sellPrice: sell,
      profit: isProfit,
      total: Math.abs(total),
      date,
    };

    setTrades([newTrade, ...trades]);

    // Reset form
    setForm({
      tradeName: '',
      quantity: '',
      buyPrice: '',
      sellPrice: '',
      date: '',
      result: 'Profit',
    });
  };

  const handleDeleteTrade = (id) => {
    setTrades(trades.filter((trade) => trade.id !== id));
  };

  // Calculate Summaries
  const totalProfit = trades
    .filter((trade) => trade.profit)
    .reduce((acc, curr) => acc + curr.total, 0);

  const totalLoss = trades
    .filter((trade) => !trade.profit)
    .reduce((acc, curr) => acc + curr.total, 0);

  const netTotal = totalProfit - totalLoss;

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Trading Tracker
        </Typography>

        <form onSubmit={handleAddTrade}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Trade Name / Symbol"
                name="tradeName"
                value={form.tradeName}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
                placeholder="e.g., AAPL, BTC/USD"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
                inputProps={{ step: '0.01', min: '0' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Buy Price ($)"
                name="buyPrice"
                type="number"
                value={form.buyPrice}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
                inputProps={{ step: '0.01', min: '0' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Sell Price ($)"
                name="sellPrice"
                type="number"
                value={form.sellPrice}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
                inputProps={{ step: '0.01', min: '0' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Result</FormLabel>
                <RadioGroup
                  row
                  aria-label="result"
                  name="result"
                  value={form.result}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="Profit" control={<Radio />} label="Profit" />
                  <FormControlLabel value="Loss" control={<Radio />} label="Loss" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Add Trade
              </Button>
            </Grid>
          </Grid>
        </form>

        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6">Summary</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography>Total Profit: ${totalProfit.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>Total Loss: ${totalLoss.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>Net Total: ${netTotal.toFixed(2)}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6">Recent Trades</Typography>
          <List>
            {trades.length === 0 ? (
              <Typography>No trades recorded yet.</Typography>
            ) : (
              trades.map((trade) => (
                <React.Fragment key={trade.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteTrade(trade.id)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={`${trade.tradeName} (${trade.quantity} @ $${trade.buyPrice.toFixed(
                        2
                      )}/${trade.sellPrice.toFixed(2)})`}
                      secondary={`Date: ${trade.date} | ${trade.profit ? 'Profit' : 'Loss'}: $${
                        trade.profit ? '+' : '-'
                      }${trade.total.toFixed(2)}`}
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))
            )}
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default Trading;
