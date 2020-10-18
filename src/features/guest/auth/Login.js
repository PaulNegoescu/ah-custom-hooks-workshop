import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';
import { api } from '../../../utils/apiHelper';
import useForm from '../../../hooks/useForm';
import { AuthContext } from './authContext';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const validationRules = {
    email: [{ type: 'email' }],
    password: [{ type: 'required' }],
};
const initialValues = {
    email: '',
    password: '',
};

export default function Login() {
    const classes = useStyles();

    // Form Handling
    const [values, errors, bindInput, isFormValid] = useForm(
        initialValues,
        validationRules
    );

    const { setAuthValues } = useContext(AuthContext);

    async function handleLogin(e) {
        e.preventDefault();

        if (isFormValid()) {
            const data = await api('login')('create', values);
            setAuthValues(data.accessToken, values.email);
            console.log(data);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleLogin}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        // Two-way binding
                        {...bindInput('email')}
                        // Error Handling
                        {...{
                            error: !!errors.email,
                            helperText: errors.email && errors.email.join(' '),
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        // Two-way binding
                        {...bindInput('password')}
                        // Error Handling
                        {...{
                            error: !!errors.password,
                            helperText:
                                errors.password && errors.password.join(' '),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link
                                to="/forgot-password"
                                variant="body2"
                                component={RouterLink}
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                to="/register"
                                variant="body2"
                                component={RouterLink}
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
