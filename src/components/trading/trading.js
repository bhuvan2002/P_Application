// src/components/trading/trading.js

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
  Checkbox,
  Select,
  MenuItem,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import './trading.css';

const Trading = () => {
  const [trades, setTrades] = useState([]);
  const [form, setForm] = useState({
    tradeName: '',
    quantity: '',
    buyPrice: '',
    sellPrice: '',
    stopLoss: '',
    target: '',
    date: '',
    reason: '',
    result: 'Profit',
    sellEqualsTarget: false,
    position: 'Long',
  });

  useEffect(() => {
    const storedTrades = JSON.parse(localStorage.getItem('trades') || '[]');
    if (storedTrades) setTrades(storedTrades);
  }, []);

  useEffect(() => {
    localStorage.setItem('trades', JSON.stringify(trades));
  }, [trades]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm((prevForm) => {
        const updatedForm = {
          ...prevForm,
          [name]: checked,
        };
        if (name === 'sellEqualsTarget' && checked) {
          updatedForm.target = prevForm.sellPrice;
        }
        return updatedForm;
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddTrade = (e) => {
    e.preventDefault();
    const {
      tradeName,
      quantity,
      buyPrice,
      sellPrice,
      stopLoss,
      target,
      date,
      reason,
      result,
      sellEqualsTarget,
      position,
    } = form;

    // Basic Validation
    if (
      !tradeName ||
      !quantity ||
      !buyPrice ||
      !sellPrice ||
      !stopLoss ||
      !target ||
      !date ||
      !reason ||
      !result ||
      !position
    ) {
      alert('Please fill in all fields.');
      return;
    }

    // Numeric Validation
    const qty = parseFloat(quantity);
    const buy = parseFloat(buyPrice);
    const sell = parseFloat(sellPrice);
    const sl = parseFloat(stopLoss);
    const tgt = parseFloat(target);

    if ([qty, buy, sell, sl, tgt].some((num) => isNaN(num) || num <= 0)) {
      alert('Please enter valid positive numbers for Quantity, Prices, Stop Loss, and Target.');
      return;
    }

    const isProfit = result === 'Profit';
    const total = parseFloat(((sell - buy) * qty).toFixed(2));
    const percentage = parseFloat(((sell - buy) / buy * 100).toFixed(2));

    const newTrade = {
      id: Date.now(),
      tradeName,
      quantity: qty,
      buyPrice: buy,
      sellPrice: sell,
      stopLoss: sl,
      target: tgt,
      profit: isProfit,
      total: Math.abs(total),
      percentage,
      date,
      reason,
      position,
    };

    setTrades([newTrade, ...trades]);

    // Reset form
    setForm({
      tradeName: '',
      quantity: '',
      buyPrice: '',
      sellPrice: '',
      stopLoss: '',
      target: '',
      date: '',
      reason: '',
      result: 'Profit',
      sellEqualsTarget: false,
      position: 'Long',
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

  const totalTrades = trades.length;
  const profitableTrades = trades.filter((trade) => trade.profit).length;
  const lossTrades = trades.filter((trade) => !trade.profit).length;
  const averagePercentage =
    trades.reduce((acc, curr) => acc + curr.percentage, 0) /
    (totalTrades || 1);

  return (
    <Box className="trading-container">
      <Paper elevation={3} className="trading-paper">
        <Typography variant="h4" align="center" gutterBottom className="title">
          Trading Tracker
        </Typography>

        <form onSubmit={handleAddTrade} className="trade-form">
          <Grid container spacing={2}>
            {/* Row 1 */}
            <Grid item xs={12} sm={6}>
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
              <FormControl variant="outlined" fullWidth required>
                <FormLabel>Position</FormLabel>
                <Select
                  label="Position"
                  name="position"
                  value={form.position}
                  onChange={handleInputChange}
                  style={{ height: '56px' }} // Ensures Select height matches TextField
                >
                  <MenuItem value="Long">Long Position</MenuItem>
                  <MenuItem value="Short">Short Position</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Row 2 */}
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

            {/* Row 3 */}
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

            <Grid item xs={12} sm={6} className="checkbox-container">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.sellEqualsTarget}
                    onChange={handleInputChange}
                    name="sellEqualsTarget"
                    color="primary"
                  />
                }
                label="Sell Price equals Target"
              />
            </Grid>

            {/* Row 4 */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Stop Loss ($)"
                name="stopLoss"
                type="number"
                value={form.stopLoss}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
                inputProps={{ step: '0.01', min: '0' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Target ($)"
                name="target"
                type="number"
                value={form.target}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
                inputProps={{ step: '0.01', min: '0' }}
                disabled={form.sellEqualsTarget}
              />
            </Grid>

            {/* Row 5 */}
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
                style={{ height: '56px' }} // Ensures Date picker height matches TextField
              />
            </Grid>

            {/* Empty Grid to maintain two columns */}
            <Grid item xs={12} sm={6}></Grid>

            {/* Row 6 */}
            <Grid item xs={12} sm={12}>
              <TextField
                label="Reason for Trade"
                name="reason"
                value={form.reason}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
                multiline
                rows={2}
                placeholder="Explain the rationale behind the trade."
              />
            </Grid>

            {/* Row 7 */}
            <Grid item xs={12} sm={12}>
              <FormControl component="fieldset" fullWidth>
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

            {/* Row 8 */}
            <Grid item xs={12} sm={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Add Trade
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Summary Section */}
        <Box className="summary-section">
          <Typography variant="h6" gutterBottom>
            Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Box className="summary-box profit">
                <Typography variant="subtitle1">Total Profit</Typography>
                <Typography variant="h6">${totalProfit.toFixed(2)}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box className="summary-box loss">
                <Typography variant="subtitle1">Total Loss</Typography>
                <Typography variant="h6">${totalLoss.toFixed(2)}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box className="summary-box net">
                <Typography variant="subtitle1">Net Total</Typography>
                <Typography variant="h6">${netTotal.toFixed(2)}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box className="summary-box average">
                <Typography variant="subtitle1">Average % Gain/Loss</Typography>
                <Typography variant="h6">{averagePercentage.toFixed(2)}%</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Trades List */}
        <Box className="trades-section">
          <Typography variant="h6" gutterBottom>
            Recent Trades
          </Typography>
          <List>
            {trades.length === 0 ? (
              <Typography>No trades recorded yet.</Typography>
            ) : (
              trades.map((trade) => (
                <React.Fragment key={trade.id}>
                  <ListItem alignItems="flex-start" className="trade-item">
                    <ListItemText
                      primary={
                        <Box className="trade-header">
                          <Typography variant="subtitle1" className="trade-name">
                            {trade.tradeName} ({trade.quantity})
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            className={`trade-result ${trade.profit ? 'profit' : 'loss'}`}
                          >
                            {trade.profit ? 'Profit' : 'Loss'}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="textPrimary">
                            Buy: ${trade.buyPrice.toFixed(2)} | Sell: ${trade.sellPrice.toFixed(2)}
                          </Typography>
                          <Typography variant="body2" color="textPrimary">
                            Stop Loss: ${trade.stopLoss.toFixed(2)} | Target: ${trade.target.toFixed(2)}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Position: {trade.position}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Date: {trade.date}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Reason: {trade.reason}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            % {trade.profit ? 'Gain' : 'Loss'}: {trade.percentage}%
                          </Typography>
                        </>
                      }
                    />
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteTrade(trade.id)}
                    >
                      <DeleteIcon className="delete-icon" />
                    </IconButton>
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