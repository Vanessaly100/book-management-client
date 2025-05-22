
import { FaMapLocationDot } from "react-icons/fa6";
import { MdAddCall } from "react-icons/md";
import { MdAttachEmail } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import Form from "./Form";
import contactformimg from '../../../assets/Book-Hero-Image.jpg'
import Maps from "./Maps";

const Contacts = () => {
  return (
    <div>
      <div className="relative h-screen pt-[80px]">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2016/03/09/15/29/books-1246674_1280.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-65"></div>
        </div>

        {/* Content Inside Hero Section */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6 text-white">
          <div>
            <h1
              data-aos="zoom-in"
              data-aos-duration="500"
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Contact Us
            </h1>
            <p
              data-aos="zoom-in"
              data-aos-duration="800"
              className="text-lg md:text-xl mb-8 w-4/5 xl:w-1/2 mx-auto"
            >
             Have questions or need help? Reach out to the FinLib team  we're here to assist with anything from book inquiries to technical support. Let’s connect
            </p>
          </div>
        </div>
      </div>

      <section className="bg-lightMainBg text-white">
        <div className="w-11/12 mx-auto">
          <div className="grid grid-col xl:grid-cols-4 md:grid-cols-2 text-center gap-8 py-12">
            <div
              data-aos="fade-up"
              data-aos-duration="300"
              className="flex flex-col items-center  gap-6 border border-gray-500 p-7"
            >
              <div className="bg-ActionPurple  w-fit p-6">
                <FaMapLocationDot color="white" size={30} />
              </div>
              <div className="text-black">
                <p className="text-1xl font-bold">123, King Street, NY</p>
                <span>Visit Us</span>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="500"
              className="flex flex-col items-center  gap-6 border border-gray-500 p-7"
            >
              <div className="bg-ActionPurple  w-fit p-6">
                <MdAddCall color="white" size={30} />
              </div>
              <div className="text-black">
                <p className="text-1xl font-bold">+1 (123) 456 7890</p>
                <span>Call Us</span>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="800"
              className="flex flex-col items-center  gap-6 border border-gray-500 p-7"
            >
              <div className="bg-ActionPurple  w-fit p-6">
                <MdAttachEmail color="white" size={30} />
              </div>
              <div className="text-black">
                <p className="text-1xl font-bold">info@example.com</p>
                <span>Email Us</span>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="flex flex-col items-center  gap-6 border border-gray-500 p-7"
            >
              <div className="bg-ActionPurple  w-fit p-6">
                <IoIosTime color="white" size={30} />
              </div>
              <div className="text-black">
                <p className="text-1xl font-bold">Mon-Fri: 9:00am - 7:00pm</p>
                <span>Business Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="h-fit bg-darkMainCardBg  text-white xl:p-10 p-5">
        <div
          data-aos="fade-up"
          data-aos-duration="300"
          className="grid xl:grid-cols-2 grid-cols-1"
        >
          <div className="h-fit">
            <Form />
          </div>
          <div className="h-full relative xl:rounded-r-lg">
            <img
              src={contactformimg}
              alt=""
              className="h-full xl:rounded-r-lg object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-darkMainBg opacity-50"></div>
            <div className="absolute inset-0 flex items-end justify-center">
              <h1 className="text-white text-1xl p-3">
                Working with them is always a pleasure. Their team is
                responsive, efficient, and consistently meets deadlines. They’ve
                been integral in pushing our digital boundaries.
              </h1>
            </div>
          </div>
        </div>
      </section>
      {/* map */}
      <section>
        <Maps />
      </section>
    </div>
  );
}

export default Contacts