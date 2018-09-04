import React from 'react';
import { Card, CardImg, CardImgOverlay, Button } from 'reactstrap';
import './Create.css';

class CreateCard extends React.Component {
    render() {
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
                            <Button id={this.props.type} className='close' aria-label="Close" onClick={this.props.randomizeSingle}>
                                <span aria-hidden="true">&times;</span>
                            </Button>
                        </CardImgOverlay>
                    </Card>
            </div>
        )
    }
}

export default CreateCard;