import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './Favorites.css';
import { removeMovieFavorite } from '../../actions/index.js'

import imgNotFound from "../../img/img-notfound.jpg";

export class ConnectedList extends Component {

  handleClick(movieId){
    this.props.removeMovieFavorite(movieId);
  };

  render() {
    return (
      <div>
        <h1 className="titulo-pagina">Películas Favoritas</h1>
        <div className="cont-favoritos">
          {
            this.props.favorites.map((movie) => {
              return (
                <div className="div-pelicula">
                  <Link className="titulo-pelicula" to={`/movie/${movie.id}`}>
                    <span className="titulo-pelicula">{movie.Title}</span>
                  </Link>
                  <Link to={`/movie/${movie.id}`}>
                    <img className="img-pelicula"src={movie.Poster === "N/A"? imgNotFound : movie.Poster} alt="img"/>
                  </Link>
                  <p className="tipo-año">Tipo: {movie.Type === "movie"? "Pelicula" : "Serie"} - Año: {movie.Year}</p>
                  <button className="boton-pelicula" onClick={()=>this.handleClick(movie.id)}>X</button>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps= (state) => {
  return {
    favorites: state.favorites,
  };
};

const mapDispatchToProps= (dispatch) => {
  return {
    removeMovieFavorite: (id) => {
      dispatch(removeMovieFavorite(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
