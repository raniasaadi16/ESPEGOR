import { returnErrors } from "./errActions";
import { GET_ALL_GAMES, GET_SINGLE_GAME, CLEAR_MSG } from './types'




export const getAllGames = () => async dispatch => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/game/all`, {
            method: 'GET',
            credentials:'include',
            headers: {
                "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_ORIGIN
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