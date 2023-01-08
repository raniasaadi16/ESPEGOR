import { useState } from "react"
import ActiveCompetition from "../../components/competitions/ActiveCompetition"
import TopCompetitionBig from "../../components/competitions/TopCompetitionBig"
import TopCompetitionSmall from "../../components/competitions/TopCompetitionSmall"
import { loadUser } from "../../redux/actions/AuthActions"
import { getAllComps, getRecentComps } from "../../redux/actions/CompetitionsActions"
import { getAllGames } from "../../redux/actions/GamesActions"
import { setActiveMenu } from "../../redux/actions/UiActions"
import { wrapper } from '../../redux/store'

export default function Competitions({ competitions, topCompetitions, games }) {
    const [displayedComps, setdisplayedComps] = useState(competitions);
    const [selectedData, setselectedData] = useState('');

    const filterData = (id) => {
        if(!id) {
            setselectedData('')
            setdisplayedComps(competitions)
        }else{
            setselectedData(id)
            setdisplayedComps(competitions.filter(comp => comp.game_id === id))
        }
    }
  return (
    <div className="space-y-9">
        {topCompetitions.length >0 && (
            <div className="space-y-5">
                <div className="flex items-center space-x-6">
                    <p className="text-2xl font-bold">Featured Competitions</p>
                </div>
                <div className="grid md:grid-cols-[2fr_1fr] md:gap-x-6 md:gap-y-0 gap-y-4">
                    {topCompetitions[0] && <TopCompetitionBig item={topCompetitions[0]} />}
                    <div className="space-y-4">
                        {topCompetitions[1] && <TopCompetitionSmall item={topCompetitions[1]} />}
                        {topCompetitions[2] && <TopCompetitionSmall item={topCompetitions[2]} />}
                    </div>
                </div>
            </div>
        )}
        <div className="space-y-5">
            <div className="flex items-center space-x-6">
                <p className="text-2xl font-bold">Active Competitions</p>
            </div>
            <div className="flex space-x-3 items-center flex-wrap gap-y-2">
                <div className={`${selectedData === '' ? 'bg-egor-primary-200 text-white' : 'hover:bg-egor-primary-200 hover:text-white text-egor-primary-200'} py-1.5 px-5 border border-egor-primary-200  rounded-lg cursor-pointer `} onClick={() => filterData()}>All</div>
                {games?.length > 0 && games.map(game => (
                    <div key={game.id} className={`${selectedData === game.id ? 'bg-egor-primary-200 text-white' : 'hover:bg-egor-primary-200 hover:text-white text-egor-primary-200'} py-1.5 px-5 border border-egor-primary-200  rounded-lg cursor-pointer `} onClick={() => filterData(game.id)}>{game.name}</div>
                ))}
            </div>
            <div className="space-y-5">
                {displayedComps?.length > 0 && displayedComps.map(item => (
                    <ActiveCompetition item={item} key={item.id} />
                ))}
            </div>
        </div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res, resolvedUrl}) => {
    store.dispatch(setActiveMenu(resolvedUrl.split('/')[1]))
    if(!store.getState().auth.user){
        await store.dispatch(loadUser(req.cookies.auth_token))
    }
    if(!store.getState().comps.competitions){
        await store.dispatch(getAllComps())
    }
    await store.dispatch(getRecentComps())
    await store.dispatch(getAllGames())
    return {
      props: {
        user: store.getState().auth.user,
        competitions: store.getState().comps.competitions,
        games: store.getState().games.games,
        topCompetitions: store.getState().comps.topCompetitions,
      }
    }
  })