import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Landing.css';

import CR_Logo from '../../media/images/cr_logo.png';
import { Icons } from '../../media/icons';

class Landing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			signin: true,
			email: '',
			username: '',
			password: '',
			vpassword: ''
    };
	}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  handleInput = (event) => {
		this.setState({ [event.target.name]: event.target.value });
  };
  
  toggleSignin = () => {
    this.setState({ signin: !this.state.signin });
  }

	render() {
		return (
			<div className="landing-container">
				<div className="landing-main">
          <img 
            alt="closet roulette logo"
            className="landing-logo" 
            src={CR_Logo} 
          />
					<div className="landing-form">
						{this.state.signin ? (
							<TextField
                id="landing-email"
                label="Email"
                className="landing-email landing-input"
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
              />
						) : null}
            <TextField
              id="landing-username"
              label="Username"
              className="landing-username landing-input"
              value={this.state.username}
              onChange={this.handleChange('username')}
              margin="normal"
            />
             <TextField
              id="landing-password"
              label="Password"
              className="landing-password landing-input"
              value={this.state.password}
              onChange={this.handleChange('password')}
              margin="normal"
            />
						{this.state.signin ? (
							<TextField
                id="landing-vpassword"
                label="Verify Password"
                className="landing-vpassword landing-input"
                value={this.state.vpassword}
                onChange={this.handleChange('vpassword')}
                margin="normal"
              />
            ) : null}
            <Button variant="outlined" className="landing-button-main">
              {this.state.signin ? 'Signup' : 'Login'}
            </Button>
            <Button  className="landing-button-sub" onClick={this.toggleSignin}>
              {this.state.signin ? 'Login' : 'Signup'}?
            </Button>
            <div className="landing-oauth">
              <img className="landing-oauth-icon" src={Icons.google} />
              <img className="landing-oauth-icon" src={Icons.facebook} />
              <img className="landing-oauth-icon" src={Icons.github} />
            </div>
					</div>
				</div>
				<div className="landing-info" />
			</div>
		);
	}
}

export default Landing;
