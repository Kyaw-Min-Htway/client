import React from 'react'
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { SlLogout } from "react-icons/sl";
import { useSelector } from 'react-redux';
import Avatar from './Avatar';
import EditUserDetails from './EditUserDetails';

const Sidebar = () => {
    const user = useSelector(state => state?.user);
    const [editUserOpen,setEditUserOpen] = React.useState(false);
  return (
    <div className='w-full h-full'>
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