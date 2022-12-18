import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
    msg: null,
};

const ErrReducer = (state = initialState, action)=>{
    switch (action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
            }
        case CLEAR_ERRORS:
            return {
                msg: null,
            }
        default:
            return state;
    }
};

export default ErrReducer;