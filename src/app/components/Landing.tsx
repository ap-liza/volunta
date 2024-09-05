"use client"
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {faMagnifyingGlass, faHandshake, faChartLine} from '@fortawesome/free-solid-svg-icons'


export default function Landing(){

    const testimonials = [
        { text: "I am utterly delighted with the Volunta web app! The intuitive interface and user-friendly design make it an absolute pleasure to navigate. The AI-powered matching algorithm is nothing short of revolutionary, effortlessly connecting me with volunteer opportunities that align perfectly with my passions and skills. The sense of fulfillment I've experienced through Volunta is truly unparalleled – it's a game-changer for anyone seeking to make a meaningful impact in their community!"
, 
        author: "Jane Doe",
        image: '/review1.jpeg'
        },
        { text: 
            "Volunta has been a transformative force in my life, providing me with a platform to channel my energy and enthusiasm into tangible, positive change. The vast array of volunteer opportunities available through the app is staggering, and the ability to filter by cause, location, and type has made it effortless to find the perfect fit. The community features are also exceptional, allowing me to connect with like-minded individuals and organizations who share my commitment to social good.",
        author: "John Smith",
         image: '/review1.jpeg'
        },
        { text: "Volunta has opened my eyes to a world of volunteering opportunities that I never knew existed! The app's focus on empathy, innovation, and collaboration resonates deeply with me, and I appreciate the emphasis on creating meaningful connections between volunteers and organizations. The impact tracking features are also impressive, allowing me to see the tangible difference that my efforts are making – it's a truly rewarding experience!",

         author: "Emily Johnson" ,
         image: '/review1.jpeg'
        },
        { text: "As a busy professional, I thought volunteering was something I could only dream of doing. But Volunta has made it a reality, offering flexible and remote opportunities that fit perfectly into my schedule. The skill-based volunteering program has allowed me to share my expertise with non-profits, making a real difference in their capacity and impact. Volunta has truly democratized volunteering – it's a must-use for anyone looking to give back!"
        , author: "Michael Brown",
         image: '/review1.jpeg'
         },

        { text: "Volunta has exceeded my expectations in every way! The app's user-centric design and intuitive navigation make it easy to find and engage with volunteer opportunities that align with my interests and availability. t's clear that the team is committed to creating a welcoming and inclusive environment for all volunteers. Whether you're a seasoned volunteer or just starting out, Volunta is an invaluable resource that will help you make a meaningful difference in the world.",
            
            author: "Sarah Wilson",
             image: '/review1.jpeg'
         },
         
        { text: "I've tried numerous volunteering platforms in the past, but none have come close to the exceptional user experience offered by Volunta. The app's commitment to innovation and community-building is evident in every aspect, from the intuitive design to the engaging community features. As someone who's passionate about social justice, I appreciate Volunta's focus on empowering marginalized communities and promoting equity – it's a truly inspiring mission that I'm proud to support.", 
            author: "David Lee",
             image: '/review1.jpeg'
         },
      ];

      const [currentIndex, setCurrentIndex] = useState(0);

      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000); // Change slide every 5 seconds
    
        return () => clearInterval(interval);
      }, []);
    
      const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      };
    
      const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      };


    return(
        <>
        {/**hero section */}
        <div className="landing-bg  min-h-[400px] md:min-h-[600px]">
        <div className="flex flex-col gap-3 md:gap-4 justify-center items-center ">

            <h1 className="text-[#F9F7F7] hh text-center text-4xl md:text-[70px]  font-bold leading-tight tracking-[-0.033em] mt-32 md:mt-[10rem]">
            Small Efforts,
            </h1>

            <h1 className="text-[#F9F7F7] hh text-center text-4xl md:text-[70px]  font-bold leading-tight tracking-[-0.033em]"> Make Big Change</h1>

            <h2 className="text-[#F9F7F7] text-sm md:text-base font-semibold text-center">
            Join a platform that connects volunteers with organizations creating positive impact.
            </h2>

           <Link 
           className=" text-sm md:text-base bg-[#FF6F61]  p-4 md:px-6 md:py-3 rounded-full text-[#F9F7F7] mt-2 shadow-md hover:bg-[#C7A500]"
           href='/login'>
            Become a Volunteer</Link>


            </div>
        </div>

        {/**3 boxes */}

        <section id="features" className="  py-20">
  
        <div className="mt-[-100px] md:mt-[-230px] "></div>

        <div className="container p-10 md:p-20 mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 text-center relative z-10">


            <div className="bg-[#FFFFF0] p-8 rounded-lg   md:rounded-r-none shadow-lg">
            <div className="icon p-4 mx-auto">
                <FontAwesomeIcon className="w-8 h-8" icon={faMagnifyingGlass} />
            </div>
            <h2 className="text-2xl font-semibold text-[#004D40] mt-4">Find Opportunities</h2>
            <p className="text-[#708090] mt-2">Discover volunteer roles that align with your interests.</p>
            </div>
            
            <div className="bg-[#D1D5DB] p-8 rounded-lg shadow-lg md:rounded-none ">
            <div className="icon p-4  mx-auto">
                <FontAwesomeIcon icon={faHandshake} className="w-10 h-10"  />
            </div>
            <h2 className="text-2xl font-semibold text-[#004D40] mt-4">Connect with Organizations</h2>
            <p className="text-[#708090] mt-2">Easily connect with organizations that need your help.</p>
            </div>

            <div className="bg-[#FFFFF0] p-8 rounded-lg shadow-lg md:rounded-l-none">
            <div className="icon p-4  mx-auto">
                <FontAwesomeIcon icon={faChartLine} className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-semibold text-[#004D40] mt-4">Make an Impact</h2>
            <p className="text-[#708090] mt-2">Monitor the difference you’re making over time.</p>
            </div>
        </div>
        </section>
        
        {/* Our Mission */}
        <div className="px-10 md:px-20 mt-[-50px] md:mt-[-40px]">
            <div className="bg-[#004D40] p-10 md:p-20 min-h-[380px] md:min-h-[430px] rounded-lg">
                <h1 className="text-[#F9F7F7] text-center font-semibold text-base md:text-xl">
                Our mission is to create a dynamic platform that connects dedicated volunteers with organizations seeking their expertise and passion
                </h1>
                <h1 className="text-[#F9F7F7] mt-6 md:mt-8 text-center text-sm md:text-base">
                By fostering meaningful relationships and providing opportunities for collaborative partnerships, we aim to bridge the gap between individuals and causes, driving positive change and making a lasting impact on our communities.

                </h1>
            </div>
                
            <div className="px-10 md:px-20 mt-[-100px] md:mt-[-180px]">
            <img src="/v1.jpg" alt="" className="ml-[2px] rounded-lg"/>
            </div>
        </div>

        {/**Upcoming events */}
        <section id="upcoming-events" className=" bg-[#F5F5F5]">
        <div className="container mx-auto p-10 md:p-20 lg:px-12 text-center">
            <h2 className="text-3xl font-bold text-[#004D40] mb-8">Upcoming Events</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Card 1 */}
            <div className="bg-[#FFFFF0] rounded-lg shadow-lg overflow-hidden">
                <img src="/v2.jpg" alt="Event 1" className="w-full h-48 object-cover"/>
                <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#004D40]">Community Clean-Up</h3>
                <p className="text-[#708090] mt-2">Join us in cleaning up our local parks and streets.</p>
                <div className="text-[#6A5ACD] font-semibold mt-4">Sept 15, 2024</div>
                <div className="mt-6">
                    <button className="bg-[#6A5ACD] text-white py-2 px-4 rounded-full hover:bg-[#564A9F]">Register</button>
                </div>
                </div>
            </div>

            {/* Event Card 2 */}
            <div className="bg-[#D1D5DB] rounded-lg shadow-lg overflow-hidden">
                <img src="/v3.jpeg" alt="Event 2" className="w-full h-48 object-cover"/>
                <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#004D40]">Food Drive</h3>
                <p className="text-[#708090] mt-2">Help us collect and distribute food to those in need.</p>
                <div className="text-[#6A5ACD] font-semibold mt-4">Oct 1, 2024</div>
                <div className="mt-6">
                    <button className="bg-[#6A5ACD] text-white py-2 px-4 rounded-full hover:bg-[#564A9F]">Register</button>
                </div>
                </div>
            </div>

            {/* Event Card 3 */}
            <div className="bg-[#FFFFF0] rounded-lg shadow-lg overflow-hidden">
                <img src="/v4.jpg" alt="Event 3" className="w-full h-48 object-cover"/>
                <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#004D40]">Charity Run</h3>
                <p className="text-[#708090] mt-2">Participate in our annual run to raise funds for charity.</p>
                <div className="text-[#6A5ACD] font-semibold mt-4">Nov 12, 2024</div>
                <div className="mt-6">
                    <button className="bg-[#6A5ACD] text-white py-2 px-4 rounded-full hover:bg-[#564A9F]">Register</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>

  
      {/* Testimonials Section */}
        
      <section id="testimonials" className="">
      <div className="container mx-auto text-center p-10 md:p-20  ">

        <h2 className="text-3xl font-semibold text-[#004D40] mb-8">What Our Volunteers Say</h2>
        
        <div className="relative overflow-hidden min-w-[400px] ">
          <div
            className="flex  transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="min-w-full p-8">
                <div className="bg-[#FFFFF0] p-6 rounded-lg shadow-lg h-full flex flex-col justify-between items-center text-left">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-24 h-24 rounded-full mb-4 border-4 border-[#FF6F61]" 
                  />
                  <p className="text-sm md:text-lg text-[#FF6F61] text-center">"{testimonial.text}"</p>
                  <p className="text-[#708090] mt-4 text-center">- {testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#FF6F61] text-white p-2 rounded-full"
            onClick={handlePrev}
          >
            ‹
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#FF6F61] text-white p-2 rounded-full"
            onClick={handleNext}
          >
            ›
          </button>
        </div>
      </div>
    </section>


    {/* Call to Action Section */}
    <section className="py-20 bg-[#004D40] text-center">
    <h2 className="text-3xl font-bold text-[#F9F7F7]">Ready to Make a Difference?</h2>
    <p className="text-[#F9F7F7] mt-4">Subscribe to our newsletter and stay updated with the latest opportunities.</p>
    
    <form className="mt-8 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
        <input 
        type="email" 
        placeholder="Enter your email" 
        className="px-4 py-3 w-full max-w-xs md:max-w-sm bg-[#F9F7F7] text-[#004D40] rounded-lg outline-none"
        />
        <button 
        type="submit" 
        className="bg-[#FF6F61] text-[#F9F7F7] px-6 py-3 rounded-full hover:bg-[#C7A500]"
        >
        Get Started
        </button>
    </form>
    </section>


      {/* Footer Section */}
      <footer className="py-10 bg-[#333333] text-center">
        <p className="text-[#F9F7F7]">© 2024 Volunta. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#"><FontAwesomeIcon  className="text-[#FF6F61] w-[25px] h-[25px]" icon={faFacebookF} /></a>
          <a href="#"><FontAwesomeIcon  className="text-[#FF6F61]   w-[25px] h-[25px]" icon={faTwitter} /></a>
          <a href="#"><FontAwesomeIcon  className="text-[#FF6F61]  w-[25px] h-[25px]" icon={faInstagram} /></a>
          
        </div>
      </footer>
        </>
    )
}


