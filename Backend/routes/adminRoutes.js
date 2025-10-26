const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  updateUserRole,
  getAllUsers,
  getUserById,
  deleteUser,
  getDashboardStats
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes require authentication and Admin role
router.use(protect);
router.use(authorize('Admin'));

// Validation for role update
const roleUpdateValidation = [
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['User', 'Admin'])
    .withMessage('Role must be either User or Admin'),
  body('password')
    .notEmpty()
    .withMessage('Password is required for verification')
];

// Routes
router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);
router.put('/role/:userId', roleUpdateValidation, updateUserRole);
router.delete('/users/:userId', deleteUser);

module.exports = router;