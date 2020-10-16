import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#457b9d',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#a8dadc',
        },
        error: {
            main: '#e63946',
        },
        warning: {
            main: '#f4a261',
        },
        background: {
            default: '#1d3557',
            paper: '#f1faee',
        },
        text: {
            primary: '#1d3557',
            secondary: '#a8dadc',
        },
    },
});

export default theme;
