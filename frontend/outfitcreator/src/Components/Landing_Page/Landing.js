import './Landing.css';
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import {
    Button,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';

// This is just filler data for the slides, when we make pictures for the outfit creator this will be replaced
const items = [
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Filler Slide 1',
        caption: 'Filler Slide 1'
    },
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Filler Slide 2',
        caption: 'Filler Slide 2'
    },
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Filler Slide 3',
        caption: 'Filler Slide 3'
    }
];

class Landing extends Component {
    constructor(props) {
        super(props);
        // Tracks the current index of the carousel
        this.state = { activeIndex: 0 };
    }

    onExiting = () => {
        this.animating = true;
    }

    onExited = () => {
        this.animating = false;
    }

    next = () => {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous = () => {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex = (newIndex) => {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;

        // Creates the Slides we want to display on the carousel
        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img src={item.src} alt={item.altText} />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            );
        });

        return (
            <div className='container--landingPage'>
                <div className='landingPage--modals'>
                    <SignUp />
                    <Route exact path='/signin' render={props => <SignIn {...props} onSignin={this.props.onSignin} />} />
                    <SignIn onSignin={this.props.onSignin} />
                </div>
           
                {/* <div className='landingPage--animations'>
                    <div className='animation--top'>
                    <img src='https://res.cloudinary.com/cloudtesting/image/upload/w_300,h_400/v1534808124/icons8-t-shirt-480.png' alt='top' className='animation--top' />
                    </div>
                    <div className='animation--pants'>
                    <img src='https://res.cloudinary.com/cloudtesting/image/upload/w_200,h_300/v1534808124/icons8-shorts-480.png' alt='pants' />
                    </div>
                    <div className='animation--shoes--first'>
                    <img src='https://res.cloudinary.com/cloudtesting/image/upload/w_200,h_200/v1534808126/icons8-work-boot-500.png' alt='shoes' />
                    </div>
                    <div className='animation--shoes--second'>
                    <img src='' alt='shoes' />
                    </div>
                    <div className='animation--shoes'>
                    <img src='' alt='shoes' />
                    </div>
                </div> */}
                <div className='landingPage--description'>
                    <h1>Outfit Maker</h1>
                    <div className='description--opening'>The easy way to:</div>
                    <ul className='description--list'>
                        <li className='list--item'>
                            - Keep track of your favorite styles
                        </li>
                        <li className='list--item'>
                            - Remember when an outfit was last worn
                        </li>
                        <li className='list--item'>
                            - See different combinations without messing up your closet
                        </li>
                    </ul>
                    <div className='description--closing'>AND we can even randomize your options to try and come up with new combinations!</div>
                </div>
                <div className='landingPage--button'>
                    <Link to='/Create'>
                        <Button color='success'>Check it out </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Landing;
