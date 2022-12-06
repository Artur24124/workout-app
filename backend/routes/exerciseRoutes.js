import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
	createNewExercise,
	deleteExercise,
	getExercises,
	updateExercise
} from '../controllers/exercise/mainController.js';
import {
	createNewExerciseLog,
	getExerciseLog,
	getExerciseLogList,
	updateCompletedExerciseLog,
	updateDataTimesExerciseLog
} from '../controllers/exercise/logController.js';

const router = express.Router();

router.route('/').post(protect, createNewExercise);
router.route('/').get(protect, getExercises);
router.route('/:id').put(protect, updateExercise);
router.route('/:id').delete(protect, deleteExercise);
router.route('/log').get(protect, getExerciseLogList);
router.route('/log').post(protect, createNewExerciseLog);
router.route('/log/:id').get(protect, getExerciseLog);
router.route('/log/:id').put(protect, updateDataTimesExerciseLog)
router.route('/log/:id/completed').patch(protect, updateCompletedExerciseLog);

export default router;