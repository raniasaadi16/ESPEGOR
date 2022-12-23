import { IS_LOADED, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, ACTIVATE_ACCOUNT, ACTIVATE_FAIL, RESEND_ACTIVATE, CLEAR_MSG, ADD_PROFILE, FORGET_PASS, RESET_PASS, RESET_PASSGET, UPDATE_PASS, UPDATE_EMAIL, UPDATE_ME, CONFIRM_NEWEMAIL, DELETE_ME, GET_PROFILE, GET_PLAYER_COMPS, GET_PLAYER_OFFERS } from "./types";
import { returnErrors } from "./errActions";
import Cookies from 'universal-cookie';
import { loading } from "./UiActions";


export const loadUser = (token) => async dispatch => {
    try {
        if(token){
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/get/auth/user`, {
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
    dispatch(loading(true))
    try{
        console.log(user, 'user')
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/player/register`, {
            method: 'POST',
            body: user,
            headers: {
                'Access-Control-Allow-Credentials': true,
                "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_ORIGIN
            },
            credentials: "include"
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
    dispatch(loading(false))
};

export const login = (user) => async dispatch => {
    dispatch(loading(true))
    try{
        const data = JSON.stringify(user);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/signin` ,{
            method: 'POST',
            body: data,
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_ORIGIN
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
    dispatch(loading(false))
};

export const googleLogin = (tokenId)=> async dispatch =>{
    dispatch(loading(true))
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/player/register/google`, {
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
    dispatch(loading(false))
};

export const fbLogin = (accessToken, userId)=> async dispatch =>{
    dispatch(loading(true))
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/player/register/fb`, {
            method: 'POST',
            body: JSON.stringify({accessToken, userID:userId}),
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
    dispatch(loading(false))
};

export const discordLogin = (code)=> async dispatch =>{
    dispatch(loading(true))
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/player/register/discord`, {
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
    dispatch(loading(false))
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

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/player/profile`, {
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

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/competition/auth/${authPlayerId}`, {
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

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/transition/auth`, {
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