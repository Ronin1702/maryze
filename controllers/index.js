const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./Home-routes');
const loggedInRoutes = require('./Logged-in-routes');
const createRoutes = require('./create-routes')

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', loggedInRoutes);
router.use('/create', createRoutes);

module.exports = router;