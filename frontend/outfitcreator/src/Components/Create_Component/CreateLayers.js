import React, { Component } from 'react';
import { Card, CardText, CardImg, CardImgOverlay, CardDeck, Button, Input } from 'reactstrap';
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
                    show: false,
                    allTops: [],
                    selectedTop: null
                },
                shirt: {
                    show: false,
                    allShirts: [],
                    selectedShirt: null,
                },
                sweater: {
                    show: false,
                    allSweaters: [],
                    selectedSweater: null,
                },
                jacket: {
                    show: false,
                    allJackets: [],
                    selectedJacket: null,
                },
                bottom: {
                    show: false,
                    allBottoms: [],
                    selectedBottom: null,
                },
                pants: {
                    show: false,
                    allPants: [],
                    selectedPants: null,
                },
                shorts: {
                    show: false,
                    allShorts: [],
                    selectedShorts: null,
                },
                skirt: {
                    show: false,
                    allSkirts: [],
                    selectedSkirt: null,
                },
                leggings: {
                    show: false,
                    allLeggings: [],
                    selectedLeggings: null,
                },
                dress: {
                    show: false,
                    allDresses: [],
                    selectedDress: null,
                },
                shoes: {
                    show: false,
                    allShoes: [],
                    selectedShoes: null,
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
                axios.get(`${ROOT_URL.API}/items/type/${user}/shoes`, requestOptions),
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
        const { selectedTop, selectedBottom, selectedShoe } = this.state;
        let topImage, bottomImage, shoeImage;
        if (!selectedTop) {
            topImage = `https://picsum.photos/g/200/300?image=951`
        } else topImage = selectedTop;
        if (!selectedBottom) {
            bottomImage = `https://picsum.photos/g/200/300?image=951`
        } else bottomImage = selectedBottom;
        if (!selectedShoe) {
            shoeImage = `https://picsum.photos/g/200/300?image=951`
        } else shoeImage = selectedShoe;
        return (
            <div className="createContainer">
                <CardDeck>
                    <Card inverse>
                        <CardImg
                            width="80%"
                            src={topImage.image}
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
                            src={bottomImage.image}
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
                            src={shoeImage.image}
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