import React from 'react';
import axios from 'axios';
import { ROOT_URL } from '../../config'; 

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
        axios.get(`${ROOT_URL.API}/items/getitem/${this.props.urlSrc}`)
            .then(response => {
                this.setState({ image: response.data });
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            this.state.image ? (
                    <img
                        width="150px"
                        src={this.state.image.image.slice(0,53)+"w_150/"+this.state.image.image.slice(53)}
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
