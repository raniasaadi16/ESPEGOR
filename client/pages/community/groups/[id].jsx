import React from 'react'
import { setActiveMenu } from '../../../redux/actions/UiActions'
import { loadUser } from '../../../redux/actions/AuthActions'
import { getGroupPosts } from '../../../redux/actions/GroupsActions'
import { wrapper } from '../../../redux/store'
import Header from '../../../components/groups/Header'


export default function Group({group}) {
  return (
    <div className="space-y-9">
        <Header item={group}/>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res, params,resolvedUrl}) => {
    store.dispatch(setActiveMenu(resolvedUrl.split('/')[1]))

    await store.dispatch(loadUser(req.cookies.auth_token))
    
    if(store.getState().auth.isAuth){
        await store.dispatch(getGroupPosts(params.id, req.cookies.auth_token))
        return {
          props: {
            group: store.getState().groups.group
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