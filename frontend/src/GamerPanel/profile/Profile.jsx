import React, { useEffect, useState } from 'react'
import { Navbar } from '../Global Components/navbar'
import { InfosHolder } from './InfosHolder';
import { CompetitionsHolder } from './CompetitionsHolder';
import { TransitionsHolder } from './TransitionsHolder';
import API from '../../Services/AuthIntercepteurs';

export const Profile = () => {
    
    const [navbarChanges, setNavbarChanges] = useState(0);

    const ChangeNavbarFunc = (value) => {
        setNavbarChanges(value);
    }
    const [transitions, setTransitions] = useState([]);

    useEffect(() => {
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/transition/auth`).then(res=>{
            const transitionsList = res.data.transitions;
            console.log(res.data)
            transitionsList.forEach(element => {
                setTransitions((list) => [...list, element]);
            });

        });
    }, []);
    return (
        <div id="profile">
            <Navbar />
            <div className="container">
                <div className="profile">
                    <div className="wrapper">
                        <div className="right">
                            <div className="profile-navbar">
                                <ul className="f-n-c">
                                    <li className={navbarChanges === 0 ? "active" : ""} onClick={() => ChangeNavbarFunc(0)}>My Infos</li>
                                    <li className={navbarChanges === 1 ? "active" : ""} onClick={() => ChangeNavbarFunc(1)}>My Competitions</li>
                                    <li className={navbarChanges === 2 ? "active" : ""} onClick={() => ChangeNavbarFunc(2)}>My Offers</li>
                                </ul>
                            </div>
                            <div className="holder">
                                <div className="data">
                                    {navbarChanges === 0 &&  <InfosHolder transitions={transitions} />}
                                    {navbarChanges === 1 &&  <CompetitionsHolder />}
                                    {navbarChanges === 2 &&  <TransitionsHolder transitions={transitions} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
        </div>
    )
}
