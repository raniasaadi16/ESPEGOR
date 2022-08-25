import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg';
import { FaWpforms } from 'react-icons/fa';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { useHistory } from "react-router-dom"
import Cookies from 'universal-cookie';

import API from './../../Services/AuthIntercepteurs';

export const BuyTokensPopup = (props) => {

    const closeTokenScreenShoot = () => {
        document.getElementById("popup-form").style.display = 'none';
    }


    const [screenShoot, setScreenShoot] = useState(null);

    let history = useHistory()

    const submitOffer = async (e) => {
        e.preventDefault();


        const cookies = new Cookies();

        if (!cookies.get('auth_token')){
            return history.push("/login");
        } else if(screenShoot===null) {
            return alert('You Need To Send The Receipt Before You Ask For Tokens');
        }
    

        const formData = new FormData();
        formData.append('offer_id', props.data.id);
        formData.append('price', props.data.new_price);
        formData.append('golds', props.data.gold_amount);
        formData.append('diamonds', props.data.diamonds_amount);
        formData.append('picture', screenShoot);

        await API.post(`${process.env.REACT_APP_SERVER_END_POINT}/transition/create`, formData).then(res => {
            console.log(res.data);
        });
        closeTokenScreenShoot();
        history.push('/');
    }


    return (
        <div id="popup-form">
            <div className="f-c-c">
                <div className="form-content">
                    <div className="pop-top f-b-c">
                        <FaWpforms />
                        <CgClose onClick={closeTokenScreenShoot} className="close" />
                    </div>
                    <br />
                    <form className="form screenshoot-ul">
                        <p>Make Sure To Do The Following Before You Send Us The ScreenShoot! </p>
                        <ul>
                            <li>You Sent The Right Amount of Money To The Right Account</li>
                            <li>You Select The Right Offer</li>
                            <li>You Took a Clear Picture To The Reciept</li>
                        </ul>
                        <div className="f-b-c f-cl gap10">
                            <label class="uploadLabel f-b-c">
                                <MdOutlineAddPhotoAlternate style={{width: '200px'}}/>
                                <span className="upload-file-span"></span>
                                <input type="file" class="uploadButton" name="icon" accept="image/*" onChange={(e) => setScreenShoot(e.target.files[0])} />
                            </label>
                            <button onClick={submitOffer}>Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
