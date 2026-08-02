const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const OFFLINE_DEMO_USER_ID = 'demo-user-ridesharex';

let offlineDemoUser = {
  id: OFFLINE_DEMO_USER_ID,
  googleId: 'demo-user-ridesharex',
  email: 'demo@ridesharex.app',
  name: 'Demo Rider',
  picture: 'https://ui-avatars.com/api/?name=Demo+Rider&background=2563eb&color=fff',
  originalPicture: 'https://ui-avatars.com/api/?name=Demo+Rider&background=2563eb&color=fff',
  profilePictureUpdatedAt: null,
  phone: '+1 555 0100',
  address: 'Demo account for exploring RideShareX',
  city: 'Kathmandu',
  role: 'user',
  hasListedVehicles: false,
  isProfileComplete: true,
  walletBalance: 100000,
  isVerified: true,
  verificationStatus: 'APPROVED',
  citizenshipPhoto: null,
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString()
};

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

const generateDemoToken = () => {
  return jwt.sign({ userId: OFFLINE_DEMO_USER_ID, isDemoUser: true }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

const buildOfflineDemoResponse = () => ({
  id: offlineDemoUser.id,
  googleId: offlineDemoUser.googleId,
  email: offlineDemoUser.email,
  name: offlineDemoUser.name,
  picture: offlineDemoUser.picture,
  originalPicture: offlineDemoUser.originalPicture,
  profilePictureUpdatedAt: offlineDemoUser.profilePictureUpdatedAt,
  phone: offlineDemoUser.phone,
  address: offlineDemoUser.address,
  city: offlineDemoUser.city,
  role: offlineDemoUser.role,
  hasListedVehicles: offlineDemoUser.hasListedVehicles,
  isProfileComplete: offlineDemoUser.isProfileComplete,
  walletBalance: offlineDemoUser.walletBalance,
  isVerified: offlineDemoUser.isVerified,
  verificationStatus: offlineDemoUser.verificationStatus,
  citizenshipPhoto: offlineDemoUser.citizenshipPhoto,
  createdAt: offlineDemoUser.createdAt,
  lastLogin: offlineDemoUser.lastLogin
});

const DEMO_USER = {
  googleId: 'demo-user-ridesharex',
  email: 'demo@ridesharex.app',
  name: 'Demo Rider',
  picture: 'https://ui-avatars.com/api/?name=Demo+Rider&background=2563eb&color=fff',
  phone: '+1 555 0100',
  city: 'Kathmandu',
  address: 'Demo account for exploring RideShareX',
  walletBalance: 100000,
  role: 'user',
  hasListedVehicles: false,
  isProfileComplete: true,
  isVerified: true,
  verificationStatus: 'APPROVED'
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
      console.log('Existing user found:', user.email);
      
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
          originalPicture: user.originalPicture,
          profilePictureUpdatedAt: user.profilePictureUpdatedAt,
          phone: user.phone,
          address: user.address,
          city: user.city,
          role: user.role,
          hasListedVehicles: user.hasListedVehicles,
          isProfileComplete: user.isProfileComplete,
          walletBalance: user.walletBalance,
          isVerified: user.isVerified,
          verificationStatus: user.verificationStatus,
          citizenshipPhoto: user.citizenshipPhoto
        }
      });
    } else {
      console.log('Creating new user:', email);
      
      // New user - create account
      user = new User({
        googleId,
        email,
        name,
        picture,
        originalPicture: picture,
        isProfileComplete: false,
        role: 'user',
        hasListedVehicles: false
      });

      await user.save();
      console.log('New user created successfully');

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
          originalPicture: user.originalPicture,
          profilePictureUpdatedAt: user.profilePictureUpdatedAt,
          isProfileComplete: false,
          role: 'user',
          hasListedVehicles: false,
          walletBalance: user.walletBalance,
          isVerified: false,
          verificationStatus: 'NOT_SUBMITTED'
        }
      });
    }
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/demo-login
// @desc    Sign in with a preconfigured demo account
// @access  Public
router.post('/demo-login', async (req, res) => {
  try {
    if (process.env.DB_OFFLINE === 'true') {
      offlineDemoUser.lastLogin = new Date().toISOString();

      return res.json({
        message: 'Demo login successful',
        isNewUser: false,
        isDemoUser: true,
        token: generateDemoToken(),
        user: buildOfflineDemoResponse()
      });
    }

    let user = await User.findOne({ email: DEMO_USER.email });

    if (!user) {
      user = await User.create({
        ...DEMO_USER,
        originalPicture: DEMO_USER.picture,
        lastLogin: Date.now()
      });
    } else {
      user.googleId = DEMO_USER.googleId;
      user.name = DEMO_USER.name;
      user.picture = DEMO_USER.picture;
      user.originalPicture = DEMO_USER.picture;
      user.phone = DEMO_USER.phone;
      user.city = DEMO_USER.city;
      user.address = DEMO_USER.address;
      user.walletBalance = DEMO_USER.walletBalance;
      user.role = DEMO_USER.role;
      user.hasListedVehicles = DEMO_USER.hasListedVehicles;
      user.isProfileComplete = DEMO_USER.isProfileComplete;
      user.isVerified = DEMO_USER.isVerified;
      user.verificationStatus = DEMO_USER.verificationStatus;
      user.lastLogin = Date.now();

      await user.save();
    }

    const token = generateToken(user._id);

    return res.json({
      message: 'Demo login successful',
      isNewUser: false,
      isDemoUser: true,
      token,
      user: {
        id: user._id,
        googleId: user.googleId,
        email: user.email,
        name: user.name,
        picture: user.picture,
        originalPicture: user.originalPicture,
        profilePictureUpdatedAt: user.profilePictureUpdatedAt,
        phone: user.phone,
        address: user.address,
        city: user.city,
        role: user.role,
        hasListedVehicles: user.hasListedVehicles,
        isProfileComplete: user.isProfileComplete,
        walletBalance: user.walletBalance,
        isVerified: user.isVerified,
        verificationStatus: user.verificationStatus,
        citizenshipPhoto: user.citizenshipPhoto,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Demo login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/complete-profile
// @desc    Complete user profile (new users only)
// @access  Private
router.post('/complete-profile', authMiddleware, async (req, res) => {
  try {
    const { phone, city } = req.body;

    // Validate input
    if (!phone || !city) {
      return res.status(400).json({ message: 'Phone and city are required' });
    }

    if (process.env.DB_OFFLINE === 'true' && req.userId === OFFLINE_DEMO_USER_ID) {
      offlineDemoUser.phone = phone;
      offlineDemoUser.city = city;
      offlineDemoUser.isProfileComplete = true;

      return res.json({
        message: 'Profile completed successfully',
        user: buildOfflineDemoResponse()
      });
    }

    // Find user and update
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update profile
    user.phone = phone;
    user.city = city;
    user.isProfileComplete = true;

    await user.save();

    console.log('Profile completed for user:', user.email);

    res.json({
      message: 'Profile completed successfully',
      user: {
        id: user._id,
        googleId: user.googleId,
        email: user.email,
        name: user.name,
        picture: user.picture,
        originalPicture: user.originalPicture,
        profilePictureUpdatedAt: user.profilePictureUpdatedAt,
        phone: user.phone,
        address: user.address,
        city: user.city,
        role: user.role,
        hasListedVehicles: user.hasListedVehicles,
        isVerified: user.isVerified,
        verificationStatus: user.verificationStatus,
        citizenshipPhoto: user.citizenshipPhoto,
        isProfileComplete: user.isProfileComplete,
        walletBalance: user.walletBalance
      }
    });
  } catch (error) {
    console.error('Complete profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user data
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
  try {
    if (process.env.DB_OFFLINE === 'true' && req.userId === OFFLINE_DEMO_USER_ID) {
      offlineDemoUser.lastLogin = new Date().toISOString();

      return res.json({
        user: buildOfflineDemoResponse()
      });
    }

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
        originalPicture: user.originalPicture,
        profilePictureUpdatedAt: user.profilePictureUpdatedAt,
        phone: user.phone,
        address: user.address,
        city: user.city,
        role: user.role,
        hasListedVehicles: user.hasListedVehicles,
        isVerified: user.isVerified,
        verificationStatus: user.verificationStatus,
        citizenshipPhoto: user.citizenshipPhoto,
        isProfileComplete: user.isProfileComplete,
        walletBalance: user.walletBalance,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PATCH /api/auth/profile
// @desc    Update basic profile info
// @access  Private
router.patch('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, phone, city } = req.body;

    if (!name && !phone && !city) {
      return res.status(400).json({ message: 'Provide at least one field to update' });
    }

    if (process.env.DB_OFFLINE === 'true' && req.userId === OFFLINE_DEMO_USER_ID) {
      if (name) offlineDemoUser.name = name;
      if (phone !== undefined) offlineDemoUser.phone = phone;
      if (city !== undefined) offlineDemoUser.city = city;

      return res.json({
        message: 'Profile updated successfully',
        user: buildOfflineDemoResponse()
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (city !== undefined) user.city = city;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        googleId: user.googleId,
        email: user.email,
        name: user.name,
        picture: user.picture,
        originalPicture: user.originalPicture,
        profilePictureUpdatedAt: user.profilePictureUpdatedAt,
        phone: user.phone,
        isVerified: user.isVerified,
        verificationStatus: user.verificationStatus,
        citizenshipPhoto: user.citizenshipPhoto,
        address: user.address,
        city: user.city,
        role: user.role,
        hasListedVehicles: user.hasListedVehicles,
        isProfileComplete: user.isProfileComplete,
        walletBalance: user.walletBalance,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/upload-profile-picture
// @desc    Upload profile picture (Cloudinary)
// @access  Private
router.post('/upload-profile-picture', authMiddleware, async (req, res) => {
  try {
    const { pictureUrl } = req.body;

    if (!pictureUrl) {
      return res.status(400).json({ message: 'Picture URL is required' });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Store original picture if this is first custom upload
    if (!user.originalPicture) {
      user.originalPicture = user.picture;
    }

    // Update user with new profile picture URL from Cloudinary
    user.picture = pictureUrl;
    user.profilePictureUpdatedAt = new Date();
    await user.save();

    res.json({
      message: 'Profile picture updated successfully',
      user: {
        id: user._id,
        googleId: user.googleId,
        email: user.email,
        name: user.name,
        picture: user.picture,
        originalPicture: user.originalPicture,
        profilePictureUpdatedAt: user.profilePictureUpdatedAt,
        phone: user.phone,
        address: user.address,
        city: user.city,
        role: user.role,
        hasListedVehicles: user.hasListedVehicles,
        isVerified: user.isVerified,
        verificationStatus: user.verificationStatus,
        citizenshipPhoto: user.citizenshipPhoto,
        isProfileComplete: user.isProfileComplete,
        walletBalance: user.walletBalance
      }
    });
  } catch (error) {
    console.error('Upload profile picture error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/upload-citizenship
// @desc    Upload citizenship photo for verification (Cloudinary)
// @access  Private
router.post('/upload-citizenship', authMiddleware, async (req, res) => {
  try {
    const { citizenshipUrl } = req.body;

    if (!citizenshipUrl) {
      return res.status(400).json({ message: 'Citizenship URL is required' });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user with citizenship photo URL from Cloudinary
    user.citizenshipPhoto = citizenshipUrl;
    user.verificationStatus = 'PENDING';
    user.isVerified = false;
    await user.save();

    res.json({
      message: 'Citizenship photo uploaded successfully. Awaiting admin verification.',
      user: {
        id: user._id,
        citizenshipPhoto: user.citizenshipPhoto,
        verificationStatus: user.verificationStatus,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Upload citizenship error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/auth/pending-verifications
// @desc    Get all users pending verification (Admin only)
// @access  Private (Admin)
router.get('/pending-verifications', authMiddleware, async (req, res) => {
  try {
    const adminUser = await User.findById(req.userId);

    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const pendingUsers = await User.find({
      verificationStatus: 'PENDING'
    }).select('name email phone city citizenshipPhoto verificationStatus createdAt');

    res.json({
      users: pendingUsers
    });
  } catch (error) {
    console.error('Get pending verifications error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/verify-user/:userId
// @desc    Approve or reject user verification (Admin only)
// @access  Private (Admin)
router.post('/verify-user/:userId', authMiddleware, async (req, res) => {
  try {
    const { action } = req.body; // action: 'APPROVE' or 'REJECT'

    const adminUser = await User.findById(req.userId);

    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const targetUser = await User.findById(req.params.userId);

    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (action === 'APPROVE') {
      targetUser.isVerified = true;
      targetUser.verificationStatus = 'APPROVED';
    } else if (action === 'REJECT') {
      targetUser.isVerified = false;
      targetUser.verificationStatus = 'REJECTED';
    } else {
      return res.status(400).json({ message: 'Invalid action. Use APPROVE or REJECT' });
    }

    await targetUser.save();

    res.json({
      message: `User verification ${action.toLowerCase()}d successfully`,
      user: {
        id: targetUser._id,
        name: targetUser.name,
        isVerified: targetUser.isVerified,
        verificationStatus: targetUser.verificationStatus
      }
    });
  } catch (error) {
    console.error('Verify user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;