import React, { Component } from 'react';
import { Input, InputGroup, InputGroupAddon,  } from 'reactstrap';
import './TagSearch.css';
import SearchIcon from '../../search.png';

class TagSearch extends Component {
    constructor(props) {
        super();
    }

    addTag = (e) => {
        if(e.key === 'Enter' && !this.props.state.tags.includes(this.props.state.search)) {
            this.props.passState({ 
                tags: [...this.props.state.tags, this.props.state.search],
                search: ''
            });
        }
    }

    removeTag = (e) => {
        this.props.passState({ 
            tags: this.props.state.tags.filter(tag => tag !== e.target.nextElementSibling.innerHTML) 
        });
    }

    getTags = () => {
      // Axios call?
    }

    handleInputChange = (e) => {
        this.props.passState({ search: e.target.value });
    }

    render () {
        return (
          <div className='container--tagSearch'>
            <InputGroup>
                <InputGroupAddon 
                    className='tagSearch--icon' 
                    addonType='prepend'>
                    <img src={SearchIcon} alt='Magnifying Glass' />
                </InputGroupAddon>
                <Input 
                    className='tagSearch--input' 
                    type='text' 
                    name='search' 
                    placeholder='Search' 
                    value={this.props.state.search} 
                    onChange={this.handleInputChange} 
                    onKeyPress={this.addTag} 
                />
            </InputGroup>
            <div className='tagSearch--view'>
                {this.props.state.tags.map(tag => (
                    <div className={'tagSearch--tag ' + tag} key={this.props.state.tags.indexOf(tag)}>
                        <span className='tagSearch--delete' onClick={this.removeTag}>x</span>
                        <span>{tag}</span>
                    </div>
                ))}
            </div>
          </div>
        );
    }
}

export default TagSearch;