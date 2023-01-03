import React from 'react'
import { Sidebar } from '../Compoments/Sidebar'
import { Page } from './Page'

export const Dashboard = () => {
    return (
        <div id="dashboard">
            <Sidebar index={0} />
            <Page />
        </div>
    )
}
