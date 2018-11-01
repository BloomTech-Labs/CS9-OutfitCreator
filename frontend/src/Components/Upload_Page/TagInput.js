import React, { Component } from 'react';
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';
import './TagInput.css';
import Icon from './tag.png';

class TagInput extends Component {
	addTag = (e) => {
		const tag = this.props.state.tag.toLowerCase();
		if (e.key === 'Enter' && !this.props.state.tags.includes(tag)) {
			this.props.passState({ tags: [ ...this.props.state.tags, tag ]});
			this.props.passState({ tag: '' });
		}
	};

	removeTag = (e) => {
		this.props.passState({
			tags: this.props.state.tags.filter((tag) => tag !== e.target.nextElementSibling.innerHTML)
		});
	};

	handleInputChange = (e) => {
		this.props.passState({ tag: e.target.value });
	};

	render() {
		return (
			<div className="container--tagSearch">
				<InputGroup>
					<InputGroupAddon className="tagSearch--icon" addonType="prepend">
						<img src={Icon} alt="Tag Icon" />
					</InputGroupAddon>
					<Input
						className="tagSearch--input"
						type="text"
						name="tags"
						placeholder="Add a Tag..."
						value={this.props.state.tag}
						onChange={this.handleInputChange}
						onKeyPress={this.addTag}
					/>
				</InputGroup>
				<div className="tagSearch--view">
					{this.props.state.tags.map((tag) => (
						<div className={'tagSearch--tag ' + tag} key={this.props.state.tags.indexOf(tag)}>
							<span className="tagSearch--delete" onClick={this.removeTag}>
								x
							</span>
							<span>{tag}</span>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default TagInput;
