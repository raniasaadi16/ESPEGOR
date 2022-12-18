import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearErrors } from '../../../redux/actions/errActions'




export default function Modal({err}) {

 const dispatch = useDispatch()

  return (
    <Transition appear show={err ? true : false} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => dispatch(clearErrors())}>
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
                    className="text-lg font-medium leading-6 text-red-400"
                  >
                    Error! 
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className='text-red-900'>{err}</p>
                  </div>
                   
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}
