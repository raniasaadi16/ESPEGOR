import Image from 'next/image'
import Link from 'next/link'

export default function SingleGroup({item}) {
  return (
    <div className='mx-3 '>
        <div className="relative w-full h-[210px]">
            <Image src={item.icon} className='rounded-lg' layout='fill' objectFit='cover'/>     
        </div>
        <div className='mt-2'>
            <p className="text-xl font-semibold">{item.name}</p>
            <Link href={`/community/groups/${item.id}`}>
                <button className='bg-egor-primary-200 text-white px-4 py-2 w-full rounded mt-2'>Visit Group</button>
            </Link>
        </div>
    </div>
  )
}
