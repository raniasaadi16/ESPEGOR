import React, { useState } from 'react'
import { Page } from './Page'
import { Sidebar } from '../Compoments/Sidebar'
import { Form } from './Form'

export const Competition = () => {

    const [competiton, setCompetition] = useState(null);

    return (
        <div id="competition">
            <Sidebar index={1} />
            <Page SetCompetition={setCompetition} />
            <Form competiton={competiton} />
        </div>
    )
}
