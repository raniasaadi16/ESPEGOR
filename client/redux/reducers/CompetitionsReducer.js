import { HYDRATE } from "next-redux-wrapper"
import { CHECK_IF_USER_JOINED_COMPETITION, GET_ALL_COMPETITIONS, GET_SINGLE_COMPETITION, GET_TOP_COMPETITIONS } from '../actions/types'

const initialState = {
    competitions: null,
    topCompetitions: null,
    competition: null,
    msg: null,
};

const CompetitionsReducer = (state = initialState, action)=>{
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload}
        case GET_ALL_COMPETITIONS:
            return {
                ...state, 
                competitions: action.payload.competitions
            }
        case GET_TOP_COMPETITIONS:
            return {
                ...state, 
                topCompetitions: action.payload.competitions
            }
        case GET_SINGLE_COMPETITION:
            return {
                ...state, 
                competition: action.payload.competition
            }
        case CHECK_IF_USER_JOINED_COMPETITION:
            return {
                ...state, 
                competition: {...state.competition, joined: action.payload}
            }
        default:
            return state;
    }
};

export default CompetitionsReducer;