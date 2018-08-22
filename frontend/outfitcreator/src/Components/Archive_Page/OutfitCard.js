import React from 'react';
import './OutfitCard.css';
import Imaging from './Imaging';
import { withRouter } from 'react-router';

// Will display a card with any information relevent to an outfit such as name, image, etc. To Be Implemented

const OutfitCard = props => {
    // console.log(props.location)
    console.log(props);
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
            <div className='card--images'>
                {props.src.map((item) => {
                    if (item) {
                        return <Imaging key={item} urlSrc={item} />
                    } else return null;
                })}
            </div>
            <div className='card--footer'>
                Worn on: {props.lastWorn}
            </div>
        </div>
    )
}

export default withRouter(OutfitCard);