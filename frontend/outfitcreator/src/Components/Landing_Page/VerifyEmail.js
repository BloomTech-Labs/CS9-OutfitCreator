import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ROOT_URL } from '../../config';

class VerifyEmail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			validated: ''
		};
	}

	notifyVerificationSuccess = () => toast('Successfully validated email. You can now login');
	notifyVerificationFailure = () => toast('Failed to validate email. Please try again!');
	componentDidMount() {
		const key = this.props.match.params.key;
		axios
			.post(`${ROOT_URL.API}/auth/verify`, { key })
			.then((res) => {
				console.log(res);
				this.notifyVerificationSuccess();
				this.setState({ validated: 'true' });
				// window.location = `${ROOT_URL.WEB}/login`;
			})
			.catch((err) => {
				this.notifyVerificationFailure();
				this.setState({ validated: 'false' });
				// window.location = `${ROOT_URL.WEB}/`;
			});
	}
	render() {
		if (this.state.validated === 'true') {
			return (
				<div>
					Validation successful. Click <a href={`${ROOT_URL.WEB}/login/`}>here</a> to login
				</div>
			);
		} else if (this.state.validated === '') {
			return <div>Validating credentials...</div>;
		} else if (this.state.validated === 'false') {
			return <div>Validation failed. Please try again.</div>;
		}
	}
}

export default VerifyEmail;
