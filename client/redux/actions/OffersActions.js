import { returnErrors } from "./errActions";
import { GET_ALL_OFFERS, GET_SINGLE_OFFER, CLEAR_MSG, SUCCUSS_TRANSITION } from './types'


const url = 'http://localhost:8000/api'
const origin = "http://localhost:3000"

export const getAllOffers = () => async dispatch => {
    try {

        const res = await fetch(`${url}/offer/all`, {
            method: 'GET',
            credentials:'include',
            headers: {
                "Access-Control-Allow-Origin": origin
            },
        })
        
        const data = await res.json()

        dispatch({
            type: GET_ALL_OFFERS,
            payload: {offers: data.offers}
        })
    }catch(err){
        dispatch(returnErrors(err.message));
    }
}

export const createTransition = (token, data) => async dispatch => {
    try {

        const res = await fetch(`${url}/transition/create`, {
            method: 'POST',
            credentials:'include',
            body: data,
            headers: {
                'Access-Control-Allow-Credentials': true,
                authorization: `bearer ${token}`
            },
        })
        
        const transition = await res.json()
        if(!transition.transition){
            return dispatch(returnErrors(transition.msg));
        }

        dispatch({
            type: SUCCUSS_TRANSITION,
            payload: {msg: transition.msg}
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