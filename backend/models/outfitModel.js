const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
    }],
    worn: [{
        type: Date,
    }],
    top: [{ // changing this to an array to account for layers
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    }],
    bottom: [{ // changing this to an array to account for layers
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    }],
    shoes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    },
});

module.exports = mongoose.model('Outfit', OutfitSchema);