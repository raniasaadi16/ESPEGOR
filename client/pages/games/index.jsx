import React from 'react'
import { setActiveMenu } from '../../redux/actions/UiActions'
import { loadUser } from '../../redux/actions/AuthActions'
import SingleGame from '../../components/home/SingleGame'
import { wrapper } from '../../redux/store'
import { getAllGames } from '../../redux/actions/GamesActions'

export default function AllGames({games}) {

  return (
    <div className="space-y-9">
        <p className="text-2xl font-bold">Featured Games</p>
        <div className="flex flex-wrap gap-y-5 gap-x-4">
            {games.length > 0 && games.map(game => (
                <div className='w-[250px]' key={game.id}>
                    <SingleGame item={game} />
                </div>
            ))}
        </div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res, resolvedUrl}) => {
    store.dispatch(setActiveMenu(resolvedUrl.split('/')[1]))
    if(!store.getState().auth.user){
        await store.dispatch(loadUser(req.cookies.auth_token))
    }

    await store.dispatch(getAllGames())
    return {
      props: {
        games: store.getState().games.games,
      }
    }
  })