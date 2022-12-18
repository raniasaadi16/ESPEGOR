import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, login } from '../redux/actions/AuthActions'
import { wrapper } from '../redux/store'
import { BsFacebook } from 'react-icons/bs'
import { FaDiscord } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Google from '../components/oauth/Google'
import Modal from '../components/layouts/global/ErrModal'

export default function Login() {
    const [user, setuser] = useState({email: '', password: ''});
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth)
    const err = useSelector(state=> state.err.msg)
    const router = useRouter()


  
    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch(login(user))
        if(isAuth){
            router.push('/')
        } 
    }
    useEffect(() => {
        if(isAuth){
            router.push('/')
        }
    }, [isAuth]);
  return (
    <div className='py-7 md:px-0 px-3 flex justify-center items-center'>
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
                <form className='mt-7 px-5' onSubmit={handleLogin}>
                    <div className='space-y-4'>
                        <input type="text" className='w-full px-3 py-2 rounded-lg bg-transparent border border-egor-primary-200 text-egor-primary-200' placeholder='Email' value={user.email} onChange={(e) => setuser({...user, email: e.target.value})} />
                        <input type="password" className='w-full px-3 py-2 rounded-lg bg-transparent border border-egor-primary-200 text-egor-primary-200' placeholder='Password' value={user.password} onChange={(e) => setuser({...user, password: e.target.value})} />
                    </div>
                    <Link href='forget-password'>
                        <a className="flex justify-end mt-2">Forget password?</a>
                    </Link>
                    <button className='bg-egor-primary-200 rounded-lg w-full py-2 text-center mt-4' type='submit'>Login</button>
                </form>
                <p className='text-xl text-center mt-5 font-bold'>OR</p>
                <div className="flex items-center justify-center space-x-4 mt-3">
                    <div className="bg-purple-700 text-white w-[50px] py-3 rounded-lg flex items-center justify-center cursor-pointer">
                        <FaDiscord size={20}/>
                    </div>
                    <Google/>
                    <div className="bg-blue-700 text-white w-[50px] py-3 rounded-lg flex items-center justify-center cursor-pointer">
                        <BsFacebook size={20}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
Login.getLayout = function getLayout(page){
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
