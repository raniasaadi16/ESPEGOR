import { HYDRATE } from "next-redux-wrapper"
import { CLEAR_MSG, GET_ALL_OFFERS, GET_SINGLE_OFFER, SUCCUSS_TRANSITION } from '../actions/types'

const initialState = {
    offers: null,
    offer: null,
    msg: null,
};

const OffersReducer = (state = initialState, action)=>{
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload}
        case GET_ALL_OFFERS:
            return {
                ...state, 
                offers: action.payload.offers
            }
        case GET_SINGLE_OFFER:
            return {
                ...state, 
                offer: action.payload.offer
            }
        case SUCCUSS_TRANSITION:
            return {
                ...state,
                msg: action.payload.msg
            }
        case CLEAR_MSG:
            return {
                ...state,
                msg: null
            }
        default:
            return state;
    }
};

export default OffersReducer;