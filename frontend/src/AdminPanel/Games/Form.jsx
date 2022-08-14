/* eslint-disable */


import React, {useEffect, useState} from 'react'
import {FaWpforms} from 'react-icons/fa'
import {CgClose} from 'react-icons/cg'
import {MdOutlineAddPhotoAlternate} from 'react-icons/md'
import {RiSendPlaneLine} from 'react-icons/ri'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


import axios from 'axios';


export const Form = ({game}) => {

    const id = game ? game.id : undefined;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(0);
    const [icon, setIcon] = useState(null);

    const closeGame = () => {
        document.getElementById("popup-form").style.display = 'none';
    }

    const SubmitGame = async (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("status", status);
        formData.append("icon", icon);

        if (id) {
            await axios.post(`${process.env.REACT_APP_SERVER_END_POINT}/game/update/${id}`, formData).then( res => {
                console.log(res.data);
            });
        } else {
            await axios.post(`${process.env.REACT_APP_SERVER_END_POINT}/game/create`, formData).then( res => {
                console.log(res.data);
            });
        }

        window.location.reload();
    }


    useEffect(() => {        
        setName(id?game.name:'');
        setDescription(id?game.description:'');
        setStatus(id?game.game_status:0),
        setIcon(null);
    }, [game]);


    return (
        <div id="popup-form">
            <div className="f-c-c">
                <div className="form-content">
                    <div className="pop-top f-b-c">
                        <FaWpforms />
                        <CgClose onClick={closeGame} className="close" />
                    </div>
                    <div className="pop-label">
                        <p>Lorem ipsum dolor sit amet,.</p>
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et similique quod laudantium dolore porro aliquid iusto.</span>
                    </div>
                    <div className="form">
                        <form onSubmit={SubmitGame}>
                            <div className="name f-cl">
                                <label htmlFor="name">Game Name</label>
                                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="desc f-cl">
                                <label htmlFor="desc">Game Description</label>
                                <ReactQuill theme="snow" value={description} onChange={setDescription} />
                            </div>
                            <div className="status f-cl">
                                <label htmlFor="status">Game Status</label>
                                <select name="status" id="status"  value={status} onChange={(e) => setStatus(e.target.value)} >
                                    <option value="0">Pending</option>
                                    <option value="1">Inactive</option>
                                    <option value="2">Active</option>
                                </select>
                            </div>
                            <div className="file-submit f-b-c">
                                <label class="uploadLabel f-b-c">
                                    <MdOutlineAddPhotoAlternate />
                                    <span className="upload-file-span">Game Icon</span>
                                    <input 
                                        type="file"
                                        class="uploadButton" 
                                        onChange={(e) => setIcon(e.target.files[0])} 
                                        accept="image/*"
                                        name="icon"
                                    />
                                </label>
                                <button className="submit-btn f-c-c">
                                    <RiSendPlaneLine />
                                    <span>Submit</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
