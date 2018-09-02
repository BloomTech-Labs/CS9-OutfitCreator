import React, { Component } from 'react';
import { Card, CardText, CardImg, CardImgOverlay, CardDeck, Button, Input } from 'reactstrap';
import CreateCard from './CreateCard.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import queryString from 'query-string';

import { ROOT_URL } from '../../config';
import './Create.css';

// const testUserId = '5b761531cdcd6d00043d420e';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            name: '',
            worn: [],
            tags: [],
            items: {
                top: {
                    show: true,
                    all: [],
                    selected: null
                },
                shirt: {
                    show: false,
                    all: [],
                    selected: null,
                },
                sweater: {
                    show: false,
                    all: [],
                    selected: null,
                },
                jacket: {
                    show: false,
                    all: [],
                    selected: null,
                },
                bottom: {
                    show: false,
                    all: [],
                    selected: null,
                },
                pants: {
                    show: false,
                    all: [],
                    selected: null,
                },
                shorts: {
                    show: false,
                    all: [],
                    selected: null,
                },
                skirt: {
                    show: false,
                    all: [],
                    selected: null,
                },
                leggings: {
                    show: false,
                    all: [],
                    selected: null,
                },
                dress: {
                    show: false,
                    all: [],
                    selected: null,
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
                    selected: null,
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
                axios.get(`${ROOT_URL.API}/items/type/${user}/top`, requestOptions),
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
            ])
                .then(res => {
                    const items = this.state.items;
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
                    this.setState({items});
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

    // method to retrieve random items of all types
    randomize = () => {
        const { allTops, allBottoms, allShoes } = this.state;
        let selectedTop, selectedBottom, selectedShoe;
        if (allTops.length > 0) {
            selectedTop = allTops[Math.floor(Math.random() * allTops.length)];
        }
        if (allBottoms.length > 0) {
            selectedBottom = allBottoms[Math.floor(Math.random() * allBottoms.length)];
        }
        if (allShoes.length > 0) {
            selectedShoe = allShoes[Math.floor(Math.random() * allShoes.length)];
        }
        this.setState({ selectedTop, selectedBottom, selectedShoe });
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
        console.log(Object.keys(this.state.items));
        const typesInCloset = Object.keys(this.state.items).filter(type => {
            this.state.items[type].all.length = 0
        });
        const selected = Object.keys(this.state.items).filter(key => this.state.items[key].show == true);
        console.log(typesInCloset);
        return (
            <div className="createContainer">
                <div className="layerSelect">
                    {/* FOR SOME REASON
                    THIS MAPPING FUNCTION 
                    ISN'T WORKING.
                    I'M NOT SURE 
                    WHAT IT IS,
                    BUT THIS IS WHERE YOU SHOULD START. */}
                    {Object.keys(this.state.items).map(type => {
                    return(<button
                        className={this.state.items[type].show
                            ?"create-button--active"
                            :"create-button"}
                        onClick={()=>{this.activateCategory(type)}}>
                        Text
                    </button>)})}
                    {/* <button className={this.state.items.top.show ?"create-button--active":"create-button"} onClick={()=>{this.activateCategory("top")}}>Top</button>
                    <button className={this.state.items.bottom.show ?"create-button--active":"create-button"} onClick={()=>{this.activateCategory("bottom")}}>Bottom</button>
                    <button className={this.state.items.shirt.show ?"create-button--active":"create-button"} onClick={()=>{this.activateCategory("shirt")}}>Shirt</button>
                    <button className={this.state.items.sweater.show ?"create-button--active":"create-button"} onClick={()=>{this.activateCategory("sweater")}}>Sweater</button>
                    <button className={this.state.items.jacket.show ?"create-button--active":"create-button"} onClick={()=>{this.activateCategory("jacket")}}>Jacket</button>
                    <button className={this.state.items.pants.show ?"create-button--active":"create-button"} onClick={()=>{this.activateCategory("pants")}}>Pants</button>
                    <button className={this.state.items.shorts.show ?"create-button--active":"create-button"} onClick={()=>{this.activateCategory("shorts")}}>Shorts</button>
                    <button className={this.state.items.skirt.show ?"create-button--active":"create-button"} onClick={()=>{this.activateCategory("skirt")}}>Skirt</button>
                    <button className={this.state.items.leggings.show ?"create-button--active":"create-button"} onClick={()=>{this.activateCategory("leggings")}}>Leggings</button>
                    <button className={this.state.items.dress.show ?"create-button--active":"create-button"} onClick={()=>{this.activateCategory("dress")}}>Dress</button>
                    <button className={this.state.items.formalShoes.show ?"create-button--active":"create-button"} onClick={()=>{this.activateCategory("formalShoes")}}>Formal Shoes</button>
                    <button className={this.state.items.casualShoes.show ?"create-button--active":"create-button"} onClick={()=>{this.activateCategory("casualShoes")}}>Casual Shoes</button> */}
                </div>
                <CardDeck>
                    {selected.forEach(key=>{
                        return(<CreateCard item={this.state.items[key].selected}/>)
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

export default Create;