import React, { Component } from 'react';
import {
    Link,
    // Route
} from 'react-router-dom';
import {
    Button,
    // NavLink
} from 'reactstrap';

import Login from './Login';
import './Landing.css';

class Landing extends Component {
    onExiting = () => {
        this.animating = true;
    }

    onExited = () => {
        this.animating = false;
    }

    render() {
        return (
            <div className="container--landingPage">
                <div className='landingPage--modals'>
                    {/* <SignUp /> */}
                    {/* <Route exact path='/signin' render={props => <SignIn {...props} onSignin={this.props.onSignin} />} /> */}
                    {/* <SignIn onSignin={this.props.onSignin} /> */}
                    <Link to='/login'>
                        <Button className='landing--button'>Login</Button>
                    </Link>                </div>

                {/* <div className='landingPage--animations'>
                    <div className='animation--top'>
                    <img src='https://res.cloudinary.com/cloudtesting/image/upload/w_300,h_400/v1534808124/icons8-t-shirt-480.png' alt='top' className='animation--top' />
                    </div>
                    <div className='animation--pants'>
                    <img src='https://res.cloudinary.com/cloudtesting/image/upload/w_200,h_300/v1534808124/icons8-shorts-480.png' alt='pants' />
                    </div>
                    <div className='animation--shoes--first'>
                    <img src='https://res.cloudinary.com/cloudtesting/image/upload/w_200,h_200/v1534808126/icons8-work-boot-500.png' alt='shoes' />
                    </div>
                    <div className='animation--shoes--second'>
                    <img src='' alt='shoes' />
                    </div>
                    <div className='animation--shoes'>
                    <img src='' alt='shoes' />
                    </div>
                </div> */}

                <div>
                    <div className="landingPage--app-title">Closet Roulette</div>
                    <div className="landingPage--description">Find your next style without messing up your closet!</div>
                </div>
                <div>
                    <Link to='/login'>
                        <Button className='landing--button'>Let's go! >></Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Landing;
