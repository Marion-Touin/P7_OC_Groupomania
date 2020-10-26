const mysql = require("mysql");
const dbConfig = require("./configuration/db");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Connexion à la base de données reussie !");
});

module.exports = connection;