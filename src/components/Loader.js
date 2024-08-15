import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const LoaderSpinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

const LoaderText = styled.p`
  color: white;
  font-size: 18px;
  margin-top: 20px;
`;

const Loader = ({ message = 'Loading...' }) => (
  <LoaderWrapper>
    <div>
      <LoaderSpinner />
      <LoaderText>{message}</LoaderText>
    </div>
  </LoaderWrapper>
);

export default Loader;
