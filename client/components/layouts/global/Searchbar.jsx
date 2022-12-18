import React from 'react'
import {Input} from 'antd'
import { AiOutlineSearch } from 'react-icons/ai'

const { Search } = Input
export default function Searchbar() {
  return (
    <div>
      <Search 
        placeholder='search'
        className='rounded-full bg-egor-primary-400 border-0 pl-5 pr-1.5 py-2 text-white'
        prefix={<AiOutlineSearch size='20px' className='mr-3'/>}
        size='large'
        enterButton={<button className='bg-egor-primary-300 text-white px-6 rounded-full h-[38px]'>search</button>}
      />
    </div>
  )
}
