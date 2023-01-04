import Image from 'next/image'
import Link from 'next/link'
import { Carousel } from 'antd'
import 'antd/dist/antd.css'
export default function Header() {
  return (
    <div className='w-full h-[480px]'>
      <Carousel autoplay={true}>
        <div className="relative text-white">
            <div className="relative w-full md:h-[460px] h-[480px] rounded-lg header-bg">
              <Image src='/images/header.png' layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center text-center px-7">
              <h1 className="text-xl md:text-4xl font-bold">On EGOR GAMING players and teams can:​</h1>
              <p className="text-lg md:text-xl mt-2">
                Participate into tournaments, championships, leagues 
              </p>
            </div>
          </div>
          <div className="relative text-white">
            <div className="relative w-full md:h-[460px] h-[480px] rounded-lg header-bg">
              <Image src='/images/2399990.jpg' layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center text-center px-7">
              <h1 className="text-xl md:text-4xl font-bold">Join the hub right for them,</h1>
              <p className="text-lg md:text-xl mt-2">
              where they can meet like-minded people with whom they can play
              </p>
            </div>
          </div>
          <div className="relative text-white">
            <div className="relative w-full md:h-[460px] h-[480px] rounded-lg header-bg">
              <Image src='/images/158-1585141_top-25-pubg-wallpapers-for-pc-and-mobile.jpg' layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center text-center px-7">
              <h1 className="text-xl md:text-4xl font-bold">Find friends;​</h1>
              <p className="text-lg md:text-xl mt-2">
              Follow Professional Players OR influncers and check their posts and achievements Chat and be connected;
              </p>
            </div>
          </div>
          <div className="relative text-white">
            <div className="relative w-full md:h-[460px] h-[480px] rounded-lg header-bg">
              <Image src='/images/pexels-lucie-liz-3165335.jpg' layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center text-center px-7">
              <h1 className="text-xl md:text-4xl font-bold">Be rewarded:</h1>
              <p className="text-lg md:text-xl mt-2">
              earn EGOR Points whilst playing and exchange them for prizes on our Store;
              </p>
            </div>
          </div>
          <div className="relative text-white">
            <div className="relative w-full md:h-[460px] h-[480px] rounded-lg header-bg">
              <Image src='/images/epic-games-fortnite-2019-season-x-hd-wallpaper-preview.jpg' layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center text-center px-7">
              <h1 className="text-xl md:text-4xl font-bold">Be part of the biggest community of competitive gamers around the world</h1>
              <p className="text-lg md:text-xl mt-2">
              ESPACIALLY IN MENA REGION
              </p>
            </div>
          </div>
      </Carousel>
    </div>
  )
}
