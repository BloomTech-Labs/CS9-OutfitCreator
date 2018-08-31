import React from 'react';

class CreateCard extends React.Component {
    render() {
        const URL=this.props.item.image;
        const newURL = URL.slice(0,53)+"h_120/"+URL.slice(53);
        console.log(newURL);
        return (
            <div className="create-card">
                <Card inverse className="ITEM-TYPE">
                        <CardImg
                            width="80%"
                            src={topImage.image}
                            alt="Card image cap"
                            className="cardImage"
                        />
                        <CardImgOverlay className="test">
                            <Button className="close top" aria-label="Close" onClick={this.randomizeSingle}>
                                <span aria-hidden="true">&times;</span>
                            </Button>
                        </CardImgOverlay>
                    </Card>
            </div>
        )
    }
}

export default CreateCard;