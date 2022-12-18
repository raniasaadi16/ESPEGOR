import Link from "next/link";

export default function Organizer({item}) {
  return (
    <div>
        <div className="bg-gray-300 w-[70px] h-[70px] block mx-auto rounded-full"></div>
        <p className="mt-2 text-xl font-bold text-center">{item.organizer}</p>
        <div className="mt-5 space-y-2 text-lg">
            <p>about</p>
            <div className="flex items-center">
                <p>joined at: </p>
            </div>
            <div className="flex items-center">
                <p>competition: </p>
            </div>
            {/* <div className="flex items-center">
                <p>followers: </p>
            </div> */}
        </div>
        <div className="mt-5">
            <Link href={`/organizers/${item.organizer_id}`}>
                <p className="cursor-pointer text-lg w-full py-1.5 border border-egor-primary-100 text-egor-primary-100 rounded-lg text-center hover:text-white hover:bg-egor-primary-100">Visit profile</p>
            </Link>
        </div>
    </div>
  )
}
