import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root{
    --bg:#f5f5f6;
    --card:#fff;
    --primary:#2d5b1f; /* green used in mock */
    --muted:#6b7280;
  }
  html,body,#__next{
    height:100%;
  }
  body{
    margin:0;
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background:var(--bg);
    color:#0f172a;
    -webkit-font-smoothing:antialiased;
  }
  *{box-sizing:border-box}
  a{color:inherit;text-decoration:none}
`;

export default GlobalStyles;