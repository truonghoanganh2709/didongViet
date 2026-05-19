import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { redis } from '../lib/redis.js';
import User from '../model/user.model.js';

dotenv.config();

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
  return { accessToken, refreshToken };
}

const storeRefreshToken = async (userId,refreshToken) => {
  await redis.set(`refresh_token:${userId}`,refreshToken,"EX",7*24*60*60); // 7 days expiration
}
const setCookies = (res, accessToken, refreshToken) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}
export const signup =  async (req, res) => {
  const { name, password, email } = req.body;
  
try {
  const userExixts = await User.findOne({email}); // Placeholder for user existence check
    if(userExixts){
    return  res.status(400).send('User already exists');
  }
  const user = await User.create({ name, password, email });

  //authenticate user here (e.g., generate JWT, set session, etc.)
  const {accessToken,refreshToken}=generateTokens(user._id);
  await storeRefreshToken(user._id,refreshToken);
  setCookies(res,accessToken,refreshToken);

  res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    message: 'User registered successfully',
  });
} catch (error) {
  res.status(500).send({message: error.message});
}
}

export const login =  async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      const {accessToken,refreshToken}=generateTokens(user._id);
      await storeRefreshToken(user._id,refreshToken);
      setCookies(res,accessToken,refreshToken);
      
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        message: 'Login successful',
      });
    }else {
      res.status(401).json({ message: 'Invalid email or password' }); 
    }
  } catch (error) {
    res.status(500).json({message:"server error",error: error.message});
  }
}

export const logout =  async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      await redis.del(`refresh_token:${decoded.userId}`); 
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({message:"server error",error: error.message});
  }
}

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '15m',
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    
    res.json({ message: 'Access token refreshed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

export const getProfile = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: 'No access token provided' });
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}