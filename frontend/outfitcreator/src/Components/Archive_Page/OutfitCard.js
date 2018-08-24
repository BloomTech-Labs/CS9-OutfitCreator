import React from 'react';
import './OutfitCard.css';
import Imaging from './Imaging';
import { withRouter } from 'react-router';

// Will display a card with any information relevent to an outfit such as name, image, etc.

class OutfitCard extends React.Component {
    renderEdit = () => {
        this.props.location.pathname = `/Edit/${this.props.outfitId}`
        window.location = this.props.location.pathname;
    }
    
    render() {
        return (
            <div className='container--card' key={this.props.key}>
                <div className='card--header'>
                    <div className='header--title'>
                        {this.props.name}
                    </div>
                    <div className='header--edit'>
                        <button className='edit--button' onClick={this.renderEdit} />
                    </div>
                </div>
                <div className='card--images'>
                    {this.props.src.map((item) => {
                        if (item) {
                            return <Imaging key={item} urlSrc={item} />
                        } else return null;
                    })}
                </div>
                <div className='card--footer'>
                    Worn on: {this.props.lastWorn}
                </div>
            </div>
        )
    }
}

export default withRouter(OutfitCard);
