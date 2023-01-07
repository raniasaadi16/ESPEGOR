import { returnErrors } from "./errActions";
import { CLEAR_MSG, GET_ALL_GROUPS, GET_SINGLE_GROUP } from './types'




export const getAllGroups = () => async dispatch => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/community`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
            },
        })
        
        const data = await res.json()

        dispatch({
            type: GET_ALL_GROUPS,
            payload: {groups: data.groups}
        })
    }catch(err){
        dispatch(returnErrors(err.message));
    }
}

export const getGroupPosts = (id, token) => async dispatch => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/community/group/info/${id}`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
                authorization: `bearer ${token}`
            },
        })
        
        const data = await res.json()
        dispatch({
            type: GET_SINGLE_GROUP,
            payload: {group: data}
        })
    }catch(err){
        dispatch(returnErrors(err.message));
    }
}

export const clearMsg = () => {
    return {
        type: CLEAR_MSG
    }
}