import React from 'react'
import { Page } from './Page'
import { Sidebar } from '../Compoments/Sidebar'

export const Player = () => {
    return (
        <div id="player">
            <Sidebar index={3} />
            <Page />
        </div>
    );
}
