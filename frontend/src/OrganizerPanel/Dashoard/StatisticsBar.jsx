import React, { useEffect, useState } from 'react'
import { StatisticCard } from './StatisticCard'
import axios from 'axios'

export const StatisticsBar = () => {

    const [players, setPlayers] = useState(0)
    const [games, setGames] = useState(0)
    const [competitions, setCompetitions] = useState(0)
    const [organizers, setOrganizers] = useState(0)
    const [diamonds, setDiamonds] = useState(0)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/admin/dashboard`).then( res => {
            setPlayers(res.data.players);
            setGames(res.data.games);
            setCompetitions(res.data.competitons);
            setOrganizers(res.data.organizers);
            setDiamonds(res.data.diamonds);
        });
    }, []);

    return (
        <div className="statistics">
            <StatisticCard icon="gamer-icon.svg" label="Gamers" number={players} />
            <StatisticCard icon="game-icon.svg" label="Game" number={games} />
            <StatisticCard icon="competition-icon.svg" label="Competitions" number={competitions} />
            <StatisticCard icon="organizer-icon.svg" label="Organizers" number={organizers} />
            <StatisticCard icon="coin.png" label="Golds" number={diamonds} />
            <StatisticCard icon="diamond.png" label="Diamonds" number={diamonds} />
        </div>
    );
}
