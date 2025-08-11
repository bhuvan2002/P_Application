import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login'; 
import Layout from './components/layout/layout'; 
import Dashboard from './components/dashboard';
import DailyTracker from './components/dailyTracker';
import Trading from './components/trading';
// import ParentDashboard from './components/ParentDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="daily-tracker" element={<DailyTracker />} />
          <Route path="trading" element={<Trading />} />
          {/* <Route path="parent-dashboard" element={<ParentDashboard />} /> */} 
        </Route>
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;