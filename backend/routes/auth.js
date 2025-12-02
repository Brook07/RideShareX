const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// @route   POST /api/auth/google-login
// @desc    Google OAuth login/signup
// @access  Public
router.post('/google-login', async (req, res) => {
  try {
    console.log('📨 Received Google login request:', req.body);
    
    const { googleId, email, name, picture } = req.body;

    // Validate input
    if (!googleId || !email || !name || !picture) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user exists
    let user = await User.findOne({ googleId: googleId });

    if (user) {
      console.log('✅ Existing user found:', user.email);
      
      // Existing user - update last login
      user.lastLogin = Date.now();
      await user.save();

      // Generate token
      const token = generateToken(user._id);

      return res.json({
        message: 'Login successful',
        isNewUser: false,
        token,
        user: {
          id: user._id,
          googleId: user.googleId,
          email: user.email,
          name: user.name,
          picture: user.picture,
          phone: user.phone,
          address: user.address,
          city: user.city,
          role: user.role,
          hasListedVehicles: user.hasListedVehicles,
          isProfileComplete: user.isProfileComplete
        }
      });
    } else {
      console.log('🆕 Creating new user:', email);
      
      // New user - create account
      user = new User({
        googleId,
        email,
        name,
        picture,
        isProfileComplete: false,
        role: 'user',
        hasListedVehicles: false
      });

      await user.save();
      console.log('✅ New user created successfully');

      // Generate token
      const token = generateToken(user._id);

      return res.json({
        message: 'Account created successfully',
        isNewUser: true,
        token,
        user: {
          id: user._id,
          googleId: user.googleId,
          email: user.email,
          name: user.name,
          picture: user.picture,
          isProfileComplete: false,
          role: 'user',
          hasListedVehicles: false
        }
      });
    }
  } catch (error) {
    console.error('❌ Google login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/complete-profile
// @desc    Complete user profile (new users only)
// @access  Private
router.post('/complete-profile', authMiddleware, async (req, res) => {
  try {
    const { phone, address, city } = req.body;

    // Validate input - removed userType
    if (!phone || !address || !city) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find user and update
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update profile
    user.phone = phone;
    user.address = address;
    user.city = city;
    user.isProfileComplete = true;

    await user.save();

    console.log('✅ Profile completed for user:', user.email);

    res.json({
      message: 'Profile completed successfully',
      user: {
        id: user._id,
        googleId: user.googleId,
        email: user.email,
        name: user.name,
        picture: user.picture,
        phone: user.phone,
        address: user.address,
        city: user.city,
        role: user.role,
        hasListedVehicles: user.hasListedVehicles,
        isProfileComplete: user.isProfileComplete
      }
    });
  } catch (error) {
    console.error('❌ Complete profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user data
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-__v');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        googleId: user.googleId,
        email: user.email,
        name: user.name,
        picture: user.picture,
        phone: user.phone,
        address: user.address,
        city: user.city,
        role: user.role,
        hasListedVehicles: user.hasListedVehicles,
        isProfileComplete: user.isProfileComplete,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('❌ Get user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;