import './billing.css';
import React from 'react';
import axios from 'axios';
import { ROOT_URL } from '../../config';
require('dotenv').config();

class Cancel extends React.Component {
	constructor(props) {
		super(props);
		this.state = { canceled: false };
	}

	cancel = () => {
		const authToken = localStorage.getItem('authToken');
		const requestOptions = {
			headers: {
				Authorization: authToken
			}
		};
		axios
			.post(`${ROOT_URL.API}/pay/cancel`, { sub: this.props.subscription }, requestOptions)
			.then(this.setState({ canceled: true }))
			.then(axios.post(`${ROOT_URL.API}/user/unsubscribe/${this.props.userID}`, {}, requestOptions))
			.catch((err) => err);
	};
	render() {
		if (this.state.canceled) return <h1>Canceled Successfully!</h1>;
		return (
			<div>
				<h1>We're sorry to see you go!</h1>
				<button className="button" onClick={this.cancel}>
					Cancel My Subscription
				</button>
			</div>
		);
	}
}

export default Cancel;
