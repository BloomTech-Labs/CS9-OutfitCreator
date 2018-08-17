import React, { Component } from 'react';
import { Card, CardText, CardImg, CardImgOverlay, CardDeck, Button, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            top: [],
            bottom: [],
            shoes: ''
        }
    }

    componentDidMount() {
        axios.all([ 
            // axios.get(`https://lambda-outfit-creator-api.herokuapp.com/items/top`),
            // axios.get(`https://lambda-outfit-creator-api.herokuapp.com/items/bottom`),
            // axios.get(`https://lambda-outfit-creator-api.herokuapp.com/items/shoes`),
            axios.get(`http://localhost:5000/${testUserId}/items/top`),
            axios.get(`http://localhost:5000/${testUserId}/items/bottom`),
            axios.get(`http://localhost:5000/${testUserId}/items/shoes`),
        ])
        .then(res => {
            const topTags = res[0].data[0].tags;
            const bottomTags = res[1].data[0].tags;
            const shoesTags = res[2].data[0].tags;
            const combinedTags = [...topTags, ...bottomTags, ...shoesTags];
            const tags = [...new Set(combinedTags)];
            this.setState({ top: [res[0].data[0]._id], bottom: [res[1].data[0]._id], shoes:res[2].data[0]._id, user: testUserId, tags: tags })
        })
    }

    handleButtonClick = () => {
        console.log('button clicked!')
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCreateOutfit = () => {
        const { user, name, worn, tags, top, bottom, shoes } = this.state;
        const outfit = { user, name, worn, tags, top, bottom, shoes};
        axios.post(`http://localhost:5000/outfit`, outfit)
        .then(savedOutfit => {
            console.log(savedOutfit);
            this.props.history.push("/Archive");
        })
        .catch(err => {
            console.log(err);
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