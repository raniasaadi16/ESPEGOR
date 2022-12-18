import Games from "../components/home/Games"
import Header from "../components/home/Header"
import Organizators from "../components/home/Organizators"
import Store from "../components/home/Store"
import Tournaments from "../components/home/Tournaments"
import { loadUser } from "../redux/actions/AuthActions"
import { getAllComps, getRecentComps } from "../redux/actions/CompetitionsActions"
import { getAllGames } from "../redux/actions/GamesActions"
import { wrapper } from '../redux/store'


const Home = ({competitions, games}) => {
  return (
    <div className="">
      <Header/>
      <div className="mt-9">
        <Tournaments competitions={competitions} />
      </div>
      <div className="mt-9">
        <Games games={games}/>
      </div>
      <div className="md:flex mt-9 md:space-x-10 md:space-y-0 space-y-3">
        <div className="md:w-[65%]">
          <Organizators/>
        </div>
        <div className="md:w-[35%]">
          <Store/>
        </div>
      </div>
    </div>
  )
}

export default Home


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res}) => {
  // console.log(req.cookies.auth_token)
  await store.dispatch(loadUser(req.cookies.auth_token))
  await store.dispatch(getAllComps())
  await store.dispatch(getAllGames())

  return {
    props: {
      user: store.getState().auth.user,
      competitions: store.getState().comps.competitions,
      games: store.getState().games.games,
    }
  }
})