import React from 'react';
import ReactDOM from 'react-dom';

import { createGlobalStyle } from 'styled-components';

import App from './App';
import * as serviceWorker from './serviceWorker';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: clamp(16px, 1vw, 25px);
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: white;
    background-color: rgb(30,30,30);
  }

  a {
    color: rgb(200,200,200);
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
