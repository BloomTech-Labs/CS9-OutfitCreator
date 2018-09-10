import React from 'react';
import './OutfitCard.css';
import Imaging from './Imaging';
import { withRouter } from 'react-router';

// Will display a card with any information relevent to an outfit such as name, image, etc.
class OutfitCard extends React.Component {
	editRedirect = () => {
		this.props.history.push(`/edit/${this.props.outfitId}`);
	};

	render() {
		const { key, name, src } = this.props;
		let worn = 'Never Worn';
		// worn is an array of dates worn, will always try to access latest day (stored at the front) if ever worn
		if (this.props.worn.length > 0) {
			worn = this.props.worn.pop().slice(0, 10);
		}
		return (
			<div className="container--card" key={key}>
				<div className="card--header">
					<div className="header--title">{name}</div>
					<div className="header--edit">
						<button className="edit--button-archive" onClick={this.editRedirect} />
					</div>
				</div>
				<div className="card--images">
					{src.map((item) => {
						if (item) {
							return <Imaging key={item} urlSrc={item} />;
						} else return null;
					})}
				</div>
				<div className="card--footer">
					{worn === 'Never Worn' ? <div>{worn}</div> : <div>Last worn: {worn.slice(0, 10)}</div>}
				</div>
			</div>
		);
	}
}

export default withRouter(OutfitCard);
