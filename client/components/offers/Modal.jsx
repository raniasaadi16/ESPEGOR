import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Button, Upload, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import Image from 'next/image'
import { createTransition } from '../../redux/actions/OffersActions'
import Cookies from 'universal-cookie'
import { returnErrors } from '../../redux/actions/errActions'

export default function Modal({isOpen, setopen, item}) {
    const isAuth = useSelector(state => state.auth.isAuth)
    const router = useRouter()
    const [screenShoot, setScreenShoot] = useState(null);
    const [preview, setpreview] = useState('');
    const dispatch = useDispatch()
    const msg = useSelector(state => state.offers.msg)

    const upload = e => {
        var reader = new FileReader();
        var url = reader.readAsDataURL(e.target.files[0]);
        if(e.target.files[0].type.split('/')[0] == 'image'){
            reader.onloadend = function (e) {
                setpreview(reader.result);
            }
            setScreenShoot(e.target.files[0]);
        }else{
          dispatch(returnErrors('please insert a valid file'))
           
        }
    };
    const handleSubmit = () => {
        if(!isAuth){
            return router.push('/login')
        }
        const cookies = new Cookies();
        const formData = new FormData();
        formData.append('offer_id', item.id);
        formData.append('price', item.new_price);
        formData.append('golds', item.gold_amount);
        formData.append('diamonds', item.diamonds_amount);
        formData.append('picture', screenShoot);
        dispatch(createTransition(cookies.get('auth_token'),formData))
    }

    const onClose = () => {
      setopen(false)
      setpreview('')
      setScreenShoot('')
    }
  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                    {msg && <p className='text-green-700'>{msg}</p>}
                    Make Sure To Do The Following Before You Send Us The ScreenShoot! 
                  </Dialog.Title>
                  <div className="mt-2">
                    <ul className='list-disc ml-4'>
                        <li className='text-sm text-gray-500 my-2'>You Sent The Right Amount of Money To The Right Account</li>
                        <li className='text-sm text-gray-500 my-2'>You Select The Right Offer</li>
                        <li className='text-sm text-gray-500 my-2'>You Took a Clear Picture To The Reciept</li>
                    </ul>
                  </div>
                    <div className="my-2 flex justify-center">
                        <label className="uploadLabel f-b-c">
                                <div className='flex space-x-3 items-center text-gray-500 cursor-pointer border px-3 py-2 rounded'>
                                    <MdOutlineAddPhotoAlternate/>
                                    <p>Upload screenshot</p>
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
                      Send screenshot
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
