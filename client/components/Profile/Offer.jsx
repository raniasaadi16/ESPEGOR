import Image from 'next/image'
import { MdPriceChange } from 'react-icons/md'

export default function Offer({item}) {
  return (
    <div className='bg-egor-primary-400 p-2 rounded-lg'>
        <div className="relative rounded-lg w-full h-[200px]">
            <Image src={item.photo} layout='fill' className='rounded-lg' />
        </div>
        <div className="pt-3 space-y-3">
            <p className='text-2xl font-bold'>{item.name}</p>
            <div className='flex items-center space-x-4'>
                <p className='font-semibold w-[90px]'>You got : </p>
                <div className="flex items-center space-x-2 bg-egor-primary-300 rounded-lg px-4 py-1.5">
                    <div className="relative w-[15px] h-[15px]">
                        <Image src='/images/coin.png' className='rounded-lg' layout='fill' objectFit='cover'/>
                    </div>
                    <p>{item.golds}</p>
                </div>
                <div className="flex items-center space-x-2 bg-egor-primary-300 rounded-lg px-4 py-1.5">
                    <div className="relative w-[15px] h-[15px]">
                        <Image src='/images/diamond.png' className='rounded-lg' layout='fill' objectFit='cover'/>
                    </div>
                    <p>{item.diamonds}</p>
                </div>
            </div>
            <div className='flex items-center space-x-4'>
                <p className='font-semibold w-[90px]'>Price :</p>
                <div className="flex items-center space-x-2 bg-egor-primary-300 rounded-lg px-4 py-1.5">
                    <MdPriceChange className='text-lg text-egor-primary-100' />
                    <p>{item.price} DA</p>
                </div>
            </div>
            <div className='flex items-center space-x-4'>
                <p className='font-semibold w-[90px]'>Status :</p>
                {item.status == 2 ? (
                    <div className="flex items-center space-x-2 bg-green-700 rounded-lg px-4 py-1.5">
                        <p>Accepted </p>
                    </div>

                ): (
                    <div className="flex items-center space-x-2 bg-egor-primary-300 rounded-lg px-4 py-1.5">
                        <p>Pending</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}
