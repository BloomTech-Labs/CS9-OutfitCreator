import React from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard';
import './Archive.css';

const testUser = '5b772cde26426245c86f0eea';

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
        axios.get(`http://localhost:5001/outfits/${testUser}/`)
            .then(response => {
                this.setState({ myOutfits: response.data })
            })
            .catch(err => {
                console.log(err);
            });
        console.log(this.state)
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
        if (this.state.myOutfits[0]) {
            console.log(this.state.myOutfits[0]._id)
        }
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
                {this.state.myOutfits ?
                    (this.state.searching ? (
                        < div className='archive--collection'>
                            {this.state.searchedOutfits.map((outfit) => (
                                <OutfitCard
                                    key={outfit._id}
                                    name={outfit.name}
                                    src={[...outfit.top, ...outfit.bottom, outfit.shoes]}
                                    lastWorn={outfit.worn}
                                />
                            ))}
                        </div>
                    ) : (
                            < div className='archive--collection'>
                                {this.state.myOutfits.map((outfit) => (
                                    <OutfitCard
                                        key={outfit._id}
                                        name={outfit.name}
                                        src={[...outfit.top, ...outfit.bottom, outfit.shoes]}
                                        lastWorn={outfit.worn}
                                    />
                                ))}
                            </div>
                        ))
                    :
                    <div className='archive--collection'>
                        Error Loading Collection
                    </div>
                }
            </div>
        );
    }
}

export default Archive;