import { ExerciseLog } from '../models/exerciseLogModel.js';

export const findByIdExerciseLog = async (id) => {
	const exerciseLog = await ExerciseLog
		.findById(id)
		.populate('exercise', 'name imageId')
		.lean();

	if (!exerciseLog) {
		throw new Error('Статистика данного упражнения не найдена.')
	}

	return exerciseLog;
}

export const findCompletedExerciseLogs = async (userId) => {
	const exerciseLogs = await ExerciseLog
		.find({
			user: userId,
			completed: true
		})
		.populate('exercise', 'name image')
		.select('exercise createdAt')
		.lean();

	if (!exerciseLogs) {
		throw new Error('Статистика по упражнениям не найдена.');
	}

	return exerciseLogs;
};

export const createExerciseLogWithTimes = async (exerciseId, workoutLog, times, userId) => {
	let formattedTimes = [];

	for (let i = 0; i < times; i++) {
		formattedTimes.push({
			weight: 0,
			repeat: 0
		});
	}
	return ExerciseLog.create({
		exercise: exerciseId,
		user: userId,
		workoutLog,
		times: formattedTimes
	});
};

export const getFormattedExerciseLog = async (id, userId) => {
	const exerciseLog	= await findByIdExerciseLog(id);

	const prevExerciseLog = await ExerciseLog
		.find({
			user: userId,
			exercise: exerciseLog._id
		})
		.sort('desc')[0];

	exerciseLog.times = exerciseLog.times.map((time, i) => ({
		...time,
		prevWeight: prevExerciseLog ?
			prevExerciseLog.times[i].weight : 0,
		prevRepear: prevExerciseLog ?
			prevExerciseLog.times[i].repeat : 0
	}));

	return exerciseLog;
};

export const updateCompletedFromExerciseLog = async (
	id,
	completed
) => {
	return ExerciseLog.findOneAndUpdate(
		{ _id: id },
		{ $set: { completed } },
		{ returnDocument: 'after' }
	).populate([
		{ path: 'exercise', select: 'name imageId' },
		{
			path: 'workoutLog',
			populate: {
				path: 'exerciseLogs',
				model: 'ExerciseLog'
			}
		}
	]);
}

export const updateTimeFromExerciseLog = async (
	id,
	timeIndex,
	timeKey,
	timeValue
) => {
	const exerciseLog	= await findByIdExerciseLog(id);

	const isValidTimeValue = (typeof timeValue === 'boolean') ||
		(typeof timeValue === 'number' && !isNaN(timeValue));

	if (
		isNaN(timeIndex) ||
		!timeKey ||
		!isValidTimeValue
	) {
		throw new Error('Данные неккоректны или отсутствуют.')
	}

	exerciseLog.times[timeIndex][timeKey] = timeValue;

	return ExerciseLog.findOneAndUpdate(
		{ _id: id },
		{ $set: { times: exerciseLog.times } },
		{ returnDocument: 'after' }
	).populate('exercise', 'name imageId')
}