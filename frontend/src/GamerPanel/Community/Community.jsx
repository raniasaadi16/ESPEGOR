import React, { useState } from 'react'
import { Footer } from '../Global Components/Footer';
import { Navbar } from '../Global Components/navbar';
import {TiGroupOutline} from 'react-icons/ti';
import {RiPagesLine} from 'react-icons/ri';
import { FaSearch } from 'react-icons/fa';
import { GroupHolder } from './GroupHolder';
import { PageHolder } from './PageHolder';
import { NewsPage } from './NewsPage';

export const Community = () => {

    const [communityNavbarIndex, setCommunityNavbarIndex] = useState(0);

    const NavigateNavbar = (index) => {
        setCommunityNavbarIndex(index);
    }

    return (
        <div className="community">
            <Navbar />
            <p className='padding'></p>
            <div className="community-navbar">
                <div className="container f-b-c">
                    <ul className='f gap10'>
                        <li className={communityNavbarIndex === 0 ? "com-active f-c-c" : "f-c-c"}><TiGroupOutline size={15}/><span className='ml-1' onClick={(e) => NavigateNavbar(0)}>News</span></li>
                        <li className={communityNavbarIndex === 1 ? "com-active f-c-c" : "f-c-c"}><RiPagesLine size={15}/><span className='ml-1' onClick={(e) => NavigateNavbar(1)}>Groups Community</span></li>
                        <li className={communityNavbarIndex === 2 ? "com-active f-c-c" : "f-c-c"}><RiPagesLine size={15}/><span className='ml-1' onClick={(e) => NavigateNavbar(2)}>Pages Community </span></li>
                    </ul>
                    <div className="search f-c-c">
                        <input type="text" placeholder='Search ...'/>
                        <button><FaSearch /></button>
                    </div>
                </div>
            </div>
            <div className="container">
                {communityNavbarIndex === 0 && <NewsPage />}
                {communityNavbarIndex === 1 && <GroupHolder />}
                {communityNavbarIndex === 2 && <PageHolder />}
            </div>
            <Footer />
        </div>
    );
}
