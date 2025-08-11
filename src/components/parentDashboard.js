// src/components/ParentDashboard.js
import React from 'react';
import styled from 'styled-components';
import NavBar from './navBar';

const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ParentBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e6f7ff;
`;

function ParentDashboard() {
  return (
    <ParentContainer>
      <NavBar />
      <ParentBox>
        <h2>Parent Dashboard</h2>
        <p>Welcome to the Parent Dashboard.</p>
      </ParentBox>
    </ParentContainer>
  );
}

export default ParentDashboard;
