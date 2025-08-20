import axios from 'axios'
import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setUser } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import logo from '../assets/logo.png'

const Home = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const fetchUserDetails = useCallback(async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`
      const response = await axios({
        url: URL,
        withCredentials: true
      })

      dispatch(setUser(response.data.data))

      if (response.data.data.logout) {
        dispatch(logout())   // ✅ dispatchEvent ❌ wrong, should be dispatch()
        navigate('/email')
      }

      console.log("current user Details", response)
    } catch (error) {
      console.log("error", error)
    }
  }, [dispatch, navigate])   // dependency ထည့်

  useEffect(() => {
    fetchUserDetails()
  }, [fetchUserDetails])

  const basePath = location.pathname === '/'
  return (
    <div className='grid lg:grid-cols-[320px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar /> 
      </section>
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>
      <div className='flex justify-center items-center flex-col gap-2'>
        <div>
          <img
            src={logo}
            width={200}
            alt='logo'
          />
        </div>
        <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
      </div>
    </div>
  )
}

export default Home
