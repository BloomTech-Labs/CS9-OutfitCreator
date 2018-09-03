import React, { Component } from 'react';
import { CardDeck, Button, Input } from 'reactstrap';
import CreateCard from './CreateCard.js';
import { ROOT_URL } from '../../config';
import queryString from 'query-string';
import axios from 'axios';
import './Create.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import topIcon from './top.png';
import bottomIcon from './bottom.png';

// const testUserId = '5b761531cdcd6d00043d420e';

class CreateLayers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            name: '',
            worn: [],
            tags: [],
            // all: { 
            //     top: [],
            //     shirt: [],
            //     sweater: [],
            //     jacket: [],
            //     bottom: [],
            //     pants: [],
            //     shorts: [],
            //     skirt: [],
            //     leggings: [],
            //     dress: [],
            //     formalShoes: [],
            //     casualShoes: [],
            //     shoes: [],
            // },
            items: {
                top: {
                    show: false,
                    all: [],
                    current: null,
                    icon: topIcon
                },
                shirt: {
                    show: false,
                    all: [],
                    current: null,
                },
                sweater: {
                    show: false,
                    all: [],
                    current: null,
                },
                jacket: {
                    show: false,
                    all: [],
                    current: null,
                },
                bottom: {
                    show: false,
                    all: [],
                    current: null,
                    icon: bottomIcon
                },
                pants: {
                    show: false,
                    all: [],
                    current: null,
                },
                shorts: {
                    show: false,
                    all: [],
                    current: null,
                },
                skirt: {
                    show: false,
                    all: [],
                    current: null,
                },
                leggings: {
                    show: false,
                    all: [],
                    current: null,
                },
                dress: {
                    show: false,
                    all: [],
                    current: null,
                },
                formalShoes: {
                    show: false,
                    all: []
                },
                casualShoes: {
                    show: false,
                    all: []
                },
                shoes: {
                    show: false,
                    all: [],
                    current: null,
                },
            }
        }
        this.setAuthToken();
    }

    setAuthToken = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.defaults.headers.common.Authorization = token;
        } else {
            delete axios.defaults.headers.common.Authorization;
        }
    }

    componentDidMount() {
        const hash = queryString.parse(this.props.location.hash);
        if(hash.token){
            localStorage.setItem('authToken', `Bearer ${hash.token}`);
        }
        this.setAuthToken();
        const user = this.props.getUserID();
        const authToken = localStorage.getItem('authToken');
        const requestOptions = {
            headers: {
                Authorization: authToken
            }
        }
        if (authToken) {
            axios.all([
                axios.get(`${ROOT_URL.API}/items/type/${user}/top`),
                axios.get(`${ROOT_URL.API}/items/type/${user}/bottom`, requestOptions),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/shirt`, requestOptions),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/sweater`, requestOptions),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/jacket`, requestOptions),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/pants`, requestOptions),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/shorts`, requestOptions),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/skirt`, requestOptions),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/leggings`, requestOptions),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/dress`, requestOptions),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/formalShoes`, requestOptions),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/casualShoes`, requestOptions),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/shoes`, requestOptions),
            ])
                .then(res => {
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

                    // const all = { ...this.state.all };
                    // all.top = res[0].data;
                    // all.bottom = res[1].data;
                    // all.shirt = res[2].data;
                    // all.sweater = res[3].data;
                    // all.jacket = res[4].data;
                    // all.pants = res[5].data;
                    // all.shorts = res[6].data;
                    // all.skirt = res[7].data;
                    // all.leggings = res[8].data;
                    // all.dress = res[9].data;
                    // all.formalShoes = res[10].data;
                    // all.casualShoes = res[11].data;
                    // all.shoes = [ ...res[10].data, ...res[11].data];

                    this.setState({ items });
                    //this.randomize();
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            this.props.history.push('/');
        }
    }

    activateCategory = (category) => {
        const items = this.state.items;
        items[category].show = !items[category].show;
        this.setState({items})
    }

    getSelected = () => {
      return Object.keys(this.state.items).filter(type => this.state.items[type].show == true);
    }

    // method to retrieve random items of all types
    randomize = () => {
        const items = this.state.items;
        const selected = this.getSelected();

        selected.forEach(type => {
            items[type].current = items[type].all[Math.floor(Math.random() * items[type].all.length)];
        });

        this.setState({ items });
    }

    // method to retrieve a single random item
    randomizeSingle = (event) => {
        const { allTops, allBottoms, allShoes } = this.state;

        if (event.target.parentNode.classList.contains('top')) {
            const selectedTop = allTops[Math.floor(Math.random() * allTops.length)];
            this.setState({ selectedTop })
        } else if (event.target.parentNode.classList.contains('bottom')) {
            const selectedBottom = allBottoms[Math.floor(Math.random() * allBottoms.length)];
            this.setState({ selectedBottom })
        } else if (event.target.parentNode.classList.contains('shoe')) {
            const selectedShoe = allShoes[Math.floor(Math.random() * allShoes.length)];
            this.setState({ selectedShoe })
        }
    }

    handleButtonClick = () => {
        console.log('button clicked!')
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // method handle creating an outfit
    handleCreateOutfit = () => {
        const { user, name, worn, tags, selectedTop, selectedBottom, selectedShoe } = this.state;
        const top = [selectedTop._id];
        const bottom = [selectedBottom._id];
        const shoes = selectedShoe._id;
        const outfit = { user, name, worn, tags, top, bottom, shoes };
        axios
            .post(`${ROOT_URL.API}/outfits`, outfit)
            .then(() => this.props.history.push('/Archive'))
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        const typesInCloset = Object.keys(this.state.items).filter(type => {
            return this.state.items[type].all.length > 0;
        });
        const selected = this.getSelected();

        return (
            <div className="createContainer">
                <div className="layerSelect">
                    {typesInCloset.map(type => (
                        <button
                            className={this.state.items[type].show ? "create-button--active" :"create-button"}
                            onClick={()=>{this.activateCategory(type)}}
                            key={type} >
                            {type} 
                        </button>
                    ))}
                </div>
                <CardDeck>
                    {selected.map(type => {
                        return(<CreateCard key={type} item={this.state.items[type]}/>)
                    })}
                </CardDeck>
                <div className="outfitPickerContainer">
                    <Input type="text" name="name" placeholder="Outfit Nickname" onChange={this.handleInputChange} value={this.state.name} className="outfitInput" />
                    <div className="outfitPickerDecision">
                        <Button className="button" onClick={this.handleCreateOutfit}>Yes!</Button>
                        <Button className="button" onClick={this.randomize}>Randomize</Button>
                        <FontAwesomeIcon icon="share-alt" size="4x" onClick={this.handleButtonClick} />
                    </div>
                </div>
            </div>
        );
    }
};

export default CreateLayers;