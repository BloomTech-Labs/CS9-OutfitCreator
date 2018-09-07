const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	name: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true,
		enum: [ 'top', 'bottom', 'shoes' ]
	},
	subtype: {
		type: String,
		required: false,
		enum: [
			'shirt',
			'sweater',
			'jacket',
			'pants',
			'shorts',
			'skirt',
			'leggings',
			'dress',
			'formalShoes',
			'casualShoes'
		]
	},
	tags: [
		{
			type: String
		}
	]
});

module.exports = mongoose.model('Item', ItemSchema);
