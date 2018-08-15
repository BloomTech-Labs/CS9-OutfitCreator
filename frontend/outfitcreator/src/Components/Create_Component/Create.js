import React, { Component } from 'react';
import { Card, CardText, CardImg, CardImgOverlay, CardDeck, Button, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Create.css';

class Create extends Component {
    constructor(props) {
        super(props);
    }

    handleButtonClick = e => {
        console.log('button clicked!')
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
                            <span aria-hidden="true" className="pull-right clickable close-icon" date-effect="fadeOut" onClick={ this.handleButtonClick}>&times;</span>
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
                            <Button className="close" aria-label="Close">
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
                            <Button className="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </Button>
                            <CardText className="cardText">
                                Shoes
                            </CardText>
                        </CardImgOverlay>
                    </Card>
                </CardDeck>
                <div className="outfitPickerContainer">
                    <Input type="text" name="outfitNickname" placeholder="Outfit Nickname" className="outfitInput" />
                    <div className="outfitPickerDecision">
                        <Button onClick={this.handleButtonClick}>Yes!</Button>
                        <Button onClick={this.handleButtonClick}>Randomize</Button>
                        <FontAwesomeIcon icon="share-alt" size="4x" onClick={this.handleButtonClick}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default Create;