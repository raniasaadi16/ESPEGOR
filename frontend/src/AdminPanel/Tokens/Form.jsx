import React from 'react'
import {FaWpforms} from 'react-icons/fa'
import {CgClose} from 'react-icons/cg'
import {AiOutlineGift} from 'react-icons/ai'


export const Form = () => {
    const closeGame = () => {
        document.getElementById("popup-form").style.display = 'none';
    }


    return (
        <div id="popup-form">
            <div className="f-c-c">
                <div className="form-content">
                    <div className="pop-top f-b-c">
                        <FaWpforms />
                        <CgClose onClick={closeGame} className="close" />
                    </div>
                    <div className="pop-label">
                        <p>Give Away Token To Players</p> 
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et similique quod laudantium dolore porro aliquid iusto.</span>
                    </div>
                    <div className="form">
                        <form>
                            <label htmlFor="name">Enter The Gamer ID</label>
                            <div className="only-one">
                                <div className="input-prefix f">
                                    <div className="prefix"><span> U - </span></div>
                                    <input type="number" name="player_id" id="player_id" />
                                </div>
                                <div className="one-gift three-input-row">
                                    <div className="old-offer-price">
                                        <label htmlFor="oldprice">Given Golds</label>
                                        <input type="number" name="oldprice" id="oldprice" />
                                    </div>
                                    <div className="new-offer-price">
                                        <label htmlFor="newprice">Given Diamonds</label>
                                        <input type="number" name="newprice" id="newprice" />
                                    </div>
                                    <div className="one">
                                        <label htmlFor="">Send Gift</label>
                                        <button className="submit-btn f-c-c">
                                            <AiOutlineGift />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="line">
                                <hr style={{width: "100px", height: "1px"}} />  
                            </div>
                            
                            <div className="all-players" style={{marginTop: "10px"}}>
                                <div className="one-gift three-input-row">
                                    <div className="old-offer-price">
                                        <label htmlFor="oldprice">Given Golds</label>
                                        <input type="number" name="oldprice" id="oldprice" />
                                    </div>
                                    <div className="new-offer-price">
                                        <label htmlFor="newprice">Given Diamonds</label>
                                        <input type="number" name="newprice" id="newprice" />
                                    </div>
                                    <div className="one">
                                        <label htmlFor="">Send Gift</label>
                                        <button className="submit-btn f-c-c">
                                            <AiOutlineGift />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
