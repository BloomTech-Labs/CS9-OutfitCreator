import React from 'react';
import './OutfitCard.css';
import { withRouter } from 'react-router';

// Will display a card with any information relevent to an outfit such as name, image, etc. To Be Implemented

const OutfitCard = props => {
    // console.log(props.location)
    return (
        <div className='container--card' key={props.key}>
            <div className='card--header'>
                <div className='header--title'>
                    {props.name}
                </div>
                <div className='header--edit'>
                    <button className='edit--button' />
                </div>
            </div>
            <div className='card--image'>
                <img src={props.src} alt={props.name} />
            </div>
            <div className='card--footer'>
                Worn on: {props.lastWorn}
            </div>
        </div>
    )
}

export default withRouter(OutfitCard);