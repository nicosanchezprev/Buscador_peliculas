import {
    ADD_MOVIE_FAVORITE,
    GET_MOVIES,
    REMOVE_MOVIE_FAVORITE,
    GET_MOVIE_DETAIL,
    CLEAN_DETAIL,
} from '../actions/index.js'

const initialState = {
    movies: [],
    favorites: [],
    movieDetail: {},
};

const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_MOVIES:
        //  Tengo las pelis en action.payload
            return{
                ...state,
                movies: action.payload.Search,
            };

        case GET_MOVIE_DETAIL:
            return{
                ...state,
                movieDetail: action.payload,
            };

        case ADD_MOVIE_FAVORITE:
            return{
                ...state,
                favorites:[...state.favorites, action.payload],
            };
        
        case REMOVE_MOVIE_FAVORITE:
            return{
                ...state,
                favorites: state.favorites.filter(
                    movie => movie.id !== action.payload
                )
            };
        case CLEAN_DETAIL:
            return{
                ...state,
                moviesDetail: {},
            };

        default:
            return {...state};
    } 
}

export default rootReducer;