import './billing.css';
import React from 'react';
import axios from 'axios';
require('dotenv').config();


class Cancel extends React.Component {
    constructor(props){
        super(props);
        this.state = {canceled: false}
    }

    cancel = () => {
        axios
            .post(`${process.env.SERVER || 'http://localhost:5000'}/pay/cancel`, this.props.subscription)
            .then(this.setState({canceled: true}))
            .catch(err => console.log(err))
    }
    render() {
        if (this.state.canceled) return (<h1>Canceled Successfully!</h1>)
        return (
            <div>
                <button className="button" onClick={this.cancel}>Cancel My Subscription</button>
            </div>
        );
    }
}

export default Cancel;