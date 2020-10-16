import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import 'typeface-roboto';

import App from './components/App';
// import theme from './themes/2020';

ReactDOM.render(
    <React.StrictMode>
        {/* <ThemeProvider theme={theme}> */}
        <CssBaseline />
        <Router>
            <App />
        </Router>
        {/* </ThemeProvider> */}
    </React.StrictMode>,
    document.getElementById('root')
);
