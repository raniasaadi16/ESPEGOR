import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { clearMsg, loadUser, register } from '../redux/actions/AuthActions'
import { wrapper } from '../redux/store'
import Google from '../components/oauth/Google'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Facebook from '../components/oauth/Facebook'
import Discord from '../components/oauth/Discord'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css';
import { Select } from 'antd'
import { returnErrors } from '../redux/actions/errActions'
import { Dialog, Transition } from '@headlessui/react'
import Modal from '../components/layouts/global/ErrModal'
import Loading from '../components/layouts/global/Loading'
const ReactQuill = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
	})


export default function Register() {
    const [user, setuser] = useState({email: '', password: '', name: '', phone: '', bio: '', pic: '', type: 0});
    const [preview, setpreview] = useState();
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth)
    const router = useRouter()
    const msg = useSelector(state => state.auth.msg)
    const err = useSelector(state=> state.err.msg)
    const [open, setopen] = useState(false);
    const stateLoading = useSelector(state => state.ui.loading)
    

    const upload = e => {
        var reader = new FileReader();
        var url = reader.readAsDataURL(e.target.files[0]);
        if(e.target.files[0].type.split('/')[0] == 'image'){
            reader.onloadend = function (e) {
                setpreview(reader.result);
            }
            setuser({...user, pic: e.target.files[0]});
        }else{
           console.log('err')
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault()
        const fm = new FormData();
        fm.append('name', user.name);
        fm.append('email', user.email);
        fm.append('password', user.password);
        fm.append('picture', user.pic);
        fm.append('bio', user.bio);
        fm.append('phone', user.phone);
        if(!user.phone){
            return dispatch(returnErrors('please insert your phone'))
        }
        if(user.bio === ''){
            return dispatch(returnErrors('please insert your bio'))
        }
        dispatch(register(fm))
       
    }

    const linkToLogin = () => {
        dispatch(clearMsg())
        if(!msg){
            router.push('/login')
        }
    }
    useEffect(() => {
        if(msg && !isAuth){
            setopen(true)
        }
     
          if(isAuth){
            router.push('/')
        }
        
    }, [msg, isAuth]);
  
  return (
    <div className='py-7 md:px-0 px-3 flex justify-center items-center'>
      {stateLoading && <Loading/>}
        <Modal err={err} />
        <div className="bg-egor-primary-300 px-4 py-3 rounded-lg md:w-2/5">
            <Link href='/'>
                <div className='p-2 bg-egor-primary-200 rounded-lg cursor-pointer w-max'>
                    <AiFillHome size={24} />
                </div>
            </Link>
            <div className='mt-2'>
                <div className="relative w-[150px] h-[100px] mx-auto">
                    <Image src='/images/logo2.png' layout='fill' />
                </div>
                <p className="mt-3 text-center text-2xl font-bold">Weclome to Egorgaming</p>
                <p className='text-center text-gray-300 mt-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet, unde.</p>
                <form className='mt-7 px-5' onSubmit={handleRegister}>
                    <div className='space-y-4'>
                        <input type="text" className='w-full px-3 py-2 rounded-lg bg-transparent border border-egor-primary-200 text-egor-primary-200' placeholder='Name' value={user.name} onChange={(e) => setuser({...user, name: e.target.value})} required />
                        <input type="text" className='w-full px-3 py-2 rounded-lg bg-transparent border border-egor-primary-200 text-egor-primary-200' placeholder='Email' value={user.email} onChange={(e) => setuser({...user, email: e.target.value})} required />
                        <input type="password" className='w-full px-3 py-2 rounded-lg bg-transparent border border-egor-primary-200 text-egor-primary-200' placeholder='Password' value={user.password} onChange={(e) => setuser({...user, password: e.target.value})} required />
                        <PhoneInput
                            placeholder="Enter phone number"
                            defaultCountry="DZ"
                            value={user.phone}
                            onChange={val => setuser({...user, phone: val})}
                            className='w-full px-3 py-2 rounded-lg bg-transparent border border-egor-primary-200 text-egor-primary-200'
                        /> 
                        {/* <Select
                            placeholder='select account type'
                            value={user.type}
                            style={{
                                height: 38
                            }}
                            className='w-full bg-transparent border-egor-primary-200 text-egor-primary-200 '
                            onChange={(val) => setuser({...user, type: val})}   
                            options={[
                                {
                                    value: 0,
                                    label: 'Player'
                                },
                                {
                                    value: 1,
                                    label: 'Player pro'
                                },
                                {
                                    value: 2,
                                    label: 'Organizer'
                                },
                                {
                                    value: 3,
                                    label: 'Social media creator'
                                },
                            ]}                 
                            />  */}
                        <ReactQuill theme="snow" value={user.bio} onChange={(val) => setuser({...user, bio: val})} className='w-full rounded-lg bg-transparent border border-egor-primary-200 text-egor-primary-200' placeholder='Bio' />
                        <label className="mt-11 flex space-x-3 items-center text-gray-400">
                                {preview ? <Image src={preview} alt="" width="100" height={100} className='rounded-full' /> : <Image width='100' height={100} src="/images/profile-pic.svg" alt="" />}
                                <p>Upload a profile pic</p>
                                <input type="file" class="hidden" name="icon" accept="image/*" onChange={upload} />
                        </label>
                    </div>
                    <Link href='forget-password'>
                        <p className="flex justify-end mt-2">Forget password?</p>
                    </Link>
                    <button className='bg-egor-primary-200 rounded-lg w-full py-2 text-center mt-4' type='submit'>Register</button>
                    <Link href='/login'>
                        <p className="flex justify-center mt-2">Already have an account?  <span className='text-egor-primary-200 ml-2'>Login</span></p>
                    </Link>
                </form>
                <p className='text-xl text-center mt-5 font-bold'>OR</p>
                <div className="flex items-center justify-center space-x-4 mt-3">
                    <Discord/>
                    <Google/>
                    <Facebook/>
                </div>
            </div>
        </div>
        <Transition appear show={open} as={Fragment}>
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
                    Registre
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className='text-center text-gray-900'>{msg} , please login</p>
                    
                    <button
                      type="button"
                      className="w-full rounded-md border border-transparent bg-egor-primary-100 px-4 py-2 text-sm font-medium text-egr-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={linkToLogin}
                    >
                      Login
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
Register.getLayout = function getLayout(page){
  
    return(
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_API}>
            {page}
        </GoogleOAuthProvider>
    )
}


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res}) => {
    // console.log(req.cookies.auth_token)
    await store.dispatch(loadUser(req.cookies.auth_token))
    if(!store.getState().auth.user){
        return {
          props: {
            user: null
          }
        }
    }else{
        return {
            redirect: {
              permanent: false,
              destination: '/'
            }
        }
    }
  })
