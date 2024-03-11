// const express = require("express");
// const https = require("https");
// const bodyParser = require("body-parser");
// const path = require("path");

// const app = express();
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
// app.post("/", function (req, res) {
//   const query = req.body.cityName;
//   const api =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     query +
//     "&units=metric&appid=2757d74b3f100168d039634fcd38681d";

//   https.get(api, function (response) {
//     console.log(response.statusCode);

//     response.on("data", function (data) {
//       const WeatherData = JSON.parse(data);
//       console.log(WeatherData.main.temp);
//       const weatherDescription = WeatherData.weather[0].description;
//       const icon = WeatherData.weather[0].icon;
//       const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
//       res.write(
//         "<p>The weather in " + query + " is " + weatherDescription + "</p>"
//       );
//       res.write(
//         "<h1>The temperature in " +
//           query +
//           "  is " +
//           WeatherData.main.temp +
//           "degree celcius</h1>"
//       );
//       res.write("<img src=" + imageURL + ">");
//       res.send();
//     });
//   });
// });

// app.listen(3000, () => {
//   console.log(`Server is running on port ${3000}`);
// });
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const query = req.body.cityName;
  const api =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=metric&appid=2757d74b3f100168d039634fcd38681d";

  https.get(api, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const WeatherData = JSON.parse(data);
      const weatherDescription = WeatherData.weather[0].description;
      const temperature = WeatherData.main.temp;
      const icon = WeatherData.weather[0].icon;
      const imageURL =
        "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      // Structuring the HTML response with CSS classes
      const htmlResponse = `
        <div class="weather-info" style="text-align: center;
       margin-top: 200px">
          <p class="weather-description" style="  font-size: 18px;
          margin-bottom: 10px;">The weather in ${query} is ${weatherDescription}</p>
          <h1 class="temperature" style=" font-size: 24px;
          font-weight: bold;">The temperature in ${query} is ${temperature} degree Celsius</h1>
          <img class="weather-icon" src="${imageURL}" alt="Weather Icon" style="  width: 100px;
          height: 100px;
          margin-top: 10px;">
        </div>
      `;

      res.send(htmlResponse);
    });
  });
});

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
