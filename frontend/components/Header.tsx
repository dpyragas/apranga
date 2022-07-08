import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

const Logo = styled.h1`
  background: #08296b;
  color: white;
  font-family: "Times New Roman", Times, serif;
  font-weight: normal;
  cursor: pointer;
  font-size: 4rem;
  text-align: center;
  position: relative;
  z-index: 2;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
`;

const StyledHeader = styled.header`
  color: #08296b;
  margin: 0;
  display: flex;
  width: 100%;

  border-bottom: 10px solid var(--black, black);
  .bar {
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }
  .sub-bar {
    display: grid;
    grid-template-columns: auto 1fr;
    border-bottom: 1px solid var(--black, black);
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <Link href="/">
        <Logo>APRANGA</Logo>
      </Link>
      <Navbar />
    </StyledHeader>
  );
};

export default Header;
