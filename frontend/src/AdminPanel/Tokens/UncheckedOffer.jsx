import React from 'react'
import {FaTimes} from 'react-icons/fa'
import {BsCheckLg} from 'react-icons/bs'
import {FcCamera} from 'react-icons/fc'

import axios from 'axios'

export const UncheckedOffer = (props) => {

    const SeeReceipt = () => {
        props.SetImg(props.data.photo);
        document.getElementById("image-popup").style.display = 'block';
    }

    const CheckReceipt = (value) => {
        axios.post(`${process.env.REACT_APP_SERVER_END_POINT}/transition/check/${props.data.id}`, {status: value}).then((res) => {
            props.SetReloadPage(props.reloadPage + 1);
        });
    }

    return (
        <div className="token-offer f-cl">
            <div className="t-offer f-n-c">
                <div className="profile-pic">
                    <img src="./../profile-pic.svg" alt="" width="25"/>
                </div>
                <div className="t-info">
                    <div className="t-i f-b-c">
                        <h4>Sami Egor</h4>
                        <span className="offer">P-43667</span>
                    </div>
                    <div className="mt-1 t-i f-b-c">
                        <span className="offer">offer 3</span>
                        <span className="price">14500DA</span>
                    </div>
                </div>
            </div>
            <div className="token-actions f-b-c">
                <div className="left f">
                    <div className="accept f-c-c" onClick={()=>CheckReceipt(2)}><BsCheckLg size={12} /></div>
                    <div className="reject f-c-c" onClick={()=>CheckReceipt(1)}><FaTimes size={12} /></div>
                </div>
                <div className="right">
                    <div className="photo-check f-c-c"  onClick={SeeReceipt}>
                        <FcCamera />
                    </div>
                </div>
            </div>
        </div>
    )
}
