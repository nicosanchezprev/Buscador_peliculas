import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './Buscador.css';
import { addMovieFavorite, getMovies } from '../../actions/index.js';

export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  };

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.getMovies(this.state.title);
  }

  handleClick(movie) {
    this.props.addMovieFavorite(movie);
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <h2>Buscador</h2>
        <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label className="label" htmlFor="title">Película: </label>
            <input
              type="text"
              id="title"
              autoComplete="off"
              value={title}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <button type="submit">BUSCAR</button>
        </form>
        <ul>
          {this.props.movies.map((movie) => {
            return (
              <li>
                <Link to={`/movie/${movie.imdbID}`}>
                  <span>{movie.Title}</span>
                </Link>
                <button onClick={()=>this.handleClick({id: movie.imdbID, Title: movie.Title, Poster: movie.Poster})}>ADD</button>
              </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    getMovies: (title) => {
      dispatch(getMovies(title));
    },
    addMovieFavorite: (movie) => {
      dispatch(addMovieFavorite(movie))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buscador);


/*
escribo en el input el nombre de la pelicula => se guarda en estado
apreto el boton => 
    1. que se despache la action que busca peliculas.
    2. le paso por parametro el estado local del input.

Tengo que mandar movies a props para poder utilizarlo
voy a mapear => por cada pelicula voy a hacer 1 div para la pelicula
    1 => titulo
    2 => boton
    3 => link
*/