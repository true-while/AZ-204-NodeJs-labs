var express = require('express');
var router = express.Router();
const sqlrepo = require('../sqlrepo');

router.get('/', async function (req, res, next) {
    var models = await sqlrepo.getModels();
    res.render('index', { models: models });
});


module.exports = router;
