const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

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

// api/users/id  use put to update user info
router.put('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);
        if (userData) {
            await userData.update({
                username: req.body.username,
                password: req.body.password
            });
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.name = userData.username;
                req.session.logged_in = true;

                res.json(userData);
            })
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// api/user/id  use delete to delete user  
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);
        if (userData) {
            await userData.destroy();
            req.session.destroy(() => {
                res.json({ message: 'User deleted' });
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;