import { ExerciseLog } from '../models/exerciseLogModel.js';
import { WorkoutLog } from '../models/workoutLogModel.js';

export const getUserTotalLog = async (userId) => {
	const exerciseLogByUser = await ExerciseLog
		.find({
			user: userId,
			completed: true
		});

	const totalWorkouts = await WorkoutLog
		.find({ user: userId, completed: true })
		.countDocuments();

	let totalExercisesTimesCompleted = 0;
	let totalWeight = 0;

	exerciseLogByUser.forEach(exerciseLog => {
		totalExercisesTimesCompleted += exerciseLog.times.length;

		exerciseLog.times.forEach(time => {
			totalWeight += time.weight;
		})
	});

	const totalMinutes = Math.ceil(totalExercisesTimesCompleted * 2.3);

	return {
		totalMinutes,
		totalWorkouts,
		totalWeight
	};
};