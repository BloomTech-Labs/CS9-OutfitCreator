import React from 'react';
import { Card, CardText, CardImg, CardImgOverlay, CardDeck, Button, Input } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router';
import './OutfitEdit.css';

const testUser = '5b745597a48cb52b0c1baedf';
const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://lambda-outfit-creator-api.herokuapp.com/' : 'http://localhost:5000';

class OutfitEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            outfit: '',
            name: '',
            lastWorn: '',
            top: '',
            bottom: '',
            shoes: ''
        }
    }

    componentDidMount() {
        this.getOutfit();
    }

    getOutfit = () => {
        const outfitId = this.props.location.pathname.split('Edit/')[1];
        axios.get(`${ROOT_URL}/outfits/${testUser}/${outfitId}`)
            .then(response => {
                this.setState({ outfit: response.data, name: response.data.name, lastworn: response.data.worn })
            })
            .catch(err => {
                console.log(err);
            })
    }

    populate = id => {
        axios.get(`${ROOT_URL}/items/${testUser}/${id}`)
            .then(response => {
                this.setState({ [response.data.type]: response.data })
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { outfit, top, bottom, shoes } = this.state;
        const sources = [];
        if (outfit) {
            sources.push(...outfit.top, ...outfit.bottom, outfit.shoes);
        }
        if (!top && !bottom && !shoes) {
            sources.forEach((id) => this.populate(id));
        }
        console.log(this.state)
        return (
            outfit ? (
                <div className="createContainer">
                    <CardDeck>
                        <Card inverse>
                            <CardImg
                                width="80%"
                                src={top.image}
                                alt="Card image cap"
                            />
                        </Card>
                        <Card inverse>
                            <CardImg
                                width="80%"
                                src={bottom.image}
                                alt="Card image cap"
                            />
                        </Card>
                        <Card inverse>
                            <CardImg
                                width="80%"
                                src={shoes.image}
                                alt="Card image cap"
                            />
                        </Card>
                    </CardDeck>
                    <div className='container--editbox'>
                        <div className='edit--header'>
                            <div className='header--title'>
                                Name: <input
                                    type='text'
                                    name='name'
                                    value={this.state.name}
                                    onChange={this.handleInput}
                                    className='edit--input'
                                />
                            </div>
                            <div className='edit--footer'>
                                Worn on: <input
                                    type='date'
                                    name='lastWorn'
                                    value={this.state.lastWorn}
                                    onChange={this.handleInput}
                                    className='edit--input'
                                />
                            </div>
                        </div>
                        <div className='edit--buttons'>
                            <button className='edit--submit'>Submit</button>
                            <button className='edit--cancel'>Cancel</button>
                        </div>
                    </div>
                </div>
            ) : (
                    <div className='container--archive'>
                        Loading Outfit
                    </div>
                )
        )
    }
}

export default withRouter(OutfitEdit);