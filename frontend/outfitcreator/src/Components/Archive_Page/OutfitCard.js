import React from 'react';
import './OutfitCard.css';
import Imaging from './Imaging';
import { withRouter } from 'react-router';

// Will display a card with any information relevent to an outfit such as name, image, etc. To Be Implemented

class OutfitCard extends React.Component {
    editRedirect = () => {
        this.props.location.pathname = `/Edit/${this.props.outfitId}`;
        window.location = this.props.location.pathname;
    }

    // console.log(props.location)
    render() {
        const { key, name, src, lastWorn } = this.props;
        let worn = 'Never Worn';
        if (lastWorn) {
            worn = lastWorn.split('T')[0]
        }
        return (
            <div className='container--card' key={key}>
                <div className='card--header'>
                    <div className='header--title'>
                        {name}
                    </div>
                    <div className='header--edit'>
                        <button className='edit--button' onClick={this.editRedirect} />
                    </div>
                </div>
                <div className='card--images'>
                    {src.map((item) => {
                        if (item) {
                            return <Imaging key={item} urlSrc={item} />
                        } else return null;
                    })}
                </div>
                <div className='card--footer'>
                    Worn on: {worn}
                </div>
            </div>
        )
    }
}

export default withRouter(OutfitCard);