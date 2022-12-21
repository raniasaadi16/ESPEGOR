import { loading } from "./UiActions";
import { returnErrors } from "./errActions";
import { GET_ALL_OFFERS, GET_SINGLE_OFFER, CLEAR_MSG, SUCCUSS_TRANSITION } from './types'



export const getAllOffers = () => async dispatch => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/offer/all`, {
            method: 'GET',
            credentials:'include',
            headers: {
                "Access-Control-Allow-Origin":process.env.NEXT_PUBLIC_ORIGIN
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
    dispatch(loading(true))
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/transition/create`, {
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
            dispatch(loading(false))
            return dispatch(returnErrors(transition.msg));
        }

        dispatch({
            type: SUCCUSS_TRANSITION,
            payload: {msg: transition.msg}
        })
    }catch(err){
        dispatch(returnErrors(err.message));
    }
    dispatch(loading(false))
}


export const clearMsg = () => {
    return {
        type: CLEAR_MSG
    }
}