import React, { Component } from 'react';
import './Landing.css';

import CR_Logo from '../../media/images/cr_logo.png';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      signin: false
    }
  }
	render() {
		return (
			<div className="container-landingPage">
        <img className="landing-logo" src={CR_Logo} />
        { this.state.signin ? 
          <div className="sign-in">

          </div> : null }
				<div className="landing-login">
          
				</div>
			</div>
		);
	}
}

export default Landing;
