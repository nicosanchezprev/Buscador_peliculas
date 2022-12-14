import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './Buscador.css';
import { addMovieFavorite, cleanError, cleanMovies, getMovies } from '../../actions/index.js';

import imgNotFound from "../../img/img-notfound.jpg";
const Buscador = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const movies = useSelector((state) => state.movies);
  const moviesFavorites = useSelector((state) => state.favorites);
  const error = useSelector((state) => state.error);
  
  const handleChange = (event) =>{
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(cleanError());
    dispatch(getMovies(title));
    setTitle("");
  };

  const handleClick = (movie) =>  {
    const checkFavorite = moviesFavorites.find(m => m.Title === movie.Title);
    
    if(checkFavorite === undefined) {
      dispatch(addMovieFavorite(movie));
      alert("Pelicula añadida a favoritos!");
    } else {
      alert("Esta pelicula ya esta añadida!");
    }
  };

  useEffect(() => {
    return dispatch(cleanMovies());
  }, [dispatch]);
  
  return (
    <div className="div-principal">
      <div className="div-buscador">
        <h1 className="titulo-pagina">Busca tus peliculas favoritas!</h1>
        <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            id="title"
            className="input-buscar"
            autoComplete="off"
            value={title}
            onChange={(e) => handleChange(e)}
          />
          <button className="boton-buscar" type="submit">BUSCAR</button>
        </form>
      </div>
      <div className="div-princ-peliculas">
        {error ? <h1>Error: {error} Try Again!</h1> : movies.map((movie) => {
          return (
            <div key={movie.imdbID} className="div-pelicula">
              <Link className="titulo-pelicula" to={`/movie/${movie.imdbID}`}>
                <span className="titulo-pelicula">{movie.Title}</span>
              </Link>
              <Link to={`/movie/${movie.imdbID}`}>
                <img className="img-pelicula" src={movie.Poster === "N/A"? imgNotFound : movie.Poster} alt="img" />
              </Link>
              <p className="tipo-año">Tipo: {movie.Type === "movie"? "Pelicula" : "Serie"} - Año: {movie.Year}</p>
              <div className="cont">  
                <button className="btn" onClick={()=>handleClick({id: movie.imdbID, Title: movie.Title, Poster: movie.Poster, Type: movie.Type, Year: movie.Year})}>
                  <span className="btn-span">Submit</span>
                  <img className="btn-img" src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png" height="42" width="42"  alt="img"/>
                </button>
              </div>
            </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Buscador;