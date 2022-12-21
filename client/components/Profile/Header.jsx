import Image from 'next/image'
import Link from 'next/link'

export default function Header({user}) {
  return (
    <div>
        <div className="relative w-full h-[250px]">
            <Image src='/images/g2.jpg' layout='fill' objectFit='cover' className='rounded-lg' />
        </div>
        <div className='relative -top-[75px]'>
            <div className="relative w-[150px] h-[150px] mx-auto">
                {/* <Image src={user.profile_image} layout='fill' objectFit='cover' className='rounded-full border border-white' /> */}
                <Image src='/images/profile.png'layout='fill' objectFit='cover' className='rounded-full border border-white' />
            </div>
            <div className="mt-3">
                <p className='text-2xl font-bold text-center'>{user.name}</p>
                <p className='bg-egor-primary-100 px-7 py-1 rounded-full text-center w-max mx-auto mt-2 text-lg'>player</p>
            </div>
            <div className="mt-10 grid md:grid-cols-3 gap-y-2 gap-x-5">
                <div className="rounded-xl bg-egor-primary-400 px-4 py-3 flex justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="relative w-[45px] h-[45px]">
                            <Image src='/images/coin.png' className='rounded-lg' layout='fill' objectFit='cover'/>
                        </div>
                        <div>
                            <div className="">
                                <p className="text-xl">{user.golds}</p>
                                <p className='text-egor-primary-100 font-bold text-xl'>Golds</p>
                            </div>
                        </div>
                    </div>
                    <Link href='/store/offers'>
                        <p className='text-xs bg-egor-primary-100 px-4 py-1 rounded-full h-max cursor-pointer'>Buy more</p>
                    </Link>
                </div>

                <div className="rounded-xl bg-egor-primary-400 px-4 py-3 flex justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="relative w-[45px] h-[45px]">
                            <Image src='/images/diamond.png' className='rounded-lg' layout='fill' objectFit='cover'/>
                        </div>
                        <div>
                            <div className="">
                                <p className="text-xl">{user.diamonds}</p>
                                <p className='text-egor-primary-100 font-bold text-xl'>Diamonds</p>
                            </div>
                        </div>
                    </div>
                    <Link href='/store/offers'>
                        <p className='text-xs bg-egor-primary-100 px-4 py-1 rounded-full h-max cursor-pointer'>Buy more</p>
                    </Link>
                </div>

                <div className="rounded-xl bg-egor-primary-400 px-4 py-3 flex justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="relative w-[45px] h-[45px]">
                            <Image src='/images/competition-icon.svg' className='rounded-lg' layout='fill' objectFit='cover'/>
                        </div>
                        <div>
                            <div className="">
                                <p className="text-xl">{user.comps}</p>
                                <p className='text-egor-primary-100 font-bold text-xl'>Competitions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
