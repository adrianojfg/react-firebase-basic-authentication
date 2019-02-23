import React from 'react';
import { Paper, withStyles, Grid, AppBar, Toolbar, Tabs, Tab, Typography, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SwipeableViews from 'react-swipeable-views';
import Login from './login';
import Signup from './signup';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            snack: false,
            snackMsg: ''
        };
    }

    handleChange = (event, tab) => {
        this.setState({ tab });
    }

    handleChangeIndex = (index) => {
        this.setState({ tab: index });
    };

    handleSnack = (snack) => {
        this.setState({ snack: snack });
    }

    handleSnackMsg = (snackMsg) => {
        this.setState({ snackMsg: snackMsg });
    }

    handleCloseSnack = (event, reason) => {
        this.setState({ snack: false });
    }

    render() {
        const { classes, theme } = this.props;
        const { tab, snack, snackMsg } = this.state;
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{ height: '100vh' }}
            >
                <AppBar
                    position="static"
                    color="primary"
                    style={{width: '90%', maxWidth: 320}}
                >
                    <Toolbar>
                        <Typography variant="h6" color="inherit">Seja bem-vindo</Typography>
                    </Toolbar>
                    <Paper square>
                        <Tabs
                            value={tab}
                            onChange={this.handleChange}
                            fullWidth
                            variant="fullWidth"
                            textColor="secondary"
                        >
                            <Tab label="Login" />
                            <Tab label="Cadastro" />
                        </Tabs>
                    </Paper>
                    <Paper className={classes.padding} square>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            animateHeight={true}
                            index={tab}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            <Login dir={theme.direction} snack={this.handleSnack} snackMsg={this.handleSnackMsg}/>
                            <Signup dir={theme.direction} />
                        </SwipeableViews>
                    </Paper>
                </AppBar>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    open={snack}
                    autoHideDuration={6000}
                    onClose={this.handleCloseSnack}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{snackMsg}</span>}
                    action={[
                        <IconButton
                          key="close"
                          aria-label="Close"
                          color="inherit"
                          className={classes.close}
                          onClick={this.handleClose}
                        >
                          <CloseIcon />
                        </IconButton>,
                      ]}
                />
            </Grid>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Auth);
