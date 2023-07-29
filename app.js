const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req,res){

    res.sendFile(__dirname +"/index.html");

});

app.post("/", function(req,res){
    
    const query = req.body.cityName;
    const apiKey = "89fbe175be15587a2bd009ce34e77bb9";
    const unit = "metric";

    https.get("https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+unit, function(response){

        console.log(response.statusCode);

        response.on("data", function(data){
           const weatherData = JSON.parse(data);
           const temp = weatherData.main.temp;
           const weatherDescription = weatherData.weather[0].description;
           const icon = weatherData.weather[0].icon;
           const imageURL = "https://openweathermap.org/img/wn/" +icon+ "@2x.png"
           
           res.write("<h1>The temperature in "+ query +" is " + temp + " Degrees Celsius.</h1>");
           res.write("<h2>The weather is currently "+ weatherDescription +". </h2>");
           res.write(`<img src='${imageURL}'>`);
           res.send();

        });

    });

});

   




app.listen(3000, function(){
    console.log("Server is running on port 3000...");
});