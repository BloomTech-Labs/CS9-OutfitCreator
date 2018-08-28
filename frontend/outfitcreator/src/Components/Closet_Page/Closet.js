import React from 'react';
import axios from 'axios';
import {ROOT_URL} from '../../config';

class MyCloset extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedType=null,
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