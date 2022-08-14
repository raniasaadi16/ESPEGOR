import React from 'react'
import { Sidebar } from '../Compoments/Sidebar'
import { Page } from './Page'

export const DashboardOrganizer = () => {
    return (
        <div id="dashboard-org">
            <Sidebar index={0} />
            <Page />
        </div>
    )
}
