const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const loggedInRoutes = require('./logged-in-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', loggedInRoutes);

module.exports = router;