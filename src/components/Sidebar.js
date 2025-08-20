import React from 'react'
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { SlLogout } from "react-icons/sl";
import { useSelector } from 'react-redux';
import Avatar from './Avatar';
import EditUserDetails from './EditUserDetails';
import Divider from './Divider';
import { useState } from 'react';

const Sidebar = () => {
    const user = useSelector(state => state?.user);
    const [editUserOpen,setEditUserOpen] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
  return (
    <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
        <div className='bg-slate-100 w-12 h-full  rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>
            <div>
                <NavLink className={({isActive})=>`w-12 h-10 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && "bg-sky-200"}`} title='Chat'>
                <IoChatbubbleEllipsesSharp 
                    size={25}
                />
                </NavLink>
                <div title='add friend' className='w-12 h-10 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
                <FaUserPlus
                    size={20}
                />
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <button className='mx-auto' title={user?.name} onClick={() => setEditUserOpen(true)}>
                    <Avatar
                        width={40}
                        height={40}
                        name={user?.name}
                        imageUrl={user?.profile_pic}
                    />   
                </button> 
                <button title='logout' className='w-12 h-10 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
                    <span className='-ml-2'>
                        <SlLogout
                        size={20}
                        />
                    </span>
                </button>
            </div>
        </div>

        <div className='w-full'>
           <div className='h-16 flex items-center'>
                <h2 className='text-xl font-bold p-4 text-slate-800 h-16'>message</h2>
           </div>
           <div className='bg-slate-200 p-[0.5px]'></div>
           <div className=' h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar '>

           </div>
        </div>

        {/**edit user details */}
        {
            editUserOpen && (
                <EditUserDetails onClose={() => setEditUserOpen(false)} user={user}/>
            )
        }
    </div>
  )
}

export default Sidebar