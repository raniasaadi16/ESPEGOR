import { HYDRATE } from "next-redux-wrapper"
import { GET_ALL_GAMES, GET_SINGLE_GAME } from '../actions/types'

const initialState = {
    games: null,
    game: null,
    msg: null,
};

const GamesReducer = (state = initialState, action)=>{
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload}
        case GET_ALL_GAMES:
            return {
                ...state, 
                games: action.payload.games
            }
        case GET_SINGLE_GAME:
            return {
                ...state, 
                game: action.payload.game
            }
        default:
            return state;
    }
};

export default GamesReducer;