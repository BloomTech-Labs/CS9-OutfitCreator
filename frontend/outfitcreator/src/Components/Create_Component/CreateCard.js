import React from 'react';
import { Card, CardImg, CardImgOverlay, Button } from 'reactstrap';
import { Icons } from '../Icons';
import './Create.css';

class CreateCard extends React.Component {
    state = {
        locked: false
    }

    toggleLocked = () => {
        // const lockIcon = document.querySelector('.lock-icon');
        this.setState({ locked: !this.state.locked }); 
    }

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
                        <CardImgOverlay className={this.state.locked ? "locked-border" : null}>
                            <div className="card-lock" onClick={this.toggleLocked} >
                                <img className="lock-icon" src={this.state.locked ? Icons.locked : Icons.unlocked} />
                            </div>
                            <div id={this.props.type} className="card-refresh" onClick={this.props.randomizeSingle} >
                                <img className="refresh-icon" src={Icons.refresh} />
                            </div>
                        </CardImgOverlay>
                    </Card>
            </div>
        )
    }
}

export default CreateCard;