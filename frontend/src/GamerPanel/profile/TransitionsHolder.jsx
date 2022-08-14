import React, { useEffect, useState } from 'react'
import { Transition } from './Transition'
import API from './../../Services/AuthIntercepteurs'

export const TransitionsHolder = () => {

    const [transitions, setTransitions] = useState([]);

    useEffect(() => {
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/transition/auth`).then(res=>{
            const transitionsList = res.data.transitions;
            transitionsList.forEach(element => {
                setTransitions((list) => [...list, element]);
            });

        });
    }, []);

    return (
        <div id="transitions">
            {transitions.map((item, index) => {
                return <Transition key={index} data={item} />
            })}      
        </div>
    );
}
