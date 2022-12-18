import Image from "next/image"
import { useState } from "react"
import About from "../../components/competition/About"
import Header from "../../components/competition/Header"
import Leadboard from "../../components/competition/Leadboard"
import Organizer from "../../components/competition/Organizer"
import { loadUser } from "../../redux/actions/AuthActions"
import { checkJoined, getSingleComp } from "../../redux/actions/CompetitionsActions"
import { setActiveMenu } from "../../redux/actions/UiActions"
import { wrapper } from "../../redux/store"

export default function CompetitionPage({ competition }) {
    const [active, setactive] = useState('about');
  return (
    <div className="space-y-7">
        <Header item={competition} />
        <div className="md:flex space-y-3 md:space-x-9">
            <div className="md:w-[300px] bg-egor-primary-400 p-4 rounded-lg h-max">
                <Organizer item={competition} />
            </div>
            <div className="flex-1 bg-egor-primary-400 rounded-lg h-max">
                <div className="flex items-center border-b border-egor-primary-100 text-lg font-semibold">
                    <button className={`px-6 py-3 ${active === 'about' && 'bg-egor-primary-100 rounded-tl-lg'}`} onClick={() => setactive('about')}>About</button>
                    <button className={`px-6 py-3 ${active === 'leadboard' && 'bg-egor-primary-100'} `} onClick={() => setactive('leadboard')}>Leadboard</button>
                </div>
                <div className="py-4 px-5">
                    {active === 'about' && <About item={competition} />}
                    {active === 'leadboard' && <Leadboard />}
                </div>
            </div>
        </div>
    </div>
  )
}



export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res, params, resolvedUrl}) => {
  store.dispatch(setActiveMenu(resolvedUrl.split('/')[1]))
    if(!store.getState().auth.user){
        await store.dispatch(loadUser(req.cookies.auth_token))
    }

    await store.dispatch(getSingleComp(params.slug))
    if(store.getState().auth.user && store.getState().comps.competition.id){
      await store.dispatch(checkJoined(req.cookies.auth_token,store.getState().auth.user.id, store.getState().comps.competition.id))
    }
   
    return {
      props: {
        competition: store.getState().comps.competition,
      }
    }
  })