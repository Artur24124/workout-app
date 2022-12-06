import asyncHandler from 'express-async-handler';
import { createAndGetNewWorkoutLog } from '../../services/workoutLogService.js';
import { WorkoutLog } from '../../models/workoutLogModel.js';

// @desc	Create new workout log
// @route /api/workouts/log
// @access Private
export const createNewWorkoutLog = asyncHandler( async (req, res) => {
	const newWorkoutLog = await createAndGetNewWorkoutLog(
		req.body.workoutId,
		req.user._id
	);

	res.json(newWorkoutLog);
});