import React from 'react';
import OutfitCard from './OutfitCard';
import './Archive.css';

class Archive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            searching: false,
            outfits: [{
                id: 0,
                name: 'Evening Gown',
                tags: ['Hot', 'expensive', 'red', 'silk', 'night wear', 'cloth'],
                img: 'blank for now sorry',
                date: '08/15/2018'
            },
            {
                id: 1,
                name: 'day suit',
                tags: ['Hot', 'blue', 'cheap', 'cloth'],
                img: 'blank for now sorry',
                date: '08/15/2018'
            },
            {
                id: 2,
                name: 'night Gown',
                tags: ['expensive', 'purple', 'silk'],
                img: 'blank for now sorry',
                date: '08/15/2018'
            },
            {
                id: 3,
                name: 'ski gear',
                tags: ['sexy', 'red', 'polyester'],
                img: 'blank for now sorry',
                date: '08/15/2018'
            },
            {
                id: 4,
                name: 'Evening Gown',
                tags: ['Hot', 'expensive', 'red', 'silk', 'night wear', 'cloth'],
                img: 'blank for now sorry',
                date: '08/15/2018'
            },
            {
                id: 5,
                name: 'day suit',
                tags: ['Hot', 'blue', 'cheap', 'cloth'],
                img: 'blank for now sorry',
                date: '08/15/2018'
            },
            {
                id: 6,
                name: 'night Gown',
                tags: ['expensive', 'purple', 'silk'],
                img: 'blank for now sorry',
                date: '08/15/2018'
            },
            {
                id: 7,
                name: 'ski gear',
                tags: ['sexy', 'red', 'polyester'],
                img: 'blank for now sorry',
                date: '08/15/2018'
            },
            {
                id: 8,
                name: 'Evening Gown',
                tags: ['Hot', 'expensive', 'red', 'silk', 'night wear', 'cloth'],
                img: 'blank for now sorry',
                date: '08/15/2018'
            },
            {
                id: 9,
                name: 'day suit',
                tags: ['Hot', 'blue', 'cheap', 'cloth'],
                img: 'blank for now sorry',
                date: '08/15/2018'
            },
            {
                id: 10,
                name: 'night Gown',
                tags: ['expensive', 'purple', 'silk'],
                img: 'blank for now sorry',
                date: '08/15/2018'
            },
            {
                id: 11,
                name: 'ski gear',
                tags: ['sexy', 'red', 'polyester'],
                img: 'blank for now sorry',
                date: '08/15/2018'
            },
            {
                id: 12,
                name: 'Evening Gown',
                tags: ['Hot', 'expensive', 'red', 'silk', 'night wear', 'cloth'],
                img: 'blank for now sorry',
                date: '08/15/2018'
            },
            {
                id: 13,
                name: 'day suit',
                tags: ['Hot', 'blue', 'cheap', 'cloth'],
                img: 'blank for now sorry',
                date: '08/15/2018'
            },
            {
                id: 14,
                name: 'night Gown',
                tags: ['expensive', 'purple', 'silk'],
                img: 'blank for now sorry',
                date: '08/15/2018'
            },
            {
                id: 15,
                name: 'ski gear',
                tags: ['sexy', 'red', 'polyester'],
                img: 'blank for now sorry',
                date: '08/15/2018'
            }],
            searchedOutfits: []
        };
    }

    filter = () => {
        const { search, outfits } = this.state;
        const searchWords = search.trim().split(' ');
        // Filters from the outfit list based on context in search bar, by name and tag
        // i.e. if the name of outfit A was used as a tag in outfit B, both will show
        const filteredOutfits = outfits.filter((outfit) => (
            outfit.name.toLowerCase().includes(search.toLowerCase()) ||
            outfit.tags.some((tag) => (
                tag.toLowerCase().includes(search.toLowerCase()) ||
                searchWords.some((word) => (
                    tag.toLowerCase().includes(word.toLowerCase()) ||
                    outfit.name.toLowerCase().includes(word.toLowerCase())
                ))
            ))
        ))
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
                        onKeyUp={this.filter}
                    />
                </div>
                {this.state.searching ?
                    <div className='archive--collection'>
                        {this.state.searchedOutfits.map((outfit) => (
                            <OutfitCard
                                key={outfit.id}
                                name={outfit.name}
                                src={outfit.img}
                                lastWorn={outfit.date}
                            />
                        ))}
                    </div> :
                    <div className='archive--collection'>
                        {this.state.outfits.map((outfit) => (
                            <OutfitCard
                                key={outfit.id}
                                name={outfit.name}
                                src={outfit.img}
                                lastWorn={outfit.date}
                            />
                        ))}
                    </div>
                }
            </div>
        );
    }
}

export default Archive;