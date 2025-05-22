import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from '@emailjs/browser';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const Form = () => {
  // Define the Formik configuration
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required('Full Name is required')
        .min(2, 'Full Name must be at least 2 characters'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      message: Yup.string()
        .min(10, 'Message must be at least 10 characters')
        .required('Message is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    
      const templateParams = {
        from_name: values.fullName,
        from_email: values.email,
        message: values.message,
      };
    
      emailjs
        .send(serviceId, templateId, templateParams, publicKey)
        .then(() => {
          toast.success('Message sent successfully!');
          resetForm();
        })
        .catch((error) => {
          console.error('EmailJS Error:', error);
          toast.error('Failed to send message. Please try again later.');
        });
    }
    
  });
  return (
    <div>
      <section className="flex items-center bg-BackgroundColor p-5 xl:rounded-l-lg">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-BackgroundColor text-white py-5 px-15 shadow-l rounded- xl:rounded-l-l w-full"
        >
          <p className="text-PrimaryColor text-3xl pb-2 font-bold">
            Let's Connect..............
          </p>
          <h2 className="font-bold text-2xl xl:text-3xl pb-2">
            Send us a message
          </h2>
          <p>
            By delivering superior digital solutions, we continuously surpass
            our clients' expectations. Get in touch with us for a free quote!
          </p>

          {/* Full Name Input */}
          <div className="mt-9">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className={`w-full h-1/2 bg-transparent outline-none border ${
                formik.touched.fullName && formik.errors.fullName
                  ? "border-red-500"
                  : "border-gray-400"
              } p-3 mt-2 text-white`}
              placeholder="Enter your full name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.fullName}
              </p>
            )}
          </div>

          {/* Email Address Input */}
          <div className="mt-5">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              className={`w-full h-1/2 bg-transparent outline-none border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-400"
              } p-3 mt-2 text-white`}
              placeholder="Enter your email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Message Input */}
          <div className="mt-5">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              className={`w-full h-1/2 bg-transparent outline-none border ${
                formik.touched.message && formik.errors.message
                  ? "border-red-500"
                  : "border-gray-400"
              } p-3 mt-2 text-white`}
              cols="10"
              rows="5"
              placeholder="Enter your message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.message && formik.errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-8 border-none rounded-md shadow-md cursor-pointer bg-purple-500 text-white font-bold mt-5 hover:bg-purple-300 hover:text-black"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Form;
