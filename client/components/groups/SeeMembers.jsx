import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import Cookies from 'universal-cookie'
import { useEffect } from 'react'
import { getGroupMembers } from '../../redux/actions/GroupsActions'

export default function SeeMembers({isOpen, setopen, id}) {
  
    const dispatch = useDispatch()

  
    // useEffect(() => {
    //     const cookies = new Cookies();
    //     dispatch(getGroupMembers(id,cookies.get('auth_token')))
    // }, []);
  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setopen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    All members
                  </Dialog.Title>
                 

                  <div className="mt-2">
                   
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}
