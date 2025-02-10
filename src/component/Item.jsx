import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import { Rating } from '@mui/material'
import { Star } from '@mui/icons-material'

export default function ListingItem({ room }) {
    return (
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[320px]'>
            <Link to={`/room/${room._id}`}>
                <img src={room.imageUrls[0]}
                    alt='room cover'
                    className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' />

                <div className='p-3 flex flex-col gap-2 w-full'>
                    <p className='text-lg font-semibold text-slate-700 truncate'>{room.name}</p>

                    <Rating 
                        name={`room-${room._id}-rating`}
                        value={room.rating || 0}
                        readOnly
                        precision={0.5}
                        icon={<Star fontSize="inherit" />}
                        emptyIcon={<Star fontSize="inherit" />}
                        size="small"
                    />

                    <div className='flex items-center gap-1'>
                        <MdLocationOn className='h-4 w-4 text-green-700' />
                        <p className='text-sm text-gray-600 truncate w-full'>{room.address}</p>
                    </div>

                    <p className='text-sm text-gray-600 line-clamp-2'>{room.description}</p>

                    <p className='text-slate-700'>
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(room.offer ? +room.discountPrice : room.regularPrice)}

                        {room.type === 'rent' && ' / month'}
                    </p>

                    <div className='text-slate-700 flex gap-4'>
                        <div className='font-bold text-xs '>
                            {room.bedrooms > 1 ? `${room.bedrooms} beds` : `${room.bedrooms} bed`}
                        </div>

                        <div className='font-bold text-xs gap-4'>
                            {room.bathrooms > 1 ? `${room.bathrooms} baths` : `${room.bathrooms} bath`}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}