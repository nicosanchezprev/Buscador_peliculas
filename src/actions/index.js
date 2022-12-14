export const GET_MOVIES = 'GET_MOVIES';
export const ADD_MOVIE_FAVORITE = 'ADD_MOVIE_FAVORITE';
export const REMOVE_MOVIE_FAVORITE = 'REMOVE_MOVIE_FAVORITE';
export const GET_MOVIE_DETAIL = 'GET_MOVIE_DETAIL';
export const ERROR_HANDLER = 'ERROR_HANDLER';
export const CLEAN_DETAIL = 'CLEAN_DETAIL';
export const CLEAN_ERROR = 'CLEAN_ERROR';
export const CLEAN_MOVIES = 'CLEAN_MOVIES';


export const apikey = '9d0ece42';

export const getMovies = (movie) => {
    return function (dispatch) {
        fetch(`http://www.omdbapi.com/?apikey=${apikey}&s=${movie}`)
        .then((response) => response.json())
        .then((data) => {
            if(data.Response === "True") {
                dispatch({type: GET_MOVIES, payload: data.Search});
            } else if (data.Response === "False") {
                dispatch({type: ERROR_HANDLER, payload: data.Error});
            }
        })
    };
};

export const getMovieDetail = (idMovie) => {
    return function (dispatch) {
        fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${idMovie}`)
        .then(response => response.json())
        .then(data => dispatch({type: GET_MOVIE_DETAIL, payload: data}))
    };
};

export const addMovieFavorite = (id) => {
    return {type: ADD_MOVIE_FAVORITE, payload: id};
};

export const removeMovieFavorite = (id) => {
    return {type: REMOVE_MOVIE_FAVORITE, payload: id};
};

// ESTO AGREGO CON LOS REACT HOOKS:
export const cleanDetail = () => {
    return {type: CLEAN_DETAIL};
};

export const cleanError = () => {
    return {type: CLEAN_ERROR};
};

export const cleanMovies = () => {
    return {type: CLEAN_MOVIES};
};
