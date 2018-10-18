import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './Modal.css';

class Modal extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="modal-background_tinted">
				<div className="modal-body">
					<div className="modal-content">{this.props.content}</div>
					<Button className="mui-button modal-button" onClick={this.props.action} variant="outlined">
						OK
					</Button>
				</div>
			</div>
		);
	}
}

export default Modal;
