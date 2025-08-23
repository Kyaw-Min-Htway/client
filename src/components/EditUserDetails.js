import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import uploadFile from "../helpers/uploadFile";
import Divider from "./Divider";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { motion } from "framer-motion";

const EditUserDetails = ({ onClose, user }) => {
  const [data, setData] = useState({
    name: user?.name || "",
    profile_pic: user?.profile_pic || "",
  });
  const [loading, setLoading] = useState(false);
  const uploadPhotoRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      ...user,
    }));
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault();
    uploadPhotoRef.current.click();
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadPhoto = await uploadFile(file);
      setData((prev) => ({
        ...prev,
        profile_pic: uploadPhoto?.url,
      }));
    } catch (err) {
      toast.error("Failed to upload photo");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`;

      const response = await axios.post(URL, data, { withCredentials: true });

      toast.success(response?.data?.message);

      if (response.data.success) {
        dispatch(setUser(response.data.data));
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-10">
      {/* Animated Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
      >
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
        <p className="text-gray-500 text-sm">Update your personal details</p>

        {/* Form */}
        <form className="grid gap-5 mt-6" onSubmit={handleSubmit}>
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group cursor-pointer">
              <Avatar
                width={80}
                height={80}
                imageUrl={data?.profile_pic}
                name={data?.name}
              />
              {/* Hover overlay for change */}
              <div
                onClick={handleOpenUploadPhoto}
                className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <span className="text-white text-sm">Change</span>
              </div>
              <input
                type="file"
                id="profile_pic"
                className="hidden"
                onChange={handleUploadPhoto}
                ref={uploadPhotoRef}
              />
            </div>
          </div>

          {/* Name input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleOnChange}
              placeholder="Enter your name"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <Divider />

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg bg-primary text-white hover:bg-secondary transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default React.memo(EditUserDetails);
