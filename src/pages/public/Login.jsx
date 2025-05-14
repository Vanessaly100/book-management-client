// src/pages/LoginPage.jsx
import { useState } from 'react';
import {  Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); 
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required").min(6, "Password too short"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setError("");
      setLoading(true);
    
      try {
        const response = await login(values.email, values.password);
    
        if (response.message !== "Login successful") {
          setError(response.message || "Login failed");
        } else {
          resetForm();
          const role = response.role?.toLowerCase();
          if (role === "admin") {
            navigate("/admin");
          } else if (role === "user") {
            navigate("/user/home");
          } else {
            setError("Unknown role");
          }
        }
      } catch (error) {
        console.error(error);
        setError("Something went wrong during login");
    
      setLoading(false);
      }
    },
  });


  return (
    <main className="min-h-screen w-screen bg">
      <div className='bg-blur flex flex-row-reverse items-center justify-center h-full w-full lg:px-28 md:px-0 px-20'>
        <div className="md:w-1/3 sm:w-11/12 w-full bg-[#00000086] shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-green-700">Login</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-gray-400 text-xl">Email</label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              ) : null}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 text-xl">Password</label>
              <div className='h-fit bg-white rounded-md border relative'>
                <input
                  {...(isOpen ? { type: 'text' } : { type: 'password' })}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <div
                  className='absolute top-3 right-2 z-10'
                  onClick={() => setIsOpen((prev) => !prev)}
                  style={{ cursor: 'pointer' }}
                >
                  {isOpen ? <FaEye size={20} color="black" /> : <FaEyeSlash size={20} color="gray" />}
                </div>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              ) : null}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green-500 text-white py-2 mt-2 rounded-md hover:bg-green-600 transition-all"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div>
            <p className="text-gray-400 text-center mt-4">Don't have an account? <Link to="/register" className="text-green-500 hover:underline">
              Register
            </Link></p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;