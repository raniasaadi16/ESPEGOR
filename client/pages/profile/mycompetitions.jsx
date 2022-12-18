import React from 'react'
import Header from '../../components/Profile/Header'
import { getPlayerComps, getProfile, loadUser } from '../../redux/actions/AuthActions'
import { wrapper } from '../../redux/store'
import Competitions from '../../components/Profile/Competitions'
import { setActiveMenu } from '../../redux/actions/UiActions'

export default function Mycompetitions({user}) {
  return (
    <div>
        <div className=''>
            <Header user={user} />
            <div className='-mt-[30px]'>
                <Competitions comps={user.compsArr}/>
            </div>
        </div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res, resolvedUrl}) => {
    store.dispatch(setActiveMenu(resolvedUrl.split('/')[1]))

    await store.dispatch(loadUser(req.cookies.auth_token))
    await store.dispatch(getProfile(req.cookies.auth_token))

    if(store.getState().auth.profile){
        await store.dispatch(getPlayerComps(store.getState().auth.profile.id, req.cookies.auth_token))
        return {
          props: {
            user: store.getState().auth.profile,
          }
        }
    }else{
        return {
            redirect: {
              permanent: false,
              destination: '/login'
            }
        }
    }
  })
