import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import PlatformCapabilities from './PlatformCapabilities';

const PlatformCapabilitiesCarousel = () => {
  return (
    <section id="platform" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Platform <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Capabilities</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our AI conversational agent platform delivers enterprise-grade features that transform how organizations interact with their users and data.
          </p>
        </div>

        <Swiper
          spaceBetween={40}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 10000 }}
          modules={[Autoplay, Pagination]}
          className="!overflow-visible"
        >
          <SwiperSlide>
            <PlatformCapabilities />
          </SwiperSlide>

          <SwiperSlide>
            <PlatformCapabilities />
          </SwiperSlide>

        </Swiper>
      </div>
    </section>
  );
};

export default PlatformCapabilitiesCarousel;
