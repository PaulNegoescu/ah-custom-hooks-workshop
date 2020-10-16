import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Copyright() {
    return (
        <Typography variant="body2" align="center">
            Copyright &copy;&nbsp;
            <Link href={window.location.origin} target="_blank">
                Paul Negoescu - Custom Hooks Workshop
            </Link>
            &nbsp; {new Date().getFullYear()}.
        </Typography>
    );
}
