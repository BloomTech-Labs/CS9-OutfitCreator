import React from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard';
import { ROOT_URL } from '../../config'; 
import './Archive.css';

class Archive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            searching: false,
            searchedOutfits: [],
            myOutfits: []
        };
    }

    componentDidMount() {
        this.getOutfits();
    }

    getOutfits = () => {
        const user = this.props.getUserID();
        const authToken = localStorage.getItem('authToken');
        const requestOptions = {
            headers: {
                Authorization: authToken
            }
        }
        axios.get(`${ROOT_URL.API}/outfits/${user}/`, requestOptions)
            .then(response => { 

                this.setState({ myOutfits: response.data })
            })
            .catch(err => {
                console.log(err);
            });
    }

    filter = () => {
        const { search, myOutfits } = this.state;

        const searchWords = search.trim().toLowerCase().split(' ');
        // Filters from the outfit list based on context in search bar, by name and tag
        // i.e. if the name of outfit A was used as a tag in outfit B, both will show

        const myFilter = outfit => {
            let count = 0;
            while (count < searchWords.length) {
                if (outfit.name.toLowerCase().includes(searchWords[count]) ||
                    // eslint-disable-next-line
                    outfit.tags.some((tag) => (
                        tag.toLowerCase().includes(searchWords[count])
                    ))) {
                    count++;
                }
                //this is what makes it return false when something doesnt match
                //allowing for exact match filtering
                else break;
            }
            if (count === searchWords.length) return true;
            else return false;
        }

        const filteredOutfits = myOutfits.filter(myFilter);
        if (search.length === 0) this.setState({ searching: false, searchedOutfits: filteredOutfits });
        else this.setState({ searching: true, searchedOutfits: filteredOutfits });
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div className='container--archive'>
                <div className='archive--search'>
                    <input
                        type='search'
                        name='search'
                        placeholder='search'
                        className='search--input'
                        value={this.state.search}
                        onChange={this.handleInputChange}
                        onKeyUp={this.filter}
                    />
                </div>
                {/* ternary to check if outfits loaded correctly*/}
                {this.state.myOutfits ?
                    // ternary to check if filter is being run or not
                    (this.state.searching ? (
                        <div>
                            {this.state.searchedOutfits.map((outfit) => (
                                <OutfitCard
                                    key={outfit._id}
                                    outfitId={outfit._id}
                                    name={outfit.name}
                                    src={[...outfit.top, ...outfit.bottom, outfit.shoes]}
                                    lastWorn={outfit.worn}
                                />
                            ))}
                        </div>
                    ) : (
                            <div>
                                {this.state.myOutfits.map((outfit) => (
                                    <div key={outfit._id}>
                                    <OutfitCard
                                        key={outfit._id}
                                        outfitId={outfit._id}
                                        name={outfit.name}
                                        src={[...outfit.top, ...outfit.bottom, outfit.shoes]}
                                        lastWorn={outfit.worn}
                                    />
                                    </div>
                                ))}
                            </div>
                        ))
                        //end of the inner ternary for the filter check
                    :
                    <div className='archive--collection'>
                        Error Loading Collection
                    </div>
                } {/*end of the outer ternary to check if outfits loaded correctly*/}
            </div>
        );
    }
}

export default Archive;