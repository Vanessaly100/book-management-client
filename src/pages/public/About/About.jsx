import AboutusImg from "../../../assets/bookcases-1869616_1280.jpg";
import { IoDiamondOutline } from "react-icons/io5";
import { IoTimer } from "react-icons/io5";
import { GrDocumentTime } from "react-icons/gr";
import AboutUsimg4 from "../../../assets/About-Book.jpg";
import AboutUsimg from "../../../assets/bookcases-1869616_1280.jpg";
import { BsPeopleFill } from "react-icons/bs";
import { FaRegThumbsUp } from "react-icons/fa";
import Team from "./Team";
import { GiCleaver } from "react-icons/gi";
import { GiBeachBall } from "react-icons/gi";
import { GiBookPile } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";



const About = () => {
  return (
    <div>
      <section>
        <div className="relative h-[400px] pt-[80px]">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url(${AboutUsimg})`,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-75"></div>
          </div>

          {/* Content Inside Hero Section */}
          <div className="relative z-10 h-full flex items-center justify-center text-center px-6 text-white">
            <div>
              <h1
                data-aos="flip-right"
                data-aos-duration="300"
                className="text-4xl md:text-5xl mb-4 text-ActionPurple font-bold"
              >
                About Us
              </h1>
              <p
                data-aos="flip-right"
                data-aos-duration="500"
                className="text-lg md:text-xl mb-8 w-4/5 xl:w-1/2 mx-auto"
              >
                Welcome to FinLib, your digital gateway to a world of books and boundless imagination. Whether you're searching for your next great read, tracking borrowed titles, or reserving a must-have book, FinLib makes it effortless.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* About us */}
      <section className="pt-32 bg-lightMainBg text-black">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-7 w-11/12 mx-auto pb-10">
        <div className="w-full h-[400px]">
        <img
                src={AboutUsimg4}
                alt="Background Image"
                className="w-full h-full transition-transform duration-300 transform hover:translate-y-[-10px] hover:scale-105  cursor-pointer"
              />
              
        </div>
          <div className="">
            <div
              data-aos="zoom-in"
              data-aos-duration="500"
              className="flex flex-col gap-5"
            >
              <p className="text-ActionMiniPurple text-3xl font-bold ">About Us</p>
              <h1 className="xl:text-4xl text-2xl font-bold">
                we’re solutions to your creative business
              </h1>
              <p>
                There are many variations of simply free text passages of
                available but the majority have suffered alteration in some
                form, by injected hum randomised words which don’t slightly.
              </p>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="">
                  <div className="">
                    <BsPeopleFill size={30} className="text-center" />
                    <div className="font-bold flex gap-1 pb-2">
                      <p className="text-2xl">get free consultation</p>
                    </div>
                    <p>Good knowledge becuase done something many times.</p>
                  </div>
                </div>
                <div className="">
                  <div>
                    <FaRegThumbsUp size={30} color="black" className="" />

                    <div className="font-bold pb-2">
                      <p className="text-2xl">High quality projects</p>
                    </div>
                    <p>Good knowledge becuase done something many times.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="relative h-screen">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url(${AboutUsimg4})`,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-90"></div>
          </div>

          {/* Content Inside Hero Section */}
          <div className="relative z-10 h-full flex items-center justify-center text-center px-6 text-white">
            <div>
              <p
                data-aos="zoom-in"
                data-aos-duration="500"
                className="xl:text-4xl text-3xl font-bold mb-8 w-4/5 xl:w-full mx-auto"
              >
                Our Solutions allows your Business to Increase Productivity
              </p>
              <Link to="/user/contact">
                <button
                  data-aos="zoom-in"
                  data-aos-duration="800"
                  className="bg-purple-600 hover:bg-PrimaryColor text-white px-8 py-4 rounded-lg cursor-pointer"
                >
                  DISCOVER MORE
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="sectionOne xl:h-screen h-fit bg-BackgroundColor pb-14 pt-28 bg-darkMainCardBg">
        <div className="w-11/12 mx-auto">
          <div className="flex flex-col lg:flex-row w-full h-full  gap-10 pb-14">
            <div
              data-aos="fade-up"
              data-aos-duration="500"
              className="xl:w-1/2 w-full text-white flex flex-col gap-7"
            >
              <h1 className="text-3xl font-bold text-PrimaryColor">
                Why Choose Us........
              </h1>
              <h1 className="text-4xl font-bold">
                Crafting experiences, delivering success.
              </h1>
              <p className=" ">
                Our commitment to quality and excellence is unparalleled. From
                the first brainstorming session to the final product delivery,
                we ensure that every step of the process is executed to
                perfection. You are not just getting a service; you are getting
                a partner who is committed to your growth and success.
              </p>
              <div className="flex items-center gap-10">
                <div className="">
                  <div className="letter-container">
                    <span className="letter">30</span>
                    <span className="letter">+</span>
                  </div>
                  <span>Years of Experience</span>
                </div>
                <div className="flex flex-col gap-5">
                  <p className="flex gap-4">
                    <span>
                      <GrDocumentTime color="#EE82EE" />
                    </span>
                    Digital solutions under one roof.
                  </p>
                  <p className="flex gap-4">
                    <span>
                      <IoTimer color="#EE82EE" />
                    </span>
                    Strategies tailored to your business needs.
                  </p>
                  <p className="flex gap-4">
                    <span>
                      <IoDiamondOutline color="#EE82EE" />
                    </span>
                    Competitive pricing for exceptional value.
                  </p>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="800"
              className="w-full xl:w-1/2 h-[400px] image-container"
            >
              <div className="background-box"></div>
              <img
                src={AboutusImg}
                alt="Example"
                className="h-full w-full z-10 relative rounded border transition-transform duration-300 transform hover:translate-y-[-10px] hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <Team />
      </section>
      <section className="bg-darkMainCardBg text-white py-16">
        <div
          data-aos="fade-up"
          data-aos-duration="300"
          className="grid grid-cols-1 xl:grid-cols-2 w-11/12 mx-auto gap-20 justify-center items-center"
        >
          <div className="flex flex-col gap-8">
            <h1 className="xl:text-4xl text-2xl font-bold">
              Dedicated to excellence and client satisfaction
            </h1>
            <p>
              Excellence is at the heart of everything we do. We go above and
              beyond to provide superior services, ensuring that our clients are
              not only satisfied but delighted with the results. Your success is
              our priority.
            </p>
            <div className="border-b-2 border-dashed border-gray-600 flex gap-6">
              <GiCleaver size={50} color="#EE82EE" />
              <p className="pb-6">
                Our solutions are designed to streamline your operations,
                leading to higher productivity and lower costs.
              </p>
            </div>
            <div className="border-b-2 border-dashed border-gray-600 flex gap-6">
              <GiBeachBall size={50} color="#EE82EE" />
              <p className="pb-6">
                By delivering a sleek and modern digital presence, we help
                elevate your brand's image and reputation.
              </p>
            </div>
            <div className="border-b-2 border-dashed border-gray-600 flex gap-6">
              <GiBookPile size={50} color="#EE82EE" />
              <p className="pb-6">
                Our services are tailored to your unique needs, ensuring you get
                the perfect fit for your business.
              </p>
            </div>
          </div>
          {/*  */}
          <div
            data-aos="fade-up"
            data-aos-duration="300"
            className="py-5 border border-gray-500 border-dashed "
          >
            <div className="flex flex-col gap-10">
              <div className="flex gap-8 px-3">
                <FaArrowRight size={50} color="#EE82EE" />
                <div className="flex flex-col gap-4">
                  <h1 className="xl:text-3xl text-2xl font-bold">
                    Our Mission
                  </h1>
                  <p className="">
                    Our solutions are designed to streamline your operations,
                    leading to higher productivity and lower costs.
                  </p>
                </div>
              </div>
              <div className="">
                <div className="flex gap-8 px-3">
                  <FaArrowRight size={50} color="#EE82EE" />
                  <div className="flex flex-col gap-4">
                    <h1 className="xl:text-3xl text-2xl font-bold">
                      Community Involvement
                    </h1>
                    <p className="">
                      Information about your agency's involvement in the
                      community, including partnerships, sponsorships, or
                      volunteer work.
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex gap-8 px-3">
                  <FaArrowRight size={50} color="#EE82EE" />
                  <div className="flex flex-col gap-4">
                    <h1 className="xl:text-3xl text-2xl font-bold">
                      Awards and Recognition
                    </h1>
                    <p className="">
                      Any industry awards, certifications, or notable
                      achievements that lend credibility and prestige to your
                      agency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About