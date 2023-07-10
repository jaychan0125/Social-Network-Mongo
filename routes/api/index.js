const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);               //localhost:3001/api/users
router.use('/thoughts', thoughtRoutes);         //localhost:3001/api/thoughts

module.exports = router