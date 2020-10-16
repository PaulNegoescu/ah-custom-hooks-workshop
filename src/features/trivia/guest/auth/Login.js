import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../../../../components/Copyright';
import { Link as RouterLink } from 'react-router-dom';

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

const validators = {
    required: (value) => value.trim() !== '' && value.trim() !== 'off',
    email: (value) => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value),
    minLength: (value, length) => value.length >= length,
    maxLength: (value, length) => value.length <= length,
    min: (value, reference) => Number(value) >= reference,
    max: (value, reference) => Number(value) <= reference,
};

function defaultMessages(fieldName, type, constraint) {
    const messages = {
        required: `You should provide a value for "${fieldName}".`,
        email: `You should provide a valid email address.`,
        minLength: `"${fieldName}" should be at least ${constraint} characters long.`,
        maxLength: `"${fieldName}" should be at most ${constraint} characters long.`,
        min: `"${fieldName}" should be at least ${constraint}.`,
        max: `"${fieldName}" should be at most ${constraint}.`,
    };
    return messages[type];
}

class ValidationError extends Error {
    constructor(message, values, validationRules) {
        super(message);
        this.values = values;
        this.validationRules = validationRules;
    }
}
function validateInputFields(values, validationRules) {
    const errors = {};
    let hasErrors = false;

    for (const field in validationRules) {
        for (const rule of validationRules[field]) {
            if (values[field] === undefined) {
                throw new ValidationError(
                    `Validator did not get a field called "${field}"!`,
                    values,
                    validationRules
                );
            }

            if (!validators[rule.type]) {
                throw new ValidationError(
                    `There is no "${rule.type}" validator!`,
                    values,
                    validationRules
                );
            }

            console.log({
                type: rule.type,
                value: values[field],
                constraint: rule.constraint,
                field,
                validator: validators[rule.type],
                output: validators[rule.type](values[field], rule.constraint),
            });
            if (!validators[rule.type](values[field], rule.constraint)) {
                const msg =
                    rule.message ||
                    defaultMessages(field, rule.type, rule.constraint);
                hasErrors = true;

                if (errors[field]) {
                    errors[field].push(msg);
                } else {
                    errors[field] = [msg];
                }
            }
        }
    }
    return [hasErrors, errors];
}

export default function Login() {
    const classes = useStyles();

    // Form Handling
    const validationRules = {
        email: [{ type: 'email' }],
        password: [{ type: 'required' }],
    };
    const initialValues = {
        email: '',
        password: '',
    };
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    function handleInputChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    function handleLogin(e) {
        e.preventDefault();

        const [hasErrors, errors] = validateInputFields(
            values,
            validationRules
        );

        if (hasErrors) {
            setErrors(errors);
            return;
        }

        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(values),
        });
    }
    console.log(errors);
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
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
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
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
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
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
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
