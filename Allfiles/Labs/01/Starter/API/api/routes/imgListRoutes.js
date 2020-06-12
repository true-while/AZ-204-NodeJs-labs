'use strict';

module.exports = function(app) {

	var imgList = require('../controllers/ImagesController');

	app.route('/')
		.get(imgList.list_all_img)
		.post(imgList.create_a_img); 
		
};
