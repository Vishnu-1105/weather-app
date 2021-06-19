const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    var query = req.body.city;
    var url = "https://api.openweathermap.org/data/2.5/find?q=" + query + "&units=metric&appid=1f674508fbd8d4426728ff4c6b0ea8ce";
    https.get(url, function(reponse) {
        reponse.on("data", function(data) {
            const weatherData = JSON.parse(data);
            var temp = weatherData.list[0].main.temp;
            var weatherDesc = weatherData.list[0].weather[0].description;
            var icon = weatherData.list[0].weather[0].icon;
            var imgurl = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The Weather is currently " + weatherDesc + "</h1>");
            res.write("<h1>The temperature in " + query + " is " + temp + ".</h1>");
            res.write("<img src=" + imgurl + ">");
            console.log(weatherData.list[0].coord.lon);
            console.log(weatherData.list[0].coord.lat);
            console.log(weatherData.list[0].main.temp);
            res.send();
        })
    })
})

app.listen(3000, function(req, res) {
    console.log("Server running at port 3000");
})

