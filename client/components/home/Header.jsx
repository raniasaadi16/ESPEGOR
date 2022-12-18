import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <div className="relative">
        <div className="relative w-full md:h-[460px] h-[480px] rounded-lg header-bg">
          <Image src='/images/header.png' layout="fill" objectFit="cover" className="rounded-lg" />
        </div>
        <div className="absolute top-[45%] left-[15px] md:left-[40px] md:w-1/2">
          <h1 className="text-xl md:text-3xl font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
          <p className="text-lg mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque sed commodo amet malesuada mattis ullamcorper in. Parturient nunc 
          </p>
          <div className="md:mt-10 mt-5">
            <Link href='/'>
              <a className="bg-egor-red md:px-11 md:py-3.5 px-5 py-2.5 rounded-lg text-lg font-semibold hover:text-white">
                Check it
              </a>
            </Link>
          </div>
        </div>
      </div>
  )
}
