import { HYDRATE } from "next-redux-wrapper"
import { GET_ALL_GROUPS, GET_SINGLE_GROUP } from '../actions/types'

const initialState = {
    groups: null,
    group: null,
    msg: null,
};

const GroupsReducer = (state = initialState, action)=>{
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload}
        case GET_ALL_GROUPS:
            return {
                ...state, 
                groups: action.payload.groups
            }
        case GET_SINGLE_GROUP:
            return {
                ...state, 
                group: action.payload.group
            }
        default:
            return state;
    }
};

export default GroupsReducer;