import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';
import { api } from '../../../utils/apiHelper';
import { FormControl, FormHelperText } from '@material-ui/core';
import useForm from '../../../hooks/useForm';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const validationRules = {
    fName: [
        {
            type: 'minLength',
            constraint: 2,
            message: 'Please enter at least 2 characters.',
        },
    ],
    lName: [
        {
            type: 'minLength',
            constraint: 2,
            message: 'Please enter at least 2 characters.',
        },
    ],
    email: [{ type: 'email' }],
    password: [{ type: 'required' }],
    agree: [
        {
            type: 'required',
            message: 'You need to agree to the terms and conditions.',
        },
    ],
};
const initialValues = {
    fName: '',
    lName: '',
    email: '',
    password: '',
    agree: false,
};

export default function Register() {
    const classes = useStyles();

    // Form Handling
    const [values, errors, bindInput, isFormValid] = useForm(
        initialValues,
        validationRules
    );

    async function handleRegister(e) {
        e.preventDefault();

        if (isFormValid()) {
            const data = await api('register')('create', values);

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
                    Register
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleRegister}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                // Two-way binding
                                {...bindInput('fName')}
                                // Error Handling
                                {...{
                                    error: !!errors.fName,
                                    helperText:
                                        errors.fName && errors.fName.join(' '),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                autoComplete="lname"
                                // Two-way binding
                                {...bindInput('lName')}
                                // Error Handling
                                {...{
                                    error: !!errors.lName,
                                    helperText:
                                        errors.lName && errors.lName.join(' '),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                // Two-way binding
                                {...bindInput('email')}
                                // Error Handling
                                {...{
                                    error: !!errors.email,
                                    helperText:
                                        errors.email && errors.email.join(' '),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                                        errors.password &&
                                        errors.password.join(' '),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl
                                required
                                // Error Handling
                                error={!!errors.agree}
                                className={classes.formControl}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            // Two-way binding
                                            {...bindInput('agree', 'checked')}
                                        />
                                    }
                                    label={
                                        <>
                                            I agree to the{' '}
                                            <Link
                                                to="/terms-and-conditions"
                                                component={RouterLink}
                                            >
                                                terms and conditions
                                            </Link>
                                        </>
                                    }
                                />
                                <FormHelperText>
                                    {errors.agree && errors.agree.join(' ')}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Register
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link
                                variant="body2"
                                to="/login"
                                component={RouterLink}
                            >
                                Already have an account? Sign in.
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
