const express = require('express');
const mysql = require('mysql');
const cors =require('cors')
//set the app
const app = express();
const bodyParser = require('body-parser')

//set db
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "crud-app"
});
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);
app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(err);
    })
})

app.listen(3001, (err) => {
    if (err) throw err;
    else console.log("server started at port : 3001");
})
