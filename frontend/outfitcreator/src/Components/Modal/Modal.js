import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './Modal.css';

// Created universal Modal component that is activated through the 'modal' component 
// method. This method takes two optional properties, 'content' and 'action'. 
// 'Content' can be anything from string to a JSX component. 'Action' is a function 
// to be performed when the 'OK' button on the modal is clicked. Two things are needed 
// to utilize this functionality.

// 1. Pass down the modal method into whichever component you wish to use it inside of.
// 2. Place the following line of code right before the last closing div tag of your component:
// {this.state.modal ? <Modal content={this.state.content} action={this.state.action} /> : null}

// The modal method will take care of setting up the state for you.
// See comments in App.js for modal method use instructions

class Modal extends Component {
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
