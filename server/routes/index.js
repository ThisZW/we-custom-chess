const express = require('express');
const router = express.Router();

router.use('/create-board', require('./alt'));

module.exports = router;
