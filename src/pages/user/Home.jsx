import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import heroPng from '../../assets/faeae3218b3cf93948359e76da1124eb.jpg';
import heroGirl from "../../assets/hero-girl.png";
import book from "../../assets/book.png";
import girl from "../../assets/girl-shape-2.png";
import book2 from "../../assets/book-shape.png"
import { ArrowRight, Book, ChartArea, Clock, Castle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import PlayVideo from './PlayVideo';
import { useAuth } from '@/contexts/AuthContext';
import RegisterPromptModal from './RegisterModal';

const Home = () => {
  const balls = [
    { image: "https://i.pinimg.com/736x/63/69/58/636958924d2b3c7d769a3da3311b79b1.jpg" },
    { image: "https://i.pinimg.com/736x/54/75/94/547594847082176e5c6308b3b8dff6f6.jpg" },
    { image: "https://i.pinimg.com/736x/9b/57/cf/9b57cf778444d32d87e0875f293e999b.jpg" },
    { image: "https://i.pinimg.com/736x/d1/1f/4a/d11f4a88f1610216fafe4244163e424e.jpg" },
    { image: "https://i.pinimg.com/736x/92/e7/5f/92e75f581a5e365ee21399f8085f1543.jpg" },
  ];

  const describe = [
    {
      title: "great ambiance",
      para: "very conducive for your studies",
      icons: <Castle size={36}/>
    },
    {
      title: "accessibility",
      para: "borrow and return later",
      icons: <Book size={36}/>
    },
    {
      title: "24/7 support",
      para: "where open any time of the day",
      icons: <Clock size={36}/>
    },
    {
      title: "variety of genre",
      para: "choose from our variety of genres",
      icons: <ChartArea size={36}/>
    }
  ];

  const featured = [
    {
      img: "https://i.pinimg.com/736x/17/9e/92/179e92b2638194a699fbced57042d491.jpg",
      title: "unbound voices",
      rating: 4,
      author: "williams gomes",
    },
    {
      img: "https://i.pinimg.com/736x/44/ef/17/44ef1720841ce124ffb1351348987003.jpg",
      title: "the witness",
      rating: 5,
      author: "andrew cartwell",
    },
    {
      img: "https://i.pinimg.com/736x/d5/e1/95/d5e1951255f25d4490eb6c4ffa8f8851.jpg",
      title: "who are you",
      rating: 3,
      author: "soumana ammar",
    },
    {
      img: "https://i.pinimg.com/736x/ea/c0/7f/eac07f6741a13df228ea637f114b9d4a.jpg",
      title: "real estate",
      rating: 5,
      author: "gail villanueva",
    },
    {
      img: "https://i.pinimg.com/736x/d8/40/56/d840560c716be9a085c5a92ba7196162.jpg",
      title: "smart money secret",
      rating: 4,
      author: "scott & alison hilton",
    },
    {
      img: "https://i.pinimg.com/736x/f0/a4/61/f0a461d7d0f7233f0070a75389ffa4d9.jpg",
      title: "never ghosted again",
      rating: 4,
      author: "cairo copeland",
    },
    {
      img: "https://i.pinimg.com/736x/90/ca/ab/90caab0c8f6b175a0e007191da4ee653.jpg",
      title: "marriage revived",
      rating: 5,
      author: "brian goins",
    },
  ]

  const category = [
    {
      cover: "https://i.pinimg.com/736x/19/59/68/195968b09ef5c6190411a01251319704.jpg",
      title: "fantasy"
    },
    {
      cover: "https://i.pinimg.com/736x/5b/84/83/5b848386b499b85caa8d721f4c12de2f.jpg",
      title: "science",
    },
    {
      cover: "https://i.pinimg.com/736x/57/39/81/573981d53fff1dde1e394ff8984b17d5.jpg",
      title: "adventures"
    },
    {
      cover:"https://i.pinimg.com/736x/47/92/c4/4792c4819e445b9415fb82a8458b5e08.jpg",
      title: "sci-fic"
    },
  ]


  const reviews =[
    {
      "name": "Alice Johnson",
      "picture": "https://randomuser.me/api/portraits/women/44.jpg",
      "rating": 5,
      "review": "This library has transformed my reading habits! The e-library platform is intuitive, making it easy to find and borrow books anytime. The physical library staff are friendly and always ready to help. I truly appreciate how this service blends the best of both worlds seamlessly."
    },
    {
      "name": "Michael Smith",
      "picture": "https://randomuser.me/api/portraits/men/32.jpg",
      "rating": 4,
      "review": "I have been using the e-library regularly and it never disappoints. The digital catalog is extensive, and the download speed is excellent. The physical library is also well-maintained and comfortable, perfect for long reading sessions or studying. Highly recommend this library to all book lovers."
    },
    {
      "name": "Sofia Lee",
      "picture": "https://randomuser.me/api/portraits/women/68.jpg",
      "rating": 4,
      "review": "I enjoy both the e-library and the traditional library space. The e-library is accessible from anywhere and offers a broad range of titles. Sometimes I visit the library to explore new releases or join events. It’s a wonderful resource that supports my reading and learning habits."
    },
    {
      "name": "David Kim",
      "picture": "https://randomuser.me/api/portraits/men/12.jpg",
      "rating": 5,
      "review": "The e-library service is fantastic — the interface is user-friendly and borrowing books online is very convenient. Plus, the physical library is a cozy spot to relax and read. The staff are knowledgeable and always willing to assist. I am very impressed by the quality of this library."
    },
    {
      "name": "Emma Brown",
      "picture": "https://randomuser.me/api/portraits/women/25.jpg",
      "rating": 5,
      "review": "I love how this library integrates both physical and digital books so well. The e-library allows me to read on the go, while the physical library provides a peaceful environment to concentrate. Their collection is impressive, and I find new favorites every time I visit or browse online."
    },
    {
      "name": "James O'Neil",
      "picture": "https://randomuser.me/api/portraits/men/53.jpg",
      "rating": 3,
      "review": "The library is generally great, but the e-library could use a few more recent titles. However, I really enjoy the quiet study rooms in the physical library. It’s a balanced system overall, and the convenience of the digital access definitely makes up for minor catalog gaps."
    },
    {
      "name": "Linda Garcia",
      "picture": "https://randomuser.me/api/portraits/women/36.jpg",
      "rating": 4,
      "review": "This e-library is a game-changer! I can borrow and read books anytime, anywhere. It fits perfectly into my busy schedule. When I have time, I love visiting the actual library too — it’s always clean, welcoming, and filled with helpful staff. Great experience all around!"
    },
    {
      "name": "Chris Evans",
      "picture": "https://randomuser.me/api/portraits/men/41.jpg",
      "rating": 5,
      "review": "Amazing service from start to finish. The e-library makes it simple to access a vast selection of books. I appreciate the seamless login process and fast browsing. And the physical library offers great events and programs for the community. It's an excellent resource for all ages."
    },
    {
      "name": "Zara Thompson",
      "picture": "https://randomuser.me/api/portraits/women/18.jpg",
      "rating": 4,
      "review": "What I love most is how easy it is to use the e-library on my tablet. I’m always reading on the go now. The main library also hosts interesting author talks and workshops that I frequently attend. Both digital and physical experiences are equally enriching."
    },
    {
      "name": "Ethan Brooks",
      "picture": "https://randomuser.me/api/portraits/men/65.jpg",
      "rating": 5,
      "review": "I can’t imagine studying without this library. The e-library saved me countless times during deadlines when I couldn’t go in person. It’s efficient, reliable, and full of great content. The physical space is just as amazing, with plenty of seating and free Wi-Fi throughout. Highly recommended!"
    }
  ]

  const authors = [
    {
      name: "Williams Gomes",
      booksPublished: 12,
      genres: ["Fiction", "Drama"],
      rating: 4,
      bio: "Williams Gomes is renowned for his captivating storytelling that explores deep human emotions and complex relationships.",
      profilePicture: "https://i.pinimg.com/736x/3a/b9/37/3ab9375fa1fc2e34c6e667d8a50d5acb.jpg"
    },
    {
      name: "Andrew Cartwell",
      booksPublished: 8,
      genres: ["Thriller", "Mystery"],
      rating: 4,
      bio: "Andrew Cartwell crafts thrilling narratives full of suspense and unexpected twists, keeping readers hooked till the last page.",
      profilePicture: "https://i.pinimg.com/736x/f3/5d/73/f35d735fd020ce6cdaf628b90bb59694.jpg"
    },
    {
      name: "Soumana Ammar",
      booksPublished: 10,
      genres: ["Biography", "Self-help"],
      rating: 4,
      bio: "Soumana Ammar inspires readers through insightful biographies and motivational self-help books focused on personal growth.",
      profilePicture: "https://i.pinimg.com/736x/7e/83/0e/7e830e9c49dee63d546ba2b376523d30.jpg"
    },
    {
      name: "Gail Villanueva",
      booksPublished: 15,
      genres: ["Real Estate", "Business"],
      rating: 4,
      bio: "Gail Villanueva shares expert knowledge on real estate investment, empowering readers to make smart business decisions.",
      profilePicture: "https://i.pinimg.com/736x/78/99/53/7899537db9661088c9cf860d2b51303b.jpg"
    },
    {
      name: "Alison Hilton",
      booksPublished: 7,
      genres: ["Finance", "Development"],
      rating: 4,
      bio: "The Hilton duo combines financial wisdom with personal development strategies to help readers achieve success.",
      profilePicture: "https://i.pinimg.com/736x/7f/7f/d9/7f7fd989763889ae7f7c489d558b4797.jpg"
    }
  ];
  
  
  const navigate = useNavigate();

  const location = useLocation();

  const handleNav = () => {
    navigate('/user/books');
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
    <main className=''>
      <RegisterPromptModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <div className='relative flex flex-col items-center justify-center min-h-[90vh] p-6 overflow-hidden bg-lightMainBg'>
        {/* semi circle */}
            <div className='border border-ActionPurple absolute h-[500px] md:h-[700px] w-[500px] md:w-[700px] rounded-full -top-[300px] md:-top-[450px] right-10 p-6'>
              <div className='bg-white h-full w-full rounded-full'>
                <img src={heroPng} alt="hero section png" className='rounded-full h-full w-full' />
              </div>
            </div>
            {/* hero section */}
            <div className='flex flex-col md:flex-row w-full sm:h-[70vh] mt-4'>
              {/* big text */}
              <div className='md:flex hidden flex-col items-center justify-center px-6 w-full md:w-1/2 relative gap-10 h-full'>
                <div className='mt-20'><h1 className='text-4xl md:text-6xl font-bold text-center md:text-left'>Welcome to FinLib</h1>
                <p className='text-gray-500 text-center md:text-left mt-2'>Discover a world of knowledge and adventure at your fingertips.</p></div>
                <div className='w-full flex justify-center items-center h-44'>
                <Swiper
                modules={[Autoplay, EffectFade]}
                effect='fade'
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
            autoplay={{ delay: 2500 }}
            className="w-full h-36"
    >
      {balls.map((ball, idx) => (
        <SwiperSlide key={idx}>
          <div className="w-full  h-full flex justify-center items-baseline">
            <div className='h-full w-3/4 rounded-bl-4xl rounded-tr-4xl overflow-hidden'>
              <img src={ball.image} alt="" className='h-full w-full object-cover object-center'/>
                </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
                
                </div>
              </div>
              {/* image */}
              <div className=' w-full md:w-1/2 relative flex sm:flex-row-reverse overflow-hidden flex-col-reverse'>
                <img src={heroGirl} alt="hero section png" className=' h-[400px] -mr-6 mt-3' />

                <div className='flex flex-col mt-40 sm:w-1/2 w-full justify-baseline items-baseline md:hidden'>
                <div className='flex  flex-col items-center justify-center w-full'>
                <h1 className='text-4xl font-bold text-center md:text-left'>Welcome to FinLib </h1>
                <p className='text-gray-500 text-center mt-2'>Discover a world of knowledge and adventure at your fingertips.</p>
              </div>
                <img src={book} alt="book" className='h-28 ' />
                </div>
                </div>
            </div>
      </div>
      {/* second section  */}
      <div className='bg-darkMainBg p-20'>
        <div className='bg-lightMainBg rounded-md p-6 gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {describe.map((des, index)=>(
            <div key={index} className='flex gap-4 items-center'>
              <div className='bg-ActionPurple h-20 w-20 rounded-2xl flex justify-center items-center text-white'>
                {des.icons}
              </div>
              <div>
                <h1 className='text-2xl font-bold capitalize'>{des.title}</h1>
                <p>{des.para}</p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* section three || featured books  */}
      <div className='bg-lightMainBg px-20 p-20'>
        <div className='flex justify-between'>
          <h1 className='text-4xl font-bold'>Featured Books</h1>
          <button className='border p-3 rounded-2xl flex gap-2 justify-center items-center' onClick={handleAccessBooks}><span>Explore more</span> <ArrowRight/></button>
        </div>
        <div className='mt-10'>
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
        navigation ={true}
        loop={true}
      autoplay={{ delay: 2500 }}
      className="w-full h-full"
          >
            {featured.map((feat, index)=> (
              <SwiperSlide key={index}>
                <div className=' flex flex-col gap-6'>
                <div className='bg-gray-200 p-4 h-56 rounded-t-2xl'>
                  <img src={feat.img} alt="" className='h-full w-full object-cover object-center' />
                </div>
                <div className='flex flex-col gap-1'>
                  <h1 className='text-xl font-semibold capitalize'>{feat.title}</h1>
                  
                    <span className='capitalize'>Author: {feat.author}</span>
                    <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-lg ${
                    star <= Number(feat.rating) ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="ml-1 text-sm text-gray-500">
                ({Number(feat.rating).toFixed(1)})
              </span>
            </div>

                <button className='border p-3 rounded-2xl flex gap-2 justify-center items-center' onClick={handleAccessBooks}><span>Explore more</span> <ArrowRight/></button>
                </div>
                </div>

              </SwiperSlide>
            ))}

          </Swiper>
        </div>
      </div>
      {/* fourth section || top category */}
      <div className='bg-darkMainBg text-white p-20'>
      <div className='border-2 border-ActionPurple p-6 rounded-3xl min-h-[60vh] grid'>
        <div className='w-fit m-auto p-2 -mt-14 bg-darkMainBg '>
          <span className='text-3xl font-bold '>Top Categories Book</span>
          </div>
          <div className='grid lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 md:grid-cols-2 flex-wrap gap-4 '>
            {category.map((cate, index) =>(
              <div key={index} className='h-86 flex flex-col justify-center gap-6 items-center'>
                <div className='h-60 w-60 rounded-full bg-white shadow p-2 flex justify-center items-center relative'>
                  <img src={cate.cover} alt="" className='object-contain h-32 w-32' />
                  <img src="https://gramentheme.com/html/bookle/assets/img/book-categori/circle-shape.png" alt="" className='absolute left-1.5 top-1.5 rotate360' />
                </div>
                <span className='uppercase font-semibold text-xl'>{cate.title}</span>
              </div>
            ))}
          </div>
      </div>
      </div>
      {/* a break || ads  */}
      <div className='bg-lightMainBg p-20'> 
        <div className='bg-ActionMiniPurple text-white rounded-3xl h-[60vh] relative overflow-hidden'>
          <div className='w-full h-full relative overflow-hidden'>
            <img src={book2} alt="" className='absolute -left-25 top-0 h-full' />
            <img src={girl} alt="" className='absolute -right-10 top-0 h-full' />
          </div>
          <div className='absolute top-0 h-full w-full z-10 flex items-center justify-center bg-[#0000002f]'>
            {/* advertizing our web  */}
            <h1 className='text-xl md:text-4xl font-bold  bounce'>Discover Worlds Within Pages.</h1>
          </div>
        </div>
        <div id='about-section' ></div>
      </div>

      {/* about our Library sections  */}

      <div className=' w-full px-20 py-10 bg-darkMainBg text-white'>
            <div className='flex md:flex-row flex-col-reverse gap-6'>
              {/* video section  */}
              <div className='md:w-1/2 w-full relative'>
                <img src="https://gramentheme.com/html/bookle/assets/img/about.jpg" alt="" className='h-full  w-full object-cover object-center' />
                <div className='absolute h-full w-full left-0 top-0 flex justify-center items-center'>
                <PlayVideo/>
                </div>
              </div>
              <div className='md:w-1/2 p-3 w-full'>
                <h1 className='text-4xl font-bold capitalize mb-5'>about our library</h1>
                <p>Designed to be your perfect study sanctuary, our space offers a welcoming atmosphere filled with cozy corners, natural light, and inspiring surroundings that fuel your love for learning. Whether you’re diving into fiction, exploring new genres, or conducting research, our vast collection has something for everyone. Plus, with easy borrowing and returning options, you have the freedom to enjoy your favorite reads at your own pace. </p>

              <p className='mt-3'>But that’s not all — we’re here for you 24/7 with dedicated support, ensuring your library experience is smooth and enjoyable. From exciting events to helpful resources and a community of fellow book lovers, our library is more than just shelves of books; it’s a vibrant hub where ideas flourish and friendships grow.</p>
              </div>
            </div>
      </div>
      {/* review sections  */}
      <div className='py-10 bg-lightMainBg'>
        <div className='mb-10 text-center'>
        <h1 className='text-4xl font-bold capitalize'>users feedback</h1>
        <p className='mt-2'>Trusted by Book Lovers. Reviewed by Readers Like You.</p>
        </div>
        <div className='w-full px-20 mt-10'>
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
              {reviews.map((rev, index)=>(
                <SwiperSlide key={index} className='h-full' >
                  <div className='h-86 bg-white p-6 gap-6 flex justify-center flex-col '   style={{ boxShadow: '0 8px 10px -6px rgba(0,0,0,0.3), 0 -8px 10px -6px rgba(0,0,0,0.3)' }}>
                    <p>{rev.review}</p>
                    <div className='p-6 flex items-center gap-4'>
                    <div className='h-24 w-24 rounded-full'>
                      <img src={rev.picture} alt="" className='h-full w-full object-cover object-center rounded-full' />
                    </div>
                    <div>
                      <h1 className='text-lg font-semibold'>{rev.name}</h1>
                      <div>
                      {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-2xl ${
                    star <= Number(rev.rating) ? 'text-yellow-500' : 'text-gray-300'
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
      {/* featured authors section  */}
      <div className='px-20 py-10 bg-lightMainBg'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold capitalize'>
          Featured Author
          </h1>
          <p className='mt-3'>Turning Pages & Making Waves — Get to Know Our Featured Authors</p>
        </div>
        <div className='p-6 w-full mt-10'>
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
              {authors.map((author, index)=>(
                <SwiperSlide key={index}>
                <div className='bg-darkMainBg shadow rounded-2xl h-full gap-4 flex flex-col justify-center items-center'>
                  <div className='h-32 w-32 relative flex justify-center items-center'>
                    <img src="https://gramentheme.com/html/bookle/assets/img/team/shape-img.png" alt="" className='absolute top-3' />
                    <div className='h-24 w-24 rounded-full'>
                  <img src={author.profilePicture} alt="" className='h-full w-full object-cover object-center rounded-full'/>
                    </div>
                  </div>
                  {/* text section  */}
                  <div className='rounded-lg bg-lightMainBg w-10/12 h-28 flex flex-col items-center'>
                    <p className='font-bold'>{author.name}</p>
                    <span>{author.booksPublished} Books Published</span>
                    <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-lg ${
                    star <= Number(author.rating) ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
                    </div>
                    <div>
                    {author.genres.join(', ')}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              ))}
            </Swiper>
        </div>
        <div id='contact-section'></div>
      </div>
    </main>
    
  )
}

export default Home
