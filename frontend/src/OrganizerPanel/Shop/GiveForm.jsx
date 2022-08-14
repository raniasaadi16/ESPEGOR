import React from 'react'
import { CgClose } from 'react-icons/cg';
import { FaWpforms } from 'react-icons/fa';
import { RiSendPlaneLine } from 'react-icons/ri';

export const GiveForm = () => {

    const CloseGive = () => {
        document.getElementById("popup-form").style.display = 'none';
    }

    return (
        <div id="popup-form">
            <div className="f-c-c">
                <div className="form-content">
                    <div className="pop-top f-b-c">
                        <FaWpforms />
                        <CgClose onClick={CloseGive} className="close" />
                    </div>
                    <div className="pop-label">
                        <p> Give Diamonds To a Gamer </p> 
                        <span>You Have 135 Diamonds</span>
                    </div>
                    <div className="form">
                        <form>
                            <div className="price two-input-row">
                                <div className="old-offer-price f-cl">
                                    <label htmlFor="oldprice">Gamer ID</label>
                                    <input type="number" name="oldprice" id="oldprice" 
                                        min="1"
                                    />
                                </div>
                                <div className="new-offer-price  f-cl">
                                    <label htmlFor="newprice">Diamonds Amount</label>
                                    <input type="number" name="newprice" id="newprice" 
                                        min="1"
                                    />
                                </div>
                            </div>
                            
                            
                            <div className=" f-cl">
                                <button type="submit" className="full-submit-btn f-c-c">
                                    <RiSendPlaneLine />
                                    <span>Send Diamonds</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
