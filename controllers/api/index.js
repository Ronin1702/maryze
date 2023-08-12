const router = require('express').Router();

const userRoutes = require('./user-routes');
const promptRoutes = require('./prompt-routes');
const letterRoutes = require('./letter-routes');

router.use('/users', userRoutes);
router.use('/prompts', promptRoutes);
router.use('/letters', letterRoutes);

module.exports = router;    