import  { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import socket from "../../utils/socket";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  // const { setUser } = useAuth(); // Get setUser from AuthContext
  const navigate = useNavigate(); // Import useNavigate
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(""); // Handle errors
  const [success, setSuccess] = useState(""); // Handle success message

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Required").min(3, "Too short").max(20, "Too long"),
      last_name: Yup.string().required("Required").min(3, "Too short").max(20, "Too long"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required").min(6, "Password too short"),
    }),

    onSubmit: async (values,{ resetForm}) => {
      setError("");
      setSuccess("");
      try {
        const response = await axios.post("http://localhost:4000/api/auth/user/register", values, {
          withCredentials: true,
        });
        // setUser(response.data.user);
        setSuccess("Registration successful! Redirecting...");
        resetForm();
        // Redirect after 2 seconds
    const user = response.data.user; 
    console.log(user.user_id, user.role);
    socket.emit("register", {
      user_id: user.user_id,
      role: user.role
    });

        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } catch (err) {
        setError(err?.response?.data?.message || "Something went wrong, please try again.");
        console.log(err)

      }
    },
  });

  return (
    <main className="h-[120vh] bg">
      <div className='bg-blur flex flex-row-reverse items-center justify-center h-full w-full lg:px-28 md:px-0 px-20'>
        <div className="md:w-1/3 sm:w-11/12 w-full h-ful bg-[#00000086] shadow-lg rounded-2xl p-6 my-7">
          <h2 className="text-2xl font-bold text-center mb-4 text-ActionPurple ">Sign Up</h2>

          {/* Display Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Display Success Message */}
          {success && <p className="text-ActionPurple text-center">{success}</p>}

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            {/* First Name */}
            <div>
              <label className="block text-gray-400 text-xl">First Name<span className='text-red-500'>*</span></label>
              <input
                type="text"
                name="first_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_name}
                className="w-full p-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-ActionPurple"
              />
              {formik.touched.first_name && formik.errors.first_name && (
                <p className="text-red-500 text-sm">{formik.errors.first_name}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-400 text-xl">Last Name<span className='text-red-500'>*</span></label>
              <input
                type="text"
                name="last_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
                className="w-full p-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-ActionPurple"
              />
              {formik.touched.last_name && formik.errors.last_name && (
                <p className="text-red-500 text-sm">{formik.errors.last_name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-400 text-xl">Email<span className='text-red-500'>*</span></label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full p-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-ActionPurple"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 text-xl">Password<span className='text-red-500'>*</span></label>
              <div className='h-fit bg-white rounded-md border relative'>
                <input
                  {...(isOpen ? { type: 'text' } : { type: 'password' })}
                  name="password"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ActionPurple"
                />
                <div
                  className='absolute top-3 right-2 z-10'
                  onClick={() => setIsOpen((prev) => !prev)}
                  style={{ cursor: 'pointer' }}
                >
                  {isOpen ? <FaEye size={20} color="black" /> : <FaEyeSlash size={20} color="gray" />}
                </div>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-ActionPurple text-white py-2 mt-2 rounded-md hover:bg-ActionMiniPurple transition-all cursor-pointer"
            >
              Sign Up
            </button>
          </form>
          <div>
          <p className="text-gray-400 text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-ActionPurple hover:underline">
          Login
        </Link>
      </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;