import React from 'react';
import { withStyles, Grid, Button, CircularProgress, Switch, Typography } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Redirect } from 'react-router-dom';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const styles = theme => ({
    padding: {
        padding: theme.spacing.unit
    }
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email   : '',
            password: '',
            isLoading: false,
            isLoggedIn: false,
            forgotPassword: false,
            user: undefined
        };
    }

    handleChange = (event) => {
        if (event.target.type === 'checkbox') {
            this.setState({ [event.target.name]: event.target.checked });    
        } else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({isLoading: true});
        if (this.state.forgotPassword) {
            firebase.auth().sendPasswordResetEmail(this.state.email)
                .then(() => {
                    this.setState({
                        isLoading: false,
                        forgotPassword: false
                    });
                    this.props.snack(true);
                    this.props.snackMsg('E-mail de recuperação de senha enviado com sucesso!');
                })
                .catch((error) => {
                    alert(`Error ${error.code}: ${error.message}`);
                    this.setState({isLoading: false});
                });
        } else {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((response) => {
                    this.setState({isLoggedIn: true, user: response.user});
                })
                .catch((error) => {
                    alert(`Error ${error.code}: ${error.message}`);
                    this.setState({isLoading: false});
                });
        }
    }

    render() {
        const { classes } = this.props;
        const { user, isLoggedIn, isLoading, forgotPassword } = this.state;

        if (isLoggedIn)
            return <Redirect to={{ pathname: "/home", user: user }} />

        return (
            <ValidatorForm
                ref="form"
                className={classes.margin}
                instantValidate={false}
                onSubmit={this.handleSubmit}
            >
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextValidator
                            name="email"
                            label="E-mail"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                            autoFocus
                            helperText=" "
                            validators={['required', 'isEmail']}
                            errorMessages={['Campo obrigatório.', 'E-mail inválido.']}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                    </Grid>
                    <Grid item md={true} sm={true} xs={true} style={{minHeight: 76}}>
                        {!forgotPassword && <TextValidator
                            name="password"
                            label="Senha"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                            helperText=" "
                            validators={['required']}
                            errorMessages={['Campo obrigatório.']}
                        />}
                    </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" justify="flex-end">
                    <Grid item>
                        <Typography>Esqueceu a senha?</Typography>
                    </Grid>
                    <Grid item>
                        <Switch
                            checked={forgotPassword}
                            name="forgotPassword"
                            onChange={this.handleChange}
                            value="forgotPassword"
                        />
                    </Grid>
                </Grid>
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                    <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        disabled={isLoading}
                        style={{ textTransform: "none" }}
                    >
                        {!forgotPassword && 'Entrar'}
                        {forgotPassword && 'Recuperar Senha'}
                        {isLoading && <CircularProgress size={14} style={{marginLeft: 10}} />}
                    </Button>
                </Grid>
            </ValidatorForm>
        );
    }
}

export default withStyles(styles)(Login);
