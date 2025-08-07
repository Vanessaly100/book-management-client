// src/pages/LoginPage.jsx - Cleaned Version
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate(); 
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { auth, login } = useAuth(); 

  const handleSubmit = async (values) => {
    setLoading(true);
    setError("");

    try {
      const response = await login(values.email, values.password);

      if (!response || response.message !== "Login successful") {
        const errorMsg = response?.message || "Login failed";
        setError(errorMsg);
        toast.error(errorMsg);
        setLoading(false); 
        return;
      }

      toast.success("Login successful");

      const role = response.user?.role?.toLowerCase();

      if (role === "admin") {
        navigate("/admin/");
      } else if (role === "user") {
        navigate("/user/home");
      } else {
        const errorMsg = "Unknown role: " + role;
        setError(errorMsg);
        console.error(errorMsg);
      }
    } catch (err) {
      const errorMsg = err.message || "Login failed";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required").min(6, "Password too short"),
    }),
    onSubmit: handleSubmit, 
  });

  // Optional: Show message if user is already logged in
  if (auth?.user) {
    return (
      <main className="min-h-screen bg">
        <div className='bg-blur flex items-center justify-center h-full w-full'>
          <div className="bg-[#00000086] shadow-lg rounded-2xl p-6 text-center">
            <h2 className="text-2xl font-bold text-ActionPurple mb-4">
              Already Logged In
            </h2>
            <p className="text-gray-400 mb-4">
              You are logged in as {auth.user.email}
            </p>
            <button
              onClick={() => {
                const role = auth.user.role?.toLowerCase();
                if (role === "admin") {
                  navigate("/admin/");
                } else if (role === "user") {
                  navigate("/user/home");
                }
              }}
              className="bg-ActionPurple text-white py-2 px-4 rounded-md hover:bg-ActionMiniPurple"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg">
      <div className='bg-blur flex flex-row-reverse items-center justify-center h-full w-full lg:px-28 md:px-0 px-20'>
        <div className="md:w-1/3 sm:w-11/12 w-full bg-[#00000086] shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-ActionPurple">Login</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
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
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              ) : null}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 text-xl">Password <span className='text-red-500'>*</span></label>
              <div className='h-fit bg-white rounded-md border relative'>
                <input
                  {...(isOpen ? { type: 'text' } : { type: 'password' })}
                  name="password"
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
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              ) : null}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-ActionPurple text-white py-2 mt-2 rounded-md hover:bg-ActionMiniPurple transition-all cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div>
            <p className="text-gray-400 text-center mt-4">Don't have an account? <Link to="/register" className="text-ActionPurple hover:underline">
              Register
            </Link></p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;