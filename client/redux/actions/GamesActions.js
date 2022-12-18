import { returnErrors } from "./errActions";
import { GET_ALL_GAMES, GET_SINGLE_GAME, CLEAR_MSG } from './types'


const url = 'http://localhost:8000/api'
const origin = "http://localhost:3000"

export const getAllGames = () => async dispatch => {
    try {

        const res = await fetch(`${url}/game/all`, {
            method: 'GET',
            credentials:'include',
            headers: {
                "Access-Control-Allow-Origin": origin
            },
        })
        
        const data = await res.json()

        dispatch({
            type: GET_ALL_GAMES,
            payload: {games: data.games}
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