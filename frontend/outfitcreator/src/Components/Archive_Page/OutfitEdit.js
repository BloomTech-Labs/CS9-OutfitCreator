import React from 'react';
import axios from 'axios';
import { ROOT_URL } from '../../config';
import { withRouter } from 'react-router';
import './OutfitEdit.css';
import '../Landing_Page/Modal.css';

class OutfitEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			outfit: '',
			name: '',
			newDate: undefined,
			worn: [],
			top: [],
			topTags: [],
			bottom: [],
			bottomTags: [],
			shoes: [],
			shoesTags: [],
			oldID: '',
			tags: [],
			itemSelection: [],
			editItem: false,
			outfitID: ''
		};
	}

	componentDidMount() {
		this.setAuthToken();
		this.getOutfit();
	}

	setAuthToken = () => {
		const token = localStorage.getItem('authToken');
		if (token) {
			axios.defaults.headers.common.Authorization = token;
		} else {
			delete axios.defaults.headers.common.Authorization;
		}
	};

	getOutfit = () => {
		const user = this.props.getUserID();
		const outfitID = this.props.location.pathname.split('edit/')[1];
		axios
			.get(`${ROOT_URL.API}/outfits/${user}/${outfitID}`)
			.then((response) => {
				const { data } = response;
				let lastWorn = data.worn[0];
				if (lastWorn) {
					lastWorn = lastWorn.split('T')[0];
				}

				this.setState(
					{
						outfit: data,
						name: data.name,
						worn: data.worn,
						lastWorn,
						user,
						outfitID
					},
					() => {
						const { top, bottom, shoes } = this.state.outfit;
						const items = [ ...top, ...bottom, shoes ];
						items.forEach((id) => this.populate(id));
					}
				);
			})
			.catch((err) => err);
	};

	populate = (id) => {
		//used to get the current outfit's top bottom and shoes
		const { user } = this.state;
		axios
			.get(`${ROOT_URL.API}/items/${user}/${id}`)
			.then((response) => {
				const stateData = this.state[response.data.type];
				stateData.push(response.data);

				this.setState({
					[response.data.type]: stateData,
					[response.data.type + 'Tags']: response.data.tags
				});
			})
			.catch((err) => err);
	};

	handleInput = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleNewDate = (event) => {
		const worn = this.state.worn;
		worn.push(event.target.value);
		worn.sort();
		this.setState({ worn, lastWorn: event.target.value });
	};

	removeDate = (event) => {
		if (event.target.nextElementSibling) {
			const worn = this.state.worn.filter(
				(date) => Date.parse(date) !== Date.parse(event.target.nextElementSibling.innerHTML)
			);
			this.setState({ worn });
		} else {
			const worn = this.state.worn.slice(1);
			this.setState({ worn });
		}
	};

	redirectArchive = () => {
		this.props.history.push('/Archive');
	};

	submitChanges = () => {
		const { user, name, worn, topTags, bottomTags, shoesTags } = this.state;
    const { top, bottom, shoes } = this.state.outfit;
    console.log({ top, bottom, shoes });
		const outfitID = this.props.location.pathname.split('edit/')[1];
		const tags = [ ...topTags, ...bottomTags, ...shoesTags ];
		const newInfo = { name, worn, tags, top, bottom, shoes };
		axios.put(`${ROOT_URL.API}/outfits/${user}/${outfitID}`, newInfo).then().catch((err) => err);
		this.redirectArchive();
	};

	deleteOutfit = () => {
		const { outfitID } = this.state;
		axios.delete(`${ROOT_URL.API}/outfits/${outfitID}`).then().catch((err) => err);
		this.redirectArchive();
	};

	getItems = (type, id) => {
		//this will get items based on the type of the clothing clicked on (currently top bottom shoes)
		//will store the id of the clothing being changed so we know what to change from the current outfit
		const { user } = this.state;
		axios
			.get(`${ROOT_URL.API}/items/type/${user}/${type}`)
			.then((response) => {
				this.setState({ itemSelection: response.data, editItem: !this.state.editItem, oldID: id });
			})
			.catch((err) => err);
	};

	selectItem = (type, id) => {
		//top and bottom are arrays so we need type to distinguish how we will change the item
		//we will use the outfit at the index of hte oldid and replace it with the new id
		const { outfit, oldID } = this.state;
		if (type === 'top' || type === 'bottom') {
			//acessing the outfit of the type either top or bottom
			//then at the index of the array where the oldid is located at, we replace it with the new id
			//this way when the outfit's id's are feteched it will get the new id
			// console.log(outfit[type].indexOf(oldID));
			outfit[type][outfit[type].indexOf(oldID)] = id;
		} else {
			//this would be only shoes at the moment, and shoes isnt an array
			outfit[type] = [ id ];
		}

		this.setState({ outfit, [type]: [] }, () => {
			const items = outfit[type];
			items.forEach((id) => this.populate(id));
		});
	};

	toggle = () => {
		this.setState({ editItem: !this.state.editItem });
	};

	render() {
		const { outfit, top, bottom, shoes, editItem, itemSelection } = this.state;
		const items = [ ...top, ...bottom, ...shoes ];

		return (
			<div className="container--archive-edit">
				{/* ternary to check if modal is toggled or not*/}
				{/* this will be the darkened background*/}
				{editItem ? <div className="modal--backdrop" onClick={this.toggle} /> : null}
				{/* ternary to check if modal is toggled or not
          this one will hold the content for screen, either the 
          new options or the current outfit that is being editted */}
				{editItem ? (
					<div onClick={this.toggle}>
						{/*this will map out hte possible items to be selected to replace the selected one*/}
						<div className="container--edit">
							<div className="edit--selections">
								{itemSelection.map((item, index) => {
									//crops the imageURl from cloudinary before supplying it to the img tag
									const [ partOne, partTwo ] = item.image.split('upload/');
									const crop = 'upload/w_200,h_250/';
									const newUrl = partOne + crop + partTwo;
									return (
										<div className="outfit--card" key={index}>
											<img
												key={item._id}
												src={newUrl}
												onClick={() => this.selectItem(item.type, item._id)}
												alt="Outfit Card Clothing Item"
											/>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				) : (
					<div>
						{/* another ternary to check if outfit was loaded correctly*/}
						{outfit ? (
							<div className="container--edit">
								<div className="image--container">
									{/*here maps out the items of the current outfit*/}
									{items.map((item, index) => {
										return (
											<div key={index}>
												<img
													key={item._id}
													className="edit--card-image"
													src={item.image}
													onClick={() => this.getItems(item.type, item._id)}
													alt="Outfit Card Clothing Item"
												/>
											</div>
										);
									})}
								</div>
								{/* here are the inputs to change the name and last worn date*/}
								<div className="container--editbox">
									<form className="container--editbox">
										<div className="edit--button-group ">
											<button
												className="edit--submit edit--button button"
												onClick={this.submitChanges}
											>
												Save
											</button>
											<button
												className="edit--delete edit--button button"
												onClick={this.deleteOutfit}
											>
												Delete
											</button>
											<button
												className="edit--cancel edit--button button"
												onClick={this.redirectArchive}
											>
												Cancel
											</button>
										</div>
										<div className="edit--fields">
											<div className="header--title">
												Name:{' '}
												<input
													type="text"
													name="name"
													value={this.state.name}
													onChange={this.handleInput}
													className="edit--input"
												/>
											</div>
											<div className="edit--date">
												<div className="date--input">
													Worn on:{' '}
													<input
														type="date"
														name="lastWorn"
														value={this.state.newDate}
														onChange={this.handleNewDate}
														className="edit--input"
													/>
												</div>
												<div className="outfit-date-block">
													{this.state.worn.map((date) => (
														<div
															className="outfit-date"
															key={this.state.worn.indexOf(date)}
														>
															<span
																className="outfit-date--delete"
																onClick={this.removeDate}
															>
																x
															</span>
															{date ? <span>{date.slice(0, 10)}</span> : null}
														</div>
													))}
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						) : (
							<div className="container--archive">Loading Outfit</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

export default withRouter(OutfitEdit);
