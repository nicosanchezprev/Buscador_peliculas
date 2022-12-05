import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './Favorites.css';
import { removeMovieFavorite } from '../../actions/index.js'

export class ConnectedList extends Component {

  handleClick(movieId){
    this.props.removeMovieFavorite(movieId);
  };

  render() {
    return (
      <div>
        <h2>Películas Favoritas</h2>
        <div className="cont-favoritos">
          {
            this.props.favorites.map( (movie) => {
              return (
                <div className="cont-pelicula">
                  <Link to={`/movie/${movie.id}`}>
                    <span>{movie.Title}</span>
                  </Link>
                  <Link to={`/movie/${movie.id}`}>
                    <img className="img-fav"src={movie.Poster} alt="img"/>
                  </Link>
                  <button onClick={()=>this.handleClick(movie.id)}>X</button>
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
