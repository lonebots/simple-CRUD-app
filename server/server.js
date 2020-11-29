const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

//set the app
const app = express();

//set db
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "crud-app",
});

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json()); //issue or err

//post request for inserting the data
app.post("/api/insert", (req, res) => {
  //variables
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  //query
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    //console.log(result);
  });
});

//get request for taking the data
app.get("/api/get", (req, res) => {
  //query
  const sqlSelect = "SELECT * FROM movie_reviews;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

//delete request
app.delete("/api/delete/:movieName", (req, res) => {
  //movie name variable
  const name = req.params.movieName;

  //query
  const sqlDelete = "DELETE FROM movie_reviews WHERE movieName= ? ;";

  //
  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
    else console.log(result);
  });
});

//update
app.put("/api/update", (req, res) => {
  //variables
  const name = req.body.movieName;
  const review = req.body.movieReview;

  //query
  const sqlUpdate =
    "UPDATE  movie_reviews SET movieReview= ? WHERE movieName= ? ;";

  //dbupdate
  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) console.log(err);
  });
});

//listening to port 3001
app.listen(3001, (err) => {
  if (err) throw err;
  else console.log("server started at port : 3001");
});
