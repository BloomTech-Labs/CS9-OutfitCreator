import React from 'react';

class ClosetCard extends React.Component {
    render() {
        const URL=this.props.item.image;
        const newURL = URL.slice(0,53)+"h_120/"+URL.slice(53);
        console.log(newURL);
        return (
            <div className="closet-card">
                <div className="closet-card--name">{this.props.item.name}</div>
                <img className="closet-image" 
                src={`${newURL}`} //split this and add height parameter
                alt={this.props.item.name} />
                <div className="closet-card--tags">
                    {this.props.item.tags.map((tag, index) =>
                        <span key={index} className="closet-tag">
                            {`${tag}`}
                            {(index < this.props.item.tags.length-1)
                                ?', '
                                :''}
                        </span>)}
                </div>
            </div>
        )
    }
}

export default ClosetCard;