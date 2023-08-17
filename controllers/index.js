
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./Home-routes');
const loggedInRoutes = require('./Logged-in-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', loggedInRoutes);

module.exports = router;