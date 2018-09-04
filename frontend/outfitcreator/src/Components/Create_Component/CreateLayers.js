import React, { Component } from 'react';
import { CardDeck, Button, Input } from 'reactstrap';
import CreateCard from './CreateCard.js';
import { ROOT_URL } from '../../config';
import queryString from 'query-string';
import axios from 'axios';
import './Create.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icons } from './Icons';
// import bottomIcon from './bottom.png';

// const testUserId = '5b761531cdcd6d00043d420e';

class CreateLayers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            name: '',
            worn: [],
            tags: [],
            items: {
                top: {
                    show: false,
                    all: [],
                    current: null,
                    icon: Icons.top,
                },
                shirt: {
                    show: false,
                    all: [],
                    current: null,
                    icon: Icons.shirt,
                },
                sweater: {
                    show: false,
                    all: [],
                    current: null,
                    icon: Icons.sweater,
                },
                jacket: {
                    show: false,
                    all: [],
                    current: null,
                    icon: Icons.jacket,
                },
                bottom: {
                    show: false,
                    all: [],
                    current: null,
                    icon: Icons.bottom,
                },
                pants: {
                    show: false,
                    all: [],
                    current: null,
                    icon: Icons.pants,
                },
                shorts: {
                    show: false,
                    all: [],
                    current: null,
                    icon: Icons.shorts,
                },
                skirt: {
                    show: false,
                    all: [],
                    current: null,
                    icon: Icons.skirt,
                },
                leggings: {
                    show: false,
                    all: [],
                    current: null,
                    icon: Icons.leggings,
                },
                dress: {
                    show: false,
                    all: [],
                    current: null,
                    icon: Icons.dress,
                },
                formalShoes: {
                    show: false,
                    all: [],
                    current: null,
                    icon: Icons.formalShoes,
                },
                casualShoes: {
                    show: false,
                    all: [],
                    current: null,
                    icon: Icons.casualShoes,
                },
                shoes: {
                    show: false,
                    all: [],
                    current: null,
                    icon: Icons.casualShoes,
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

                    this.setState({ items });
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
      return Object.keys(this.state.items).filter(type => this.state.items[type].show === true);
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
    randomizeSingle = (e) => {
        const items = this.state.items;
        const type = e.target.parentNode.id;

        items[type].current = items[type].all[Math.floor(Math.random() * items[type].all.length)];

        this.setState({ items });
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
                            className={this.state.items[type].show ? "create-button--active" : "create-button"}
                            onClick={() => { this.activateCategory(type) }}
                            key={type} > {type} 
                        </button>
                    ))}
                </div>
                <CardDeck>
                    {selected.map(type => {
                        return(<CreateCard key={type} 
                            item={this.state.items[type]} 
                            randomizeSingle={this.randomizeSingle}
                            type={type} />)
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