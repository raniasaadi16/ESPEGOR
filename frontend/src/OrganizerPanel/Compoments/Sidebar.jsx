import React from 'react'
import './../../Cstyle.css'
import {Link} from 'react-router-dom';
import  {MdOutlineDashboard, MdOutlineLocalOffer} from 'react-icons/md'
import  {FaSignOutAlt} from 'react-icons/fa'
import {CgListTree} from 'react-icons/cg'
import {AiOutlineShop} from 'react-icons/ai'
import {BsFillFilePostFill} from 'react-icons/bs'

export const Sidebar = (props) => {
    return (
        <div className="sidebar">
            <div className="s-logo f-c-c">
                <div className="logo">
                    <img src="./../logo.png" alt=""/>
                </div>
                <div className="name">
                    <h3>Organizer</h3>
                </div>
            </div>
            <div className="s-links">
                <div className="s-flex">
                    <ul>
                        <li className={props.index === 0 ? "s-l-active f-n-c" : "f-n-c"}><MdOutlineDashboard size={20} /><Link to="/organizer/home"><span>Home</span></Link></li>                        
                        <li className={props.index === 1 ? "s-l-active f-n-c" : "f-n-c"}><CgListTree size={20} /><Link to="/organizer/competitions"><span>Competitions</span></Link></li>
                        <li className={props.index === 2 ? "s-l-active f-n-c" : "f-n-c"}><AiOutlineShop size={20} /><Link to="/organizer/shop"><span>Shop</span></Link></li>
                        <li className={props.index === 3 ? "s-l-active f-n-c" : "f-n-c"}><MdOutlineLocalOffer size={20} /><Link to="/organizer/historics"><span>Historics</span></Link></li>
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
