import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Redirect } from 'react-router-dom';

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                user: user
            });
        });
    }

    render() {
        if (this.state.user !== undefined && this.state.user !== null)
            return <Redirect to={{ pathname: "/home", user: this.state.user }} />

        if (this.state.user !== undefined && this.state.user === null)
            return <Redirect to="/auth" />

        return (
            <Grid container direction="column" justify="center" alignItems="center" style={{ height: '100vh' }}>
                <CircularProgress />
            </Grid>
        );
    }
}

export default Loading;
