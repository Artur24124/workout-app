import asyncHandler from 'express-async-handler';
import {
	createExerciseLogWithTimes, findCompletedExerciseLogs,
	getFormattedExerciseLog,
	updateCompletedFromExerciseLog,
	updateTimeFromExerciseLog
} from '../../services/exerciseLogService.js';

// @desc		Create new exercise log
// @params	POST /api/exercises/log
// @access	Private
export const createNewExerciseLog = asyncHandler(async (req, res) => {
	const newExerciseLog = await createExerciseLogWithTimes(
		req.body.exerciseId,
		req.body.workoutLog,
		req.body.times,
		req.user._id
	);

	res.json(newExerciseLog);
});

// @desc		Get exercise log
// @route		GET /api/exercises/log/:id
// @access	Private
export const getExerciseLog = asyncHandler(async (req, res) => {
	const exerciseLog	= await getFormattedExerciseLog(
		req.params.id,
		req.user._id
	);

	res.json(exerciseLog);
});

// @desc		Get exercise log list
// @route		/api/exercises/log
// @access	Private
export const getExerciseLogList = asyncHandler(async (req, res) => {
	const exerciseLogList = await findCompletedExerciseLogs(req.user._id);

	res.json(exerciseLogList);
});

// @desc		Update exercises log data times
// @route		PUT /api/exercises/log/:id
// @access	Private
export const updateDataTimesExerciseLog = asyncHandler(async (req, res) => {
	const updatedExerciseLog = await updateTimeFromExerciseLog(
		req.params.id,
		req.body.timeIndex,
		req.body.timeKey,
		req.body.timeValue
	);

	res.json(updatedExerciseLog);
});

// @desc		Update status of complete exercise log
// @route		PATCH /api/exercises/log/:id/completed
// @access	Private
export const updateCompletedExerciseLog = asyncHandler( async (req, res) => {
	const updatedExerciseLog = await updateCompletedFromExerciseLog(
		req.params.id,
		req.body.completed
	);

	res.json(updatedExerciseLog);
});