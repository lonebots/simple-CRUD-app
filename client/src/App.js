import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  //variable
  const [movieName, setmovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setmovieReviewList] = useState([]); //empty list

  //useEffect -display all the movie review
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response.data);
      setmovieReviewList(response.data);
    });
  }, []);

  //submit review function
  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });
    //alert('successful insert!');
    setmovieReviewList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };

//delete review function

const deleteReview=(movie)=>{
  const delurl =
    "http://localhost:3001/api/delete/" +movie;
    Axios.delete(delurl);//back quote to pass the movie name
}



  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          name="moveName"
          onChange={(e) => {
            setmovieName(e.target.value);
          }}
        />
        <label>Movie Review:</label>
        <input
          type="text"
          name="moveReview"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h1>{val.movieName} </h1>
              <p>{val.movieReview}</p>
              <button onClick={()=>{deleteReview(val.movieName)}}>Delete</button>
              <input id="updateInput" type="text" />
              <button>Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
