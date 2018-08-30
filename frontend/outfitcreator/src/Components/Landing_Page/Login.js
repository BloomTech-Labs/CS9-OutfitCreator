import React from 'react';
import axios from 'axios';
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    // Card, 
    Button,
    // CardTitle, 
    // CardText, 
    Row,
    Col
} from 'reactstrap';
import { FacebookLoginButton, GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import classnames from 'classnames';
import './Landing.css'

import { ROOT_URL } from '../../config';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '2',
            username: '',
            password: '',
            email: ''
        };
    }

    signUp = () => {
        const { username, password, email } = this.state;

        axios.post(`${ROOT_URL.API}/auth/signup`, { username, password, email })
            .then(res => {
                localStorage.setItem('authToken', `Bearer ${res.data.token}`);
                // Redirect to create page once logged in
                window.location = `${ROOT_URL.WEB}/Create`;
            })
            .catch(err => {
                alert('Failed to sign up. Please try again.');
                console.log(err);
            });
    }

    signIn = () => {
        const { username, password } = this.state;
        axios.post(`${ROOT_URL.API}/auth/login`, { username, password })
            .then(res => {
                // this.props.onSignin(res.data);
                localStorage.setItem('authToken', `Bearer ${res.data.token}`);
                // Redirect to create page once logged in
                window.location = `${ROOT_URL.WEB}/Create`;
            })
            .catch(err => {
                // Alert for invalid credentials
                alert('Invalid Credentials');
                localStorage.removeItem('token');
            });
    }

    // signUpGoogle = () => {
    //     axios.get(`${ROOT_URL.API}/local-auth/google`)
    //     .then(res => {
    //         console.log(res);
    //     })
    // }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div className="landingPage--login">
                <Nav pills className="landingPage--login-nav">
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Sign Up
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Sign In
            </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <form className='modal--input'>
                                    <label htmlFor='username'>Username</label>
                                    <br />
                                    <input
                                        type="text"
                                        name='username'
                                        placeholder='Username'
                                        className='input--login'
                                        value={this.state.username}
                                        onChange={this.handleInputChange}
                                    />
                                    <br />
                                    <label htmlFor='username'>Email</label>
                                    <br />
                                    <input
                                        type="text"
                                        name='email'
                                        placeholder='Email'
                                        className='input--login'
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                    />
                                    <br />
                                    <label htmlFor='password'>Password</label>
                                    <br />
                                    <input
                                        type='password'
                                        name='password'
                                        placeholder='Password'
                                        className='input--login'
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                    /><br />
                                    <Button className="button" onClick={this.signUp}>Sign Up</Button>
                                </form>
                                <div className="login--social-buttons">
                                    <a href={`${ROOT_URL.API}/auth/google`}><GoogleLoginButton /></a>
                                    <FacebookLoginButton />
                                    <GithubLoginButton />
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <form className='modal--input'>
                                    <label htmlFor='username'>Username</label>
                                    <br />
                                    <input
                                        type="text"
                                        name='username'
                                        placeholder='Username'
                                        className='input--login'
                                        value={this.state.username}
                                        onChange={this.handleInputChange}
                                    />
                                    <br />
                                    <label htmlFor='password'>Password</label>
                                    <br />
                                    <input
                                        type='password'
                                        name='password'
                                        placeholder='Password'
                                        className='input--login'
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                    /><br />
                                    <Button className="button" onClick={this.signIn}>Sign In</Button>
                                </form>
                                <div className="login--social-buttons">
                                    <a href={`${ROOT_URL.API}/auth/google.png`}><GoogleLoginButton /></a>
                                    <FacebookLoginButton />
                                    <GithubLoginButton />
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        )
    }
}

export default Login;