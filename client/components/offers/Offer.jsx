import Image from 'next/image'
import { useState } from 'react'
import { MdPriceChange } from 'react-icons/md'
import Modal from './Modal'
import { useRouter } from 'next/router';
export default function Offer({item, user}) {
    const [open, setopen] = useState(false);
    const router = useRouter()
  return (
    <div className='bg-egor-primary-400 p-2 rounded-lg'>
        <div className="relative rounded-lg w-full h-[200px]">
            <Image src={item.picture} layout='fill' className='rounded-lg' />
        </div>
        <div className="pt-3 space-y-3">
            <p className='text-2xl font-bold'>{item.name}</p>
            <div dangerouslySetInnerHTML={{ __html: item.description }} className=' text-gray-300 text-lg font-normal' />
            <div className='flex items-center space-x-4'>
                <p className='font-semibold w-[90px]'>You will get : </p>
                <div className="flex items-center space-x-2 bg-egor-primary-300 rounded-lg px-4 py-1.5">
                    <div className="relative w-[15px] h-[15px]">
                        <Image src='/images/coin.png' className='rounded-lg' layout='fill' objectFit='cover'/>
                    </div>
                    <p>{item.gold_amount}</p>
                </div>
                <div className="flex items-center space-x-2 bg-egor-primary-300 rounded-lg px-4 py-1.5">
                    <div className="relative w-[15px] h-[15px]">
                        <Image src='/images/diamond.png' className='rounded-lg' layout='fill' objectFit='cover'/>
                    </div>
                    <p>{item.diamonds_amount}</p>
                </div>
            </div>
            <div className='flex items-center space-x-4'>
                <p className='font-semibold w-[90px]'>Price :</p>
                <div className="flex items-center space-x-2 bg-egor-primary-300 rounded-lg px-4 py-1.5">
                    <MdPriceChange className='text-lg text-egor-primary-100' />
                    <p>{item.new_price} DA</p>
                </div>
            </div>
            <button className="bg-egor-primary-100 w-full py-2 rounded-lg" onClick={() => user ? setopen(true) : router.push('/login')}>Send screenshoot</button>
            <Modal isOpen={open} setopen={setopen} item={item} />
        </div>
    </div>
  )
}
