import Link from 'next/link'

export default function Topbar() {
  return (
    <div className='md:flex md:space-x-4 md:space-y-0 space-y-3'>
      <Link href='/register'>
        <a className='bg-egor-primary-200 text-white px-4 md:py-2 py-4 rounded-lg flex items-center'>Register</a>
      </Link>
      <Link href='/login'>
        <a className='text-egor-primary-200 border border-egor-primary-200 px-4 md:py-2 py-4 rounded-lg flex items-center'>Login</a>
      </Link>
    </div>
  )
}
