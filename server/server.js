const express = require('express');
const mysql = require('mysql');
const cors =require('cors')
const bodyParser = require('body-parser')

//set the app
const app = express();


//set db
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "crud-app"
});

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json())//issue or err

app.post('/api/insert', (req, res) => {
    //variables
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    
    //qyery
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(err);
    })
})


//listening to port 3001
app.listen(3001, (err) => {
    if (err) throw err;
    else console.log("server started at port : 3001");
})
