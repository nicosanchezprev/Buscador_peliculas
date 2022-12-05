import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// CLEANDETAIL LO AGREGO EN LA CLASE DE HOOKS
import { getMovieDetail, cleanDetail } from "../../actions/index.js";

import "./Movie.css";

const Movie = (props) => {
    const movieId = props.match.params.id;
    const dispatch = useDispatch();
    // EL STATE QUE PASO POR USESELECTOR ES EL STATE GLOBAL DEL STORE
    // USESELECTOR -> PARA TRAER EL ESTADO
    const movieDetail = useSelector((state) => state.movieDetail);

    useEffect(() => {
        // ESTO ES componentDidMount Y componentDidUpdate
        dispatch(getMovieDetail(movieId));
        
        // ESTO ES unmount (La funcion que retorna siempre es cuando el componente se desmonta)
        // Con esta funcion nosotros lo que hacemos es limpiar el detalle de la pelicula,
        // para asi nosotros eliminar el delay en la actualizacion de los componentes.
        return function () { 
            dispatch(cleanDetail);
        }
    }, [dispatch, movieId]);
    // SI CAMBIA dispatch o movieId SE VA A VOLVER A EJECUTAR EL useEffect() 
    //  Lo que dice redux es: "si vos usas variables tuyas, ponelas en el array de
    //  dependencias asi cuando se modifiquen yo vuelvo a correr el useEffect()
    return (
        <div className="movie-detail">
            <h4>{movieDetail.Title}</h4>
            <p>{movieDetail.Year}</p>
            <img src={movieDetail.Poster} alt='img'/>
            <p>{movieDetail.Plot}</p>
        </div>
    );
};

export default Movie;




// import React from 'react';
// import { connect } from 'react-redux';
// import { getMovieDetail } from '../../actions/index';

// import './Movie.css';

// class Movie extends React.Component {

//     componentDidMount(){
//         this.props.getMovieDetail(this.props.match.params.id)
//     }

//     render() {
//         return (
//             <div className="movie-detail">
//                 <h4>{this.props.movieDetail.Title}</h4>
//                 <p>{this.props.movieDetail.Year}</p>
//                 <img src={this.props.movieDetail.Poster} alt='img'/>
//                 <p>{this.props.movieDetail.Plot}</p>
//             </div>
//         );
//     }
// }


// const mapStateToProps = (state) => {
//     return {
//         movieDetail: state.movieDetail,
//     }
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getMovieDetail: (movieId)=>{
//             dispatch(getMovieDetail(movieId));
//         }
//     }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Movie);