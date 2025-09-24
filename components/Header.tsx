import Link from "next/link";
import styled from "styled-components";

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1000;

  background: #111;
  color: #fff;
  padding: 1rem 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  font-weight: bold;
`;

const Links = styled.div`
  a {
    color: #fff;
    margin-left: 1rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Header() {
  return (
    <Nav>
      <Title>Alx Movies</Title>
      <Links>
        <Link href="/">Home</Link>
        <Link href="/favorites">Favorites</Link>
        <Link href="/recommendations">Recommendations</Link>
      </Links>
    </Nav>
  );
}