import React, { useEffect } from 'react'
import { wrapper } from '../../redux/store'
import { setActiveMenu } from '../../redux/actions/UiActions'
import { loadUser } from '../../redux/actions/AuthActions'
import { getAllGroups } from '../../redux/actions/GroupsActions'
import SingleGroup from '../../components/groups/SingleGroup'
import { useDispatch } from 'react-redux'
import { getAllGames } from '../../redux/actions/GamesActions'

export default function Community({groups}) {

  return (
    <div className="space-y-9">
        <p className="text-2xl font-bold">Available Groups</p>
        <div className="flex flex-wrap gap-y-5 gap-x-4">
            {groups.length > 0 && groups.map(group => (
                <div className='w-[250px]' key={group.id}>
                    <SingleGroup item={group} />
                </div>
            ))}
        </div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res, resolvedUrl}) => {
    store.dispatch(setActiveMenu(resolvedUrl.split('/')[1]))

    await store.dispatch(loadUser(req.cookies.auth_token))
    
    
    await store.dispatch(getAllGroups())
    return {
        props: {
        groups: store.getState().groups.groups
        }
    }
    
  })

// export const getServerSideProps = async ({req, res, resolvedUrl}) => {
//     await fetch('http://localhost:8000/api/game/all')
//     return {
//         props: {
//         groups:''
//         }
//     }
    
//   }