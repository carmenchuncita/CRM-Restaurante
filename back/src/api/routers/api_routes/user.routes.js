const express = require('express');
const router = express.Router();
const encryptPassword = require('../../middleware/encryptPassword');
const { authenticateToken } = require('../../middleware/jwt-auth'); 
const upload = require('../../middleware/upload.file'); 
const {
  registerUser,
  loginUser,
  profileUser,
  updateOrRegisterUser,
  postReview,
  updateReview,
  verifyToken,
  verifyRole
} = require('../../controllers/user.controller'); 
// We use encryptPassword to secure the password before saving
router.post('/register', encryptPassword, registerUser);
// Does not use authenticateToken because the token is generated here
router.post('/login', loginUser);
router.get('/verify-token', verifyToken);
router.post('/verify-role', verifyRole);
// We use authenticateToken to ensure it is a logged in user
router.get('/profile', authenticateToken, profileUser);
// Route to upload profile´s image
router.post('/uploadFile', upload.single('image'), updateOrRegisterUser);
// Route to upload a review, we use authenticateToken to ensure it is a logged in user
router.post('/postReview', authenticateToken, postReview);
// Route to update a review, we use authenticateToken to ensure it is a logged in user
router.put('/updateReview', authenticateToken, updateReview);

module.exports = router;
