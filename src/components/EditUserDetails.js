import React from 'react'

const EditUserDetails = ({onClose, data}) =>{
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center'>
        <div className='bg-white p-4 m-1 rounded w-full max-w-sm'>
            <h2 className='font-semibold'>Profile Details</h2>
            <p className='text-sm'>Edit user details</p>
        </div>
    </div>
  )
}

export default EditUserDetails