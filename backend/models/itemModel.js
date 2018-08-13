const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['top', 'bottom', 'shoes'],
    },
    tags: [{
        type: String,
    }],
});

module.exports = mongoose.model('Item', ItemSchema);