var express = require('express');
var router = express.Router();
const apirepo = require('../apirepo');

router.get('/', async function (req, res, next) {

  var htmlImgOutput = "";
  try {
    var imgList = await apirepo.LoadImages(process.env.ApiUrl);
    var htmlImgOutput = "";
    if (imgList !== undefined && imgList.length > 0) {
      var i;
      for (i = 0; i < imgList.length; i++) {
        htmlImgOutput += `<div class="card"><img src="${imgList[i]}" class="img-fluid" /></div>`;
      }
    } else {
      htmlImgOutput = 'No Images Found';
    }
  } catch (ex) {
    htmlImgOutput = ex;
  }
  res.render('index', { title: 'Contoso Photo Gallery', htmlImgOutput: htmlImgOutput });
});


router.post('/', async function (req, res, next) {
  return apirepo.PostImage(process.env.ApiUrl, req.files.file).then((newImgUrl)=>{
    res.redirect('/');
  })});


module.exports = router;
