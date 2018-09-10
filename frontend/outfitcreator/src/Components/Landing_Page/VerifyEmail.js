import React, { Component } from 'react';
import axios from 'axios';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ROOT_URL } from '../../config';

class VerifyEmail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			validated: false,
			email: ''
		};
	}

	notifyVerificationSuccess = () => toast('Successfully validated email. You can now login');
	notifyEmailResendSuccess = () => toast('Successfully resent verification. Please check your email');
	notifyEmailResendFailure = () => toast('Failure resending verification. Please try again.');
	notifyVerificationFailure = () => toast('Failed to validate email. Please try again!');
	notifyVerificationTokenExpired = () => toast('Token is expired. Please request a new one.');

	componentDidMount() {
		const key = this.props.match.params.key;
		axios
			.post(`${ROOT_URL.API}/auth/verify`, { key })
			.then(() => {
				this.notifyVerificationSuccess();
				this.setState({ validated: true, isLoading: false });
			})
			.catch((err) => {
				if (err.response) {
					if (err.response.data.code === 'EXPTOKEN') {
						this.notifyVerificationTokenExpired();
					}
				} else {
					this.notifyVerificationFailure();
				}
				this.setState({ validated: false, isLoading: false });
			});
	}

	handleInputChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	resendEmail = () => {
		const { email } = this.state;
		axios
			.post(`${ROOT_URL.API}/auth/sendverifyemail`, { email })
			.then(() => {
				this.notifyEmailResendSuccess();
			})
			.catch((err) => {
				this.notifyEmailResendFailure();
			});
	};

	render() {
		return (
			<div className="landingPage--login">
				<Button className="close" onClick={() => (window.location = `${ROOT_URL.WEB}/`)}>
					<span>&times;</span>
				</Button>
				{this.state.isLoading ? (
					<Row>
						<Col sm="12">
							<Card body>
								<CardText>Validating credentials...</CardText>
							</Card>
						</Col>
						<ToastContainer />
					</Row>
				) : this.state.validated ? (
					<Row>
						<Col sm="12">
							<Card body>
								<CardText>
									Validation successful. Click <a href={`${ROOT_URL.WEB}/login/`}>here</a> to login
								</CardText>
							</Card>
						</Col>
						<ToastContainer />
					</Row>
				) : (
					<Row>
						<Col sm="12">
							<Card body>
								<CardText>Validation failed. Please try again</CardText>
								<CardText>Or</CardText>
								<form>
									<label htmlFor="email">Email:</label>
									<input
										type="text"
										name="email"
										placeholder="Email"
										className="input--login"
										value={this.state.email}
										onChange={this.handleInputChange}
									/>
									<Button className="button" onClick={this.resendEmail}>
										Click to resend email verification
									</Button>
								</form>
							</Card>
						</Col>
						<ToastContainer />
					</Row>
				)}
			</div>
		);
	}
}

export default VerifyEmail;
