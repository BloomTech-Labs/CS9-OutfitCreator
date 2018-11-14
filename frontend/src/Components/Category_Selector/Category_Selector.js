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

	}


	render() {
		return (
			<div className="category-container">

			</div>
		);
	}
}

export default CategorySelector;
