import React from 'react'
import {CgSearch} from 'react-icons/cg'
import { CompetitionTable } from './CompetitionTable';
import { GamesChart } from './GamesChart';
import { GamesTable } from './GamesTable';
import { StatisticsBar } from './StatisticsBar';

export const Page = () => {
    return (
        <div className="page">
            <div className="d-navbar f-b-c">
                <div className="d-left"><span>Dashboard</span></div>
                <div className="d-right f-n-c">
                    <div className="d-search f-n-c">
                        <div className="d-input">
                            <input type="text" name="search" id="search" placeholder="Search" />
                        </div>
                        <div className="d-icon f-c-c">
                            <CgSearch />
                        </div>
                    </div>
                    <div className="d-profile f-n-c">
                        <div className="d-avatar f-c-c">
                            <img src="profile.png" alt="" width="20" />
                        </div>
                        <div className="d-name">
                            <p>Sami Egor <span>admin</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid-split">
                <div className="d-s-g-c">
                    <StatisticsBar />
                    <div className="tables">
                        <CompetitionTable />
                        <GamesTable />
                    </div>
                </div>
                <div className="games-state">
                    <GamesChart />
                </div>
            </div>
        </div>
    );
}
