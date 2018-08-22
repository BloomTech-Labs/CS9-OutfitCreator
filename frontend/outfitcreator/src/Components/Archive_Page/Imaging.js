import React from 'react';
import axios from 'axios';

const testUser = '5b772cde26426245c86f0eea';

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
        axios.get(`http://localhost:5001/items/${testUser}/${this.props.urlSrc}`)
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
                <div>
                    <img src={this.state.image.image} alt={this.state.image.name} />
                </div>
            ) : (
                    <div>
                        Loading
                    </div>
                )
        );
    }
};

export default Imaging;