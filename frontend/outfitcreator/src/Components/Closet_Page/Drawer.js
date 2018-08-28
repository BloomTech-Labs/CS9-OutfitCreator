import React from 'react';
import axios from 'axios';
import {ROOT_URL} from '../../config';

class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }
    componentDidMount() {
        this.getItems();
    }

    getItems = () => {
        const user = this.props.getUserID();
        const authToken = localStorage.getItem('authToken');
        const requestOptions = {headers: { Authorization: authToken }}
        if (authToken){
            axios.get(`${ROOT_URL.API}/items/${user}/${this.props.type}`, requestOptions)
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        items: res.data
                    });
                })
                .catch(err => console.log(err.message));
        }
    }
}

export default Drawer;