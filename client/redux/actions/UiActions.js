import { SET_ACTIVE_MENU } from "./types"


export const setActiveMenu = (path) => dispatch => {
    dispatch({
        type: SET_ACTIVE_MENU,
        payload: path
    })
}