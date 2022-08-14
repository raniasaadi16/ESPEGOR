import React from 'react'
import {CgClose} from 'react-icons/cg'

export const ImagePopup = (props) => {

    const closeOffer = () => {
        document.getElementById("image-popup").style.display = 'none';
    }

    return (
        <div id="image-popup">
            <div className="f-c-c">
                <div className="form-content">
                    <img src={props.img} alt="" />
                </div>
                <div className="pop-top f-b-c">
                    <CgClose onClick={closeOffer} size={40} className="close" />
                </div>
            </div>
        </div>
    );
}
