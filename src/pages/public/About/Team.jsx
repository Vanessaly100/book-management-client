// import React from 'react'
import Team1 from '../../../assets/WhatsApp_Image_2025-05-22_at_14.45.10_ec2af8d3-removebg-preview.png'
import Team2 from '../../../assets/mine-removebg-preview2.png'
import Team3 from '../../../assets/team_04_home01-PFBTVXA.jpg.jpg'

const Team = () => {
  return (
    <div>
      <section className="pt-24 bg-lightMainBg text-black pb-28">
        <div className="w-11/12 mx-auto">
          <div className="flex flex-col gap-3 items-center pb-14">
            <p
              data-aos="zoom-in"
              data-aos-duration="500"
              className=" text-PrimaryColor text-3xl"
            >
              Experienced Team
            </p>
            <h1
              data-aos="zoom-in"
              data-aos-duration="800"
              className="xl:text-4xl text-3xl font-bold text-ActionMiniPurple"
            >
              Meet Our People
            </h1>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-14 ">
            <div className="">
              <div
                data-aos="zoom-in"
                data-aos-duration="500"
                className="relative h-[400px] overflow-hidde transition-transform duration-300 transform hover:translate-y-[-10px] hover:scale-105"
              >
                <img src={Team1} alt="Person" className="h-full bg-cover" />
                {/* Top-left corner design */}
                <div className="absolute top-0 left-0 w-14 h-14 border-t-4 border-l-4 border-ActionPurple"></div>
                <div className="bg-ActionPurple text-white relative -top-10 p-4 w-4/5 z-10">
                  <p className="font-bold text-3xl">Mecole Victor</p>
                  <p>Administrator</p>
                </div>
              </div>
            </div>
            <div className="">
              <div
                data-aos="zoom-in"
                data-aos-duration="300"
                className="relative h-[400px] overflow-hidde transition-transform duration-300 transform hover:translate-y-[-10px] hover:scale-105"
              >
                <img src={Team2} alt="Person" className="h-full bg-cover" />
                {/* Top-left corner design */}
                <div className="absolute top-0 left-0 w-14 h-14 border-t-4 border-l-4 border-ActionPurple"></div>
                <div className="bg-ActionPurple text-white relative -top-10 p-4 w-4/5">
                  <p className="font-bold text-3xl">Vanessa Dimma</p>
                  <p>Librarian</p>
                </div>
              </div>
            </div>
            <div className="">
              <div
                data-aos="zoom-in"
                data-aos-duration="800"
                className="relative h-[400px] overflow-hidde transition-transform duration-300 transform hover:translate-y-[-10px] hover:scale-105"
              >
                <img src={Team3} alt="Person" className="h-full bg-cover" />
                {/* Top-left corner design */}
                <div className="absolute top-0 left-0 w-14 h-14 border-t-4 border-l-4 border-ActionPurple"></div>
                <div className="bg-ActionPurple text-white relative -top-10 p-4 w-4/5">
                  <p className="font-bold text-3xl">David Cooper</p>
                  <p>Staff</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Team