import mongoose from 'mongoose';

const exerciseSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	times: {
		type: Number,
		required: true
	},
	imageId: {
		type: Number,
		required: true
	},
}, {
	minimize: false,
	timestamps: true
});

export const Exercise = mongoose.model('Exercise', exerciseSchema);