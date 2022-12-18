import { IS_LOADED, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, ACTIVATE_ACCOUNT, ACTIVATE_FAIL, RESEND_ACTIVATE, CLEAR_MSG, ADD_PROFILE, FORGET_PASS, RESET_PASS, RESET_PASSGET, UPDATE_PASS, UPDATE_EMAIL, UPDATE_ME, CONFIRM_NEWEMAIL, DELETE_ME, GET_PROFILE, GET_PLAYER_COMPS, GET_PLAYER_OFFERS } from "./types";
import { returnErrors } from "./errActions";
import Cookies from 'universal-cookie';

const url = 'http://localhost:8000/api'
const origin = "http://localhost:3000"
export const loadUser = (token) => async dispatch => {
    try {
        if(token){
            const res = await fetch(`${url}/get/auth/user`, {
                method: 'GET',
                credentials:'include',
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    authorization: `bearer ${token}`
                },
            })
            
            const data = await res.json()
    
            dispatch({
                type: USER_LOADED,
                payload: {user: data.data, type: data.type, isAuth: data.isAuth}
            })
        }
    }catch(err){
        dispatch({type: AUTH_ERROR})
    }
    dispatch({type: IS_LOADED});
}

export const register = (user)=> async dispatch =>{
    try{
        console.log(user, 'user')
        const res = await fetch(`${url}/player/register`, {
            method: 'POST',
            body: user,
            headers: {
                "Access-Control-Allow-Origin": origin
            }
        })
        const data = await res.json()
        
        if(!res.ok){

            throw data
        }
       
        if(data.msg){
            dispatch({
                type: REGISTER_SUCCESS,
                payload: {msg: data.msg}
            })
        }else{
            dispatch({type: LOGIN_FAIL})
            dispatch(returnErrors('something went very wrong , please try again'));
        }
    }catch(err){
        dispatch(returnErrors(err.message));
        dispatch({type: REGISTER_FAIL})
    }
};

export const login = (user) => async dispatch => {
    try{
        const data = JSON.stringify(user);
        const res = await fetch(`${url}/signin` ,{
            method: 'POST',
            body: data,
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                "Access-Control-Allow-Origin": origin
            },
            credentials: "include"
        }) 
        const logData = await res.json()
        if(!res.ok){
            throw logData
        }
        if(logData.logged){
            const cookies = new Cookies();
            cookies.set('auth_token', logData.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {type: logData.type, isAuth: logData.logged, msg: logData.msg}
            })
            dispatch(loadUser(logData.token))
        }else{
            dispatch({type: LOGIN_FAIL})
            dispatch(returnErrors(logData.msg));
        }
    }catch(err){
        dispatch(returnErrors(err.message));
        dispatch({type: LOGIN_FAIL})
    }
};

export const googleLogin = (tokenId)=> async dispatch =>{
    try{
        const res = await fetch(`${url}/player/register/google`, {
            method: 'POST',
            body: JSON.stringify({tokenId}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json()

        if(!res.ok){
            
            throw data
        }
        if(data.logged){
            const cookies = new Cookies();
            cookies.set('auth_token', data.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {type: data.type, isAuth: data.logged, msg: data.msg}
            })
            dispatch(loadUser(data.token))
        }else{
            dispatch({type: LOGIN_FAIL})
            dispatch(returnErrors(data.msg));
        }
    }catch(err){
        dispatch(returnErrors(err.message));
        dispatch({type: REGISTER_FAIL})
    }
};

export const fbLogin = (accessToken, userId)=> async dispatch =>{
    try{
        const res = await fetch(`${url}/player/register/fb`, {
            method: 'POST',
            body: JSON.stringify({accessToken, userId}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json()

        if(!res.ok){
            
            throw data
        }
        if(data.logged){
            const cookies = new Cookies();
            cookies.set('auth_token', data.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {type: data.type, isAuth: data.logged, msg: data.msg}
            })
            dispatch(loadUser(data.token))
        }else{
            dispatch({type: LOGIN_FAIL})
            dispatch(returnErrors(data.msg));
        }
    }catch(err){
        dispatch(returnErrors(err.message));
        dispatch({type: REGISTER_FAIL})
    }
};

export const discordLogin = (code)=> async dispatch =>{
    try{
        const res = await fetch(`${url}/player/register/discord`, {
            method: 'POST',
            body: JSON.stringify({code}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json()

        if(!res.ok){
            
            throw data
        }
        if(data.logged){
            const cookies = new Cookies();
            cookies.set('auth_token', data.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {type: data.type, isAuth: data.logged, msg: data.msg}
            })
            dispatch(loadUser(data.token))
        }else{
            dispatch({type: LOGIN_FAIL})
            dispatch(returnErrors(data.msg));
        }
    }catch(err){
        dispatch(returnErrors(err.message));
        dispatch({type: REGISTER_FAIL})
    }
};

export const logout = () => async dispatch => {
    try{
        const cookies = new Cookies();
        cookies.remove('auth_token');
        dispatch({
            type: LOGOUT_SUCCESS,
        })
    }catch(err){
        dispatch(returnErrors(err.message));
    }
};

export const getProfile = (token) => async dispatch => {
    try {

        const res = await fetch(`${url}/player/profile`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
                authorization: `bearer ${token}`
            },
        })
        
        const data = await res.json()
        dispatch({
            type: GET_PROFILE,
            payload: {profile: data}
        })
    }catch(err){
        dispatch(returnErrors(err.message))
    }
}

export const getPlayerComps = (authPlayerId, token) => async dispatch => {
    try {

        const res = await fetch(`${url}/competition/auth/${authPlayerId}`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
                authorization: `bearer ${token}`
            },
        })
        
        const data = await res.json()
        dispatch({
            type: GET_PLAYER_COMPS,
            payload: {comps: data}
        })
    }catch(err){
        dispatch(returnErrors(err.message))
    }
}

export const getPlayerOffers = (authPlayerId, token) => async dispatch => {
    try {

        const res = await fetch(`${url}/transition/auth`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
                authorization: `bearer ${token}`
            },
        })
        
        const data = await res.json()
        dispatch({
            type: GET_PLAYER_OFFERS,
            payload: {offers: data.transitions}
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