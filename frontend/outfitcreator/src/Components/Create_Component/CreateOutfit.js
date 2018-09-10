import React, { Component } from 'react';
import { CardDeck, Button, Input } from 'reactstrap';
import CreateCard from './CreateCard.js';
import { ROOT_URL } from '../../config.js';
import axios from 'axios';
import queryString from 'query-string';
import './Create.css';
import { Icons } from '../Icons/index.js';

class CreateOutfit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: '',
			name: '',
			worn: [],
			tags: [],
			items: {},
			subtypeMap: {
				top: [ 'sweater', 'shirt', 'jacket', 'dress' ],
				bottom: [ 'pants', 'shorts', 'leggings', 'skirt' ],
				shoes: [ 'casualShoes', 'formalShoes' ]
			}
		};
    
    const hash = queryString.parse(this.props.location.hash);
		if (hash.token) {
      localStorage.setItem('authToken', `Bearer ${hash.token}`);
      this.setAuthToken();
    }
    this.setTypes();
	}

	setAuthToken = () => {
		const token = localStorage.getItem('authToken');
		if (token) {
			axios.defaults.headers.common.Authorization = token;
		} else {
			delete axios.defaults.headers.common.Authorization;
		}
	};

	setTypes = () => {
    const basicItems = {
      top: {
        title: 'Tops',
        show: true,
        all: [],
        current: null,
        icon: Icons.top,
        locked: false
      },
      bottom: {
        title: 'Bottoms',
        show: true,
        all: [],
        current: null,
        icon: Icons.bottom,
        locked: false
      },
      shoes: {
        title: 'Shoes',
        show: true,
        all: [],
        current: null,
        icon: Icons.casualShoes,
        locked: false
      }
    };

		const paidItems = {
			top: {
				title: 'All Tops',
				show: true,
				all: [],
				current: null,
				icon: Icons.top,
				locked: false
			},
			bottom: {
				title: 'All Bottoms',
				show: true,
				all: [],
				current: null,
				icon: Icons.bottom,
				locked: false
			},
			shoes: {
				title: 'All Shoes',
				show: true,
				all: [],
				current: null,
				icon: Icons.casualShoes,
				locked: false
			},
			shirt: {
				title: 'Shirt',
				show: false,
				all: [],
				current: null,
				icon: Icons.shirt,
				locked: false
			},
			sweater: {
				title: 'Sweater',
				show: false,
				all: [],
				current: null,
				icon: Icons.sweater,
				locked: false
			},
			jacket: {
				title: 'Jacket',
				show: false,
				all: [],
				current: null,
				icon: Icons.jacket,
				locked: false
			},
			dress: {
				title: 'Dress',
				show: false,
				all: [],
				current: null,
				icon: Icons.dress,
				locked: false
			},
			pants: {
				title: 'Pants',
				show: false,
				all: [],
				current: null,
				icon: Icons.pants,
				locked: false
			},
			shorts: {
				title: 'Shorts',
				show: false,
				all: [],
				current: null,
				icon: Icons.shorts,
				locked: false
			},
			skirt: {
				title: 'Skirt',
				show: false,
				all: [],
				current: null,
				icon: Icons.skirt,
				locked: false
			},
			leggings: {
				title: 'Leggings',
				show: false,
				all: [],
				current: null,
				icon: Icons.leggings,
				locked: false
			},
			formalShoes: {
				title: 'Formal Shoes',
				show: false,
				all: [],
				current: null,
				icon: Icons.formalShoes,
				locked: false
			},
			casualShoes: {
				title: 'Casual Shoes',
				show: false,
				all: [],
				current: null,
				icon: Icons.casualShoes,
				locked: false
			}
		};

		this.props.isUserPaid((paid) => {
      if (paid) this.setState({ items: paidItems });
      else this.setState({ items: basicItems });
		});
	};

	componentDidMount() {
    const user = this.props.getUserID();
    

		if (user) {
			axios
				.all([
					axios.get(`${ROOT_URL.API}/items/type/${user}/top`),
					axios.get(`${ROOT_URL.API}/items/type/${user}/bottom`),
					axios.get(`${ROOT_URL.API}/items/type/${user}/shoes`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/shirt`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/sweater`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/jacket`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/dress`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/pants`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/shorts`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/skirt`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/leggings`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/formalShoes`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/casualShoes`)
				])
				.then((res) => {
					const items = { ...this.state.items };

					Object.keys(items).forEach((item, idx) => {
						items[item].all = res[idx].data;
					});

					this.setState({ items });
				})
				.catch((err) => err);
		} else {
			this.props.history.push('/');
		}
	}

	activateCategory = (category) => {
		const typesInCloset = this.getTypesInCloset();
		const items = { ...this.state.items };

		// Swap show value of clicked element
		items[category].show = !items[category].show;

		// Special cases after default click?
		const { subtypeMap } = this.state;

		const mainTypes = Object.keys(subtypeMap);
		const shoeTypes = [ 'shoes', ...subtypeMap.shoes ];

		// Allow only one shoe type to be active
		if (shoeTypes.includes(category)) {
			shoeTypes.forEach((type) => {
				if (category !== type) {
					if (items[type]) items[type].show = false;
				}
			});
		}
		// If category is of mainType then toggle off all subtypes
		if (mainTypes.includes(category)) {
			subtypeMap[category].forEach((subtype) => {
				if (items[subtype] && typesInCloset.includes(subtype)) items[subtype].show = items[category].show;
			});
			// Otherwise toggle off main of subtype
		} else {
			Object.entries(subtypeMap).forEach((pair) => {
				if (pair[1].includes(category)) {
					items[pair[0]].show = false;
				}
			});
		}

		this.setState({ items });
	};

	getSelected = () => {
		let selected = Object.keys(this.state.items).filter((type) => this.state.items[type].show === true);

		Object.entries(this.state.subtypeMap).forEach((pair) => {
			const mainType = pair[0];
			const subTypes = pair[1];

			if (selected.includes(mainType)) {
				selected = selected.filter((item) => !subTypes.includes(item));
			}
		});

		return selected;
	};

	toggleLocked = (type) => {
		const items = { ...this.state.items };
		items[type].locked = !items[type].locked;
		this.setState(items);
	};

	// method to retrieve random items of all types
	randomize = () => {
		const items = this.state.items;
		const selected = this.getSelected();

		selected.forEach((type) => {
			if (!items[type].locked)
				items[type].current = items[type].all[Math.floor(Math.random() * items[type].all.length)];
		});

		this.setState({ items });
	};

	// method to retrieve a single random item
	randomizeSingle = (e) => {
		const items = this.state.items;
		const type = e.target.parentNode.id;

		if (!items[type].locked)
			items[type].current = items[type].all[Math.floor(Math.random() * items[type].all.length)];

		this.setState({ items });
	};

	handleInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	// method handle creating an outfit
	handleCreateOutfit = () => {
		const items = this.state.items;
		const selected = this.getSelected();
		const groups = { top: [], bottom: [], shoes: null };
		const { subtypeMap } = this.state;

		selected.forEach((type) => {
			if (type.toLowerCase().includes('shoe')) {
				groups.shoes = items[type].current;
			} else {
				Object.entries(subtypeMap).forEach((pair) => {
					const mainType = pair[0];
					const subTypes = pair[1];

					if (mainType === type || subTypes.includes(type)) {
						groups[mainType].push(items[type].current);
					}
				});
			}
		});

		const user = this.props.getUserID();
		const { name, worn, tags } = this.state;
		const { top, bottom, shoes } = groups;
		const outfit = { user, name, worn, tags, top, bottom, shoes };

		axios
			.post(`${ROOT_URL.API}/outfits`, outfit)
			.then((res) => {this.props.history.push(`/edit/${res.data._id}`)})
			.catch((err) => err);
	};

	getTypesInCloset = () => {
		return Object.keys(this.state.items).filter((type) => {
			return this.state.items[type].all.length > 0;
		});
	};

	render() {
		const typesInCloset = this.getTypesInCloset();
		const selected = this.getSelected();

		return (
			<div className="create--container">
				<div className="create--selection">
					{this.state.items ? (
						typesInCloset.map((type) => (
							<button
								className={this.state.items[type].show ? 'create--button-active' : 'create--button'}
								onClick={() => {
									this.activateCategory(type);
								}}
								key={type}
							>
								{this.state.items[type].title}
							</button>
						))
					) : (
						<div>Loading...</div>
					)}
				</div>
				<CardDeck>
					{selected.map((type) => {
						return (
							<CreateCard
								key={type}
								item={this.state.items[type]}
								randomizeSingle={this.randomizeSingle}
								locked={this.state.items[type].locked}
								toggleLocked={this.toggleLocked}
								type={type}
							/>
						);
					})}
				</CardDeck>
				<div className="outfit--container">
					<Input
						type="text"
						name="name"
						placeholder="Outfit Nickname"
						onChange={this.handleInputChange}
						value={this.state.name}
						className="outfit--input"
					/>
					<div className="outfit--decision">
						<Button className="button" onClick={this.handleCreateOutfit}>
							Save
						</Button>
						<Button className="button" onClick={this.randomize}>
							Randomize
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default CreateOutfit;