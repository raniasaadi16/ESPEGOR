import React, { useEffect, useState } from 'react'
import { Transition } from './Transition'
import API from './../../Services/AuthIntercepteurs'

export const TransitionsHolder = ({transitions}) => {

    return (
        <div id="transitions">
            {transitions && transitions.map((item, index) => {
                return <Transition key={index} data={item} />
            })}      
        </div>
    );
}
