const dotenv = require('dotenv');
const path = require('path');
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser');
const blobrepo = require('./api/controllers/blobrepo');
const cors = require('cors');

const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });

var express = require('express');

const app = express();

app.use(fileUpload({
  createParentPath: true
}));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

var routes = require('./api/routes/imgListRoutes');
routes(app);

app.use(function(req, res) {
   res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port, function() {
  blobrepo.Init();
  console.log('Img list RESTful API server started on: ' + port);
});

module.exports = app;



