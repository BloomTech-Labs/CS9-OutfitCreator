import React, { Component } from 'react';
import { Card, CardText, CardImg, CardImgOverlay, CardDeck, Button, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import './Create.css';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            name: '',
            worn: [],
            top: [],
            bottom: [],
            shoes: []
        }
    }

    componentDidMount() {
        axios.all([ 
            axios.get(`http://localhost:5000/items/top`),
            axios.get(`http://localhost:5000/items/bottom`),
            axios.get(`http://localhost:5000/items/shoes`),
        ])
        .then(res => {
            this.setState({ top: res[0].data, bottom: res[1].data, shoes: res[2].data })
        })
    }

    handleButtonClick = () => {
        console.log('button clicked!')
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCreateOutfit = () => {
        const outfit = {};
        axios.post('http://localhost:5000/outfit', outfit)
        .then(savedOutfit => {
            console.log(savedOutfit);
        })
    };

    render() {
        return (
            <div className="createContainer">
                <CardDeck>
                    <Card inverse>
                        <CardImg
                            width="80%"
                            src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97270&w=318&h=270&bg=333333&txtclr=666666"
                            alt="Card image cap"
                        />
                        <CardImgOverlay>
                            <Button className="close" aria-label="Close" onClick={this.handleButtonClick}>
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
                            src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97270&w=318&h=270&bg=333333&txtclr=666666"
                            alt="Card image cap"
                        />
                        <CardImgOverlay>
                            <Button className="close" aria-label="Close" onClick={this.handleButtonClick}>
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
                            src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97270&w=318&h=270&bg=333333&txtclr=666666"
                            alt="Card image cap"
                        />
                        <CardImgOverlay>
                            <Button className="close" aria-label="Close" onClick={this.handleButtonClick}>
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
                        <Button onClick={this.handleButtonClick}>Randomize</Button>
                        <FontAwesomeIcon icon="share-alt" size="4x" onClick={this.handleButtonClick}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default Create;