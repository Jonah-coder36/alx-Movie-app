import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--bg);
`;

export const Card = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 6px 18px rgba(16,24,40,0.08);
`;

export const Title = styled.h1`
  margin: 0 0 16px;
  font-size: 24px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
`;

export const Button = styled.button`
  width: 100%;
  background: var(--primary);
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 12px;

  &:hover {
    opacity: 0.9;
  }
`;

export const FooterText = styled.p`
  font-size: 14px;
  text-align: center;
  color: var(--muted);
  margin-top: 8px;
`;