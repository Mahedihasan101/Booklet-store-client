import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

const Reviews = () => {
  const reviews = [
    { name: "Alice", text: "Fast delivery and amazing collection! Highly recommend." },
    { name: "Bob", text: "The curated selection helped me discover new favorite books." },
    { name: "Clara", text: "Excellent customer support and smooth experience." },
    { name: "David", text: "Books arrived on time and in perfect condition!" },
    { name: "Eva", text: "Love the variety of books. Easy ordering process." },
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
        <p className="text-gray-600 text-lg">
          Real feedback from readers who love Book Courier.
        </p>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.2}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 100,
          modifier: 1,
          scale: 0.85,
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between">
              <p className="text-gray-700 mb-4 text-center">"{review.text}"</p>
              <p className="font-semibold text-center mt-4">- {review.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
