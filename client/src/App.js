import React, { useState, useEffect } from 'react'
import Axios from "axios"
import './App.css';


function App() {

  const [movieName, setmovieName] = useState('');

  const [review, setReview] = useState('');


  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', { movieName: movieName, movieReview: review, }).then(() => {
      alert('success submit');
    })
  }

  return (
    <div className="App">
      <h1>** CRUD APPLICATION **</h1>
      <div className='form'>
        <label>
          Movie Name:
      </label>
        <input type='text' name='moveName' onChange={(e) => {
          setmovieName(e.target.value);
        }} />
        <label>
          Movie Review:
      </label>
        <input type='text' name='moveReview' onChange={(e) => {
          setReview(e.target.value);
        }} />
        <button onClick={submitReview}>Submit</button>
      </div>
    </div>
  );
}

export default App;
