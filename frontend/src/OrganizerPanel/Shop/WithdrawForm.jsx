import React from 'react'
import { CgClose } from 'react-icons/cg';
import { FaWpforms } from 'react-icons/fa';
import { RiSendPlaneLine } from 'react-icons/ri';

export const WithdrawForm = () => {

    const CloseWithdraw = () => {
        document.getElementById("popup-form-w").style.display = 'none';
    }

    return (
        <div id="popup-form-w">
            <div className="f-c-c">
                <div className="form-content">
                    <div className="pop-top f-b-c">
                        <FaWpforms />
                        <CgClose onClick={CloseWithdraw} className="close" />
                    </div>
                    <div className="pop-label">
                        <p> Withdraw Your Diamonds </p> 
                        <span>You Have 135</span><br />
                        <span>10 diamonds = 1000DA</span>
                    </div>
                    <div className="form">
                        <form>
                            <div className="price two-input-row">
                                <div className="old-offer-price f-cl">
                                    <label htmlFor="oldprice">Amount</label>
                                    <input type="number" name="oldprice" id="oldprice" 
                                        min="1"
                                    />
                                </div>
                            </div>
                            <div className="price two-input-row">
                                <div className="old-offer-price f-cl">
                                    <label htmlFor="oldprice">CCP /Paysera </label>
                                    <input type="text" name="oldprice" id="oldprice" 
                                        min="1"
                                    />
                                </div>
                            </div>
                            <div className=" f-cl">
                                <button type="submit" className="full-submit-btn f-c-c">
                                    <RiSendPlaneLine />
                                    <span>Send Request To Admin</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
