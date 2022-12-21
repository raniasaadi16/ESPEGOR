import { END_LOADING, LOADING, SET_ACTIVE_MENU } from "./types"


export const setActiveMenu = (path) => dispatch => {
    dispatch({
        type: SET_ACTIVE_MENU,
        payload: path
    })
}



export const loading = (data) => dispatch => {
    dispatch({
        type: LOADING,
        payload: data
    })
}

