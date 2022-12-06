import { Workout } from '../models/workoutModel.js';

export const getWorkoutById = async (id) => {
	const workout = await Workout
		.findById(id)
		.populate('exercises')
		.lean();

	if (!workout) {
		throw new Error('Тренировка не найдена.');
	}

	return workout;
};

export const createAndGetNewWorkout = async (name, exercises) => {
	return Workout.create({
		name,
		exercises
	});
}

export const getWorkoutWithExercisesMinutes = async (id) => {
	const workout = await getWorkoutById(id);

	const minutes = Math.ceil(workout.exercises.length * 3.7);

	return {
		...workout,
		minutes
	};
};

export const updateAndGetWorkout = async (id, name, exercises) => {
	let data = {};

	if (name) {
		data.name = name;
	}

	if (exercises && Array.isArray(exercises)) {
		data.exercises = exercises;
	}

	return Workout.findOneAndUpdate(
		{ _id: id },
		{ $set: { ...data } },
		{ returnDocument: 'after' }
	).populate('exercises');
}