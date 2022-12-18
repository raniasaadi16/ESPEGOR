import { HYDRATE } from "next-redux-wrapper"
import { IS_LOADED, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_MSG, GET_PROFILE, GET_PLAYER_COMPS, GET_PLAYER_OFFERS} from "../actions/types";

const initialState = {
    isAuth: false,
    isLoaded: false,
    user: null,
    msg: null,
    profile: null,
    type: 8
};

const AuthReducer = (state = initialState, action)=>{
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload}
        case IS_LOADED:
            return {
                ...state,
                isLoaded: true
            }
        case USER_LOADED:
            return {
                ...state,
                isLoaded: false,
                isAuth: action.payload.isAuth,
                user: action.payload.user,
                type: action.payload.type
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoaded: true,
                isAuth: action.payload.isAuth,
                // user: action.payload.data.user,
                type: action.payload.type,
                msg: action.payload.msg
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuth: false,
                // user: action.payload.newUser,
                msg: action.payload.msg
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload.profile
            }
        case GET_PLAYER_COMPS: 
            return {
                ...state,
                profile: {...state.profile, compsArr: action.payload.comps}
            }
        case GET_PLAYER_OFFERS: 
            return {
                ...state,
                profile: {...state.profile, offersArr: action.payload.offers}
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            return{
                ...state,
                isAuth: false,
                user: null,
                msg: null
            }  
        case CLEAR_MSG:
            return{
                ...state,
                msg: null
            }
        default:
            return state;
    }
};

export default AuthReducer;