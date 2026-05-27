/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flower, Compass, Heart, Award, Sparkles, Phone, MapPin, Instagram, Menu, X, Landmark, ClipboardList, Clock } from 'lucide-react';

import { Booking, PotteryCustomSelection, FlowerCustomSelection, WorkshopType } from './types';
import { REVIEWS } from './data';
import Hero from './components/Hero';
import WorkshopCards from './components/WorkshopCards';
import InteractiveVisualizer from './components/InteractiveVisualizer';
import BookingForm from './components/BookingForm';
import BookingTicket from './components/BookingTicket';
import MyBookings from './components/MyBookings';

export default function App() {
  // Page states
  const [currentPage, setCurrentPage] = useState<'booking' | 'my_bookings'>('booking');
  const [activeWorkshopType, setActiveWorkshopType] = useState<WorkshopType>('pottery');
  
  // Custom Selection states (playground)
  const [potterySelection, setPotterySelection] = useState<PotteryCustomSelection>({
    clayType: 'Đất Sét Cát Trắng Mịn',
    glazeType: 'Nước Men Tuyết Trắng Mờ',
    shapeType: 'Bình Hoa Thon Cao Cổ Điển',
  });

  const [flowerSelection, setFlowerSelection] = useState<FlowerCustomSelection>({
    colorPalette: 'Hồng Phấn Sương Mai (Blush Dawn)',
    styleType: 'Phom Bay Bổng Kiểu Pháp',
    vaseType: 'Bình Sứ Men Ngọc Bạch Tuyết',
  });

  // Booking history index logic (localStorage persistent)
  const [bookings, setBookings] = useState<Booking[]>([]);
  // Last submitted booking model (to render tickets)
  const [activeNewBooking, setActiveNewBooking] = useState<Booking | null>(null);

  // Mobile menu open
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load from Storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('atelier_bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse localStorage bookings', e);
    }
  }, []);

  // Sync to Storage
  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    try {
      localStorage.setItem('atelier_bookings', JSON.stringify(newBookings));
    } catch (e) {
      console.error('Failed to sync to localStorage', e);
    }
  };

  // Select Workshop from List trigger
  const handleSelectWorkshop = (type: WorkshopType) => {
    setActiveWorkshopType(type);
    
    // Smooth scroll to customizer tool section
    setTimeout(() => {
      const customizerSec = document.getElementById('customizer-section');
      if (customizerSec) {
        customizerSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Update selection actions
  const handleUpdatePottery = (val: Partial<PotteryCustomSelection>) => {
    setPotterySelection((prev) => ({ ...prev, ...val }));
  };

  const handleUpdateFlower = (val: Partial<FlowerCustomSelection>) => {
    setFlowerSelection((prev) => ({ ...prev, ...val }));
  };

  // Submit main booking
  const handleCreateBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newId = Math.floor(100000 + Math.random() * 900000).toString(); // Elegant 6-digit order ID
    const newBooking: Booking = {
      ...bookingData,
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'confirmed', // immediately confirm for beautiful flow
    };

    const updated = [newBooking, ...bookings];
    saveBookings(updated);
    setActiveNewBooking(newBooking);
    
    // Scroll to successful top view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel reservation Action
  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.map((b) => {
      if (b.id === bookingId) {
        return { ...b, status: 'cancelled' as const };
      }
      return b;
    });
    saveBookings(updated);
  };

  // Navigate utility helpers
  const handleResetTicket = () => {
    setActiveNewBooking(null);
    setCurrentPage('booking');
  };

  const handleGoMyBookings = () => {
    setCurrentPage('my_bookings');
    setActiveNewBooking(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setCurrentPage('booking');
    setActiveNewBooking(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] font-sans antialiased text-[#2D2522]">
      
      {/* LUXURY DESKTOP HEADER BAR & LOGO */}
      <header id="main-studio-header" className="sticky top-0 z-50 bg-[#FCFAF7]/90 backdrop-blur-md border-b border-[#EBE3D5] px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <div 
            id="brand-logo-container" 
            onClick={handleGoHome}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 select-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#8C624E]/10 flex items-center justify-center text-lg font-serif text-[#8C624E] border border-[#8C624E]/20">
              🏺
            </div>
            <div>
              <span className="text-lg font-serif font-black tracking-widest text-[#2D2522] block leading-none">L'ATELIER</span>
              <span className="text-[9px] font-mono tracking-widest uppercase text-[#8C624E] block mt-1 hover:text-[#D49085] transition-colors">Terre & Fleur</span>
            </div>
          </div>

          {/* Desktop Navigation Link */}
          {currentPage === 'booking' && !activeNewBooking && (
            <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-[#5C4A3C]" id="desktop-links">
              <a 
                href="#hero-section" 
                className="hover:text-[#8C624E] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Giới Thiệu
              </a>
              <a 
                href="#workshops-list-section" 
                className="hover:text-[#8C624E] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('workshops-list-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Khóa Workshop
              </a>
              <a 
                href="#customizer-section" 
                className="hover:text-[#8C624E] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('customizer-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Phác Thảo Thử
              </a>
              <a 
                href="#booking-form-section" 
                className="hover:text-[#8C624E] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('booking-form-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Đặt Ca Học
              </a>
              <a 
                href="#testimonials-reviews-block" 
                className="hover:text-[#8C624E] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('testimonials-reviews-block')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Cảm Nhận
              </a>
            </nav>
          )}

          {/* Right Controls: Cart Bookings Drawer indicator */}
          <div className="flex items-center gap-4" id="header-right-controls">
            <button
              id="header-btn-my-bookings"
              onClick={handleGoMyBookings}
              className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                currentPage === 'my_bookings'
                  ? 'bg-neutral-900 border-neutral-900 text-white'
                  : 'bg-white border border-[#DDD5C7] hover:border-[#8C624E] text-[#5C4A3C]'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Lịch Hẹn Của Tôi</span>
              {bookings.filter(b => b.status !== 'cancelled').length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D49085] text-white text-[10px] font-bold">
                  {bookings.filter(b => b.status !== 'cancelled').length}
                </span>
              )}
            </button>

            {/* Mobile toggles */}
            <button
              id="header-btn-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-[#DDD5C7] text-[#5C4A3C] hover:bg-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE COLLAPSED MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FCFAF7] border-b border-[#EBE3D5] overflow-hidden"
            id="mobile-nav-panel"
          >
            <div className="px-5 py-6 space-y-4 text-xs font-semibold uppercase tracking-wider text-[#5C4A3C] flex flex-col">
              <button
                id="mob-lvl-intro"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGoHome();
                  setTimeout(() => document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' }), 200);
                }}
                className="text-left py-2 hover:text-[#8C624E]"
              >
                Giới Thiệu
              </button>
              <button
                id="mob-lvl-workshops"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGoHome();
                  setTimeout(() => document.getElementById('workshops-list-section')?.scrollIntoView({ behavior: 'smooth' }), 200);
                }}
                className="text-left py-2 hover:text-[#8C624E]"
              >
                Khóa Workshop
              </button>
              <button
                id="mob-lvl-customize"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGoHome();
                  setTimeout(() => document.getElementById('customizer-section')?.scrollIntoView({ behavior: 'smooth' }), 200);
                }}
                className="text-left py-2 hover:text-[#8C624E]"
              >
                Phác Thảo Thử
              </button>
              <button
                id="mob-lvl-book"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGoHome();
                  setTimeout(() => document.getElementById('booking-form-section')?.scrollIntoView({ behavior: 'smooth' }), 200);
                }}
                className="text-left py-2 hover:text-[#8C624E]"
              >
                Đặt Ca Học
              </button>
              
              <div className="border-t border-[#EBE3D5] pt-4 mt-2">
                <button
                  id="mob-lvl-my-bookings"
                  onClick={handleGoMyBookings}
                  className="w-full py-3 px-4 rounded-xl bg-[#8C624E] text-white flex items-center justify-between text-xs"
                >
                  <span className="flex items-center gap-1.5"><ClipboardList className="w-4 h-4" /> Lịch Hẹn Của Tôi</span>
                  {bookings.filter(b => b.status !== 'cancelled').length > 0 && (
                    <span className="bg-white text-[#8C624E] font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px]">
                      {bookings.filter(b => b.status !== 'cancelled').length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRIMARY VIEWS BODY CONTAINER */}
      <main id="primary-applet-views">
        {activeNewBooking ? (
          /* Render Ticket Receipt on beautiful completion */
          <BookingTicket booking={activeNewBooking} onReset={handleResetTicket} />
        ) : currentPage === 'my_bookings' ? (
          /* Render Bookings Cabinet Dashboard */
          <MyBookings 
            bookings={bookings} 
            onCancelBooking={handleCancelBooking} 
            onBackToBooking={handleResetTicket} 
          />
        ) : (
          /* Main Elegant Scheduling Experience */
          <div id="booking-experience-workspace" className="space-y-0">
            
            {/* 1. HERO HOME */}
            <Hero 
              onScrollToBooking={() => document.getElementById('workshops-list-section')?.scrollIntoView({ behavior: 'smooth' })} 
              onViewMyBookings={handleGoMyBookings}
              bookingCount={bookings.filter(b => b.status !== 'cancelled').length}
            />

            {/* 2. WORKSHOPS LIST */}
            <WorkshopCards 
              onSelectWorkshop={handleSelectWorkshop} 
              selectedWorkshopId={activeWorkshopType} 
            />

            {/* 3. DYNAMIC CUSTOMIZER TABS (Clay brown or flower pink switcher menu) */}
            <div className="bg-[#FAF7F2] pt-12 border-t border-[#EBE3D5]" id="customizer-tabs-container">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-[10px] font-mono tracking-widest text-[#8C624E] uppercase mb-4">MÁY TRÁNG PHÁC THẢO TIỂU CHUẨN</p>
                
                {/* Visual tabs switcher */}
                <div className="inline-flex p-1.5 bg-white border border-[#EDEAE4] rounded-2xl shadow-xs" id="customizer-type-tabs">
                  <button
                    id="tab-pottery-playground"
                    onClick={() => setActiveWorkshopType('pottery')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
                      activeWorkshopType === 'pottery'
                        ? 'bg-[#8C624E] text-white shadow-xs'
                        : 'text-gray-400 hover:text-[#8C624E]'
                    }`}
                  >
                    🍯 Thử Nghiệm Gốm Nâu Trắng
                  </button>
                  <button
                    id="tab-flower-playground"
                    onClick={() => setActiveWorkshopType('flower')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
                      activeWorkshopType === 'flower'
                        ? 'bg-[#D49085] text-white shadow-xs'
                        : 'text-gray-400 hover:text-[#D49085]'
                    }`}
                  >
                    🌸 Thử Nghiệm Hoa Hồng Trắng
                  </button>
                </div>
              </div>
            </div>

            <InteractiveVisualizer 
              workshopType={activeWorkshopType}
              potterySelection={potterySelection}
              flowerSelection={flowerSelection}
              onUpdatePottery={handleUpdatePottery}
              onUpdateFlower={handleUpdateFlower}
            />

            {/* 4. SCHEDULING FORM */}
            <BookingForm 
              workshopType={activeWorkshopType}
              potterySelection={potterySelection}
              flowerSelection={flowerSelection}
              onSubmitBooking={handleCreateBooking}
            />

            {/* 5. ORGANIC SOCIAL PROOF REVIEWS */}
            <section id="testimonials-reviews-block" className="py-20 bg-[#FCFAF7] border-t border-[#EBE3D5]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-mono">Feedback / Thấu Cảm</span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#2D2522]">
                    Học Viên <span className="text-[#8C624E] italic font-normal">Nói Về Trải Nghiệm</span>
                  </h3>
                  <div className="h-[2px] w-12 bg-[#Eebe3d5] mx-auto my-1.5"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="reviews-cards-holder">
                  {REVIEWS.map((review, rIdx) => (
                    <div 
                      key={rIdx} 
                      className={`bg-white p-6 rounded-2xl border border-[#EDEAE4] flex flex-col justify-between shadow-xs transition hover:scale-[1.01]`}
                    >
                      <div className="space-y-3">
                        {/* Rating stars star representation */}
                        <div className="flex text-[#D4A373] text-sm">
                          {'★'.repeat(review.rating)}
                        </div>
                        <p className="text-xs text-[#5F544E] leading-relaxed italic">
                          "{review.text}"
                        </p>
                      </div>

                      {/* Author row */}
                      <div className="flex items-center gap-3 border-t border-neutral-100 pt-4 mt-6">
                        <div className="w-8 h-8 rounded-full bg-[#EBE3D5]/40 text-[#8C624E] font-bold text-xs flex items-center justify-center">
                          {review.avatar}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#2D2522]">{review.name}</h4>
                          <p className="text-[10px] text-gray-400">{review.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

          </div>
        )}
      </main>

      {/* LUXURY LUX LAYOUT FOOTER */}
      <footer id="main-studio-footer" className="bg-[#2D2522] text-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-neutral-800 pb-12" id="footer-top-columns">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🍯</span>
                <div>
                  <h3 className="text-base font-serif font-black tracking-widest">L'ATELIER</h3>
                  <p className="text-[10px] font-mono tracking-widest text-[#D49085]">TERRE & FLEUR STUDIO</p>
                </div>
              </div>
              <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                Biệt thự cổ kính lưu giữ nhịp đập của gốm mộc nấu thô nâu trắng yên tĩnh phối ngẫu thăng hoa bên những dải lụa hoa bách đóa hồng mây tuyệt vời. Địa chỉ chữa lành thủ công tinh tuyển hàng đầu.
              </p>
              <div className="text-xs text-neutral-300 space-y-1">
                <p>🕰️ Giờ đón tiếp quý khách: 08:30 - 21:00 (Mở cửa tất cả các ngày trong tuần, kể cả ngày lễ)</p>
                <p>📞 Tổng đài đặt chỗ Zalo: 0987.123.xxx (Vui lòng liên hệ hỗ trợ riêng tư khách đoàn)</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-3 text-xs">
              <h4 className="font-serif font-bold tracking-wider text-[#D49085]">Buổi Học Nghệ Thuật</h4>
              <ul className="space-y-2 text-neutral-400">
                <li className="hover:text-white transition cursor-pointer" onClick={handleGoHome}>🍯 Lớp Làm Gốm Terre de l'Atelier</li>
                <li className="hover:text-white transition cursor-pointer" onClick={handleGoHome}>🌸 Lớp Cắm Hoa Mỹ Thuật Fleur</li>
                <li className="hover:text-white transition cursor-pointer" onClick={handleGoHome}>💫 Trải nghiệm trọn quà tặng Double-Art</li>
                <li className="hover:text-white transition cursor-pointer" onClick={handleGoHome}>🎨 Private Workshop (Hội nhóm & Doanh nghiệp)</li>
              </ul>
            </div>

            {/* Studio Address detail maps */}
            <div className="md:col-span-4 space-y-3 text-xs">
              <h4 className="font-serif font-bold tracking-wider text-[#D49085]">Vị Trí & Không Gian</h4>
              <div className="space-y-2 text-neutral-400">
                <p className="flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-orange-200 shrink-0 mt-0.5" />
                  <span>Cơ sở Hà Nội: Tầng 2, Biệt thự kiến trúc Pháp cổ, Số 18 Ngách Cát Linh, Ba Đình, Hà Nội.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <Phone className="w-4 h-4 text-orange-200 shrink-0 mt-0.5" />
                  <span>Điện thoại tư vấn nóng: +84 987 123 4xx</span>
                </p>
                <div className="flex gap-2.5 pt-2">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 transition">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 transition font-bold text-xs">
                    f
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-neutral-500 gap-4" id="footer-bottom-copyright">
            <p>© 2026 L'Atelier de Terre & Fleur. All rights with hand-made love in Hanoi.</p>
            <div className="flex gap-4">
              <span className="cursor-pointer hover:underline">Chính Sách Bảo Mật</span>
              <span>•</span>
              <span className="cursor-pointer hover:underline">Điều Khoản Phục Vụ</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
