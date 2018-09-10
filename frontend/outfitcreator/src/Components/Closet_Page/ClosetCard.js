import React from 'react';

class ClosetCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			item: this.props.item,
			name: this.props.item.name,
			nameEdit: this.props.item.name,
			type: this.props.item.type,
			tags: this.props.item.tags,
			edit: false
		};
	}

	toggle = () => {
		this.setState({ edit: !this.state.edit, nameEdit: this.state.name });
	};

	handleInput = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	submit = () => {
		const { item } = this.props;
		const { nameEdit, type, tags } = this.state;
		const update = {
			id: item._id,
			name: nameEdit,
			type,
			tags
		};
		this.props.submit(update);
		this.setState({ name: this.state.nameEdit });
		this.toggle();
	};

	render() {
		const { item, name } = this.state;
		const URL = item.image;
		const newURL = URL.slice(0, 53) + 'h_150/' + URL.slice(53);
		return this.state.edit ? (
			<div className="closet-card--edit">
				<div className="closet-card--options">
					<button className="closet-card--accept" onClick={this.submit}>
						&#10004;
					</button>
					<input
						type="text"
						name="nameEdit"
						value={this.state.nameEdit}
						onChange={this.handleInput}
						className="closet-card--input"
					/>
					<button className="closet-card--cancel" onClick={this.toggle}>
						&#10006;
					</button>
				</div>
				<div className="closet-card">
					<img className="closet-image" src={`${newURL}`} alt={name} onClick={this.toggle} />
				</div>
			</div>
		) : (
			<div className="closet-card" onClick={this.toggle}>
				<div className="closet-card--name">{name}</div>
				<img className="closet-image" src={`${newURL}`} alt={this.props.item.name} />
				<div className="closet-card--tags">
					{this.props.item.tags.map((tag, index) => (
						<span key={index} className="closet-tag">
							{`${tag}`}
							{index < this.props.item.tags.length - 1 ? ', ' : ''}
						</span>
					))}
				</div>
			</div>
		);
	}
}

export default ClosetCard;
