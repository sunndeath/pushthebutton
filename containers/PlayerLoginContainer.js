import React, { Component } from 'react';
import PlayerLoginScreen from '../components/PlayerLoginScreen.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions  from '../flux/actions.js';

const mapStateToProps = state => ({
    currentUserData: state.pushthebutton.currentUserData
});

const mapActionsToProps = (dispatch, props) => ({
    actions: bindActionCreators(actions, dispatch)
});

class PlayerLoginContainer extends Component {
    constructor(props){ 
        super(props);

        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onAuth = this.onAuth.bind(this);
        this.onMainScreen = this.onMainScreen.bind(this);

        this.state = { login: '', password: '' }
    } 

    componentDidUpdate(prevProps) {
        const nextProps = this.props;

        if (nextProps.currentUserData.authType === 'player') {
            nextProps.navigation.navigate('PlayerButton');
        }
    }

    _validateСredentials(login, password) {
        if (login.length > 0 && password.length > 0) {
            return true;
        }

        return false;
    }

    onChangeLogin(login) {
        this.setState({ login })
    }

    onChangePassword(password) {  
        this.setState({ password })
    }

    onAuth() {  
        const { login, password } = this.state;

        const isValidCredentials = this._validateСredentials(login, password);


        console.log('isValidCredentials', isValidCredentials);

        if (isValidCredentials) {
            this.props.actions.setAuthPlayer({ login, password, authType: 'player' });
        } 
    }

    onMainScreen(login) {
        this.props.navigation.navigate('Main');
        this.props.actions.setSignOut(this.state.login);
    }

  render() {
    const { login, password } = this.state;

    return (
      <PlayerLoginScreen
        onChangeLogin={this.onChangeLogin}
        onChangePassword={this.onChangePassword}
        onAuth={this.onAuth}
        onMainScreen={this.onMainScreen}
        login={login}
        password={password}
      />
    );
  }
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(PlayerLoginContainer);