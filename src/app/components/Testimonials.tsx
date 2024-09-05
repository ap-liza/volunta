"use client"
import React, { useState, useEffect } from 'react';

const testimonials = [
  { text: "Volunta has changed the way I give back to my community!", author: "Jane Doe" },
  { text: "A fantastic platform to find volunteering opportunities.", author: "John Smith" },
  { text: "I’ve met so many great people through Volunta!", author: "Emily Johnson" },
  { text: "Volunteering made easy and impactful.", author: "Michael Brown" },
  { text: "The best way to connect with organizations.", author: "Sarah Wilson" },
  { text: "An amazing experience every time!", author: "David Lee" },
];

export default function Testimonials() {
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

  return (
    <section id="testimonials" className="py-20 bg-[#eaeedd]">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-[#004D40] mb-8">What Our Volunteers Say</h2>
        
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="min-w-full p-8">
                <div className="bg-[#F9F7F7] p-6 rounded-lg shadow-lg h-full flex flex-col justify-between">
                  <p className="text-xl text-[#FF6F61]">"{testimonial.text}"</p>
                  <p className="text-[#708090] mt-4">- {testimonial.author}</p>
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
  );
}
