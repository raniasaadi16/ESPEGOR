import React from 'react'
import { Sidebar } from '../Compoments/Sidebar'
import { GiveForm } from './GiveForm'
import {Page} from './Page'
import { WithdrawForm } from './WithdrawForm'

export const Shop = () => {
    return (
        <div id="shop">
            <Sidebar index={2} />
            <Page />
            <GiveForm />
            <WithdrawForm />
        </div>
    )
}
