import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import heroPng from "../../assets/faeae3218b3cf93948359e76da1124eb.jpg";
import heroGirl from "../../assets/hero-girl.png";
import book from "../../assets/book.png";
import girl from "../../assets/girl-shape-2.png";
import book2 from "../../assets/book-shape.png";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import PlayVideo from "./PlayVideo";
import { useAuth } from "@/contexts/AuthContext";
import RegisterPromptModal from "./RegisterModal";
import AOS from "aos";
import contactformimg from "../../assets/Book-Hero-Image.jpg";
import Form from "../public/Contact/Form";
import "aos/dist/aos.css";
import reviews from "../../components/maps/reviews";
import balls from "../../components/maps/balls";
import describe from "../../components/maps/describe";
import authors from "../../components/maps/authors";
import category from "../../components/maps/category";
import featured from "../../components/maps/featured";

const Home = () => {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleNav = () => {
    navigate("/user/books");
  };
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  const handleAccessBooks = () => {
    if (!user) {
      setShowModal(true);
    } else {
      handleNav();
    }
  };

  useEffect(() => {
    const scrollToId = location.state?.scrollTo;
    if (scrollToId) {
      const section = document.getElementById(scrollToId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  const { state } = useLocation();

  useEffect(() => {
    if (state?.scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state?.scrollToTop]);

  return (
    <main className="">
      <RegisterPromptModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <div className="relative flex flex-col items-center justify-center min-h-[90vh] p-6 overflow-hidden bg-lightMainBg">
        {/* semi circle */}
        <div
          className="border border-ActionPurple absolute h-[500px] md:h-[700px] w-[500px] md:w-[700px] rounded-full -top-[300px] md:-top-[450px] right-10 p-6"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="900"
        >
          <div className="bg-white h-full w-full rounded-full">
            <img
              src={heroPng}
              alt="hero section png"
              className="rounded-full h-full w-full"
            />
          </div>
        </div>
        {/* hero section */}
        <div className="flex flex-col md:flex-row w-full sm:h-[70vh] mt-4">
          {/* big text */}
          <div className="md:flex hidden flex-col items-center justify-center px-6 w-full md:w-1/2 relative gap-10 h-full">
            <div className="mt-20" data-aos="fade-up" data-aos-duration="600">
              <h1 className="text-4xl md:text-6xl font-bold text-center md:text-left">
                Welcome to FinLib
              </h1>
              <p className="text-gray-500 text-center md:text-left mt-2">
                Discover a world of knowledge and adventure at your fingertips.
              </p>
            </div>
            <div
              className="w-full flex justify-center items-center h-44"
              data-aos="zoom in"
              data-aos-duration="900"
            >
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 2500 }}
                className="w-full h-36"
              >
                {balls.map((ball, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="w-full  h-full flex justify-center items-baseline">
                      <div className="h-full w-3/4 rounded-bl-4xl rounded-tr-4xl overflow-hidden">
                        <img
                          src={ball.image}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          {/* image */}
          <div className=" w-full md:w-1/2 relative flex sm:flex-row-reverse overflow-hidden flex-col-reverse">
            <img
              src={heroGirl}
              alt="hero section png"
              className=" h-[400px] -mr-6 mt-3 floaty"
            />

            <div className="flex flex-col mt-40 sm:w-1/2 w-full justify-baseline items-baseline md:hidden">
              <div className="flex  flex-col items-center justify-center w-full">
                <h1 className="text-4xl font-bold text-center md:text-left">
                  Welcome to FinLib{" "}
                </h1>
                <p className="text-gray-500 text-center mt-2">
                  Discover a world of knowledge and adventure at your
                  fingertips.
                </p>
              </div>
              <img src={book} alt="book" className="h-28 " />
            </div>
          </div>
        </div>
      </div>
      {/* second section  */}
      <div className="bg-darkMainBg py-20">
        <div
          className="bg-lightMainBg rounded-md p-6 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:w-[90%] w-[85%] mx-auto"
          data-aos="fade-in"
          data-aos-easing="linear"
          data-aos-duration="900"
        >
          {describe.map((des, index) => (
            <div key={index} className="flex gap-4 items-center">
              <div className="bg-ActionPurple h-20 w-20 rounded-2xl flex justify-center items-center text-white">
                {des.icons?.()}
              </div>
              <div>
                <h1 className="text-2xl font-bold capitalize">{des.title}</h1>
                <p>{des.para}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* section three || featured books  */}
      <div className="bg-lightMainBg py-20">
        <div className="lg:w-[90%] w-[85%] mx-auto">
        <div className="flex justify-between lg:flex-row flex-col gap-6">
          <h1 className="text-4xl font-bold lg:text-left text-center">Featured Books</h1>
          <button
            className="border p-3 rounded-2xl flex gap-2 justify-center items-center"
            onClick={handleAccessBooks}
          >
            <span>Explore more</span> <ArrowRight />
          </button>
        </div>
        <div className="mt-10">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation]}
            spaceBetween={30}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            navigation={true}
            loop={true}
            autoplay={{ delay: 2500 }}
            className="w-full h-full"
          >
            {featured.map((feat, index) => (
              <SwiperSlide key={index}>
                <div className=" flex flex-col gap-6">
                  <div className="bg-gray-200 p-4 h-56 rounded-t-2xl">
                    <img
                      src={feat.img}
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-semibold capitalize">
                      {feat.title}
                    </h1>

                    <span className="capitalize">Author: {feat.author}</span>
                    <div className="flex items-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-lg ${
                            star <= Number(feat.rating)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-1 text-sm text-gray-500">
                        ({Number(feat.rating).toFixed(1)})
                      </span>
                    </div>

                    <button
                      className="border p-3 rounded-2xl flex gap-2 justify-center items-center"
                      onClick={handleAccessBooks}
                    >
                      <span>Explore more</span> <ArrowRight />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      </div>
      {/* fourth section || top category */}
      <div className="bg-darkMainBg text-white py-20">
        <div className="border-2 border-ActionPurple p-6 rounded-3xl min-h-[60vh] grid lg:w-[90%] w-[85%] mx-auto">
          <div className="w-fit m-auto p-2 -mt-14 bg-darkMainBg ">
            <span className="lg:text-3xl text-2xl font-bold ">Top Categories Book</span>
          </div>
          <div className="grid lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 md:grid-cols-2 flex-wrap gap-4 ">
            {category.map((cate, index) => (
              <div
                key={index}
                className="h-86 flex flex-col justify-center gap-6 items-center"
              >
                <div className="h-60 w-60 rounded-full bg-white shadow p-2 flex justify-center items-center relative">
                  <img
                    src={cate.cover}
                    alt=""
                    className="object-contain h-32 w-32"
                  />
                  <img
                    src="https://gramentheme.com/html/bookle/assets/img/book-categori/circle-shape.png"
                    alt=""
                    className="absolute left-1.5 top-1.5 rotate360"
                  />
                </div>
                <span className="uppercase font-semibold text-xl">
                  {cate.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* a break || ads  */}
      <div className="bg-lightMainBg py-20">
        <div className="bg-ActionMiniPurple text-white rounded-3xl h-[60vh] relative overflow-hidden lg:w-[90%] w-[85%] mx-auto">
          <div className="w-full h-full relative overflow-hidden">
            <img
              src={book2}
              alt=""
              className="absolute -left-25 top-0 h-full"
            />
            <img
              src={girl}
              alt=""
              className="absolute -right-10 top-0 h-full floaty"
            />
          </div>
          <div className="absolute top-0 h-full w-full z-10 flex items-center justify-center bg-[#0000002f]">
            {/* advertizing our web  */}
            <h1 className="text-xl md:text-4xl font-bold  bounce">
              Discover Worlds Within Pages.
            </h1>
          </div>
        </div>
        <div id="about-section"></div>
      </div>

      {/* about our Library sections  */}

      <div className=" w-full py-10 bg-darkMainBg text-white">
        <div className="flex md:flex-row flex-col-reverse gap-6 lg:w-[90%] w-[85%] mx-auto">
          {/* video section  */}
          <div className="md:w-1/2 w-full relative">
            <img
              src="https://gramentheme.com/html/bookle/assets/img/about.jpg"
              alt=""
              className="h-full  w-full object-cover object-center"
            />
            <div className="absolute h-full w-full left-0 top-0 flex justify-center items-center">
              <PlayVideo />
            </div>
          </div>
          <div
            className="md:w-1/2 p-3 w-full lg:text-left text-center"
            data-aos="fade in"
            data-aos-easing="linear"
            data-aos-duration="600"
          >
            <h1 className="lg:text-4xl text-2xl font-bold capitalize mb-5">
              about our library
            </h1>
            <p className="lg:text-lg text-base">
              Designed to be your perfect study sanctuary, our space offers a
              welcoming atmosphere filled with cozy corners, natural light, and
              inspiring surroundings that fuel your love for learning. Whether
              you’re diving into fiction, exploring new genres, or conducting
              research, our vast collection has something for everyone. Plus,
              with easy borrowing and returning options, you have the freedom to
              enjoy your favorite reads at your own pace.{" "}
            </p>

            <p className="mt-3">
              But that’s not all — we’re here for you 24/7 with dedicated
              support, ensuring your library experience is smooth and enjoyable.
              From exciting events to helpful resources and a community of
              fellow book lovers, our library is more than just shelves of
              books; it’s a vibrant hub where ideas flourish and friendships
              grow.
            </p>
          </div>
        </div>
      </div>
      {/* review sections  */}
      <div className="py-10 bg-lightMainBg">
        <div className="lg:w-[90%] w-[85%] mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold capitalize">users feedback</h1>
          <p className="mt-2">
            Trusted by Book Lovers. Reviewed by Readers Like You.
          </p>
        </div>
        <div className="w-full mt-10">
          <Swiper
            modules={[Autoplay, EffectFade]}
            spaceBetween={30}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
            loop={true}
            speed={1000}
            autoplay={{ delay: 3500 }}
            className="w-full h-96 flex justify-center items-center"
          >
            {reviews.map((rev, index) => (
              <SwiperSlide key={index} className="h-full">
                <div
                  className="bg-white p-5 gap-6 flex justify-center flex-col "
                  style={{
                    boxShadow:
                      "0 8px 10px -6px rgba(0,0,0,0.3), 0 -8px 10px -6px rgba(0,0,0,0.3)",
                  }}
                >
                  <p>{rev.review}</p>
                  <div className="p-6 flex items-center gap-4">
                    <div className="h-24 w-24 rounded-full">
                      <img
                        src={rev.picture}
                        alt=""
                        className="h-full w-full object-cover object-center rounded-full"
                      />
                    </div>
                    <div>
                      <h1 className="text-lg font-semibold">{rev.name}</h1>
                      <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-2xl ${
                              star <= Number(rev.rating)
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      </div>
      {/* featured authors section  */}
      <div className="py-10 bg-lightMainBg">
        <div className="lg:w-[90%] w-[85%] mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold capitalize">Featured Author</h1>
          <p className="mt-3">
            Turning Pages & Making Waves — Get to Know Our Featured Authors
          </p>
        </div>
        <div className="w-full mt-10">
          <Swiper
            modules={[Autoplay, EffectFade]}
            spaceBetween={30}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            loop={true}
            speed={1000}
            autoplay={{ delay: 3500 }}
            className="w-full h-72 flex justify-center items-center"
          >
            {authors.map((author, index) => (
              <SwiperSlide key={index}>
                <div className="bg-darkMainBg shadow rounded-2xl h-full gap-4 flex flex-col justify-center items-center">
                  <div className="h-32 w-32 relative flex justify-center items-center">
                    <img
                      src="https://gramentheme.com/html/bookle/assets/img/team/shape-img.png"
                      alt=""
                      className="absolute top-3"
                    />
                    <div className="h-24 w-24 rounded-full">
                      <img
                        src={author.profilePicture}
                        alt=""
                        className="h-full w-full object-cover object-center rounded-full"
                      />
                    </div>
                  </div>
                  {/* text section  */}
                  <div className="rounded-lg bg-lightMainBg w-10/12 h-28 flex flex-col items-center">
                    <p className="font-bold">{author.name}</p>
                    <span>{author.booksPublished} Books Published</span>
                    <div>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-lg ${
                            star <= Number(author.rating)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div>{author.genres.join(", ")}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div id="contact-section"></div>
      </div>
      </div>


      <section className="h-fit bg-darkMainCardBg  text-white">
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
    </main>
  );
};

export default Home;
