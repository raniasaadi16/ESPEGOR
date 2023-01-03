import React from 'react'
import { CompetitionTransaction } from './CompetitionTransaction';
import { AiFillGift } from "react-icons/ai";
import { BsFillWalletFill } from 'react-icons/bs';


export const Page = () => {


    const GiveTokens = () => {
        document.getElementById("popup-form").style.display = 'block';
    }


    const Withdraw = () => {
        document.getElementById("popup-form-w").style.display = 'block';
    }

    return (
        <div className="page">
            <div className="d-navbar f-b-c">
                <div className="d-left"><span>Shop Store</span></div>
                <div className="buttons f">
                    <button className="f-n-c" onClick={Withdraw}><BsFillWalletFill /><span>Withdraw</span></button>
                    <button className="f-n-c ml-1" onClick={GiveTokens}><AiFillGift /><span>Give Away Tokens</span></button>
                </div>
            </div>
            <div className="balance f-b-e">
                <div className="holder">
                    <p>Your Balance</p>
                    <div className="b-wrapper f">
                        <div className="section gold f-n-c">
                            <img src="./../coin.png" alt="" width="20" />
                            <span> 4399</span>
                        </div>
                        <div className="section diamond f-n-c">
                            <img src="./../diamond.png" alt="" width="20" />
                            <span> 49</span>
                        </div>
                    </div>
                </div>
                <div classNam3="a-s-e">
                    <select name="competition" id="competition-select">
                        <option value="1">Free Fire Max </option>
                        <option value="1">Free Fire Max </option>
                        <option value="1">Free Fire Max </option>
                        <option value="1">Free Fire Max </option>
                        <option value="1">Free Fire Max </option>
                        <option value="1">Free Fire Max </option>
                    </select>
                </div>
            </div>
            <div className="historic-holder">
                <div className="wrapper">
                    <CompetitionTransaction />
                    <CompetitionTransaction />
                    <CompetitionTransaction />
                    <CompetitionTransaction />
                    <CompetitionTransaction />
                    <CompetitionTransaction />
                    <CompetitionTransaction />
                    <CompetitionTransaction />
                </div>
            </div>
        </div>
    );
}
