import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
    render() {
        const user = this.props.location.user;

        if (! user)
            return <Redirect to="/" />

        return(
            <Card>
                <CardContent>
                    <Typography>
                        Olá, {user.displayName}!
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default Home;
