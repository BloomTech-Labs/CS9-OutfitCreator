import React from 'react';
import { Card, CardImg, CardImgOverlay } from 'reactstrap';
import { Icons } from '../Icons';
import './Create.css';

class CreateCard extends React.Component {
	render() {
		const URL = this.props.item.current ? this.props.item.current.image : null;
		const newURL = URL ? URL.slice(0, 53) + 'h_300/' + URL.slice(53) : null;
		return (
			<div className="create-card">
				<Card inverse>
					<CardImg
						width="80%"
						src={newURL || this.props.item.icon}
						alt="Create Card Clothing Item"
						className="create-card--image"
					/>
					<CardImgOverlay className={this.props.locked ? 'locked--border' : null}>
						<div className="create-card--lock" onClick={() => this.props.toggleLocked(this.props.type)}>
							<img className="lock--icon" src={this.props.locked ? Icons.locked : Icons.unlocked} alt='Lock Icon' />
						</div>
						<div id={this.props.type} className="create-card--refresh" onClick={this.props.randomizeSingle}>
							<img className="refresh--icon" src={Icons.refresh} alt='Refresh Icon' />
						</div>
					</CardImgOverlay>
				</Card>
			</div>
		);
	}
}

export default CreateCard;
