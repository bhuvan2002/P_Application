import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {AppBar,Toolbar,Typography,IconButton,CssBaseline,Box,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import Sidebar from './sidebar'; 

const drawerWidth = 190;

const MainContent = styled(Box)`
  flex-grow: 1;
  padding: 24px;
  margin-left: ${drawerWidth}px;
  margin-top: 64px; /* Height of the AppBar */
  background: #f0f2f5;
  height: calc(100vh - 64px);
  overflow-y: auto;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard/daily-tracker')) {
      return 'Daily Tracker';
    } else if (path.startsWith('/dashboard/trading')) {
      return 'Trading';
    } else if (path.startsWith('/dashboard')) {
      return 'Dashboard';
    }
    return 'My App';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {getPageTitle()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <MainContent>
        <Outlet />
      </MainContent>
    </Box>
  );
};

export default Layout;