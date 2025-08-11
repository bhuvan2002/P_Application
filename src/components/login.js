import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button, Alert } from '@mui/material';
import ParentLogin from './parentLogin'; 

const Login = () => {
  const [loginType, setLoginType] = useState('normal');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginTypeChange = (event) => {
    setLoginType(event.target.value);
    setCredentials({ username: '', password: '' }); 
    setError('');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleNormalLogin = (e) => {
    e.preventDefault();
    const { username, password } = credentials;
    if (username === '9353833178' && password === 'Ranjini') {
      navigate('/dashboard'); 
    } else {
      setError('Invalid credentials for Normal Login');
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        height: '100vh', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'background.default',
        padding: 2
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 2, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="login-type-label">Login Type</InputLabel>
          <Select
            labelId="login-type-label"
            id="login-type"
            value={loginType}
            label="Login Type"
            onChange={handleLoginTypeChange}
          >
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="parent">Parent</MenuItem>
          </Select>
        </FormControl>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {loginType === 'normal' ? (
          <Box component="form" onSubmit={handleNormalLogin}>
            <TextField
              label="Username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
            >
              Login
            </Button>
          </Box>
        ) : (
          <ParentLogin />
        )}
      </Paper>
    </Box>
  );
};

export default Login;