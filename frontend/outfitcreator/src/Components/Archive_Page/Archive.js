import React from 'react';
import OutfitCard from './OutfitCard';
import './Archive.css';

class Archive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            searching: false,
            outfits: [],
            searchedOutfits: []
        };
    }

    filter = () => {
        const { search, outfits } = this.state;
        const filteredOutfits = outfits.filter( (outfit) => outfit.nickname.toLowerCase().includes(search.toLowerCase()))
        this.setState({ searchedOutfits: filteredOutfits })
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        if (this.state.search.length === 0) this.setState({ searching: false });
        else {
            this.setState({ searching: true });
            this.filter();
        }
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
                    />
                </div>
                {this.state.searching ?
                    <div className='archive--collection'>
                        {this.state.searchedOutfits.map((outfit) => (
                            <OutfitCard />
                        ))}
                    </div> :
                    <div className='archive--collection'>
                        {this.state.outfits.map((outfit) => (
                            <OutfitCard />
                        ))}
                    </div>
                }
            </div>
        );
    }
}

export default Archive;