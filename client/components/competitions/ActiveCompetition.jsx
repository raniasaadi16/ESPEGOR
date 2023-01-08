import Image from 'next/image'
import Link from 'next/link';

export default function ActiveCompetition({item}) {
  return (
    <div className='bg-egor-primary-400 rounded-lg p-3 flex space-x-7'>
        <div className="relative w-[245px] h-auto rounded-lg">
            <Image src={item.icon} layout='fill' className='rounded-lg' />
        </div>
        <div className="py-1 flex-1 pr-4">
            <div className="md:flex md:space-y-0 space-y-1.5 items-center justify-between w-full">
                <Link href={`/competitions/${item.id}`}>
                    <p className="md:text-2xl text-lg font-bold cursor-pointer">{item.name}</p>
                </Link>
                <Link href={`/organizers/${item.organizer_id}`}>
                    <div className="space-x-3 flex items-center cursor-pointer">
                        <div className="relative w-[20px] h-[20px] rounded-full">
                            <Image src={item.profile_image} fill className="rounded-full"/>
                        </div>
                        <p className="font-semibold">{item.organizer}</p>
                    </div>
                </Link>
            </div>
            <p className="md:text-lg italic">{item.competition_date}</p>
            <div dangerouslySetInnerHTML={{ __html: item.description }} className='mt-2 mb-2.5 text-gray-300 text-lg ellipsis font-normal' />
            <div className='rounded-full px-4 py-1.5 flex space-x-7 bg-egor-primary-200 w-max'>
                <div className="flex items-center space-x-2">
                    <div className="relative w-[15px] h-[15px]">
                        <Image src='/images/coin.png' className='rounded-lg' layout='fill' objectFit='cover'/>
                    </div>
                    <p>{item.price_gold}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="relative w-[15px] h-[15px]">
                        <Image src='/images/diamond.png' className='rounded-lg' layout='fill' objectFit='cover'/>
                    </div>
                    <p>{item.price_diamond}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
