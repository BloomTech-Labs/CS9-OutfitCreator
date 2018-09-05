import React, { Component } from 'react';
import { CardDeck, Button, Input } from 'reactstrap';
import CreateCard from './CreateCard.js';
import { ROOT_URL } from '../../config';
import axios from 'axios';
import './Create.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icons } from '../Icons';

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
                    title: 'Tops',
                    show: false,
                    all: [],
                    current: null,
                    icon: Icons.top,
                },
                bottom: {
                    title: 'Bottoms',
                    show: false,
                    all: [],
                    current: null,
                    icon: Icons.bottom,
                },
                shoes: {
                    title: 'Shoes',
                    show: false,
                    all: [],
                    current: null,
                    icon: Icons.casualShoes,
                },
            },
            subtypeMap: {
              top: ['sweater', 'shirt', 'jacket', 'dress'],
              bottom: ['pants', 'shorts', 'leggings', 'skirt'],
              shoes: ['casualShoes', 'formalShoes']
            },
        }

        this.setTypes();
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

    setTypes = () => {
        const paidItems = {
            top: {
                title: 'Tops',
                show: false,
                all: [],
                current: null,
                icon: Icons.top,
            },
            shirt: {
                title: 'Shirt',
                show: false,
                all: [],
                current: null,
                icon: Icons.shirt,
            },
            sweater: {
                title: 'Sweater',
                show: false,
                all: [],
                current: null,
                icon: Icons.sweater,
            },
            jacket: {
                title: 'Jacket',
                show: false,
                all: [],
                current: null,
                icon: Icons.jacket,
            },
            dress: {
                title: 'Dress',
                show: false,
                all: [],
                current: null,
                icon: Icons.dress,
            },
            bottom: {
                title: 'Bottoms',
                show: false,
                all: [],
                current: null,
                icon: Icons.bottom,
            },
            pants: {
                title: 'Pants',
                show: false,
                all: [],
                current: null,
                icon: Icons.pants,
            },
            shorts: {
                title: 'Shorts',
                show: false,
                all: [],
                current: null,
                icon: Icons.shorts,
            },
            skirt: {
                title: 'Skirt',
                show: false,
                all: [],
                current: null,
                icon: Icons.skirt,
            },
            leggings: {
              title: 'Leggings',
              show: false,
              all: [],
              current: null,
              icon: Icons.leggings,
            },
            shoes: {
                title: 'Shoes',
                show: false,
                all: [],
                current: null,
                icon: Icons.casualShoes,
            },
            formalShoes: {
              title: 'Fromal Shoes',
              show: false,
              all: [],
              current: null,
              icon: Icons.formalShoes,
            },
            casualShoes: {
                title: 'Casual Shoes',
                show: false,
                all: [],
                current: null,
                icon: Icons.casualShoes,
            },
        }

        this.props.isUserPaid(paid => {
            if (paid) this.setState({ items: paidItems });
        });
    }

    componentDidMount() {
        const user = this.props.getUserID();

        if (user) {
            axios.all([
                axios.get(`${ROOT_URL.API}/items/type/${user}/top`),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/shirt`),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/sweater`),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/jacket`),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/dress`),
                axios.get(`${ROOT_URL.API}/items/type/${user}/bottom`),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/pants`),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/shorts`),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/skirt`),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/leggings`),
                axios.get(`${ROOT_URL.API}/items/type/${user}/shoes`),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/formalShoes`),
                axios.get(`${ROOT_URL.API}/items/subtype/${user}/casualShoes`),
            ])
                .then(res => {
                    const items = { ...this.state.items };

                    Object.keys(items).forEach((item, idx) => {
                        items[item].all = res[idx].data;
                    });

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
        const typesInCloset = this.getTypesInCloset();
        const items = { ...this.state.items };


        // Swap show value of clicked element
        items[category].show = !items[category].show;

        // Special cases after default click?
        const { subtypeMap } = this.state;

        const mainTypes = Object.keys(subtypeMap);
        const shoeTypes = ['shoes', ...subtypeMap.shoes];

        // Allow only one shoe type to be active
        if (shoeTypes.includes(category)) {
            shoeTypes.forEach(type => {
                if (category != type) {
                    if(items[type]) items[type].show = false;
                }
            })
        // If category is of mainType then toggle off all subtypes
        } else if (mainTypes.includes(category)) {
            subtypeMap[category].forEach(subtype => {
                if(items[subtype] && typesInCloset.includes(subtype)) 
                    items[subtype].show = items[category].show;
            });
        // Otherwise toggle off main of subtype
        } else {
            Object.entries(subtypeMap).forEach(pair => {
                console.log(pair, category);
                if (pair[1].includes(category)) {
                  items[pair[0]].show = false;
                }
            });
        }

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
        const items = this.state.items;
        const selected = this.getSelected();
        const groups = { top: [], bottom: [], shoes: null };
        const { subtypeMap } = this.state;

        selected.forEach(type => {
              if (type.toLowerCase().includes('shoe')) {
                  groups.shoes = items[type].current;
              } else {
                  Object.entries(subtypeMap).forEach(pair => {
                      const mainType = pair[0];
                      const subTypes = pair[1];
    
                      if (mainType === type || subTypes.includes(type)) {
                          groups[mainType].push(items[type].current);
                      }
                  });
              }
        });

        const user = this.props.getUserID();
        const { name, worn, tags } = this.state;
        const { top, bottom, shoes } = groups;
        const outfit = { user, name, worn, tags, top, bottom, shoes };
        console.log(outfit);

        axios.post(`${ROOT_URL.API}/outfits`, outfit)
            .then(() => {
                this.props.history.push('/Archive')
            })
            .catch(err => {
                console.log(err);
            });
    };

    getTypesInCloset = () => { 
        return Object.keys(this.state.items).filter(type => {
            return this.state.items[type].all.length > 0;
        });
    }

    render() {
        const typesInCloset = this.getTypesInCloset();
        const selected = this.getSelected();

        return (
            <div className="createContainer">
                <div className="layerSelect">
                    {typesInCloset.map(type => (
                        <button
                            className={this.state.items[type].show ? "create-button--active" : "create-button"}
                            onClick={() => { this.activateCategory(type) }}
                            key={type} > {this.state.items[type].title} 
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