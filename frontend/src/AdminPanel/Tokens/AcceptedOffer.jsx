import React from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
import {FcCamera} from 'react-icons/fc'
import axios from 'axios'

export const AcceptedOffer = (props) => {

    const SeeReceipt = () => {
        props.SetImg(props.data.photo);
        document.getElementById("image-popup").style.display = 'block';
    }

    const DeleteReceipt = () => {
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/transition/delete/${props.data.id}`).then((res) => {
            props.SetReloadPage(props.reloadPage + 1);
        });
    }

    return (
        <div className="token-offer f-cl">
            <div className="t-offer f-n-c">
                <div className="profile-pic">
                    <img src="./../profile-pic.svg" alt="" width="25" />
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
                    <div className="reject f-c-c" onClick={DeleteReceipt}><AiOutlineDelete size={12} /></div>
                </div>
                <div className="right">
                    <div className="photo-check f-c-c" onClick={SeeReceipt}>
                        <FcCamera />
                    </div>
                </div>
            </div>
        </div>
    )
}
