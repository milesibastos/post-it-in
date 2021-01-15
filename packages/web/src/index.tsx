import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './pages';
import reportWebVitals from './reportWebVitals';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: { main: '#0077B5' },
      secondary: { main: '#E68523' },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '#root': { display: 'flex' },
        },
      },
    },
  })
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<div />}>
          <App />
        </Suspense>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
