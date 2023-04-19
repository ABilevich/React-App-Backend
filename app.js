require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();
app.use(cors());

var jsonParser = bodyParser.json();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.post("/signature", jsonParser, (req, res) => {
  const { username, pin } = req.body;
  if (!username || username == "")
    res.status(400).json({ message: "Bad Request: The username is invalid" });
  if (pin == process.env.PIN) {
    res.status(200).json({ message: "Success: PDF Signed" });
  } else {
    res.status(401).json({ message: "Error: Wrong PIN" });
  }
});
