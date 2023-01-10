import React, { useState } from 'react'
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai'
import axios from 'axios'
import Popup from '../../Components/Popup'

export const DealOffer = (props) => {
    const [err, seterr] = useState('');
    const DeleteOffer = function(){
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/offer/delete/${props.data.id}`).then( res => {
            props.setmsg('deleted succussfully')
        }).catch(err => seterr(err));
    }

    const UpdateOffer = () => {
        props.SetOffer(props.data);
        document.getElementById("popup-form").style.display = 'block';
    }

    return (
        <div className="offer">
            {err && <Popup err={err} seterr={seterr} />}
            <div className="o-top">
                <h4>{props.data.name}</h4>
                <p className="f-c-c">
                    <span>{props.data.description}</span>
                </p>
            </div>
            <div className="o-price">
                <p>{props.data.new_price} DA</p>
            </div>
            <div className="o-infos">
                <div className="coins f-c-c ">
                    <img src="./../coin.png" alt="" />
                    <span>{props.data.gold_amount} </span>
                </div>
                <div className="coins f-c-c">
                    <img src="./../diamond.png" alt="" />
                    <span>{props.data.diamonds_amount} </span>
                </div>
            </div>
            <div className="o-options">
                <button className="edit f-c-c" onClick={UpdateOffer}><AiOutlineEdit /><span>Edit</span></button>
                <button className="delete f-c-c" onClick={DeleteOffer}><AiOutlineDelete /><span>Delete</span></button>
            </div>

        </div>
    );
}
