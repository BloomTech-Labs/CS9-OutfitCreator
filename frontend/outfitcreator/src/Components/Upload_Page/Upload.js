import React, { Component } from 'react';
import axios from 'axios';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { CardImg, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { ROOT_URL } from '../../config';
import TagSearch from './TagSearch';
import './Upload.css';
import sha1 from 'sha1';

const CLOUD_API = '465735684648442';
const API_SECRET = 'HVxIWBW7bQaBHJygz_qiprAfwok';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // pairWith: [], // currently not used
            image: '',
            name: '',
            search: '',
            tags: [],
            type: 'top',
        }
    }

    generateSignature = () => {
        const { name } = this.state;
        const newName = name.trim();
        const timestamp = Date.now();
        const eager = 'w_400,h_300,c_crop';
        const object = {
            newName, timestamp, eager
        }
        const toBeStrings = [];
        Object.entries(object).forEach((key) => {
            toBeStrings.push(`${key[0]}=${key[1]}`);
        })
        const finalString = toBeStrings.sort().join('&') + API_SECRET;
        return sha1(finalString);
    }

    componentDidMount() {
        const user = this.props.getUserID();
        window.cloudinary.applyUploadWidget(document.getElementById('cloudinary--uploader'),
            {
                secure: true,
                cloud_name: 'cloudtesting',
                api_key: CLOUD_API,
                upload_preset: 'default',
                sources: ['local', 'url', 'instagram'],
                theme: 'purple'
            },
            (err, result) => {
                if (result) {
                    console.log(result['0']);
                    this.setState({ image: result['0'].secure_url, result: result['0'] });
                }
            });
        this.setState({ user });
    }

    fileChanged = event => {
        console.log(event.target.files);
        // this.setState({ image: event.target.files[0] });
        this.setState({ image: URL.createObjectURL(event.target.files[0]) });
    }

    saveTest = event => {
        event.preventDefault();
        console.log(this.state);
    }

    saveItem = e => {
        e.preventDefault();
        const { user, name, image, tags, type } = this.state;

        axios.post(`${ROOT_URL.API}/items`, {
            user, name, image, tags, type
        })
            .then(response => {
                console.log(response);
                this.setState({ image: '', name: '', tags: [], type: 'top' });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleInputChange = e => {
        e.target.type === 'select-one' ?
            this.setState({ [e.target.name]: e.target.value.toLowerCase() }) :
            this.setState({ [e.target.name]: e.target.value });
    }

    passState = state => {
        this.setState(state);
    }

    render() {
        // console.log(this.state);
        // console.log(this.props);
        // console.log(this.generateSignature(testobject));
        // let image;
        // if (this.state.result) {
        //     console.log(this.state.result);
        //     const { width, height } = this.state.result;
        //     let cropWidth = width, cropHeight = height;
        //     while (cropWidth >= 300 || cropHeight >= 200) {
        //         (cropWidth *= 0.9), (cropHeight *= 0.9);
        //     }
        //     const crop = `/upload/w_${cropWidth.toFixed(0)},h_${cropHeight.toFixed(0)}/`;
        //     const [partOne, partTwo] = this.state.image.split("/upload/");
        //     image = partOne + crop + partTwo;
        //     console.log(image);
        // }
        return (
            <div className='container--upload'>
                <div className='upload--columns'>
                    <div className="column--left">
                        {this.state.image ?
                            <CardImg
                                className="upload--image"
                                src={this.state.image}
                                alt="Upload Image Thumbnail"
                            /> :
                            <CardImg
                                className="upload--image"
                                src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                                alt="Upload Image Thumbnail"
                            />
                        }
                        <FormGroup>
                            <CloudinaryContext cloudName="cloudtesting">
                                <div id='cloudinary--uploader' />
                            </CloudinaryContext>
                            <br />
                            <Input
                                type="text"
                                name="name"
                                className="upload--name"
                                placeholder="Clothing Name"
                                autoComplete='off'
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                className='upload--select'
                                type='select'
                                name='type'
                                onChange={this.handleInputChange}>
                                <option>Top</option>
                                <option>Bottom</option>
                                <option>Shoes</option>
                            </Input>
                        </FormGroup>
                    </div>
                    <div className="column--right">
                        <TagSearch
                            state={this.state}
                            passState={this.passState}
                        />
                        <Label>Pair With:</Label>
                        <Form className='upload--pairWith'>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type='checkbox'
                                        id='upload--topsCheckbox'
                                        name='tops'
                                        onChange={this.testInput}
                                    />
                                    Tops
                            </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type='checkbox'
                                        id='upload--bottomsCheckbox'
                                        name='bottom'
                                        onChange={this.testInput}
                                    />
                                    Bottoms
                            </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type='checkbox'
                                        id='upload--shoesCheckbox'
                                        name='shoes'
                                        onChange={this.testInput}
                                    />
                                    Shoes
                            </Label>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                <Button className="upload--save" onClick={this.saveItem}>Save</Button>
            </div>
        );
    }
}

export default Upload;