import React from 'react';
import axios from 'axios';
import Imaging from './Imaging';
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

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        console.log(this.props)
        const { outfit } = this.state;
        const sources = [];
        if (outfit) {
            sources.push(...outfit.top, ...outfit.bottom, outfit.shoes);
        }
        console.log(sources)
        console.log(this.props.name)
        return (
            outfit ? (
                <div className='container--archive'>
                    <div className='container--edit' key={outfit.key}>
                        <div className='edit--header'>
                            <div className='header--title'>
                                <input
                                    name='name'
                                    value={this.state.name}
                                    onChange={this.handleInput}
                                />
                                {outfit.name}
                            </div>
                        </div>
                        <div className='edit--images'>
                            {sources.map((item) => {
                                if (item) {
                                    return <Imaging key={item} urlSrc={item} />
                                } else return null;
                            })}
                        </div>
                        <div className='edit--footer'>
                            <input
                                name='lastWorn'
                                value={this.state.lastWorn}
                                onChange={this.handleInput}
                            />
                            Worn on: {outfit.lastWorn}
                        </div>
                    </div>
                    <button className='edit--return'>Return</button>
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