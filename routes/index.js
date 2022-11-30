// npm express routes
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// wrong route throw error
router.use((req, res) => {
    return res.send('Wrong routing!');
});

module.exports = router;