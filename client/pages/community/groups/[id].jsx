import React from 'react'
import { setActiveMenu } from '../../../redux/actions/UiActions'
import { loadUser } from '../../../redux/actions/AuthActions'
import { checkJoined, getGroupInfos, getGroupPosts } from '../../../redux/actions/GroupsActions'
import { wrapper } from '../../../redux/store'
import Header from '../../../components/groups/Header'
import CreatePost from '../../../components/groups/CreatePost'
import SinglePost from '../../../components/groups/SinglePost'
import About from '../../../components/groups/About'


export default function Group({group,posts}) {
  return (
    <div className="space-y-9">
        <div className=" bg-egor-primary-400 rounded-lg">
          <div className="mx-auto max-w-[1200px]">
            <Header item={group}/>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto flex-wrap-reverse flex lg:flex-nowrap lg:space-x-6">
          <div className='flex-1'>
            <div className="mt-6">
              <CreatePost/>
            </div>
            <div className="mt-7 space-y-7">
              {posts?.length > 0 && posts.map(post => (
                <SinglePost key={post.id} item={post} />
              ))}
            </div>
          </div>
          <div className='w-full lg:w-[400px] mt-6 space-y-4'>
            <div className="w-full bg-egor-primary-400 py-3 px-3 rounded-lg">
              <About item={group} />
            </div>
            {/**chat */}
            {/* <div className='h-screen bg-egor-primary-100 rounded-lg w-full'>
            </div> */}
          </div>
        </div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res, params,resolvedUrl}) => {
    store.dispatch(setActiveMenu(resolvedUrl.split('/')[1]))

    if(!store.getState().auth.isAuth) await store.dispatch(loadUser(req.cookies.auth_token))
    
    if(store.getState().auth.isAuth){
        await store.dispatch(getGroupInfos(params.id, req.cookies.auth_token))
        await store.dispatch(getGroupPosts(params.id, req.cookies.auth_token))
        await store.dispatch(checkJoined(params.id, req.cookies.auth_token))

        return {
          props: {
            group: store.getState().groups.group,
            posts: store.getState().groups.posts
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