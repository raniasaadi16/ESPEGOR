import { loading } from "./UiActions";
import { returnErrors } from "./errActions";
import { GET_ALL_COMPETITIONS, GET_SINGLE_COMPETITION, GET_TOP_COMPETITIONS, CLEAR_MSG, CHECK_IF_USER_JOINED_COMPETITION, JOIN_COMPETITION } from './types'




export const getRecentComps = () => async dispatch => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/competition/recent`, {
            method: 'GET',
            credentials:'include',
            headers: {
                "Access-Control-Allow-Origin":process.env.NEXT_PUBLIC_ORIGIN
            },
        })
        
        const data = await res.json()

        dispatch({
            type: GET_TOP_COMPETITIONS,
            payload: {competitions: data}
        })
    }catch(err){
        dispatch(returnErrors(err.message));
    }
}

export const getAllComps = () => async dispatch => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/competition/all`, {
            method: 'GET',
            credentials:'include',
            headers: {
                "Access-Control-Allow-Origin":process.env.NEXT_PUBLIC_ORIGIN
            },
        })
        
        const data = await res.json()

        dispatch({
            type: GET_ALL_COMPETITIONS,
            payload: {competitions: data.competitions}
        })
    }catch(err){
        dispatch(returnErrors(err.message));
    }
}

export const getSingleComp = (id) => async dispatch => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/competition/${id}`, {
            method: 'GET',
            credentials:'include',
            headers: {
                "Access-Control-Allow-Origin":process.env.NEXT_PUBLIC_ORIGIN
            },
        })
        
        const data = await res.json()
        dispatch({
            type: GET_SINGLE_COMPETITION,
            payload: {competition: data}
        })
    }catch(err){
        dispatch(returnErrors(err.message));
    }
}

export const checkJoined = (token, authId, compId) => async dispatch => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/player/check/${authId}/${compId}`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
                authorization: `bearer ${token}`
            },
        })
        
        const data = await res.json()
        dispatch({
            type: CHECK_IF_USER_JOINED_COMPETITION,
            payload: data.length > 0 ? true : false
        })
    }catch(err){
        dispatch(returnErrors(err.message))
    }
}

export const joinComp = (token, authId, compId) => async dispatch => {
    dispatch(loading(true))
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/player/join/${authId}/${compId}`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
                authorization: `bearer ${token}`
            },
        })
        
        const data = await res.json()
        if(data.join){
            dispatch({
                type: JOIN_COMPETITION,
                payload: data.message
            })
        }else{
            throw data
        }
    }catch(err){
        dispatch(returnErrors(err.message))
    }
    dispatch(loading(false))

}

export const clearMsg = () => {
    return {
        type: CLEAR_MSG
    }
}