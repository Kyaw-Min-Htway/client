import React, { useEffect, useState, useRef } from 'react'
import Avatar from './Avatar'
import uploadFile from '../helpers/uploadFile'
import Divider from './Divider'

const EditUserDetails = ({ onClose, user }) => {
  const [data, setData] = useState({
    name: user?.name || "",
    profile_pic: user?.profile_pic || ""
  })

  const uploadPhotoRef = useRef()

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      ...user
    }))
  }, [user])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const uploadPhoto = await uploadFile(file)
    setData((prev) => ({
      ...prev,
      profile_pic: uploadPhoto?.url
    }))
  }

  const handleOpenUploadPhoto = () => {
    uploadPhotoRef.current.click()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Updated Data:", data)
    // TODO: dispatch Redux action or call API here
    onClose()
  }

  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center'>
      <div className='bg-white p-6 m-1 rounded w-full max-w-sm'>
        <h2 className='font-semibold'>Profile Details</h2>
        <p className='text-sm'>Edit user details</p>
        
        <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Name:</label>
            <input 
              type='text' 
              id='name' 
              name='name' 
              value={data.name} 
              onChange={handleOnChange}
              className='w-full py-1 px-2 focus:outline-primary border-0.5'
            />
          </div>

          {/* Profile Photo */}
          <div>
            <div>Photo:</div>
            <div className='my-1 flex items-center gap-4'>
              <Avatar
                width={40}
                height={40}
                imageUrl={data?.profile_pic}
                name={data?.name}
              />
              <button 
                type="button"
                className='font-semibold'
                onClick={handleOpenUploadPhoto}
              >
                Change Photo
              </button>
              <input
                type='file'
                className='hidden'
                ref={uploadPhotoRef}
                onChange={handleUploadPhoto}
              />
            </div>
          </div>

          <Divider />

          {/* Action Buttons */}
          <div className='flex gap-2 w-fit ml-auto mt-3'>
            <button 
              type="button"
              onClick={onClose} 
              className='border-primary border text-primary px-4 py-1 rounded hover:bg-primary hover:text-white'
            >
              Cancel
            </button>
            <button 
              type="submit"
              className='border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default React.memo(EditUserDetails)
