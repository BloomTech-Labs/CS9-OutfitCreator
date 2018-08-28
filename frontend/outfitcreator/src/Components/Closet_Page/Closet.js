import React from 'react';
import axios from 'axios';
import {ROOT_URL} from '../../config';
import Drawer from './Drawer.js';

class Closet extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedType: null
        };
    }
    componentDidMount() {
        this.getItems();
    }

    render() {
        return (
            <Drawer type={this.state.selectedType}/>
        )
    }
}

export default Closet;