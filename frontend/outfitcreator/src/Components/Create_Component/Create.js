import React, { Component } from 'react';
import { Card, CardText, CardImg, CardImgOverlay, CardDeck, Button, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ROOT_URL } from '../../config'; 
import axios from 'axios';

import './Create.css';

const testUserId = '5b761531cdcd6d00043d420e';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            name: '',
            worn: [],
            tags: [],
            allTops: [],
            allBottoms: [],
            allShoes: [],
            selectedTop: [],
            selectedBottom: [],
            selectedShoe: []
        }
    }

    componentDidMount() {
        const authToken = localStorage.getItem('authToken');
        const requestOptions = {
            headers: {
                Authorization: authToken
            }
        }
        if(authToken) {
            axios.all([ 
                axios.get(`${ROOT_URL.API}/items/type/${testUserId}/top`, requestOptions),
                axios.get(`${ROOT_URL.API}/items/type/${testUserId}/bottom`, requestOptions),
                axios.get(`${ROOT_URL.API}/items/type/${testUserId}/shoes`, requestOptions),
            ])
            .then(res => {
                this.setState({ allTops: res[0].data, allBottoms: res[1].data, allShoes: res[2].data, user: testUserId });
                this.randomize();
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/');
            })
        } else {
            this.props.history.push('/');
        }
    }

    // method to retrieve random items of all types
    randomize = () => {
        const { allTops, allBottoms, allShoes } = this.state;
        const selectedTop = allTops[Math.floor(Math.random() * allTops.length)];
        const selectedBottom = allBottoms[Math.floor(Math.random() * allBottoms.length)];
        const selectedShoe = allShoes[Math.floor(Math.random() * allShoes.length)];
        const tags = [...new Set([...selectedTop.tags, ...selectedBottom.tags, ...selectedShoe.tags])]
        this.setState({ selectedTop, selectedBottom, selectedShoe, tags });
    }

    // method to retrieve a single random item
    randomizeSingle = (event) => {
        const { allTops, allBottoms, allShoes, selectedTop, selectedBottom, selectedShoe } = this.state;
        
        if(event.target.parentNode.classList.contains('top')) {
            const selectedTop = allTops[Math.floor(Math.random() * allTops.length)];
            const tags = [...new Set([...selectedTop.tags, ...selectedBottom.tags, ...selectedShoe.tags])]
            this.setState({ selectedTop, tags })
        } else if(event.target.parentNode.classList.contains('bottom')) {
            const selectedBottom = allBottoms[Math.floor(Math.random() * allBottoms.length)];
            const tags = [...new Set([...selectedTop.tags, ...selectedBottom.tags, ...selectedShoe.tags])]
            this.setState({ selectedBottom, tags })
        } else if(event.target.parentNode.classList.contains('shoe')) {
            const selectedShoe = allShoes[Math.floor(Math.random() * allShoes.length)];
            const tags = [...new Set([...selectedTop.tags, ...selectedBottom.tags, ...selectedShoe.tags])]
            this.setState({ selectedShoe, tags })
        }
    }

    handleButtonClick = () => {
        console.log('button clicked!')
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // method handle creating an outfit
    handleCreateOutfit = () => {
        const { user, name, worn, tags, selectedTop, selectedBottom, selectedShoe } = this.state;
        const top = [selectedTop._id];
        const bottom = [selectedBottom._id];
        const shoes = selectedShoe._id;
        const outfit = { user, name, worn, tags, top, bottom, shoes};
        axios
            .post(`${ROOT_URL.API}/outfits`, outfit)
            .then(savedOutfit => {
                console.log(savedOutfit);
                this.props.history.push('/Archive');
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        const { selectedTop, selectedBottom, selectedShoe } = this.state;
        return (
            <div className="createContainer">
                <CardDeck>
                    <Card inverse>
                        <CardImg
                            width="80%"
                            src={selectedTop.image}
                            alt="Card image cap"
                        />
                        <CardImgOverlay>
                            <Button className="close top" aria-label="Close" onClick={this.randomizeSingle}>
                                <span aria-hidden="true">&times;</span>
                            </Button>
                            <CardText className="cardText">
                                Top
                            </CardText>
                        </CardImgOverlay>
                    </Card>
                    <Card inverse>
                        <CardImg
                            width="80%"
                            src={selectedBottom.image}
                            alt="Card image cap"
                        />
                        <CardImgOverlay>
                            <Button className="close bottom" aria-label="Close" onClick={this.randomizeSingle}>
                                <span aria-hidden="true">&times;</span>
                            </Button>
                            <CardText className="cardText">
                                Bottom
                            </CardText>
                        </CardImgOverlay>
                    </Card>
                    <Card inverse>
                        <CardImg
                            width="80%"
                            src={selectedShoe.image}
                            alt="Card image cap"
                        />
                        <CardImgOverlay>
                            <Button className="close shoe" aria-label="Close" onClick={this.randomizeSingle}>
                                <span aria-hidden="true">&times;</span>
                            </Button>
                            <CardText className="cardText">
                                Shoes
                            </CardText>
                        </CardImgOverlay>
                    </Card>
                </CardDeck>
                <div className="outfitPickerContainer">
                    <Input type="text" name="name" placeholder="Outfit Nickname" onChange={this.handleInputChange} value={this.state.name} className="outfitInput" />
                    <div className="outfitPickerDecision">
                        <Button onClick={this.handleCreateOutfit}>Yes!</Button>
                        <Button onClick={this.randomize}>Randomize</Button>
                        <FontAwesomeIcon icon="share-alt" size="4x" onClick={this.handleButtonClick}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default Create;