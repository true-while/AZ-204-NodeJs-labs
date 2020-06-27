var summaries = [
    "Freezing",
    "Bracing",
    "Chilly",
    "Cool",
    "Mild",
    "Warm",
    "Balmy",
    "Hot",
    "Sweltering",
    "Scorching"
];

class weatherForecast {
    date;
    summary;
    temperatureC;
};

weatherForecast.temperatureF = function (temperatureC) {
    return Math.floor(32 + temperatureC / 0.5556);
};

exports.weatherForecast = weatherForecast;


module.exports = {
    
    getRandom: function (min, max) {
        return Math.random() * (max - min) + min;
    },

    getForecast: function () {

        Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }

        var forecast = [];
        for(var i = 0; i < 5; i++) {
            var wf = new weatherForecast();
            wf.date = (new Date()).addDays(i)
            wf.temperatureC = Math.floor(this.getRandom(-20, 55));
            wf.temperatureF = weatherForecast.temperatureF(wf.temperatureC);
            wf.summary = summaries[Math.floor(this.getRandom(0,summaries.length-1))];
            forecast.push(wf);
        }
       return forecast;
    }
}

