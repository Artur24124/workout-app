import asyncHandler from 'express-async-handler';
import {
	createAndGetNewWorkout,
	getWorkoutWithExercisesMinutes,
	updateAndGetWorkout
} from '../../services/workoutService.js';
import { Workout } from '../../models/workoutModel.js';

// @desc		Create new workout
// @route		POST /api/workouts
// @access	Private
export const createNewWorkout = asyncHandler(async (req, res) => {
	const newWorkout = await createAndGetNewWorkout(
		req.body.name,
		req.body.exercises
	);

	res.json(newWorkout);
});

// @desc		Get workouts
// @route		GET /api/workouts
// @access	Private
export const getWorkouts = asyncHandler(async (req, res) => {
	const workouts = await Workout.find({});

	res.json(workouts);
});

// @desc		Get workout
// @route		GET /api/workouts/:id
// @access	Private
export const getWorkout = asyncHandler(async (req, res) => {
	const workoutWithMinutes = await getWorkoutWithExercisesMinutes(req.params.id);

	res.json(workoutWithMinutes);
});

// @desc		Update workout
// @route		PUT /api/workouts/:id
// @access	Private
export const updateWorkout = asyncHandler(async (req, res) => {
		const updatedWorkout = await updateAndGetWorkout(
			req.params.id,
			req.body.name,
			req.body.exercises
		);

		res.json(updatedWorkout);
});

// @desc		Delete workout
// @route		DELETE /api/workouts/:id
// @access	Private
export const deleteWorkout = asyncHandler(async (req, res) => {
	await Workout.deleteOne({ _id: req.params.id });

	res.json({
		message: 'Тренировка была удалена.',
		result: true
	});
});