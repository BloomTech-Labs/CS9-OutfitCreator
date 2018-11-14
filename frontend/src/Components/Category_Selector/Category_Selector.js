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
				.all([
					axios.get(`${ROOT_URL.API}/items/type/${user}/top`),
					axios.get(`${ROOT_URL.API}/items/type/${user}/bottom`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/shirt`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/sweater`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/jacket`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/pants`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/shorts`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/skirt`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/leggings`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/dress`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/formalShoes`),
					axios.get(`${ROOT_URL.API}/items/subtype/${user}/casualShoes`),
					axios.get(`${ROOT_URL.API}/items/type/${user}/shoes`)
				])
				.then((res) => {
					const items = { ...this.state.items };
					items.top.all = res[0].data;
					items.bottom.all = res[1].data;
					items.shirt.all = res[2].data;
					items.sweater.all = res[3].data;
					items.jacket.all = res[4].data;
					items.pants.all = res[5].data;
					items.shorts.all = res[6].data;
					items.skirt.all = res[7].data;
					items.leggings.all = res[8].data;
					items.dress.all = res[9].data;
					items.formalShoes.all = res[10].data;
					items.casualShoes.all = res[11].data;
					items.shoes.all = res[12].data;
					this.setState({ items });
				})
				.catch((err) => err);
		} else {
			this.props.history.push('/');
		}
		this.toggleAll();
	}


	render() {
		return (
			<div className="category-container">

			</div>
		);
	}
}

export default CategorySelector;
