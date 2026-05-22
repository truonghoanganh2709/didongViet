import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import User from '../models/User.js';

export const getUsers = asyncHandler(async (_req, res) => {
  const users = await User.find().select('-password');
  res.json({ success: true, data: users });
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) throw new ApiError(404, 'User not found');
  res.json({ success: true, data: user });
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');

  if (req.user._id.toString() !== user._id.toString() && req.user.role !== 'admin') {
    throw new ApiError(403, 'Not authorized to update this user');
  }

  const { name, phone, address, avatar } = req.body;
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (address) user.address = address;
  if (avatar) user.avatar = avatar;

  const updated = await user.save();
  res.json({ success: true, data: updated });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');

  if (req.user.role !== 'admin') {
    throw new ApiError(403, 'Admin only');
  }

  await user.deleteOne();
  res.json({ success: true, message: 'User removed' });
});
