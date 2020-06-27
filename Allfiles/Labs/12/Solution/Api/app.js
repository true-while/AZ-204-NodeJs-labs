const appInsights = require('applicationinsights');

const INSTRUMENTATION_KEY = '{your_instrumentation_key}';
appInsights.setup(INSTRUMENTATION_KEY).setInternalLogging(true, true).start(); 

const express = require("express");
const forecast = require("./forecast");

const app = express();
const bodyparser = require("body-parser");

const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(200).send();
});

app.get("/weatherforecast", (req, res) => {
    res.status(200).send(forecast.getForecast());
});

app.listen(port, () => {
  console.log(`running at port ${port}`);
});