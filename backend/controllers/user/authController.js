import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';
import { generateToken } from '../../utils/generateToken.js';

// @desc		Register user
// @route		POST /api/users
// @access	Private
export const registerUser = asyncHandler (async (req, res) => {
	const { email, password } = req.body;

	const isExistUser = await User.findOne({ email });

	if (isExistUser) {
		res.status(400);
		throw new Error('Данный пользователь уже зарегестрирован.');
	}

	const newUser = await User.create({
		email,
		password
	});

	const token = generateToken(newUser._id);

	res.json({ user: newUser, token });
});

// @desc		Login user
// @route		POST /api/users/login
// @access	Private
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		const token = generateToken(user._id);

		res.json({ user, token });
	} else {
		res.status(401);
		throw new Error('Неправильный email или пароль.')
	}
});