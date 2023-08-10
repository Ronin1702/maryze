const router = require('express').Router();
const { User } = require('../../models');

// /api/users
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.name = userData.username;
            req.session.logged_in = true;

            res.json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// /api/users/login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { username: req.body.username },
        });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password!' });
            return;
        }

        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.name = userData.username;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// /api/users/logout
router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});



module.exports = router;