import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardDeck, Button, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import queryString from 'query-string';

import { ROOT_URL } from '../../config';
import './Create.css';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            name: '',
            worn: [],
            tags: [],
            allTops: [],
            allBottoms: [],
            allShoes: [],
            selectedTop: [],
            selectedBottom: [],
            selectedShoe: []
        }
        this.setAuthToken();
    }

    setAuthToken = () => {
        const token = localStorage.getItem('authToken');

        if (token) axios.defaults.headers.common.Authorization = token;
        else delete axios.defaults.headers.common.Authorization;
    }

    componentDidMount() {
        const hash = queryString.parse(this.props.location.hash);
        if(hash.token) {
            console.log(hash.token);
            localStorage.setItem('authToken', `Bearer ${hash.token}`);
        }
        this.setAuthToken();
        // need to set authToken explicitly here to accomodate social auth
        const user = this.props.getUserID();
        const authToken = localStorage.getItem('authToken');

        if (authToken) {
            axios.all([
                axios.get(`${ROOT_URL.API}/items/type/${user}/top`),
                axios.get(`${ROOT_URL.API}/items/type/${user}/bottom`),
                axios.get(`${ROOT_URL.API}/items/type/${user}/shoes`),
            ])
                .then(res => {
                    this.setState({ allTops: res[0].data, allBottoms: res[1].data, allShoes: res[2].data, user });
                    this.randomize();
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            this.props.history.push('/');
        }
    }

    // method to retrieve random items of all types
    randomize = () => {
        const { allTops, allBottoms, allShoes } = this.state;
        let selectedTop, selectedBottom, selectedShoe;
        // let selectedTopTags = [];
        // let selectedBottomTags = [];
        // let selectedShoeTags = [];
        if (allTops.length > 0) {
            selectedTop = allTops[Math.floor(Math.random() * allTops.length)];
            // selectedTopTags = selectedTop.tags;
        }
        if (allBottoms.length > 0) {
            selectedBottom = allBottoms[Math.floor(Math.random() * allBottoms.length)];
            // selectedBottomTags = selectedBottom.tags;
        }
        if (allShoes.length > 0) {
            selectedShoe = allShoes[Math.floor(Math.random() * allShoes.length)];
            // selectedShoeTags = selectedShoe.tags;
        }
        // const tags = [...new Set([...selectedTopTags, ...selectedBottomTags, ...selectedShoeTags])]
        this.setState({ selectedTop, selectedBottom, selectedShoe });
    }

    // method to retrieve a single random item
    randomizeSingle = (event) => {
        const { allTops, allBottoms, allShoes } = this.state;

        if (event.target.parentNode.classList.contains('top')) {
            const selectedTop = allTops[Math.floor(Math.random() * allTops.length)];
            // const tags = [...new Set([...selectedTop.tags, ...selectedBottom.tags, ...selectedShoe.tags])]
            this.setState({ selectedTop })
        } else if (event.target.parentNode.classList.contains('bottom')) {
            const selectedBottom = allBottoms[Math.floor(Math.random() * allBottoms.length)];
            // const tags = [...new Set([...selectedTop.tags, ...selectedBottom.tags, ...selectedShoe.tags])]
            this.setState({ selectedBottom })
        } else if (event.target.parentNode.classList.contains('shoe')) {
            const selectedShoe = allShoes[Math.floor(Math.random() * allShoes.length)];
            // const tags = [...new Set([...selectedTop.tags, ...selectedBottom.tags, ...selectedShoe.tags])]
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
        const { user, name, worn, selectedTop, selectedBottom, selectedShoe } = this.state;
        const top = [selectedTop._id];
        const bottom = [selectedBottom._id];
        const shoes = selectedShoe._id;
        const tags = [...selectedTop.tags, ...selectedBottom.tags, ...selectedShoe.tags]
        const outfit = { user, name, worn, tags, top, bottom, shoes };
        axios
            .post(`${ROOT_URL.API}/outfits`, outfit)
            .then(() => this.props.history.push('/Archive'))
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        const { selectedTop, selectedBottom, selectedShoe } = this.state;
        let topImage, bottomImage, shoeImage;
        if (!selectedTop) {
            topImage = `https://picsum.photos/g/200/300?image=951`
        } else topImage = selectedTop.image;
        if (!selectedBottom) {
            bottomImage = `https://picsum.photos/g/200/300?image=951`
        } else bottomImage = selectedBottom.image;
        if (!selectedShoe) {
            shoeImage = `https://picsum.photos/g/200/300?image=951`
        } else shoeImage = selectedShoe.image;
      
        return (
            <div className="createContainer">
                {/* <CreateLayers {...this.props} /> */}
                <CardDeck>
                    {/* {items.map((item, index) => {
                        return (<Card key={index}inverse>
                            <CardImg
                                key={item._id}
                                width="80%"
                                src={item.image}
                                alt="Card image cap"
                                className="cardImage"
                            />
                            <CardImgOverlay className="test">
                                <Button className="close top" aria-label="Close" onClick={this.randomizeSingle}>
                                    <span aria-hidden="true">&times;</span>
                                </Button>
                            </CardImgOverlay>
                        </Card>)
                    })} */}
                    <Card inverse>
                        <CardImg
                            width="80%"
                            src={topImage}
                            alt="Card image cap"
                            className="cardImage"
                        />
                        <CardImgOverlay className="test">
                            <Button className="close top" aria-label="Close" onClick={this.randomizeSingle}>
                                <span aria-hidden="true">&times;</span>
                            </Button>
                        </CardImgOverlay>
                    </Card>
                    <Card inverse>
                        <CardImg
                            width="80%"
                            src={bottomImage}
                            alt="Card image cap"
                            className="cardImage"
                        />
                        <CardImgOverlay>
                            <Button className="close bottom" aria-label="Close" onClick={this.randomizeSingle}>
                                <span aria-hidden="true">&times;</span>
                            </Button>
                        </CardImgOverlay>
                    </Card>
                    <Card inverse>
                        <CardImg
                            width="80%"
                            src={shoeImage}
                            alt="Card image cap"
                            className="cardImage"
                        />
                        <CardImgOverlay>
                            <Button className="close shoe" aria-label="Close" onClick={this.randomizeSingle}>
                                <span aria-hidden="true">&times;</span>
                            </Button>
                        </CardImgOverlay>
                    </Card>
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