import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const Container = styled.div`
  max-width:1100px;
  margin: 24px auto;
  padding: 0 16px;
`;

const Card = styled.div`
  background: var(--card);
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(16,24,40,0.06);
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        <Card>{children}</Card>
      </Container>
    </>
  );
};

export default Layout;