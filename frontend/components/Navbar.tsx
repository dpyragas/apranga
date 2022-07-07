import Link from "next/link";
import React from "react";
import styled from "styled-components";

const StyledNavbar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  margin-left: 5rem;
  .sub-bar {
    border-bottom: 1px solid var(--black, black);
  }
`;

const Navbar = () => {
  return (
    <StyledNavbar>
      <Link href="/products">Products</Link>
      <Link href="/sell">Sell</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
      <div className="sub-bar">
        <p>Search</p>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
