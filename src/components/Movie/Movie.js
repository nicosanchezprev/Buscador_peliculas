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
   
    let rating = Math.round(movieDetail.imdbRating);
    console.log(rating);

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
                        <div className="flex-div">
                            <div className="detail-p">Clasificacion <p className="in-detail-p">{movieDetail.Rated}</p></div>
                            <div className="detail-p">Generos <p className="in-detail-p">{movieDetail.Genre}</p></div>
                            <div className="detail-p">Actores <p className="in-detail-p">{movieDetail.Actors}</p></div>
                            <div className="detail-p">Tipo <p className="in-detail-p">{movieDetail.Type === "movie"? "Pelicula" : "Serie"}</p></div>
                            <div className="detail-p">Premios/Nominaciones <p className="in-detail-p">{movieDetail.Awards}</p></div>
                            <div className="detail-p">Temporadas Totales <p className="in-detail-p">{!movieDetail.totalSeasons || movieDetail.totalSeasons === "N/A"  ? "No hay temporadas" : movieDetail.totalSeasons}</p></div>
                            <div className="detail-p">Votos de IMDB <p className="in-detail-p">{movieDetail.imdbVotes}</p></div>
                            <div>
                                <div className="detail-pepe">Rating de IMDB<p className="in-detail-p"></p></div>
                                <div className="imdb-rating"><div className="into-rating" style={{width: `${rating}0%`}}>{`${rating}0%`}</div></div>
                            </div>
                        </div>
                        </div>
                </div> 
                : 
                <h2>CARGANDO TU PELICULA...</h2>
            }
        </div>
    );
};

export default Movie;