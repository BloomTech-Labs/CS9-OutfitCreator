import React from 'react';

class ClosetCard extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <div className="closet-card">
                <div className="closet-card--name">{this.props.item.name}</div>
                <img className="closet-image" src={this.props.item.image} alt={this.props.item.name} />
                <br/>
                {this.props.item.tags.map((tag, index) => <span key={index} className="closet-tag">{`${tag} `}</span>)}
            </div>
        )
    }
}

export default ClosetCard;