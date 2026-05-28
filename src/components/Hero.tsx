/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, Calendar, Coffee, ShieldCheck, Flower, Landmark } from 'lucide-react';

interface HeroProps {
  onScrollToBooking: () => void;
  onViewMyBookings: () => void;
  bookingCount: number;
}

export default function Hero({ onScrollToBooking, onViewMyBookings, bookingCount }: HeroProps) {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-[#FAF7F2] py-20 lg:py-28 border-b border-[#EBE3D5]">
      {/* Decorative floral/pottery elements background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#F5D8D3] rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E8DCC4] rounded-full filter blur-3xl opacity-30 translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Side - Typography and CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6" id="hero-left-content">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#F2ECE4] border border-[#DECEB9] px-3.5 py-1.5 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-[#8C624E]" />
              <span className="text-xs font-medium text-[#5C4A3C] tracking-wide uppercase">Không Gian Bản Thể Chữa Lành</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#2D2522] tracking-tight leading-[1.12]">
                Atelier <br className="hidden sm:inline" />
                <span className="text-[#8C624E] font-normal italic">Terre & Fleur</span>
              </h1>
              <p className="text-lg text-[#5F544E] max-w-lg leading-relaxed font-sans">
                Đến để nghe đất sét sầm sập xoay đều dưới ngón tay và ngửi hương thơm ngát từ những đóa hồng trắng, hồng phấn thượng uyển. Nơi bản hoà ca giữa gốm mộc nâu trắng trầm tĩnh cùng hoa cỏ dịu ngọt thăng hoa.
              </p>
            </motion.div>

            {/* Quick stats / Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4 border-t border-b border-[#EBE3D5] py-5 my-2"
              id="hero-features-grid"
            >
              <div className="flex items-start gap-2.5">
                <Landmark className="w-5 h-5 text-[#8C624E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#2D2522]">Đất Sét Mộc Nâu Trắng</h4>
                  <p className="text-xs text-[#7A6C65]">Sử dụng đất cao lanh dẻo nung men ngọc tinh xảo.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Flower className="w-5 h-5 text-[#D49085] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#2D2522]">Hoa Hồng Nhung Trắng Pink</h4>
                  <p className="text-xs text-[#7A6C65]">Hương thơm khuêu quyến từ các loài Ohara, Mao lương.</p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
              id="hero-actions-container"
            >
              <button
                id="btn-book-now"
                onClick={onScrollToBooking}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#8C624E] text-white font-medium text-sm transition-all hover:bg-[#6E4B3B] hover:shadow-lg hover:shadow-[#8d624e2c] cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Đặt Lịch Workshop Ngay
              </button>

              <button
                id="btn-view-bookings-drawer"
                onClick={onViewMyBookings}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-[#DDD5C7] text-[#5C4A3C] font-medium text-sm transition-all hover:bg-[#FAF7F2] hover:border-[#8C624E] cursor-pointer relative"
              >
                <span>Lịch Hẹn Của Tôi</span>
                {bookingCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D49085] text-white text-[10px] font-bold">
                    {bookingCount}
                  </span>
                )}
              </button>
            </motion.div>

            {/* Micro value badges */}
            <div className="flex items-center gap-4 text-xs text-[#7F7167] pt-2" id="hero-badges">
              <span className="flex items-center gap-1">
                <Coffee className="w-3.5 h-3.5 text-[#8C624E]" /> Trà bánh miễn phí
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#DDD5C7]"></span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C624E]" /> Giới hạn khách tối đa (8-10 người)
              </span>
            </div>
          </div>

          {/* Hero Right Side - Beautiful Collage with generated image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 flex relative justify-center"
            id="hero-visual-collage"
          >
            {/* Main Luxury Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#8D624E]/10 border-4 border-white aspect-[16/10] w-full" id="hero-image-frame">
              <img
                src="/public/anh-bia.jpg"
                alt="Atelier Terre & Fleur Hero Poster"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent p-6 flex items-end">
                <div className="text-white">
                  <p className="text-xs uppercase tracking-widest text-[#F2ECE4] mb-1 font-mono">Artisanal Healing Experience</p>
                  <h3 className="text-lg font-serif">Sự Hòa Quyện Giữa Đất & Hoa</h3>
                </div>
              </div>
            </div>

            {/* Small floating detail accent */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-[#EDEAE4] hidden sm:flex items-center gap-3 max-w-xs transition-transform hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-[#FAF0EE] flex items-center justify-center shrink-0">
                <span className="text-xl">🌸</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#2D2522]">Hồng Ohara nhập Pháp</p>
                <p className="text-[10px] text-[#807067]">Thơm ngát ngọt ngào suốt buổi cắm</p>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-[#EDEAE4] hidden sm:flex items-center gap-3 max-w-xs transition-transform hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-[#F5ECE8] flex items-center justify-center shrink-0">
                <span className="text-xl">🏺</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#2D2522]">Gốm Mộc Nung Lửa Lớn</p>
                <p className="text-[10px] text-[#807067]">Nhiệt độ 1250°C bền vĩnh cửu</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
