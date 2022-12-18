import Image from 'next/image'

export default function SingleGame({item}) {
  return (
    <div className='mx-3 '>
        <div className="relative w-full h-[210px]">
            <Image src={item.icon} className='rounded-lg' layout='fill' objectFit='cover'/>
            <div className={`${item.game_status === 2 ? 'bg-green-700' : 'bg-egor-red'} absolute top-[12px] px-4 py-1 rounded-full left-[10px]`}>
                {item.game_status === 2 ? 'active' : 'desactive'}
            </div>
        </div>
        <div className='mt-2'>
            <p className="text-xl font-semibold">{item.name}</p>
            <p className='text-lg text-egor-primary-200'>{item.competitions} competitions</p>
        </div>
    </div>
  )
}
