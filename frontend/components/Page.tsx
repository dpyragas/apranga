import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";

interface PageProps {
  children?: JSX.Element;
}

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'neutral_face';
  src: url('/static/NeutralFace.otf');
  font-weight:normal;
  font-style:normal;

}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
  html{
    --blue: #08296b;
    --black: #393939;
    --grey: #3A3A3A;
    --gray: var(--grey);
    --lighGrey: #e1e1e1;
    --lightGray: var(--lighGrey);
    --offWhite: #ededed;
    --max-width: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    font-size: 62.5%;
    box-sizing: border-box;
    
  }
  *,*:before,*:after{
  box-sizing:inherit;
  }
  body {
    font-family: 'neutral_face', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size:1.5rem;


  }
  a {
    text-decoration: none;
    color: var(--black)
  }
  a:hover {
    text-decoration:underline;
  }
  button: {
    font-family: 'neutral_face', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

const Page = ({ children }: PageProps) => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </>
  );
};

export default Page;
