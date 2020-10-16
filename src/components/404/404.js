import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Link,
    makeStyles,
    Container,
} from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import bannerImg from './404.jpg';

const useStyles = makeStyles(() => ({
    centerVertically: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}));

export default function NotFound() {
    const classes = useStyles();
    return (
        <Container maxWidth="sm" className={classes.centerVertically}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Lego 404"
                        image={bannerImg}
                        title="Lego 404"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h1" component="h1">
                            Not Found
                        </Typography>
                        <Typography variant="body2" component="p">
                            The page you tried to access does not exist please
                            use our actions below to find your way back to the
                            site.
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Link
                        size="small"
                        color="primary"
                        to="/"
                        component={RouterLink}
                    >
                        Home
                    </Link>
                    <Link
                        size="small"
                        color="primary"
                        to="/admin"
                        component={RouterLink}
                    >
                        Admin
                    </Link>
                </CardActions>
            </Card>
        </Container>
    );
}
