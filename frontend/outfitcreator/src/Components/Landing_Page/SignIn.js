import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import './Modal.css'

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            username: '',
            password: ''
        };
    }

    signIn = () => {
        const { username, password } = this.state;
        
        axios.post('http://localhost:5000/local-auth/login', { username, password })
            .then(res => {
              // Redirect to create page once logged in
              window.location = 'http://localhost:3000/Create';
            })
            .catch(err => {
              // Alert for invalid credentials
              alert('Invalid credentials. Please try again.');
            });
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleInputCHange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div>
                <Button className='trigger--modal' onClick={this.toggle} >Sign In </Button>
                {this.state.modal ?
                    <div className='modal--backdrop' onClick={this.toggle}>
                    </div> : null}
                {/* Content of the modal goes in here */}
                {this.state.modal ?
                    <div className='modal modal--test'>
                        <div className='container'>
                            <div className='modal--body' >
                                <p className='modal--welcome'>
                                    Hello! :)<br />
                                    Sign in here.
                                </p>
                                <form className='modal--input'>
                                    <label htmlFor='username'>Username</label>
                                    <br/>
                                    <input 
                                        type='username'
                                        id='username'
                                        name='username'
                                        placeholder='Username'
                                        className='input--username'
                                        value={this.state.username}
                                        onChange={this.handleInputCHange}
                                     />
                                    <br/>                                   
                                    <label htmlFor='password'>Password</label>
                                    <br/>
                                    <input 
                                        type='password'
                                        id='password'
                                        name='password'
                                        placeholder='Password'
                                        className='input--password'
                                        value={this.state.password}
                                        onChange={this.handleInputCHange}
                                    />
                                </form>
                            </div>
                            <div className='modal--footer'>
                                <Button  color='success' onClick={this.signIn}>Submit</Button>
                                <Button color='danger' onClick={this.toggle}>Cancel</Button>
                            </div>
                        </div>
                    </div> : null}
            </div>
        )
    }
}

export default SignIn;
