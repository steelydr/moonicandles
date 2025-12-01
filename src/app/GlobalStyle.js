// app/GlobalStyle.js
"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --background: #f5e6d3;
    --foreground: #171717;
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  body {
    background: var(--background);
    color: var(--foreground);
    font-family: 'Segoe Script', cursive, Arial, Helvetica, sans-serif;
    overflow-x: hidden;
    min-height: 100vh;
  }

  h1, h2, h3 {
    font-family: 'Segoe Script', cursive;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  .tagline {
    font-size: 1.5rem;
  }

  /* Mobile First */
  @media (max-width: 640px) {
    html { font-size: 14px; }
    h1 { font-size: 2.5rem; }
    .tagline { font-size: 1.25rem; }
  }

  @media (min-width: 641px) and (max-width: 1024px) {
    html { font-size: 15px; }
    h1 { font-size: 3.5rem; }
    .tagline { font-size: 1.5rem; }
  }

  @media (min-width: 1025px) {
    html { font-size: 16px; }
    h1 { font-size: 4rem; }
    .tagline { font-size: 1.75rem; }
  }

  @media (min-width: 1440px) {
    html { font-size: 18px; }
  }

  @media (min-width: 1920px) {
    html { font-size: 20px; }
  }
`;

export default GlobalStyle;