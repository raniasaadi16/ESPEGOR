import '../../App.css';
import { Link, useHistory} from "react-router-dom";

import { FcBusinessman, FcCollaboration, FcParallelTasks, FcShop, FcSteam } from 'react-icons/fc';
import { HiOutlineLogout } from 'react-icons/hi';
import { FiLogIn } from 'react-icons/fi';
import { AiOutlineSave } from 'react-icons/ai';
import Cookies from 'universal-cookie';
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from 'react';
export const Navbar = () => {
    const [openNav, setopenNav] = useState(false);
    const cookies = new Cookies();
    const authCookie = cookies.get('auth_token');
    const { userType} = useContext(UserContext)
    const history = useHistory();

    const Logout  = () => {
        cookies.remove('auth_token');
        history.push('/login');
    }

    return (
        <div className={`${openNav && 'opened'} navbar`}>
            <div className="container navigation f-b-c">
                <div className='h-container'>
                    <Link to="/"><div className="f-c-c"><img src="./../logo.png" alt="" width="30" /><h3 className="logo">EGOR GAMING</h3></div></Link>
                    <div className='h-menu' onClick={() => setopenNav(prev => !prev)}>
                        <AiOutlineMenu/>
                    </div>
                </div>
                <div className="right-side">

                    <ul className="links">
                        {authCookie ? 
                        <>
                          
                                <li>
                                    <Link to="/dashboard" className="link"><div className="f-c-c nav-link"><FcBusinessman size={20} /><span>dashboard</span></div></Link>
                               </li>
                        
                            <button className="f-c-c" onClick={Logout}><HiOutlineLogout size={15} /><span className="ml-1">Log out</span></button>
                        </>
                        : 
                        <>
                            <li>
                                <Link to="/login" className="link"><div className="f-c-c nav-link"><FiLogIn size={17} /><span>Login</span></div></Link>
                            </li>
                            
                        </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}
