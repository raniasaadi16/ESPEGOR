import Header from "../../components/Profile/Header"
import Offers from "../../components/Profile/Offers"
import { getPlayerOffers, getProfile, loadUser } from "../../redux/actions/AuthActions"
import { setActiveMenu } from "../../redux/actions/UiActions"
import { wrapper } from "../../redux/store"

export default function MyOffers({user}) {
  return (
    <div>
        <div className=''>
            <Header user={user} />
            <div className='-mt-[30px]'>
                <Offers offers={user.offersArr} />
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
        await store.dispatch(getPlayerOffers(store.getState().auth.profile.id, req.cookies.auth_token))
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
