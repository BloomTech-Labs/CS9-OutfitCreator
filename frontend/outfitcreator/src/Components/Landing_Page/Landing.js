import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, NavLink } from 'reactstrap';

import SignIn from './SignIn';
import SignUp from './SignUp';
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
                    <NavLink href='/login'>Login</NavLink>
                </div>

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
                
                <div className='landingPage--description'>
                    <h1>Outfit Maker</h1>
                    <div className='description--opening'>The easy way to:</div>
                    <ul className='description--list'>
                        <li className='list--item'>
                            - Keep track of your favorite styles
                        </li>
                        <li className='list--item'>
                            - Remember when an outfit was last worn
                        </li>
                        <li className='list--item'>
                            - See different combinations without messing up your closet
                        </li>
                    </ul>
                    <div className='description--closing'>AND we can even randomize your options to try and come up with new combinations!</div>
                </div>
                <div className='landingPage--button'>
                    <Link to='/Create'>
                        <Button color='success'>Check it out </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Landing;
