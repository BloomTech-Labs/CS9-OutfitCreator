import React, { Component } from 'react';
import axios from 'axios';
import { CloudinaryContext } from 'cloudinary-react';
import { CardImg, Button, FormGroup, Input } from 'reactstrap';
import { ROOT_URL } from '../../config';
import TagSearch from './TagSearch';
import uploadPlacholder from './uploadPlaceholder.png';
import './Upload.css';
// import sha1 from 'sha1';

const CLOUD_API = '465735684648442';
// const API_SECRET = 'HVxIWBW7bQaBHJygz_qiprAfwok';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            image: '',
            name: '',
            search: '',
            tags: [],
            type: 'top',
            options: {},
        }

        props.isUserPaid(paid => {
            const options = paid ? {
                    top: 'Top',
                    shirt: 'Shirt',
                    sweater: 'Sweater',
                    jacket: 'Jacket',
                    bottom: 'Bottom',
                    pants: 'Pants',
                    shorts: 'Shorts',
                    skirt: 'Skirt',
                    leggings: 'Leggings',
                    dress: 'Dress',
                    formalShoes: 'Formal Shoes',
                    casualShoes: 'Casual Shoes',
                    shoes: 'Shoes',
                } : { 
                    top: 'Top',
                    bottom: 'Bottom',
                    shoes: 'Shoes',
                }
            this.setState({ options });
        });
    }

    // generateSignature = () => {
    //     const { name } = this.state;
    //     const newName = name.trim();
    //     const timestamp = Date.now();
    //     const eager = 'w_400,h_300,c_crop';
    //     const object = {
    //         newName, timestamp, eager
    //     };
    //     const toBeStrings = [];
    //     Object.entries(object).forEach((key) => {
    //         toBeStrings.push(`${key[0]}=${key[1]}`);
    //     });
    //     const finalString = toBeStrings.sort().join('&') + API_SECRET;
    //     return sha1(finalString);
    // }

    componentDidMount() {
        const user = this.props.getUserID();
        window.cloudinary.applyUploadWidget(document.getElementById('cloudinary--uploader'),
            {
                secure: true,
                cloud_name: 'cloudtesting',
                api_key: CLOUD_API,
                upload_preset: 'default',
                multiple: false,
                // cropping: 'server',
                // cropping_show_dimensions: true,
                // cropping_show_back_button: true,
                sources: [
                    'local',
                     'url',
                     'camera',
                    //  'image_search',
                     'instagram',
                     'facebook'
                    ],
                theme: 'purple'
            },
            (err, result) => {
                if (result) {
                    console.log(result);
                    this.setState({ image: result['0'].secure_url, result: result['0'] });
                }
            });
        this.setState({ user });
    }
    
    uploadCount = (cb) => {
        axios.get(`${ROOT_URL.API}/items/user/${this.state.user}`)
            .then(res => {
                cb(res.data.length);
            })
            .catch(err => {
                console.log(err);
            });
    }

    fileChanged = event => {
        this.setState({ image: URL.createObjectURL(event.target.files[0]) });
    }

    saveItem = e => {
        e.preventDefault();

        this.props.isUserPaid(paid => {
            this.uploadCount(count => {
                if (!paid && count > 50) {
                    alert('Unpaid upload limit reached. Please subscribe to access our full range of content.');
                    return;
                }

                let { user, name, image, tags, type } = this.state;
                let subtype;
                const subtypeMap = {
                  top: ['sweater', 'shirt', 'jacket', 'dress'],
                  bottom: ['pants', 'shorts', 'leggings', 'skirt'],
                  shoes: ['casualShoes', 'formalShoes']
                }
                
                // If type is not top, bottom or shoes
                if (!['top', 'bottom', 'shoes'].includes(type)) {
                  subtype = type;
                  
                  // Search for subtype in subtypeMap and set vars
                  Object.entries(subtypeMap).forEach(pair => {
                    const mainType = pair[0];
                    const subtypeArr = pair[1];
        
                    if (subtypeArr.includes(type)) type = mainType;
                  })
                } else {
                    subtype = null;
                }
        
                if (subtype){
                    axios.post(`${ROOT_URL.API}/items`, {
                        user, name, image, tags, type, subtype
                    })
                        .then(response => {
                            console.log(response);
                            this.setState({ image: '', name: '', tags: [] });
                            this.saveTest();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    axios.post(`${ROOT_URL.API}/items`, {
                        user, name, image, tags, type
                    })
                        .then(response => {
                            console.log(response);
                            this.setState({ image: '', name: '', tags: [] });
                            this.saveTest();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            });
        });
    }

    toCamelCase(string) {
        const temp = string.split(' ');
        return [temp[0].toLowerCase(), temp[1]].join('');
    }

    handleInputChange = e => {
        e.target.type === 'select-one' ?
            this.setState({ [e.target.name]: this.toCamelCase(e.target.value) }) :
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
                        {this.state.image ?
                            <CardImg
                                className="upload--image"
                                src={this.state.image}
                                alt="Upload Image Thumbnail"
                            /> :
                            <CardImg
                                className="upload--image"
                                src={uploadPlacholder}
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
                                value={this.state.name}
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                className='upload--select'
                                type='select'
                                name='type'
                                placeholder="Item Type"
                                onChange={this.handleInputChange}>
                                {this.state.options ?
                                  Object.keys(this.state.options).map(option => (
                                    <option key={option}>{this.state.options[option]}</option>
                                  )) : null }
                            </Input>
                        </FormGroup>
                        <TagSearch
                            state={this.state}
                            passState={this.passState}
                        />
                </div>
                <Button className="button upload--save" onClick={this.saveItem}>Save</Button>
            </div>
        );
    }
}

export default Upload;