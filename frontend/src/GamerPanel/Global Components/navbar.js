import '../../App.css';
import { Link, useHistory} from "react-router-dom";

import { FcBusinessman, FcCollaboration, FcParallelTasks, FcShop, FcSteam } from 'react-icons/fc';
import { HiOutlineLogout } from 'react-icons/hi';
import { FiLogIn } from 'react-icons/fi';
import { AiOutlineSave } from 'react-icons/ai';
import Cookies from 'universal-cookie';

import { AiOutlineMenu } from "react-icons/ai";
import { useState } from 'react';
export const Navbar = () => {
    const [openNav, setopenNav] = useState(false);
    const cookies = new Cookies();
    const authCookie = cookies.get('auth_token');

    const history = useHistory();

    const Logout  = () => {
        cookies.remove('auth_token');
        history.push('/login');
    }

    return (
        <div className={`${openNav && 'opened'} navbar`}>
            <div className="container navigation f-b-c">
                <div className='h-container'>
                    <Link to="/"><div className="f-c-c"><img src="./../logo.png" alt="" width="30" /><h3 className="logo">ESPEGOR</h3></div></Link>
                    <div className='h-menu' onClick={() => setopenNav(prev => !prev)}>
                        <AiOutlineMenu/>
                    </div>
                </div>
                <div className="right-side">

                    <ul className="links">
                        {authCookie ? 
                        <>
                            <li>
                                <Link to="/community" className="link"><div className="f-c-c nav-link"><FcCollaboration size={20} /><span>Community</span></div></Link>
                            </li>
                            <li>
                                <Link to="/store" className="link"><div className="f-c-c nav-link"><FcShop size={20} /><span>Market</span></div></Link>
                            </li>
                            <li>
                                <Link to="/competitions" className="link"><div className="f-c-c nav-link"><FcParallelTasks size={20} /><span>Competitions</span></div></Link>
                            </li>
                            <li>
                                <Link to="/games" className="link"><div className="f-c-c nav-link"><FcSteam size={20} /><span>Games</span></div></Link>
                            </li>
                            <li>
                                <Link to="/profile" className="link"><div className="f-c-c nav-link"><FcBusinessman size={20} /><span>Profile</span></div></Link>
                            </li>
                            <button className="f-c-c" onClick={Logout}><HiOutlineLogout size={15} /><span className="ml-1">Log out</span></button>
                        </>
                        : 
                        <>
                            <li>
                                <Link to="/login" className="link"><div className="f-c-c nav-link"><FiLogIn size={17} /><span>Login</span></div></Link>
                            </li>
                            <li>
                                <Link to="/register" className="link"><div className="f-c-c nav-link"><AiOutlineSave size={17} /><span>Register</span></div></Link>
                            </li>
                        </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}
