import React from 'react';
import { withStyles, Grid, Button, CircularProgress } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Redirect } from 'react-router-dom';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const styles = theme => ({
    padding: {
        padding: theme.spacing.unit
    }
});

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name   : '',
            email   : '',
            password: '',
            passwordConfirm: '',
            isLoading: false,
            isLoggedIn: false,
            user: undefined
        };
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({isLoading: true});
        firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((response) => {
                response.user.updateProfile({
                    displayName: this.state.name
                }).then(() => {
                    const user = firebase.auth().currentUser;
                    this.setState({isLoggedIn: true, user: user});
                }).catch((error) => {
                    alert(`Error ${error.code}: ${error.message}`);
                    this.setState({isLoading: false});
                });
            })
            .catch((error) => {
                alert(`Error ${error.code}: ${error.message}`);
                this.setState({isLoading: false});
            });
    }

    render() {
        const { classes } = this.props;
        const { name, email, password, passwordConfirm, isLoading, isLoggedIn, user } = this.state;

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
                            name="name"
                            label="Nome Completo"
                            type="text"
                            value={name}
                            onChange={this.handleChange}
                            fullWidth
                            helperText=" "
                            validators={['required']}
                            errorMessages={['Campo obrigatório.']}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextValidator
                            name="email"
                            label="E-mail"
                            type="email"
                            value={email}
                            onChange={this.handleChange}
                            fullWidth
                            helperText=" "
                            validators={['required', 'isEmail']}
                            errorMessages={['Campo obrigatório.', 'E-mail inválido.']}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextValidator
                            name="password"
                            label="Senha"
                            type="password"
                            value={password}
                            onChange={this.handleChange}
                            fullWidth
                            helperText=" "
                            validators={['required']}
                            errorMessages={['Campo obrigatório.']}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextValidator
                            name="passwordConfirm"
                            label="Confirmar Senha"
                            type="password"
                            value={passwordConfirm}
                            onChange={this.handleChange}
                            fullWidth
                            helperText=" "
                            validators={['required', 'isPasswordMatch']}
                            errorMessages={['Campo obrigatório.', 'As senhas não se correspondem.']}
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
                        Cadastrar
                        {isLoading && <CircularProgress size={14} style={{marginLeft: 10}} />}
                    </Button>
                </Grid>
            </ValidatorForm>
        );
    }
}

export default withStyles(styles)(Signup);
