
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const FooterLinks = [
  {
    title: "About",
    link: "/user/about",
  },
  {
    title: "Books",
    link: "/user/books",
  },
  {
    title: "Services",
    link: "/user/services",
  },
  {
    title: "Contacts",
    link: "/user/contacts",
  },

];


const HelpLinks = [
  {
    title: "Customer Support",
    link: "/support",
  },
  {
    title: "Delivery Details",
    link: "/delivery-details",
  },
  {
    title: "Terms & Conditions",
    link: "/terms",
  },
  {
    title: "Privacy Policy",
    link: "/policy",
  },
];
const ResourcesLinks = [
  {
    title: "Free Ebooks",
    link: "https://www.free-ebooks.net/",
  },
  {
    title: "How To Blog",
    link: "https://www.wix.com/blog/how-to-start-a-blog",
  },
  
];


const Footer = () => {
  return (
    <div>
      <div className="bg-black text-white">
        <section className="container py-10">
          <div className=" grid md:grid-cols-3 py-5">
            {/* company Details */}
            <div className=" py-8 px-4 ">
              <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
               FinLib Library
              </h1>
              <p className="text-sm">
              Welcome to FinLib, your digital gateway to a world of books and boundless imagination. Whether you're searching for your next great read, tracking borrowed titles, or reserving a must-have book, FinLib makes it effortless. Designed for book lovers, students, and curious minds, our platform helps you stay organized, discover hidden gems, and manage your personal library with ease.
              </p>
              <br />
              {/* Social Handle */}
              <div className="flex items-center gap-4 mt-6">
                <a href="#">
                  <FaInstagram className="text-2xl hover:text-primary duration-300" />
                </a>
                <a href="#">
                  <FaFacebook className="text-2xl hover:text-ActionMiniPurple duration-300" />
                </a>
                <a href="#">
                  <FaLinkedin className="text-2xl hover:text-ActionMiniPurple duration-300" />
                </a>
              </div>
            </div>
            {/* Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10 ">
              <div className="">
                <div className="py-8 px-4 ">
                  <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                    Company
                  </h1>
                  <ul className={`flex flex-col gap-3`}>
                    {FooterLinks.map((link) => (
                      <li key={link.title}>
                        <NavLink
                          to={link.link}
                          className={({ isActive }) =>
                            isActive
                              ? "text-ActionPurple font-bold"
                              : "hover:text-ActionPurple"
                          }
                        >
                          {link.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="">
                <div className="py-8 px-4 ">
                  <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                    Help
                  </h1>
                  <ul className="flex flex-col gap-3">
                    {HelpLinks.map((link) => (
                      <li
                        key={link.title}
                        className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-400 "
                      >
                        <span>{link.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="">
                <div className="py-8 px-4 ">
                  <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                    Resources
                  </h1>
                  <ul className="flex flex-col gap-3">
                    {ResourcesLinks.map((link) => (
                      <li
                        key={link.title}
                        className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-400 "
                      >
                        <span>{link.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Footer