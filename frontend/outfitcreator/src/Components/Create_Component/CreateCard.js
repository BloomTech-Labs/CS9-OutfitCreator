import React from 'react';
import { Card, CardText, CardImg, CardImgOverlay, CardDeck, Button, Input } from 'reactstrap';
import './Create.css';

class CreateCard extends React.Component {
    render() {
        const URL=this.props.item.image;
        const newURL = URL.slice(0,53)+"h_120/"+URL.slice(53);
        return (
            <div className="create-card">
                <Card inverse>
                        <CardImg
                            width="80%"
                            src={newURL}
                            alt="Card image cap"
                            className="cardImage"
                        />
                        <CardImgOverlay>
                            <Button className="close top" aria-label="Close" onClick={this.randomizeSingle}>
                                <span aria-hidden="true">&times;</span>
                            </Button>
                        </CardImgOverlay>
                    </Card>
            </div>
        )
    }
}

export default CreateCard;