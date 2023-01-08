import { HYDRATE } from "next-redux-wrapper"
import { CHECK_IF_USER_JOINED_GROUP, CREATE_POST, GET_ALL_GROUPS, GET_GROUP_MEMBERS, GET_GROUP_POSTS, GET_SINGLE_GROUP, JOIN_GROUP } from '../actions/types'

const initialState = {
    groups: null,
    group: null,
    msg: null,
    posts: [],
    members: []
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
        case GET_GROUP_POSTS:
            return {
                ...state,
                posts : action.payload.posts
            }
        case CREATE_POST:
            return {
                ...state,
                // posts: state.posts.unshift(action.payload.post),
                msg: action.payload.msg
            }
        case CHECK_IF_USER_JOINED_GROUP:
            return {
                ...state,
                group: {...state.group, joind: action.payload}
            }
        case JOIN_GROUP:
            return {
                ...state,
                msg: action.payload.msg,
                group: {...state.group, joind: true}
            }
        case GET_GROUP_MEMBERS:
            return {
                ...state,
                members: action.payload
            }
        default:
            return state;
    }
};

export default GroupsReducer;