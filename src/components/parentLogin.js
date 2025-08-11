// src/components/ParentLogin.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ParentBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const HospitalName = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #52c41a;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background: #73d13d;
  }
`;

function ParentLogin() {
  const navigate = useNavigate();

  const handleParentLogin = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    if (password === 'Apollo') {
      navigate('/parent-dashboard');
    } else {
      alert('Invalid Password for Parent Login');
    }
  };

  return (
    <ParentBox>
      <HospitalName>Bhuvan Hospital</HospitalName>
      <form onSubmit={handleParentLogin}>
        <Input type="password" name="password" placeholder="Password" required />
        <Button type="submit">Login</Button>
      </form>
    </ParentBox>
  );
}

export default ParentLogin;
