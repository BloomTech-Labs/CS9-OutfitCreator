import React from 'react';
import axios from 'axios';
import { ROOT_URL } from '../../config'; 

const TESTUSER = '5b745597a48cb52b0c1baedf';


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
        axios.get(`${ROOT_URL.API}/items/${TESTUSER}/${this.props.urlSrc}`)
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
                    <img
                        width="80%"
                        src={this.state.image.image}
                        alt={this.state.image.name}
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
