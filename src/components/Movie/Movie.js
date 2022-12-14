import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetail, cleanDetail } from "../../actions/index.js";

import "./Movie.css";
import imgNotFound from "../../img/img-notfound.jpg";

const Movie = (props) => {
    const movieId = props.match.params.id;
    const dispatch = useDispatch();
    const movieDetail = useSelector((state) => state.movieDetail);

    useEffect(() => {
        dispatch(getMovieDetail(movieId));
        return dispatch(cleanDetail());
    }, [dispatch, movieId]);
   
    return (
        <div className="cont-padre">
            {
                movieDetail.Title ?
                <div className="movie-detail">
                    <div> 
                    <img className="img-detail" src={movieDetail.Poster === "N/A"? imgNotFound : movieDetail.Poster } alt='img'/>
                    </div>
                    <div className="carac-detail">
                        <h1>{movieDetail.Title}</h1>
                        <hr />
                        <div className="div-carac-cards">
                            <div className="div-caracteristica">
                                <p className="car-1">Año</p>
                                <p className="car-2">{movieDetail.Year}</p>
                            </div>
                            <div className="div-caracteristica">
                                <p className="car-1">Director</p>
                                <p className="car-2">{movieDetail.Director}</p>
                            </div>
                            <div className="div-caracteristica"> 
                                <p className="car-1">Duracion</p>
                                <p className="car-2">{movieDetail.Runtime}</p>
                            </div>
                        </div>
                        <div className="div-caracteristica-sinop"> 
                            <p className="car-3">{movieDetail.Plot}</p>
                        </div>
                        <p>Clasificacion {movieDetail.Rated}</p>
                        <p>Generos {movieDetail.Genre}</p>
                        <p>Actores {movieDetail.Actors}</p>
                        <p>Tipo {movieDetail.Type === "movie"? "Pelicula" : "Serie"}</p>
                        <p>Premios/Nominaciones {movieDetail.Awards}</p>
                        <p>Temporadas Totales {!movieDetail.totalSeasons || movieDetail.totalSeasons === "N/A"  ? "No hay temporadas" : movieDetail.totalSeasons}</p>
                        <p>imdbRating {movieDetail.imdbRating}</p>
                        <p>imdbVotes {movieDetail.imdbVotes}</p>
                    </div>
                </div> 
                : 
                <h2>CARGANDO TU PELICULA...</h2>
            }
        </div>
    );
};

export default Movie;