import React from 'react';
import { Button } from 'reactstrap';
import './SignIn.css'

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <Button className='' onClick={this.toggle} >Sign In </Button>
                {this.state.modal ?
                    <div className='modal--backdrop' onClick={this.toggle}>
                    </div> : null}
                {this.state.modal ?
                    <div className='modal modal--test'>
                        <div className='container'>
                            <div className='modal--body' >
                                <p className='modal--welcome'>
                                    Hello! :)<br />
                                    Sign in here.
                                </p>
                                <div className='modal--input'>
                                    <label htmlFor='username'>Username</label>
                                    <br/>
                                    <input type='text' id='username' />
                                </div>
                                <div className='modal--input'>
                                    <label htmlFor='password'>Password</label>
                                    <br/>
                                    <input type='text' id='password' />
                                </div>
                            </div>
                            <div className='modal--footer'>
                                <Button color='success' >Submit</Button>
                                <Button color='danger' onClick={this.toggle}>Cancel</Button>
                            </div>
                        </div>
                    </div> : null}
            </div>
        )
    }
}

export default SignIn;