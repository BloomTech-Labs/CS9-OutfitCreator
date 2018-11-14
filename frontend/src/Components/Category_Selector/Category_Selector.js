import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import { ROOT_URL } from '../../config';

class CategorySelector extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectAll: false,
			items: {
				top: {
					title: 'Tops',
					show: false,
					all: []
				},
        bottom: {
          title: 'Bottoms',
          show: false,
          all: []
        },
        shoes: {
          title: 'Shoes',
          show: false,
          all: []
        },
				shirt: {
					title: 'Shirts',
					show: false,
					all: []
				},
				sweater: {
          title: 'Sweaters',
					show: false,
					all: []
				},
				jacket: {
					title: 'Jackets',
					show: false,
					all: []
				},
				pants: {
					title: 'Pants',
					show: false,
					all: []
				},
				shorts: {
					title: 'Shorts',
					show: false,
					all: []
				},
				skirt: {
					title: 'Skirts',
					show: false,
					all: []
				},
				leggings: {
					title: 'Leggings',
					show: false,
					all: []
				},
				dress: {
					title: 'Dresses',
					show: false,
					all: []
				},
				formalShoes: {
					title: 'Formal Shoes',
					show: false,
					all: []
				},
				casualShoes: {
					title: 'Casual Shoes',
					show: false,
					all: []
				},
			}
		};

		this.setAuthToken();
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
		if (user) {
			axios
				.all(
					Object.keys(this.state.items).map((category) => {
						const type = this.state.items[category].type;
						return axios.get(`${ROOT_URL.API}/items/${type}/${user}/${category}`);
					})
				)
				.then((res) => {
					const items = { ...this.state.items };

					Object.keys(items).forEach((category, index) => {
						items[category].all = res[index].data;
          });

					this.setState({ items });
				})
				.catch((err) => err);
		} else {
			this.props.history.push('/');
		}
		this.toggleAll();
  }
  
  activateCategory = (category) => {
		const items = this.state.items;
		Object.keys(this.state.items).forEach((item) => (items[item].show = false));
		items[category].show = !items[category].show;
		this.setState({ items, selectAll: false });
	};

	getSelected = () => {
		return Object.keys(this.state.items).filter((type) => this.state.items[type].show === true);
  };
  
	render() {
		return (
			<div className="category-container">

			</div>
		);
	}
}

export default CategorySelector;
