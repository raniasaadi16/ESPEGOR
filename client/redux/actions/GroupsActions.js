import { loading } from "./UiActions";
import { returnErrors } from "./errActions";
import { CHECK_IF_USER_JOINED_GROUP, CLEAR_MSG, CREATE_POST, GET_ALL_GROUPS, GET_GROUP_MEMBERS, GET_GROUP_POSTS, GET_SINGLE_GROUP, JOIN_GROUP } from './types'




export const getAllGroups = () => async dispatch => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/community`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
            },
        })
        
        const data = await res.json()

        dispatch({
            type: GET_ALL_GROUPS,
            payload: {groups: data.groups}
        })
    }catch(err){
        dispatch(returnErrors(err.message));
    }
}

export const getGroupInfos = (id, token) => async dispatch => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/community/group/info/${id}`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
                authorization: `bearer ${token}`
            },
        })
        
        const data = await res.json()
        dispatch({
            type: GET_SINGLE_GROUP,
            payload: {group: data}
        })
    }catch(err){
        console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
        dispatch(returnErrors(err.message));
    }
}

export const getGroupPosts = (id, token) => async dispatch => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/community/group/posts/${id}`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
                authorization: `bearer ${token}`
            },
        })
        
        const data = await res.json()
        if(data?.length >0){
            dispatch({
                type: GET_GROUP_POSTS,
                payload: {posts: data}
            })

        }
    }catch(err){
        console.log('brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')

        dispatch(returnErrors(err.message));
    }
}

export const createPost = (token, id, data) => async dispatch => {
    dispatch(loading(true))
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/community/group/post/${id}`, {
            method: 'POST',
            credentials:'include',
            body: data,
            headers: {
                'Access-Control-Allow-Credentials': true,
                authorization: `bearer ${token}`
            },
        })
        
        const post = await res.json()
        if(!post.success){
            dispatch(loading(false))
            return dispatch(returnErrors(post.msg));
        }

        dispatch({
            type: CREATE_POST,
            payload: {msg: post.msg}
        })
    }catch(err){
        console.log('errrrrrrrrrrrerereeeeeeeeeeeeee')
        dispatch(returnErrors(err.message));
    }
    dispatch(loading(false))
}

export const checkJoined = (id , token) => async dispatch => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/community/check/group/${id}`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
                authorization: `bearer ${token}`
            },
        })
        
        const data = await res.json()
        console.log(data, 'data')
        dispatch({
            type: CHECK_IF_USER_JOINED_GROUP,
            payload: data.length > 0 ? true : false
        })
    }catch(err){
        dispatch(returnErrors(err.message))
    }
}

export const joinGroup = (token, id) => async dispatch => {
    dispatch(loading(true))
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/community/join/group/${id}`, {
            method: 'POST',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
                authorization: `bearer ${token}`
            },
        })
        
        const result = await res.json()
        if(!result.success){
            dispatch(loading(false))
            return dispatch(returnErrors(result.msg));
        }

        dispatch({
            type: JOIN_GROUP,
            payload: {msg: result.msg}
        })
    }catch(err){
        dispatch(returnErrors(err.message));
    }
    dispatch(loading(false))
}

export const getGroupMembers = (id, token) => async dispatch => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/community/group/members/${id}`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
                authorization: `bearer ${token}`
            },
        })
        
        const data = await res.json()
        if(data?.length >0){
            dispatch({
                type: GET_GROUP_MEMBERS,
                payload: data
            })

        }
    }catch(err){

        dispatch(returnErrors(err.message));
    }
}
export const clearMsg = () => {
    return {
        type: CLEAR_MSG
    }
}