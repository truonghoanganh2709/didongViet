import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import User from '../models/User.js';
import { env } from '../config/env.js';

export const protect = asyncHandler(async (req, _res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) throw new ApiError(401, 'User not found');
    next();
  } catch {
    throw new ApiError(401, 'Not authorized, token failed');
  }
});

export const admin = (req, _res, next) => {
  if (req.user?.role === 'admin') return next();
  next(new ApiError(403, 'Admin access required'));
};
