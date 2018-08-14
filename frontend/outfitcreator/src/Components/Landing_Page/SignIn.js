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
        return(
            <div>
                <Button className='' onClick={this.toggle} >Sign In </Button>
                // This one has no content, is just the dark background for the modal
                {this.state.modal ?
                    <div className='modal--backdrop' onClick={this.toggle}>
                    </div> : null}
                // Content of the modal goes in here
                {this.state.modal ?
                    <div className='modal modal--test'>
                        <div className='container'>
                            <div className='modal--body' >
                                Sign in :)
                            </div>
                            <div className='modal--footer'>
                                <Button>Submit</Button>
                                <Button onClick={this.toggle}>Cancel</Button>
                            </div>
                        </div>
                    </div> : null}
            </div>
        )
    }
}

export default SignIn;
