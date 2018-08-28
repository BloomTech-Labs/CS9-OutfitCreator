import React from 'react';
import axios from 'axios';
import {ROOT_URL} from '../../config';
import './closet.css';
import ClosetCard from './ClosetCard.js';

class Closet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedType: null,
            items: [],
        };
    }

    componentDidMount() {
        this.getItems();
    }

    onSelect(category) {
        this.setState({selectedType: category});
        this.getItems(category);
    }

    getItems(category) {
        const user = this.props.getUserID();
        const authToken = localStorage.getItem('authToken');
        const requestOptions = {headers: { Authorization: authToken }}
        axios.get(`${ROOT_URL.API}/items/type/${user}/${category}`, requestOptions)
            .then(res => {
                this.setState({
                    items: res.data
                });
            })
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div>
                <div className="closet-text">
                    <h1>My Closet</h1>
                    <p>Here, you can view all the items you've already uploaded. Click a category to get started:</p>
                </div>
                <div className="closet-menu">
                    <button className="closet-button" onClick={() => this.onSelect("top")}>Tops</button>
                    <button className="closet-button" onClick={() => this.onSelect("bottom")}>Bottoms</button>
                    <button className="closet-button" onClick={() => this.onSelect("shoes")}>Shoes</button>
                </div>
                <div className="closet-cards">
                    {this.state.items.map(item =><ClosetCard item={item} key={item._id}/>)}
                </div>
            </div>
        )
    }
}

export default Closet;