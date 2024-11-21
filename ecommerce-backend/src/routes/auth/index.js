const express = require('express');
const registerRoute = require('./Register.routes');
const loginRoute = require('./Login.routes');

const router = express.Router();

router.use('/register', registerRoute);
router.use('/login', loginRoute);

module.exports = router;
