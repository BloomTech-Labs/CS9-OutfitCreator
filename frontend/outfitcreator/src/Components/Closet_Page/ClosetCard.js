import React from 'react';

class ClosetCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="closet-card">
                <h3>{this.props.item.name}</h3>
                {this.props.item.tags.map(tag => <span className="closet-tag">{tag}</span>)}
                <img className="closet-image" src={this.props.item.image} />
            </div>
        )
    }
}

export default ClosetCard;