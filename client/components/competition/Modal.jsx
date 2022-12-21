import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router, { useRouter } from 'next/router'
import Cookies from 'universal-cookie'
import { joinComp } from '../../redux/actions/CompetitionsActions'
import { loadUser } from '../../redux/actions/AuthActions'
import { useEffect } from 'react'

export default function Modal({isOpen, setopen}) {
    const user = useSelector(state => state.auth.user)
    const msg = useSelector(state => state.comps.msg)
    const router = useRouter()
    const dispatch = useDispatch()

    const handleSubmit = () => {
        const cookies = new Cookies();
        dispatch(joinComp(cookies.get('auth_token'), user?.id, router?.query?.slug))
        
    }
    useEffect(() => {
        if(msg){ 
            Router.reload()
        }
    }, [msg]);
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
                    Are you sure?
                  </Dialog.Title>
                  <div className="mt-2 text-gray-900">
                    <p>this action is irreversible</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="w-full rounded-md border border-transparent bg-egor-primary-100 px-4 py-2 text-sm font-medium text-egr-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      JOIN
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}
