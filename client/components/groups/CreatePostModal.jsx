import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Button, Input, Upload, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import Image from 'next/image'
import { createTransition } from '../../redux/actions/OffersActions'
import Cookies from 'universal-cookie'
import { returnErrors } from '../../redux/actions/errActions'
import { clearMsg, createPost } from '../../redux/actions/GroupsActions'

export default function CreatePostModal({isOpen, setopen}) {
   
    const [picture, setpicture] = useState(null);
    const [title, settitle] = useState('');
    const [preview, setpreview] = useState('');
    const dispatch = useDispatch()
    const group = useSelector(state => state.groups.group)
    

    const upload = e => {
        var reader = new FileReader();
        var url = reader.readAsDataURL(e.target.files[0]);
        if(e.target.files[0].type.split('/')[0] == 'image'){
            reader.onloadend = function (e) {
                setpreview(reader.result);
            }
            setpicture(e.target.files[0]);
        }else{
          dispatch(returnErrors('please insert a valid file'))
           
        }
    };
    const handleSubmit = () => {
        dispatch(clearMsg())
       if(!picture && !title) return dispatch(returnErrors('please insert something!'))
        const cookies = new Cookies();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('picture', picture);
        dispatch(createPost(cookies.get('auth_token'),group.id,formData))
    }
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
                    Create a new post:
                  </Dialog.Title>
                  <div className="mt-2">
                    <input placeholder='post body' value={title} onChange={e => settitle(e.target.value)} required className='text-gray-900' />
                  </div>
                    <div className="my-2 flex justify-center">
                        <label className="uploadLabel f-b-c">
                                <div className='flex space-x-3 items-center text-gray-500 cursor-pointer border px-3 py-2 rounded'>
                                    <MdOutlineAddPhotoAlternate/>
                                    <p>Upload a picture</p>
                                </div>
                                 <input type="file" class="hidden" name="icon" accept="image/*" onChange={upload} />
                        </label>
                    </div>
                    <div className="my-1">
                        {preview && (
                            <div className="relative w-[120px] h-[120px] mx-auto">
                                <Image src={preview} layout='fill' />
                            </div>
                        )}
                    </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="w-full rounded-md border border-transparent bg-egor-primary-100 px-4 py-2 text-sm font-medium text-egr-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      Create
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
