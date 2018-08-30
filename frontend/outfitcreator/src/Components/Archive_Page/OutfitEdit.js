import React from 'react';
import axios from 'axios';
import { ROOT_URL } from '../../config';
import { withRouter } from 'react-router';
import { ROOT_URL } from '../../config';
import { Card, CardImg, CardDeck } from 'reactstrap';
import './OutfitEdit.css';

class OutfitEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            outfit: '',
            name: '',
            lastWorn: Date,
            worn: Date,
            top: '',
            bottom: '',
            shoes: ''
        }
    }

    componentDidMount() {
        this.getOutfit();
    }

    getOutfit = () => {
        const user = this.props.getUserID();
        const authToken = localStorage.getItem('authToken');
        const requestOptions = { headers: { Authorization: authToken } }
        const outfitId = this.props.location.pathname.split('Edit/')[1];
        axios.get(`${ROOT_URL.API}/outfits/${user}/${outfitId}`, requestOptions)
            .then(response => {
                const { data } = response;
                let lastWorn = data.worn[0];
                if (lastWorn) {
                    lastWorn = lastWorn.split('T')[0];
                }
                this.setState({ outfit: data, name: data.name, worn: data.worn, lastWorn })
            })
            .catch(err => {
                console.log(err);
            })
    }

    populate = id => {
        const user = this.props.getUserID();
        const authToken = localStorage.getItem('authToken');
        const requestOptions = { headers: { Authorization: authToken } }
        axios.get(`${ROOT_URL.API}/items/${user}/${id}`, requestOptions)
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

    redirectArchive = () => {
        this.props.history.push('/Archive');
        // this.props.location.pathname = '/Archive/';
        // window.location = this.props.location.pathname;
    }

    submitChanges = () => {
        const user = this.props.getUserID();
        // const authToken = localStorage.getItem('authToken');
        // const requestOptions = { headers: { Authorization: authToken } }
        const outfitId = this.props.location.pathname.split('Edit/')[1];
        const { name, worn, lastWorn } = this.state;
        if (lastWorn) worn.unshift(lastWorn);
        const newInfo = { name, worn };
        axios.put(`${ROOT_URL.API}/outfits/${user}/${outfitId}`, newInfo)
            .then()
            .catch(err => {
                console.log(err);
            });
        this.redirectArchive();
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
        return (
            outfit ? (
                <div className="createContainer">
                    <CardDeck>
                        <Card className='outfit--card' inverse>
                            <CardImg
                                width="80%"
                                src={top.image}
                                alt="Card image cap"
                            />
                        </Card>
                        <Card className='outfit--card' inverse>
                            <CardImg
                                width="80%"
                                src={bottom.image}
                                alt="Card image cap"
                            />
                        </Card>
                        <Card className='outfit--card' inverse>
                            <CardImg
                                width="80%"
                                src={shoes.image}
                                alt="Card image cap"
                            />
                        </Card>
                    </CardDeck>
                    <div className='container--editbox'>
                        <form>
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
                                        type='text'
                                        name='lastWorn'
                                        value={this.state.lastWorn}
                                        onChange={this.handleInput}
                                        className='edit--input'
                                    />
                                </div>
                            </div>
                            <div className='edit--buttons'>
                                <button className='edit--submit' onClick={this.submitChanges}>Submit</button>
                                <button className='edit--cancel' onClick={this.redirectArchive}>Cancel</button>
                            </div>
                        </form>
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