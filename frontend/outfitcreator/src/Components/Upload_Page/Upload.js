import React, { Component } from 'react';
import axios from 'axios';
import { CloudinaryContext } from 'cloudinary-react';
import { CardImg, Button, FormGroup, Input } from 'reactstrap';
import { ROOT_URL } from '../../config';
import TagInput from './TagInput';
import uploadPlaceholder from './uploadPlaceholder.png';
import queryString from 'query-string';
import './Upload.css';

class Upload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			image: '',
			name: '',
			tag: '',
			tags: [],
			type: 'title',
			options: {}
    };
    
    const hash = queryString.parse(this.props.location.hash);
		if (hash.token) {
      localStorage.setItem('authToken', `Bearer ${hash.token}`);
      this.setAuthToken();
    }

		props.isUserPaid((paid) => {
			const options = paid
				? {
						title: 'Item Type',
						top: 'Top',
						shirt: 'Shirt',
						sweater: 'Sweater',
						jacket: 'Jacket',
						bottom: 'Bottom',
						pants: 'Pants',
						shorts: 'Shorts',
						skirt: 'Skirt',
						leggings: 'Leggings',
						dress: 'Dress',
						formalShoes: 'Formal Shoes',
						casualShoes: 'Casual Shoes',
						shoes: 'Shoes'
					}
				: {
						title: 'Item Category',
						top: 'Top',
						bottom: 'Bottom',
						shoes: 'Shoes'
					};
			this.setState({ options });
    });
  }
  
  setAuthToken = () => {
		const token = localStorage.getItem('authToken');
		if (token) {
			axios.defaults.headers.common.Authorization = token;
		} else {
			delete axios.defaults.headers.common.Authorization;
		}
	};

	componentDidMount() {

		const user = this.props.getUserID();
		window.cloudinary.applyUploadWidget(
			document.getElementById('cloudinary--uploader'),
			{
				secure: true,
				cloud_name: 'cloudtesting',
				upload_preset: 'default',
				multiple: false,
				sources: [ 'local', 'url', 'camera', 'instagram', 'facebook' ],
				theme: 'minimal',
				stylesheet: '#cloudinary-overlay { background-color: rgba(0,0,0,0.7);}',
				cropping: 'default',
				cropping_show_dimensions: true,
				cropping_show_back_button: true
			},
			(err, result) => {
				if (result) {
					this.setState({ image: result['0'].secure_url, result: result['0'] });
				}
			}
		);
		this.setState({ user });
	}

	uploadCount = (cb) => {
		axios
			.get(`${ROOT_URL.API}/items/user/${this.state.user}`)
			.then((res) => {
				cb(res.data.length);
			})
			.catch((err) => err);
	};

	fileChanged = (event) => {
		this.setState({ image: URL.createObjectURL(event.target.files[0]) });
	};

	saveItem = (e) => {
		e.preventDefault();

		if (this.state.type === 'title') {
			alert('Please select an item type');
			return;
		}

		this.props.isUserPaid((paid) => {
			this.uploadCount((count) => {
				if (!paid && count > 50) {
					alert('Unpaid upload limit reached. Please subscribe to access our full range of content.');
					return;
				}

				let { user, name, image, tags, type } = this.state;
				let subtype;
				const subtypeMap = {
					top: [ 'sweater', 'shirt', 'jacket', 'dress' ],
					bottom: [ 'pants', 'shorts', 'leggings', 'skirt' ],
					shoes: [ 'casualShoes', 'formalShoes' ]
				};

				// If type is not top, bottom or shoes
				if (![ 'top', 'bottom', 'shoes' ].includes(type)) {
					subtype = type;

					// Search for subtype in subtypeMap and set vars
					Object.entries(subtypeMap).forEach((pair) => {
						const mainType = pair[0];
						const subtypeArr = pair[1];

						if (subtypeArr.includes(type)) type = mainType;
					});
				} else {
					subtype = null;
				}

				if (subtype) {
					axios
						.post(`${ROOT_URL.API}/items`, {
							user,
							name,
							image,
							tags,
							type,
							subtype
						})
						.then(() => {
							this.setState({ image: '', name: '', tags: [] });
						})
						.catch((error) => error);
				} else {
					axios
						.post(`${ROOT_URL.API}/items`, {
							user,
							name,
							image,
							tags,
							type
						})
						.then(() => {
							this.setState({ image: '', name: '', tags: [] });
						})
						.catch((error) => error);
				}
			});
		});
	};

	toCamelCase(string) {
		const temp = string.split(' ');
		return [ temp[0].toLowerCase(), temp[1] ].join('');
	}

	handleInputChange = (e) => {
		e.target.type === 'select-one'
			? this.setState({ [e.target.name]: this.toCamelCase(e.target.value) })
			: this.setState({ [e.target.name]: e.target.value });
	};

	passState = (state) => {
		this.setState(state);
	};

	render() {
		return (
			<div className="container--upload">
				<div className="upload--columns">
					{this.state.image ? (
						<CardImg className="upload--image" src={this.state.image} alt="Upload Image Thumbnail" />
					) : (
						<CardImg className="upload--image" src={uploadPlaceholder} alt="Upload Image Thumbnail" />
					)}
					<FormGroup>
						<CloudinaryContext cloudName="cloudtesting">
							<div id="cloudinary--uploader" />
						</CloudinaryContext>
						<br />
						<Input
							type="text"
							name="name"
							className="upload--name"
							placeholder="Clothing Name"
							autoComplete="off"
							value={this.state.name}
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Input
							className="upload--select"
							type="select"
							name="type"
							placeholder="Item Type"
							onChange={this.handleInputChange}
						>
							{this.state.options ? (
								Object.keys(this.state.options).map((option) => (
									<option key={option}>{this.state.options[option]}</option>
								))
							) : null}
						</Input>
					</FormGroup>
					<TagInput state={this.state} passState={this.passState} />
				</div>
				<Button className="button upload--save" onClick={this.saveItem}>
					Save
				</Button>
			</div>
		);
	}
}

export default Upload;
