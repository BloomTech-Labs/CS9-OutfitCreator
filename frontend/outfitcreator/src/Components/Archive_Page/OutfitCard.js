import React from 'react';
import './OutfitCard.css';
import Imaging from './Imaging';
import { withRouter } from 'react-router';

// Will display a card with any information relevent to an outfit such as name, image, etc.

class OutfitCard extends React.Component {
    editRedirect = () => {
        this.props.history.push(`/Edit/${this.props.outfitId}`);
    }
    
    render() {
        const { key, name, src, lastWorn } = this.props;
        let worn = 'Never Worn';
        // worn is an array of dates worn, will always try to access latest day (stored at the front) if ever worn
        if (lastWorn.length > 0) {
            worn = lastWorn[0].split('T')[0]
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
                    {worn == "Never Worn"
                        ? <div>{worn}</div>
                        : <div>Worn on: {worn}</div>}
                </div>
            </div>
        )
    }
}

export default withRouter(OutfitCard);
