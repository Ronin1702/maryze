
const router = require('express').Router();
const withAuth = require('../utils/auth')

router.get('/', (req, res) => {
    try {
        res.render('homepage');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to render homepage',
            error: err
        });
    }
});

//if loggedIn, go to /home instead
router.get('/home', withAuth, (req, res) => {
    try {
        res.render('homepage', { logged_in: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to render homepage',
            error: err
        });
    }
});
// go to log in page
router.get('/login', (req, res) => {
    // if logged in
    if (req.session.logged_in) {
        // redirect to main(or root), which is homepage
        res.redirect('/');
        return;
    }
    res.render('login');
});

// go to sign up and render signup.handlebars
router.get('/signup', (req, res) => {
    res.render('signup');
});

// no log out because our log out is just a button

module.exports = router;

