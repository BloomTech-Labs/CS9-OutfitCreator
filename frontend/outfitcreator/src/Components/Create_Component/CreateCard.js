import React from 'react';
import { Card, CardText, CardImg, CardImgOverlay, CardDeck, Button, Input } from 'reactstrap';
import './Create.css';

class CreateCard extends React.Component {
    render() {
        console.log(this.props);
        const URL= this.props.item.current ? this.props.item.current.image : null;
        const newURL = URL ? URL.slice(0,53)+"h_120/"+URL.slice(53) : null;
        return (
            <div className="create-card">
                <Card inverse>
                        <CardImg
                            width="80%"
                            src={newURL || this.props.item.icon}
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