const router = require('express').Router();

const coverLetterRoutes = require('./cover-letter-routes');
const promptRoutes = require('./prompt-routes');
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);
router.use('/coverletters', coverLetterRoutes);
router.use('/prompts', promptRoutes);

module.exports = router;    