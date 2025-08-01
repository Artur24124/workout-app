import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const workoutSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	exercises: [{
		type: ObjectId,
		ref: 'Exercise',
		required: true
	}]
}, {
	minimize: false,
	timestamps: true
});

export const Workout = mongoose.model('Workout', workoutSchema);