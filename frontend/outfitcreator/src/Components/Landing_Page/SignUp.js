import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import { ROOT_URL } from '../../config';
import './Modal.css'

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            username: '',
            password: ''
        };
    }

    signUp = () => {
        const { username, password } = this.state;
        axios.post(`${ROOT_URL.API}/signup`, { username, password })
            .then(res => {
              // Redirect to create page once logged in
              window.location = `${ROOT_URL.WEB}/Create`;
            })
            .catch(err => {
              // Alert message for failed user creation
              alert('Failed to sign up. Username taken.')
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
                <Button className='trigger--modal' onClick={this.toggle} >Sign Up </Button>
                {this.state.modal ?
                    <div className='modal--backdrop' onClick={this.toggle}>
                    </div> : null}
                {this.state.modal ?
                    <div className='modal modal--test'>
                        <div className='container'>
                            <div className='modal--body' >
                                <p className='modal--welcome'>
                                    Welcome! :)<br />
                                    Sign up here.
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
                                <Button color='success' onClick={this.signUp}>Sign Up</Button>
                                <Button color='danger' onClick={this.toggle}>Cancel</Button>
                            </div>
                        </div>
                    </div> : null}
            </div>
        )
    }
}

export default SignUp;