import React, { useEffect, useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus, FaImage, FaVideo } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails";
import { FiArrowUpLeft } from "react-icons/fi";
import { logout } from "../redux/userSlice";

const Sidebar = () => {
  const user = useSelector((state) => state?.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);
  const socketConnection = useSelector((state) => state?.user?.socketConnection);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("sidebar", user._id);

      socketConnection.on("conversation", (data) => {
        const conversationUserData = data.map((conversationUser) => {
          if (conversationUser?.sender?._id === conversationUser?.receiver?._id) {
            return { ...conversationUser, userDetails: conversationUser?.sender };
          } else if (conversationUser?.receiver?._id !== user?._id) {
            return { ...conversationUser, userDetails: conversationUser.receiver };
          } else {
            return { ...conversationUser, userDetails: conversationUser.sender };
          }
        });

        setAllUser(conversationUserData);
      });
    }
  }, [socketConnection, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/email");
    localStorage.clear();
  };

  return (
    <div className="w-full h-full grid grid-cols-[60px,1fr] bg-white">
      {/* Left Action Bar */}
      <div className="bg-slate-100 w-16 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
        <div>
          {/* Chat Tab */}
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 mx-auto flex justify-center items-center cursor-pointer rounded-lg transition ${
                isActive ? "bg-primary text-white" : "hover:bg-slate-200"
              }`
            }
            title="Chat"
          >
            <IoChatbubbleEllipses size={22} />
          </NavLink>

          {/* Add Friend */}
          <div
            title="Add friend"
            onClick={() => setOpenSearchUser(true)}
            className="w-12 h-12 mx-auto flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded-lg mt-2 transition"
          >
            <FaUserPlus size={20} />
          </div>
        </div>

        {/* Profile + Logout */}
        <div className="flex flex-col items-center gap-3">
          <button
            className="rounded-full hover:ring-2 hover:ring-primary transition"
            title={user?.name}
            onClick={() => setEditUserOpen(true)}
          >
            <Avatar
              width={42}
              height={42}
              name={user?.name}
              imageUrl={user?.profile_pic}
              userId={user?._id}
            />
          </button>
          <button
            title="Logout"
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-red-100 text-red-500 rounded-lg transition"
            onClick={handleLogout}
          >
            <BiLogOut size={22} />
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full">
        {/* Header */}
        <div className="h-16 flex items-center border-b px-4">
          <h2 className="text-xl font-semibold text-slate-800">Messages</h2>
        </div>

        {/* Chat List */}
        <div className="h-[calc(100vh-65px)] overflow-y-auto scrollbar">
          {allUser.length === 0 ? (
            <div className="mt-16 text-center text-slate-500">
              <FiArrowUpLeft size={50} className="mx-auto mb-3 opacity-60" />
              <p className="text-lg">No conversations yet</p>
              <p className="text-sm text-slate-400">
                Start a chat with someone new!
              </p>
            </div>
          ) : (
            allUser.map((conv) => (
              <NavLink
                to={"/" + conv?.userDetails?._id}
                key={conv?._id}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3 px-4 border-b hover:bg-slate-50 cursor-pointer transition ${
                    isActive ? "bg-primary bg-opacity-10" : ""
                  }`
                }
              >
                {/* User Avatar */}
                <Avatar
                  imageUrl={conv?.userDetails?.profile_pic}
                  name={conv?.userDetails?.name}
                  width={42}
                  height={42}
                />

                {/* Message Preview */}
                <div className="flex-1 min-w-0">
                  <h3 className="truncate font-medium text-slate-800">
                    {conv?.userDetails?.name}
                  </h3>
                  <div className="text-slate-500 text-sm flex items-center gap-1 truncate">
                    {conv?.lastMsg?.imageUrl && (
                      <span className="flex items-center gap-1">
                        <FaImage size={14} />
                        {!conv?.lastMsg?.text && "Image"}
                      </span>
                    )}
                    {conv?.lastMsg?.videoUrl && (
                      <span className="flex items-center gap-1">
                        <FaVideo size={14} />
                        {!conv?.lastMsg?.text && "Video"}
                      </span>
                    )}
                    <span className="truncate">{conv?.lastMsg?.text}</span>
                  </div>
                </div>

                {/* Unread badge */}
                {Boolean(conv?.unseenMsg) && (
                  <span className="ml-auto bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                    {conv?.unseenMsg}
                  </span>
                )}
              </NavLink>
            ))
          )}
        </div>
      </div>

      {/* Edit user details modal */}
      {editUserOpen && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      )}
    </div>
  );
};

export default Sidebar;
