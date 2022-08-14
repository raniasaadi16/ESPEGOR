import React, { useState } from 'react'
import { Page } from './Page'
import { Sidebar } from '../Compoments/Sidebar'
import { Form } from './Form';

export const Game = () => {

    const [game, setGame] = useState(null);

    return (
        <div id="game">
            <Sidebar index={2} />
            <Page SetGame={setGame} />
            <Form game={game} />
        </div>
    );
}
