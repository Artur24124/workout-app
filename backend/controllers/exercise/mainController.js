import asyncHandler from 'express-async-handler';
import { Exercise } from '../../models/exerciseModel.js';
import { updateAndGetExercise } from '../../services/exerciseService.js';

// @desc		Create new exercise
// @route		POST /api/exercises
// @access	Private
export const createNewExercise = asyncHandler(async (req, res) => {
	const { name, times, imageId } = req.body;

	const exercise = await Exercise.create({
		name,
		times,
		imageId
	});

	res.json(exercise);
});

// @desc		Get exercise
// @route		GET /api/exercises/:id
// @access	Private
export const getExercise = asyncHandler(async(req, res) => {
	const exercise = await Exercise.findById(req.params.id);

	res.json(exercise);
});

// @desc		Get exercises
// @route		GET /api/exercises/
// @access	Private
export const getExercises = asyncHandler(async(req, res) => {
	const exercises = await Exercise.find({});

	res.json(exercises);
});

// @desc		Update exercise
// @route		PUT /api/exercises/:id
// @access	Private
export const updateExercise = asyncHandler(async (req, res) => {
	const updatedExercise = await updateAndGetExercise(
		req.params.id,
		req.body.name,
		req.body.imageId,
		req.body.times
	);

	res.json(updatedExercise);
});

// @desc 		Delete exercise
// @route		DELETE /api/exercises/:id
// @access	Private
export const deleteExercise = asyncHandler(async (req, res) => {
	await Exercise.deleteOne({ _id: req.params.id });

	res.json({
		message: 'Упражнение было удалено.',
		result: true
	});
});