import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    hero: {
        position: 'relative',
        backgroundColor: theme.palette.grey[300],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage:
            'url(https://cdn.pixabay.com/photo/2017/07/11/21/37/loads-2495144_960_720.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    heroContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
}));

export default function Hero() {
    const classes = useStyles();

    return (
        <Paper className={classes.hero}>
            <div className={classes.overlay} />
            <Grid container>
                <Grid item md={6}>
                    <div className={classes.heroContent}>
                        <Typography
                            component="h1"
                            variant="h3"
                            color="inherit"
                            gutterBottom
                        >
                            Custom Hooks
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            The goal of this workshop is to understand why hooks
                            can help us. Through implementing a few custom hooks
                            in our application we will understand how hooks
                            allow us to reuse functionality through composition
                            in our React applications.
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
}
