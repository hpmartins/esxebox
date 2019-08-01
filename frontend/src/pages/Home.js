import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

// Notification
import {ToastsContainerPosition, ToastsContainer, ToastsStore} from 'react-toasts';

import * as authActions from '../auth/authActions';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        minHeight: '80vh'
    }
}));

function Home(props) {
    const classes = useStyles();

    const { dispatch } = props;
    const {isAuthenticated, statusText} = props.auth;

    useEffect(() => {
        if (statusText && statusText === 'AUTH_LOGIN_OK') {
            ToastsStore.success('Logged in!');
            dispatch(authActions.clear_status());
        }

        if (statusText && statusText === 'AUTH_LOGOUT') {
            ToastsStore.success('Logged out!');
            dispatch(authActions.clear_status());
        }
    })

    return (
        <>
        <Grid container direction="column" justify="center" alignItems="center" className={classes.root}>
        <Grid item>
            <Typography variant='h4'>
                electronic structure and X-ray experiments sandbox
            </Typography>
        </Grid>
        <ToastsContainer position={ToastsContainerPosition.BOTTOM_CENTER} store={ToastsStore} />
        </Grid>
        </>
    );
}

export default connect(state => {
    return {auth: state.root.auth}
})(Home);
