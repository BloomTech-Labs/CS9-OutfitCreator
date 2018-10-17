import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import { ROOT_URL } from '../../config';
import './Landing.css';

import CR_Logo from '../../media/images/cr_logo.png';
import { Icons } from '../../media/icons';

class Landing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			username: '',
			password: '',
			vpassword: '',
			agree: false,
      signin: true,
      notify: false,
      message: 'No message present...',
		};
	}

	handleChange = (name) => (event) => {
		const prop = name === 'agree' ? 'checked' : 'value';
		this.setState({
			[name]: event.target[prop]
		});
	};

	handleInput = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	toggleSignin = () => {
		this.setState({ signin: !this.state.signin });
  };
  
  notify = (message) => {
    const state = { ...this.state }

    if (!message) {
      state.notify = false;
      state.message = '';
    } else {
      state.notify = true;
      state.message = message;
    }

    this.setState(state);
  }

	signIn = () => {
    const { email, password } = this.state;

		axios
			.post(`${ROOT_URL.API}/auth/login`, { email, password })
			.then((res) => {
				this.props.onSignin(res.data);
				window.location = `${ROOT_URL.WEB}/upload`;
				this.notify('Successfully signed in.');
			})
			.catch((err) => {
				if (err.response.data.err) {
					if (err.response.data.err.message === 'Sorry, you must validate email first') {
						this.notify('You must validate your account. Please check your email.');
					}
				} else {
					this.notify('Failed to sign in. Please try again!');
				}
				localStorage.removeItem('authToken');
			});
	};

	signUp = () => {
		const { username, password, email } = this.state;

		if (this.state.password === this.state.vpassword) {
			return;
		}

		if (this.state.agree) {
			return;
		}

		if (this.state.agree && this.state.password === this.state.vpassword) {
			axios
				.post(`${ROOT_URL.API}/auth/signup`, { username, password, email })
				.then((res) => {
					localStorage.setItem('authToken', `Bearer ${res.data.token}`);
					this.notify('Successfully signed up. Please check your email to validate your account');
				})
				.catch((err) => {
					this.notify('Failed to sign up. Please try again!');
				});
		} else {
			this.notify('Please indicate that you agree to the Terms and Conditions.');
		}
	};

	render() {
		return (
			<div className="landing-container">
				<div className="landing-main">
					<img alt="closet roulette logo" className="landing-logo" src={CR_Logo} />
					<div className="landing-form">
						{this.state.signin ? (
							<TextField
								className="landing-email landing-input"
								label="Email"
								margin="normal"
								onChange={this.handleChange('email')}
								value={this.state.email}
							/>
						) : null}
						<TextField
							className="landing-username landing-input"
							label="Username"
							margin="normal"
							onChange={this.handleChange('username')}
							value={this.state.username}
						/>
						<TextField
							className="landing-password landing-input"
							label="Password"
							margin="normal"
							onChange={this.handleChange('password')}
							type="password"
							value={this.state.password}
						/>
						{this.state.signin ? (
							<React.Fragment>
								<TextField
									className="landing-vpassword landing-input"
									label="Verify Password"
									margin="normal"
									onChange={this.handleChange('vpassword')}
									type="password"
									value={this.state.vpassword}
								/>
								<div className="landing-agree">
									<Checkbox
										checked={this.state.agree}
										className="landing-agree-check"
										color="default"
										onChange={this.handleChange('agree')}
										value="agree"
									/>
									<span className="landing-agree-text">
										I agree that I will only upload images that I own.
									</span>
								</div>
							</React.Fragment>
						) : null}
						<Button
							className="landing-button-main"
							variant="outlined"
							onClick={this.signin ? this.signIn : this.signUp}
						>
							{this.state.signin ? 'Signup' : 'Login'}
						</Button>
						<Button className="landing-button-sub" onClick={this.toggleSignin}>
							{this.state.signin ? 'Login' : 'Signup'}?
						</Button>
						<div className="landing-oauth">
							<a href={`${ROOT_URL.API}/auth/google`}>
								<img alt="google icon" className="landing-oauth-icon" src={Icons.google} />
							</a>
							<a href={`${ROOT_URL.API}/auth/facebook`}>
								<img alt="facebook icon" className="landing-oauth-icon" src={Icons.facebook} />
							</a>
							<a href={`${ROOT_URL.API}/auth/github`}>
								<img alt="github icon" className="landing-oauth-icon" src={Icons.github} />
							</a>
						</div>
					</div>
				</div>
				<div className="landing-info" />
        {this.state.notify ?
          <div className="landing-background_tinted">
            <div className="landing-modal">
              <p>{this.state.message}</p>
              <Button className="landing-button-main" variant="outlined" onClick={() => this.notify()}>Got it!</Button>
            </div>
          </div>
        : null}
			</div>
		);
	}
}

export default Landing;
