import crypto from 'crypto';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import User from '../models/User.js';
import Cart from '../models/Cart.js';
import { generateToken } from '../utils/generateToken.js';

const sendUserResponse = (res, user, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id),
    },
  });
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, 'Please provide name, email and password');
  }

  const exists = await User.findOne({ email });
  if (exists) throw new ApiError(400, 'Email already registered');

  const user = await User.create({ name, email, password, phone });
  await Cart.create({ user: user._id, items: [] });

  sendUserResponse(res, user, 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  user.password = undefined;
  sendUserResponse(res, user);
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.user });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new ApiError(400, 'Vui lòng nhập email');

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      success: true,
      message: 'Nếu email tồn tại, hướng dẫn đặt lại mật khẩu đã được gửi',
    });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const resetUrl = `${clientUrl}/dat-lai-mat-khau?token=${resetToken}`;

  res.json({
    success: true,
    message: 'Token đặt lại mật khẩu đã được tạo (demo: dùng link bên dưới)',
    data: {
      resetUrl,
      resetToken: process.env.NODE_ENV === 'production' ? undefined : resetToken,
      expiresIn: '30 phút',
    },
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) throw new ApiError(400, 'Token và mật khẩu mới là bắt buộc');
  if (password.length < 6) throw new ApiError(400, 'Mật khẩu tối thiểu 6 ký tự');

  const hashed = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashed,
    resetPasswordExpire: { $gt: Date.now() },
  }).select('+password +resetPasswordToken +resetPasswordExpire');

  if (!user) throw new ApiError(400, 'Token không hợp lệ hoặc đã hết hạn');

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendUserResponse(res, user);
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new ApiError(400, 'Vui lòng nhập mật khẩu hiện tại và mật khẩu mới');
  }
  if (newPassword.length < 6) throw new ApiError(400, 'Mật khẩu mới tối thiểu 6 ký tự');

  const user = await User.findById(req.user._id).select('+password');
  if (!(await user.matchPassword(currentPassword))) {
    throw new ApiError(401, 'Mật khẩu hiện tại không đúng');
  }

  user.password = newPassword;
  await user.save();

  res.json({ success: true, message: 'Đổi mật khẩu thành công' });
});
