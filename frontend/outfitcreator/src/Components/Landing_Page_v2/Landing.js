import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';

import Modal from '../Modal/Modal';
import { ROOT_URL } from '../../config';
import CR_Title from '../../media/images/cr_title.png';
import { Icons } from '../../media/icons';

class Landing extends Component {
	constructor(props) {
		super(props);

		this.modal = props.modal.bind(this);

		this.state = {
			email: '',
			username: '',
			password: '',
			vpassword: '',
			match: true,
			agree: false,
			signin: true
		};
	}

	componentDidMount() {
		if (this.props.location.pathname.includes('verify')) {
			const key = this.props.match.params.key;
			axios
				.post(`${ROOT_URL.API}/auth/verify`, { key })
				.then(() => {
					this.modal(<p>Successfully validated email. You can now login</p>);
					this.setState({ validated: true });
				})
				.catch((err) => {
					if (err.response) {
						if (err.response.data.code === 'EXPTOKEN') {
							this.modal(<p>Token is expired. Please request a new one.</p>);
						}
					} else {
						this.modal(<p>Failed to validate email. Please try again!</p>, () => {
							this.modal(
								// Create a small input form to grab email from user
								<React.Fragment>
									<p>Please input your email address to resend the verification email.</p>
									<TextField
										className="landing-input"
										label="Email"
										margin="normal"
										onChange={this.handleChange('email')}
										type="text"
									/>
								</React.Fragment>,
								this.resendEmail
							);
						});
					}
					this.setState({ validated: false });
				});
		}
	}

	resendEmail = () => {
		const { email } = this.state;
		axios
			.post(`${ROOT_URL.API}/auth/sendverifyemail`, { email })
			.then(() => {
				this.modal(<p>Successfully resent verification. Please check your email</p>);
			})
			.catch((err) => {
				this.modal(<p>Failure resending verification. Please try again.</p>);
			});
	};

	handleChange = (name) => (event) => {
		// Calibrate for input field and check box variation
		const prop = name === 'agree' ? 'checked' : 'value';
		this.setState({ [name]: event.target[prop] }, () => {
			// Wait until first state is resolved to ensure accurate match represantation
			this.setState({
				match: this.state.password === this.state.vpassword
			});
		});
	};

	toggleSignin = () => {
		this.setState({ signin: !this.state.signin });
	};

	signIn = () => {
		const { email, password } = this.state;
		axios
			.post(`${ROOT_URL.API}/auth/login`, { email, password })
			.then((res) => {
				this.signInSuccess(res.data);
				window.location = `${ROOT_URL.WEB}/upload`;
			})
			.catch((err) => {
				if (err.response.data.err) {
					if (err.response.data.err.message === 'Sorry, you must validate email first') {
						this.modal(<p>You must validate your account. Please check your email.</p>);
					}
				} else {
					this.modal(<p>Failed to sign in. Please try again!</p>);
				}
				localStorage.removeItem('authToken');
			});
	};

	signUp = () => {
		// Checks for errors from top to bottom
		if (this.state.password.length === 0) {
			this.modal(<p>You must input a valid password.</p>);
			return;
		} else if (!this.state.match) {
			this.modal(<p>Passwords do not match. Please try again.</p>);
			return;
		} else if (!this.state.agree) {
			this.modal(<p>Please indicate that you agree to the Terms and Conditions.</p>);
			return;
		}

		const { username, password, email } = this.state;
		axios
			.post(`${ROOT_URL.API}/auth/signup`, { username, password, email })
			.then((res) => {
				localStorage.setItem('authToken', `Bearer ${res.data.token}`);
				this.modal(<p>Successfully signed up. Please check your email to validate your account</p>);
			})
			.catch((err) => {
				this.modal(<p>Failed to sign up. Please try again!</p>);
			});

		this.setState({ username: '', email: '', password: '', vpassword: '', agree: false });
	};

	signInSuccess = (data) => {
		localStorage.setItem('authToken', `Bearer ${data.token}`);
	};

	render() {
		return (
			<div className="landing-container">
				<div className="landing-main">
					<img alt="closet roulette title" className="landing-title" src={CR_Title} />
					<div className="landing-form">
						{/* Only show email when not signing in */}
						{this.state.signin ? null : (
							<TextField
								className="landing-input"
								label="Username"
								margin="normal"
								onChange={this.handleChange('username')}
								type="text"
								value={this.state.username}
							/>
						)}
						<TextField
							className="landing-input"
							label="Email"
							margin="normal"
							onChange={this.handleChange('email')}
							type="text"
							value={this.state.email}
						/>
						<TextField
							className="landing-input"
							label="Password"
							margin="normal"
							onChange={this.handleChange('password')}
							type="password"
							value={this.state.password}
						/>
						{/* Only show verify password field and checkbox when not signing in */}
						{this.state.signin ? null : (
							<React.Fragment>
								<TextField
									error={!this.state.match}
									className="landing-input"
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
						)}
						{/* Modify button content and action based on sign in status */}
						<Button
							className="mui-button landing-button-main"
							variant="outlined"
							onClick={this.state.signin ? this.signIn : this.signUp}
						>
							{this.state.signin ? 'Login' : 'Signup'}
						</Button>
						<Button className="mui-button landing-button-sub" onClick={this.toggleSignin}>
							{this.state.signin ? 'Signup' : 'Login'}
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
				{this.state.modal ? <Modal content={this.state.content} action={this.state.action} /> : null}
			</div>
		);
	}
}

export default Landing;
