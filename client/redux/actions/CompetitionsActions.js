import { returnErrors } from "./errActions";
import { GET_ALL_COMPETITIONS, GET_SINGLE_COMPETITION, GET_TOP_COMPETITIONS, CLEAR_MSG, CHECK_IF_USER_JOINED_COMPETITION } from './types'


const url = 'http://localhost:8000/api'
const origin = "http://localhost:3000"

export const getRecentComps = () => async dispatch => {
    try {

        const res = await fetch(`${url}/competition/recent`, {
            method: 'GET',
            credentials:'include',
            headers: {
                "Access-Control-Allow-Origin": origin
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

        const res = await fetch(`${url}/competition/all`, {
            method: 'GET',
            credentials:'include',
            headers: {
                "Access-Control-Allow-Origin": origin
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

        const res = await fetch(`${url}/competition/${id}`, {
            method: 'GET',
            credentials:'include',
            headers: {
                "Access-Control-Allow-Origin": origin
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
        const res = await fetch(`${url}/player/check/${authId}/${compId}`, {
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

export const clearMsg = () => {
    return {
        type: CLEAR_MSG
    }
}