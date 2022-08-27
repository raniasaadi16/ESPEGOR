import React, { useEffect, useState } from 'react'
import { AiOutlineLike, AiOutlinePicture } from 'react-icons/ai'
import { BiDislike } from 'react-icons/bi'
import { CgClose } from 'react-icons/cg'
import { FaWpforms } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { MdOutlineAddPhotoAlternate, MdPeopleOutline } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import API from '../../Services/AuthIntercepteurs'
import { Navbar } from '../Global Components/navbar'
import { GroupPost } from './GroupPost'

import { io } from 'socket.io-client';
import Interweave from 'interweave'

let socket = io('https://egorgaming.com');
// let socket = io('http://localhost:8000');
export const GroupPage = () => {


    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);

    const [posts, setPosts] = useState([]);


    const [infos, setInfos] = useState({});



    const [room, setRoom] = useState('');
    const [username, setUsername] = useState('');
    const [msg, setMsg] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [preview, setpreview] = useState('');

    const group_id = useParams('group_id');

    
    const PopupNewGroup = () => {
        document.getElementById("popup-form").style.display = 'block';
    };

    const PopupCloseNewGroup = () => {
        document.getElementById("popup-form").style.display = 'none';
    };


    const upload = e => {
        var reader = new FileReader();
        var url = reader.readAsDataURL(e.target.files[0]);
        if(e.target.files[0].type.split('/')[0] == 'image'){
            reader.onloadend = function (e) {
                setpreview(reader.result);
            }
            setFile(e.target.files[0]);
        }else{
           console.log('err')
        }
    };


    const CreateNewPostGroup = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append('title', title);
        formData.append('picture', file);

        await API.post(`${process.env.REACT_APP_SERVER_END_POINT}/community/group/post/${group_id.id}`, formData).then(res => {
        });
        window.location.reload();

    }



    useEffect(() => {
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/community/group/posts/${group_id.id}`).then(res => {
            const list = res.data;
            list.forEach(element => {
                setPosts((list) => [...list, element]);
            });
        });
    }, [])





    // chat section logic here


    useEffect(() => {


        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/community/get/group/name/${group_id.id}`).then(res => {
            setRoom(res.data.name);
        });

        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/get/auth/user`).then(res => {
            setUsername(res.data.name);
            socket.emit('join_room', username, room);
        });

        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/community/group/info/${group_id.id}`).then(res => {
            setInfos(res.data);
        });

    }, []);


    useEffect(() => {
        socket.on('receive_msg', (data) => {
            setMessageList((list) => [...list, data]);
        });

    }, [socket]);


    const sendMessage = async () => {

        if (msg !== ""){
            const messageData = {
                username: username,
                room: room,
                msg: msg,
            }

            await socket.emit('send_msg', messageData);
            setMessageList((list) => [...list, messageData]);
            setMsg('');
            document.getElementById("msg").value = "";
        }
    }

    




    return (
        <div className="grouppage f">
            <Navbar />
            <div className="container">
                <div className="wrapper f">
                    <div className="left">
                        <div className="background">
                            <div className="icon">
                                <img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/community/nigh.png`} alt="" />
                            </div>
                            <div className="name">
                                <span>{infos.name}</span>
                            </div>
                            <div className="description">
                                <Interweave content={infos.description} />
                            </div>
                            
                            <div className="created_at">
                                <span>{infos.created_at}</span>
                            </div>

                            <div className="infos">
                                <div className="section f-c-c">
                                    <MdPeopleOutline />
                                    <span className="ml-1">{infos.followers}</span>
                                </div>
                                <div className="section f-c-c">
                                    <AiOutlinePicture />
                                    <span className="ml-1">{infos.posts}</span>
                                </div>
                                <div className="section f-c-c">
                                    <AiOutlineLike />
                                    <span className="ml-1">{infos.total_likes}</span>
                                </div>
                                <div className="section f-c-c">
                                    <BiDislike />
                                    <span className="ml-1">{infos.total_dislikes}</span>
                                </div>
                            </div>
                            <br />
                            <button onClick={PopupNewGroup}>Add New Post</button>
                        </div>
                    </div>
                    <div className="middle">
                        <div className="post-holder f-cl gap10">
                            {
                                posts.map((item, index)=> {
                                    return <GroupPost key={index} data={item} />
                                })
                            }
                        </div>
                    </div>
                    <div className="right">
                        <div className="chat-section">
                            <div className="messages-holder f-cl gap10">
                                {messageList.map((item, i) => {
                                    return (<div key={i} className="message">
                                    <div className="sender f-b-c">
                                        <span>{item.username}</span>
                                        <span>{new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()}</span>
                                    </div>
                                    <div className="content">
                                        <span>{item.msg}</span>
                                    </div>
                                </div>);
                                })}

                            </div>
                            <div className="input-holder f">
                                <input type="text"
                                    id="msg"
                                    name="msg"
                                    placeholder="type something ..."
                                    onChange={(e) => {setMsg(e.target.value)}} 
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                />
                                <button className="f-c-c" onClick={sendMessage}><FiSend /></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="popup-form" className="c-popup-form">
                    <div className="f-c-c">
                        <div className="form-content">
                            <div className="pop-top f-b-c">
                                <FaWpforms />
                                <CgClose className="close" onClick={PopupCloseNewGroup}/>
                            </div>
                            <div className="pop-label">
                                <p>{"Create a New Post In This Group"}</p> 
                                <span>Please fill in the form to create a new Post</span>
                            </div>
                            <div className="form">
                                <form className="double-form f-cl gap10" encType="multipart/form-data">
                                    <div className="form-input f-cl">
                                        <label htmlFor="name">Title</label>
                                        <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div className="file-submit f-cl">
                                        <label className="uploadLabel f-c-c">
                                            <MdOutlineAddPhotoAlternate />
                                            <span className="upload-file-span ml-1">Select Group Icon</span>
                                            <input type="file" className="uploadButton" name="icon"
                                                onChange={upload} />
                                        </label>
                                        {preview && (
                                            <img src={preview} alt="" style={{width: '100%', margin: '5px 0'}} />
                                        )}
                                    </div>
                                    <div className="c-button">
                                        <button className='w-100' onClick={CreateNewPostGroup}>Post</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
