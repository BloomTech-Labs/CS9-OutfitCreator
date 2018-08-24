import React from 'react';
import {   CardImg   } from 'reactstrap';
import axios from 'axios';

const TESTUSER = '5b745597a48cb52b0c1baedf';
const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://lambda-outfit-creator-api.herokuapp.com/' : 'http://localhost:5000';

class Imaging extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ''
        }
    }

    componentDidMount() {
        this.getImages();
    }

    getImages = () => {
        axios.get(`${ROOT_URL}/items/${TESTUSER}/${this.props.urlSrc}`)
            .then(response => {
                this.setState({ image: response.data });
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            this.state.image ? (
                    <CardImg
                        width="80%"
                        src={this.state.image.image}
                        alt="Card image cap"
                    />
            ) : (
                    <div>
                        Loading
                    </div>
                )
        );
    }
};

export default Imaging;
