import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';
import { getUserTotalLog } from '../../services/userService.js';

// @desc		Get user profile
// @route		GET /api/users/profile
// @access	Private
export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User
		.findById(req.user._id)
		.select('-password')
		.lean();

	const userTotalLog = await getUserTotalLog(req.user._id);

	res.json({
		...user,
		stats: userTotalLog
	});
});