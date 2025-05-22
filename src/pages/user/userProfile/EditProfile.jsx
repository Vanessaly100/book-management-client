import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUserProfile } from "../../../api/users";
import { Pencil } from "lucide-react";
import avatarPlaceholder from "../../../assets/gray-user-profile-icon-png-fP8Q1P.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const EditProfile = () => {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Convert reading_preferences array to comma separated string for easier editing
  const readingPrefsToString = (prefs) => {
    if (!prefs) return "";
    if (Array.isArray(prefs)) return prefs.join(", ");
    return prefs;
  };

  const stringToReadingPrefs = (str) => {
    if (!str) return [];
    return str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      phone_number: user?.phone_number || "",
      location: user?.location || "",
      email: user?.email || "",
      reading_preferences: readingPrefsToString(user?.reading_preferences),
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      phone_number: Yup.string().required("Phone number is required"),
      location: Yup.string().required("Location is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      reading_preferences: Yup.string(), // optional
    }),

    onSubmit: async (values) => {
      const formData = new FormData();

      // Append all form fields except readonly ones
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("phone_number", values.phone_number);
      formData.append("location", values.location);
      formData.append("email", values.email);
      // Convert reading_preferences string back to array for backend
      formData.append(
        "reading_preferences",
        JSON.stringify(stringToReadingPrefs(values.reading_preferences))
      );

      if (selectedImage) {
        formData.append("profilePicture", selectedImage);
      }

      try {
        const updated = await updateUserProfile(formData);

        if (updated && updated.user) {
          setUser((prevUser) => ({
            ...prevUser,
            ...updated.user,
          }));
          setEditing(false);
          setSelectedImage(null);
          toast.success("Profile updated successfully!");
        } else {
          toast.error(updated?.message || "Profile update failed.");
        }
      } catch (error) {
        const backendMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Something went wrong. Please check your input and try again.";

        toast.error(backendMessage);
        console.error("Update error:", error);
      }
    },
  });

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <div className="max-w-[70%] mx-auto mt-10 p-6 bg-white text-black border-ActionPurple border-1 rounded-xl shadow-md">
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
              className="absolute bottom-2 right-2 bg-lightMainCardBg p-2 rounded-full text-ActionMiniPurple cursor-pointer"
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
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Editable inputs */}
          <input
            name="first_name"
            placeholder="First Name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded"
          />
          {formik.errors.first_name && (
            <p className="text-red-500">{formik.errors.first_name}</p>
          )}

          <input
            name="last_name"
            placeholder="Last Name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded"
          />
          {formik.errors.last_name && (
            <p className="text-red-500">{formik.errors.last_name}</p>
          )}

          <input
            name="phone_number"
            placeholder="Phone Number"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded"
          />
          {formik.errors.phone_number && (
            <p className="text-red-500">{formik.errors.phone_number}</p>
          )}

          <input
            name="location"
            placeholder="Location"
            value={formik.values.location}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded"
          />
          {formik.errors.location && (
            <p className="text-red-500">{formik.errors.location}</p>
          )}

          <input
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded"
          />
          {formik.errors.email && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}

          {/* Reading Preferences as textarea or input for comma separated */}
          <label className="block text-gray-700">
            Reading Preferences (comma separated)
          </label>
          <textarea
            name="reading_preferences"
            placeholder="e.g. Fiction, Mystery, Science"
            value={formik.values.reading_preferences}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded"
            rows={3}
          />

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-ActionMiniPurple text-white py-2 rounded hover:bg-ActionPurple"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setSelectedImage(null);
                formik.resetForm();
              }}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-center pb-4">Welcome, {user?.first_name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-between">
            <div className="text-black">
              <div className="pb-3 border-b border-b-gray-300">
                <span className=" font-bold">Email</span>
                <p className="">{user?.email}</p>
              </div>
              <div className="pb-3 border-b border-b-gray-300">
                <span className=" font-bold">Phone</span>
                <p className=""> {user?.phone_number}</p>
              </div>

              <div className="pb-3 border-b border-b-gray-300">
                <span className=" font-bold">Location</span>
                <p className=""> {user?.location}</p>
              </div>

              <div className="pb-3">
                <span className=" font-bold">Membership Type</span>
                <p className="">
                  {" "}
                  {user?.membership_type || "N/A"}
                </p>
              </div>
            </div>
            <div className="">
              <div className="pb-3 border-b border-b-gray-300">
                <span className=" font-bold">Points</span>
                <p className=""> {user?.points ?? 0}</p>
              </div>
              <div className="pb-3 border-b border-b-gray-300">
                <span className=" font-bold">Rewarded</span>
                <p className="">
                  {" "}
                  {user?.rewarded ? "Yes" : "No"}
                </p>
              </div>
              <div className="pb-3 border-b border-b-gray-300">
                <span className=" font-bold">Role</span>

                <p className=""> {user?.role}</p>
              </div>
              <div className="pb-3">
                <span className=" font-bold">
                  Reading Preferences
                </span>

                <p className="">
                  {user?.reading_preferences?.join
                    ? user.reading_preferences.join(", ")
                    : user?.reading_preferences || "None"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
          <button
            onClick={() => setEditing(true)}
            className="mt-4 bg-ActionMiniPurple text-white py-2 px-6 rounded hover:bg-ActionPurple"
          >
            Edit Profile
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
