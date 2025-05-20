import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUserProfile } from "../../../api/users"; 
import { Pencil } from "lucide-react"; 
import avatarPlaceholder from "../../../assets/gray-user-profile-icon-png-fP8Q1P.png"; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 const AdminProfile =() => {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const formik = useFormik({
    enableReinitialize: true, // important to load user data initially
    initialValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      phone_number: user?.phone_number || "",
      location: user?.location || "",
      email: user?.email || "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      phone_number: Yup.string().required("Phone number is required"),
      location: Yup.string().required("Location is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
    
      if (selectedImage) {
        formData.append("profilePicture", selectedImage);
      }
    
      try {
        const updated = await updateUserProfile(formData);
    
        console.log("Update Response:", updated); // DEBUG
    
        if (updated && updated.user) {
          setUser(prevUser => ({
            ...prevUser,
            ...updated.user,
          })); 
          setEditing(false); 
    
          toast.success("Profile updated successfully!");
        } else {
          console.error('Profile update failed:', updated.message || "No user returned");
          toast.error("Failed to update profile.");
        }
      } catch (error) {
        console.error("Failed to update profile:", error);
        toast.error("🚨 An error occurred while updating your profile.");
      }
    }
    

  });

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-lightMainCardBg text-black dark:bg-darkMainCardBg dark:text-white border border-gray-400 card rounded-xl shadow-md">
      <div className="flex flex-col items-center mb-6 relative">
        <img
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : user?.profile_picture_url || avatarPlaceholder
          }
          alt="Avatar"
          className="w-28 h-28 rounded-full object-cover"
        />
        {editing && (
          <>
            <label
              htmlFor="profile-picture"
              className="absolute bottom-2 right-2 bg-ActionMiniPurple p-2 rounded-full text-white cursor-pointer"
            >
              <Pencil size={16} />
            </label>
            <input
              type="file"
              id="profile-picture"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </>
        )}
      </div>

      {editing ? (
        <form onSubmit={formik.handleSubmit} className="space-y-4 text-black dark:text-white">
          <div>
            <input
              name="first_name"
              placeholder="First Name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded"
            />
            {formik.errors.first_name && <p className="text-red-500">{formik.errors.first_name}</p>}
          </div>
          <div>
            <input
              name="last_name"
              placeholder="Last Name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded"
            />
            {formik.errors.last_name && <p className="text-red-500">{formik.errors.last_name}</p>}
          </div>
          <div>
            <input
              name="phone_number"
              placeholder="Phone Number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded"
            />
            {formik.errors.phone_number && <p className="text-red-500">{formik.errors.phone_number}</p>}
          </div>
          <div>
            <input
              name="location"
              placeholder="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded"
            />
            {formik.errors.location && <p className="text-red-500">{formik.errors.location}</p>}
          </div>
          <div>
            <input
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded"
            />
            {formik.errors.email && <p className="text-red-500">{formik.errors.email}</p>}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-ActionMiniPurple text-white py-2 rounded hover:bg-ActionPurple-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center space-y-2 text-black dark:text-gray-300">
          <h2 className="text-2xl font-bold">Welcome, {user?.first_name}</h2>
          <p>Email: {user?.email}</p>
          <p>Phone: {user?.phone_number}</p>
          <p>Location: {user?.location}</p>
          <button
            onClick={() => setEditing(true)}
            className="mt-4 bg-ActionMiniPurple text-white py-2 px-6 rounded hover:bg-ActionPurple cursor-pointer"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}


export default AdminProfile;