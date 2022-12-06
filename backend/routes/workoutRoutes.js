import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
	createNewWorkout,
	deleteWorkout,
	getWorkout,
	getWorkouts,
	updateWorkout
} from '../controllers/workout/mainController.js';
import { createNewWorkoutLog } from '../controllers/workout/logController.js';

const router = express.Router();

router.route('/').post(protect, createNewWorkout);
router.route('/').get(protect, getWorkouts);
router.route('/:id').get(protect, getWorkout);
router.route('/:id').put(protect, updateWorkout);
router.route('/:id').delete(protect, deleteWorkout)
router.route('/log').post(protect, createNewWorkoutLog);

export default router;