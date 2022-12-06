import { Exercise } from '../models/exerciseModel.js';

export const updateAndGetExercise = async (
	id,
	name,
	imageId,
	times
) => {
	let data = {};

	if (name) {
		data.name = name;
	}

	if (imageId) {
		data.imageId = imageId;
	}

	if (!isNaN(times)) {
		data.times = times;
	}

	return Exercise.findOneAndUpdate(
		{ _id: id },
		{ $set: { ...data } },
		{ returnDocument: 'after' }
	);
};