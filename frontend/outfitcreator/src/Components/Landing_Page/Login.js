import React from 'react';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

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
            <div>
        <Nav tabs>
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
                <div>
                    <a href={`${ROOT_URL.API}/auth/google`}><Button color='success'>Sign Up with Google</Button></a>
                </div>
                <div>
                    <Button color='success'>Sign Up with Facebook</Button>
                </div>
                <div>
                    <Button color='success'>Sign Up with Github</Button>
                </div>
                <div>Or</div>
                <form className='modal--input'>
                    <label htmlFor='username'>Username</label>
                    <br/>
                    <input 
                        type='username'
                        name='username'
                        placeholder='Username'
                        className='input--username'
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        />
                    <br/>
                    <label htmlFor='username'>Email</label>
                    <br/>
                    <input 
                        type='email'
                        name='email'
                        placeholder='Email'
                        className='input--email'
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        />
                    <br/>                                    
                    <label htmlFor='password'>Password</label>
                    <br/>
                    <input 
                        type='password'
                        name='password'
                        placeholder='Password'
                        className='input--password'
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    <Button color='success' onClick={this.signUp}>Sign Up</Button>
                </form>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
              <div>
                    <a href={`${ROOT_URL.API}/auth/google`}><Button color='success'>Sign in with Google</Button></a>
                </div>
                <div>
                    <Button color='success'>Sign in with Facebook</Button>
                </div>
                <div>
                    <Button color='success'>Sign Up with Github</Button>
                </div>
                <div>Or</div>
                <form className='modal--input'>
                    <label htmlFor='username'>Username</label>
                    <br/>
                    <input 
                        type='username'
                        name='username'
                        placeholder='Username'
                        className='input--username'
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        />
                    <br/>                                
                    <label htmlFor='password'>Password</label>
                    <br/>
                    <input 
                        type='password'
                        name='password'
                        placeholder='Password'
                        className='input--password'
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    <Button color='success' onClick={this.signIn}>Sign In</Button>
                </form>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
        )
    }
}

export default Login;