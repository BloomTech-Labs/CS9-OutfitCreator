import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import './Landing.css';

class Landing extends Component {
	render() {
		return (
			<div className="container--landingPage">
				<div>
					<div className="landingPage--app-title">Closet Roulette</div>
					<div className="landingPage--description">Find your next style without messing up your closet!</div>
					<div>
						<Link to="/login">
							<Button className="button">Let's go!</Button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Landing;
