import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Landing.css';

import CR_Logo from '../../media/images/cr_logo.png';

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
					</div>
				</div>
				<div className="landing-info" />
			</div>
		);
	}
}

export default Landing;
