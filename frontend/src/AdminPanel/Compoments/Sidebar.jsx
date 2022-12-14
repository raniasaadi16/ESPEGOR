import React, { useState } from 'react'
import './../../Cstyle.css'
import  {MdOutlineDashboard, MdOutlineGeneratingTokens, MdOutlineLocalOffer} from 'react-icons/md'
import  {FaSignOutAlt} from 'react-icons/fa'
import {HiOutlineUserGroup, HiOutlineUsers} from 'react-icons/hi'
import {IoGameControllerOutline} from 'react-icons/io5'
import {CgListTree} from 'react-icons/cg'


import Cookies from 'universal-cookie';
import {Link, useHistory} from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai'



export const Sidebar = (props) => {
    const [openNav, setopenNav] = useState(false);
    const cookies = new Cookies();
    const authCookie = cookies.get('auth_token');

    const history = useHistory();


    return (
        <div className={`${openNav && 'opened'} sidebar`}>
            <div className="h-container">
                <div className="s-logo f-c-c">
                    <div className="logo">
                        <img src="./../logo.png" alt=""/>
                    </div>
                    <div className="name">
                        <h3>EGOR</h3>
                    </div>
                </div>
                <div className="h-menu" onClick={() => setopenNav(prev => !prev)}>
                    <AiOutlineMenu/>
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
                        <li className={props.index === 6 ? "s-l-active f-n-c" : "f-n-c"}><HiOutlineUserGroup size={20} /><Link to="/dashboard/group"><span>Groups</span></Link></li>
                    </ul>
                </div>
            </div>

            <div className="logout f-c-c" 
                onClick={() => {
                    cookies.remove('auth_token');
                    history.push('/login');
                }
            }>
                <FaSignOutAlt />
                <span>Logout</span>
            </div>
        </div>
    )
}
