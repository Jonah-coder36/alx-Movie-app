import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: #2d6a4f;
  border: none;
  color: white;
  border-radius: 6px;
  font-size: 1rem;
`;

export default function Login() {
  return (
    <Wrapper>
      <Form>
        <Title>Welcome back!</Title>
        <p>Enter your credentials to access your account</p>
        <Input type="email" placeholder="Email address" />
        <Input type="password" placeholder="Password" />
        <Button type="submit">Login</Button>
        <p>
          Don’t have an account? <Link href="/auth/signup">Sign Up</Link>
        </p>
      </Form>
    </Wrapper>
  );
}
