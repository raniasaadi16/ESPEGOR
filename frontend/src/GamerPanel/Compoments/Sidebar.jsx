import React from 'react'
import './../../Cstyle.css'
import {Link} from 'react-router-dom';
import  {MdOutlineDashboard, MdOutlineGeneratingTokens, MdOutlineLocalOffer} from 'react-icons/md'
import  {FaSignOutAlt} from 'react-icons/fa'
import {HiOutlineUsers} from 'react-icons/hi'
import {IoGameControllerOutline} from 'react-icons/io5'
import {CgListTree} from 'react-icons/cg'


export const Sidebar = (props) => {
    return (
        <div className="sidebar">
            <div className="s-logo f-c-c">
                <div className="logo">
                    <img src="./../logo.png" alt=""/>
                </div>
                <div className="name">
                    <h3>EGOR</h3>
                </div>
            </div>
            <div className="s-links">
                <div className="s-flex">
                    <ul>
                        <li className={props.index === 0 ? "s-l-active f-n-c" : "f-n-c"}><MdOutlineDashboard size={20} /><Link to="/dashboard"><span>Dashboard</span></Link></li>                        
                        <li className={props.index === 1 ? "s-l-active f-n-c" : "f-n-c"}><CgListTree size={20} /><Link to="/dashboard/competitions"><span>Competitions</span></Link></li>
                        <li className={props.index === 2 ? "s-l-active f-n-c" : "f-n-c"}><IoGameControllerOutline size={20} /><Link to="/dashboard/games"><span>Games</span></Link></li>
                        <li className={props.index === 3 ? "s-l-active f-n-c" : "f-n-c"}><HiOutlineUsers size={20} /><Link to="/dashboard/players"><span>Players</span></Link></li>
                        <li className={props.index === 4 ? "s-l-active f-n-c" : "f-n-c"}><MdOutlineGeneratingTokens size={20} /><Link to="/dashboard/tokens"><span>Buy Tokens</span></Link></li>
                        <li className={props.index === 5 ? "s-l-active f-n-c" : "f-n-c"}><MdOutlineLocalOffer size={20} /><Link to="/dashboard/offers"><span>Token Offers</span></Link></li>
                    </ul>
                </div>
            </div>

            <div className="logout f-c-c">
                <FaSignOutAlt />
                <span>Logout</span>
            </div>
        </div>
    )
}
