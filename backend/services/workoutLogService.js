import { WorkoutLog } from '../models/workoutLogModel.js';
import { Workout } from '../models/workoutModel.js';
import { ExerciseLog } from '../models/exerciseLogModel.js';

export const createAndGetNewWorkoutLog = async (workoutId, userId) => {
	const workout = await Workout
		.findById(workoutId)
		.populate('exercises');

	if (!workout) {
		throw new Error('Тренировка не найдена.')
	}

	const workoutLog = await WorkoutLog.create({
		user: userId,
		workout: workoutId
	});

	const exercisesLogs = workout.exercises.map(exercise => {
		const timesArray = [];

		for (let i = 0; i < exercise.times; i++) {
			timesArray.push({
				weight: 0,
				repeat: 0
			});
		}

		return {
			user: userId,
			exercise: exercise._id,
			times: timesArray,
			workoutLog: workoutLog._id
		}
	});

	const createdExerciseLogs = await ExerciseLog.insertMany(exercisesLogs);

	workoutLog.exerciseLogs = createdExerciseLogs.map(exercisesLog => exercisesLog._id);

	return workoutLog.save();
};