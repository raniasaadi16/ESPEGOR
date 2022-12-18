import { HYDRATE } from "next-redux-wrapper"
import { SET_ACTIVE_MENU } from "../actions/types";

const initialState = {
    activeMenu: 'Home'
};

const UiReducer = (state = initialState, action)=>{
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload}
        case SET_ACTIVE_MENU:{
            return {
                ...state,
                activeMenu: action.payload
            }
        }
        default:
            return state;
    }
};

export default UiReducer;