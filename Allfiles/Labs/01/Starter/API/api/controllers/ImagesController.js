'use strict';

const blobrepo = require('./blobrepo');
const { v1: uuidv1 } = require('uuid');


exports.list_all_img = function(req, res) {
   blobrepo.LoadList().then(data =>res.end( JSON.stringify(data)));
};

exports.create_a_img = async (req, res) => {
  try {
    if(!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } 
    else {

      let img = req.files.img;
      var name =  'img' + uuidv1();
      blobrepo.UploadFile(name, img)
         .then( url => res.end(JSON.stringify(url)));
    }
  } catch (err) {
    res.status(500).send(err);
  }
};