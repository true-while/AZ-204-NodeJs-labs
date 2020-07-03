var express = require('express');
var router = express.Router();
const sqlrepo = require('../sqlrepo');

router.get('/:id', async function(req, res, next) { 
  var model =  await sqlrepo.findModel(req.params.id)
  res.render('details', { model: model, list: model.modelList() });
});

module.exports = router;
