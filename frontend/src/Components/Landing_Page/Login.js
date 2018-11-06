import React from 'react';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import { FacebookLoginButton, GithubLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import classnames from 'classnames';
import queryString from 'query-string';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Landing.css';
import { ROOT_URL } from '../../config';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: '2',
			username: '',
			password: '',
			email: '',
			agreeToTerms: false
		};
	}

	notifySignUpSuccess = () => toast('Successfully signed up. Please check your email to validate your account');
	notifySignUpFailure = () => toast('Failed to sign up. Please try again!');
	notifySignInSuccess = () => toast('Successfully signed in.');
	notifySignInFailure = () => toast('Failed to sign in. Please try again!');
	notifySignInValidationFailure = () => toast('You must validate your account. Please check your email.');

	signUp = () => {
		const { username, password, email } = this.state;

		if (this.state.agreeToTerms){
		axios
			.post(`${ROOT_URL.API}/auth/signup`, { username, password, email })
			.then((res) => {
				localStorage.setItem('authToken', `Bearer ${res.data.token}`);
				this.notifySignUpSuccess();
				this.setState({ activeTab: '2' });
			})
			.catch((err) => {
				this.notifySignUpFailure();
			});
		} else {
			window.alert("Please indicate that you agree to the Terms and Conditions.")
		}
	};

	signIn = () => {
		const { email, password } = this.state;
		axios
			.post(`${ROOT_URL.API}/auth/login`, { email, password })
			.then((res) => {
				this.props.onSignin(res.data);
				// Redirect to upload page once logged in
				window.location = `${ROOT_URL.WEB}/upload`;
				this.notifySignInSuccess();
			})
			.catch((err) => {
				if (err.response.data.err) {
					if (err.response.data.err.message === 'Sorry, you must validate email first') {
						this.notifySignInValidationFailure();
					}
				} else {
					this.notifySignInFailure();
				}
				localStorage.removeItem('authToken');
			});
	};

	toggle = (tab) => {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	};

	handleInputChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	componentDidMount() {
		const hash = queryString.parse(this.props.location.hash);
		if (hash.err) {
			this.notifySignInFailure()
		}
	}
	
	handleCheckbox = () => {
		this.setState({agreeToTerms: !this.state.agreeToTerms});
	}

	render() {
		return (
			<div className="landingPage--login">
				<Button className="close" onClick={() => (window.location = `${ROOT_URL.WEB}/`)}>
					<span>&times;</span>
				</Button>
				<Nav pills className="landingPage--login-nav">
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '1' })}
							onClick={() => {
								this.toggle('1');
							}}
						>
							Sign Up
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '2' })}
							onClick={() => {
								this.toggle('2');
							}}
						>
							Sign In
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={this.state.activeTab}>
					<TabPane tabId="1">
						<Row>
							<Col sm="12">
								<form className="modal--input">
									<label htmlFor="username">Username</label>
									<br />
									<input
										type="text"
										name="username"
										placeholder="Username"
										className="input--login"
										value={this.state.username}
										onChange={this.handleInputChange}
									/>
									<br />
									<label htmlFor="username">Email</label>
									<br />
									<input
										type="text"
										name="email"
										placeholder="Email"
										className="input--login"
										value={this.state.email}
										onChange={this.handleInputChange}
									/>
									<br />
									<label htmlFor="password">Password</label>
									<br />
									<input
										type="password"
										name="password"
										placeholder="Password"
										className="input--login"
										value={this.state.password}
										onChange={this.handleInputChange}
									/>
									<br />
									<input
										type="checkbox"
										className="checkbox"
										checked={this.state.agreeToTerms}
										ref="agreeToTerms"
										onChange={this.handleCheckbox}
										/>
										<span className="input--login--terms">I agree that I will only upload images that I own.</span>
									<br />
									<Button className="button" onClick={this.signUp}>
										Sign Up
									</Button>
								</form>
								<div>
									<a href={`${ROOT_URL.API}/auth/google`}>
										<GoogleLoginButton />
									</a>
									<a href={`${ROOT_URL.API}/auth/facebook`}>
										<FacebookLoginButton />
									</a>
									<a href={`${ROOT_URL.API}/auth/github`}>
										<GithubLoginButton />
									</a>
								</div>
							</Col>
						</Row>
					</TabPane>
					<TabPane tabId="2">
						<Row>
							<Col sm="12">
								<form className="modal--input">
									<label htmlFor="email">Email:</label>
									<br />
									<input
										type="text"
										name="email"
										placeholder="Email"
										className="input--login"
										value={this.state.email}
										onChange={this.handleInputChange}
									/>
									<br />
									<label htmlFor="password">Password</label>
									<br />
									<input
										type="password"
										name="password"
										placeholder="Password"
										className="input--login"
										value={this.state.password}
										onChange={this.handleInputChange}
									/>
									<br />
									<Button className="button" onClick={this.signIn}>
										Sign In
									</Button>
								</form>
								<div>
									<a href={`${ROOT_URL.API}/auth/google`}>
										<GoogleLoginButton />
									</a>
								</div>
								<div>
									<a href={`${ROOT_URL.API}/auth/facebook`}>
										<FacebookLoginButton />
									</a>
								</div>
								<div>
									<a href={`${ROOT_URL.API}/auth/github`}>
										<GithubLoginButton />
									</a>
								</div>
							</Col>
						</Row>
					</TabPane>
				</TabContent>
				<ToastContainer />
			</div>
		);
	}
}

export default Login;
