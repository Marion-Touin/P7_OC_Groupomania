const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path =  require('path');
const app = express();

var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));

const db = require("./models");
db.sequelize.sync();

require("./routes/post")(app); 
require("./routes/user")(app);
require("./routes/comment")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`le serveur fonctionne sur le port ${PORT}.`);
});