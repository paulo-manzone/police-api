const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Configuring port to listen to requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Police API is running! Port: ', PORT);
});


//Welcome route
app.get("/", (req, res) => {
  res.json({ message: "This is the ultimate Police API" });
});

require("./app/routes/crime.routes.js")(app);


