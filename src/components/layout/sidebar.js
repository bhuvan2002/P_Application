import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Drawer,List,ListItem,ListItemIcon,ListItemText,Toolbar,Typography,} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import ShowChartIcon from '@mui/icons-material/ShowChart'; 
import styled from 'styled-components';

const drawerWidth = 190;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: ${drawerWidth}px;
    background: #001529;
    color: white;
  }
`;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const location = useLocation();

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          My App
        </Typography>
      </Toolbar>
      <List>
        <ListItem
          button
          component={Link}
          to="/dashboard"
          selected={location.pathname === '/dashboard'}
        >
          <ListItemIcon>
            <DashboardIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/dashboard/daily-tracker"
          selected={location.pathname === '/dashboard/daily-tracker'}
        >
          <ListItemIcon>
            <TrackChangesIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Daily Tracker" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/dashboard/trading"
          selected={location.pathname === '/dashboard/trading'}
        >
          <ListItemIcon>
            <ShowChartIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Trading" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <StyledDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
        }}
      >
        {drawer}
      </StyledDrawer>
      <StyledDrawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
        open
      >
        {drawer}
      </StyledDrawer>
    </>
  );
};

export default Sidebar;
