import React from 'react'
import {useState, useEffect} from'react'
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg"
import "./App.css"

const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=7bf35b39'

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search)
    setMovies(data.Search);
  }
  
  const searchEnterKey = (e) => {
    if (e.key === 'Enter') {
        searchMovies(searchTerm)
    }
}

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
          onKeyDown={searchEnterKey}
        />
        <img
          src={SearchIcon} // 在React的img标签中使用svg组件
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      
      {movies?.length > 0 ? ( // 判断是否存在movie来显示不同界面
        <div className="container">
          {movies.map((movie) => (
           // React中组件的定义与引用：MovieCard组件
            <MovieCard movie={movie} key={movie.imdbID}/>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;