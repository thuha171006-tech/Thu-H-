/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Calendar, Clock, Users, ArrowRight, Download, CheckCircle2, BookmarkCheck, Heart } from 'lucide-react';
import { Booking } from '../types';

interface BookingTicketProps {
  booking: Booking;
  onReset: () => void;
}

export default function BookingTicket({ booking, onReset }: BookingTicketProps) {
  const isPottery = booking.workshopType === 'pottery';
  const accentColor = isPottery ? '#8C624E' : '#D49085';
  const textAccent = isPottery ? 'text-[#8C624E]' : 'text-[#D49085]';
  const bgAccent = isPottery ? 'bg-[#8C624E] hover:bg-[#6E4B3B]' : 'bg-[#D49085] hover:bg-[#C27D72]';

  // Format date readable in Vietnamese
  const formatVNValDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `Ngày ${parts[2]} Tháng ${parts[1]} Năm ${parts[0]}`;
  };

  return (
    <section id="booking-success-ticket-section" className="py-16 bg-[#FAF7F2]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Animated Check Header */}
        <div className="text-center mb-10 space-y-3" id="success-header">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="w-16 h-16 bg-green-50 rounded-full border border-green-200 flex items-center justify-center mx-auto text-green-600 mb-4"
          >
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </motion.div>
          <span className="text-xs font-bold tracking-widest text-[#2D2522] uppercase font-mono">Đặt Chỗ Thành Công</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#2D2522]">
            Chào Mừng Bạn Đến Với <span className="text-[#8C624E] italic font-normal">Atelier</span>
          </h2>
          <p className="text-xs text-[#7A6C65] max-w-sm mx-auto">
            Một thư xác nhận cùng mã vé điện tử đã được thiết lập. Hãy lưu giữ tấm vé nghệ thuật này để trải nghiệm dịch vụ.
          </p>
        </div>

        {/* LUXURY TICKET FRAME DRAWING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-white rounded-3xl border border-[#EDEAE4] overflow-hidden shadow-xl shadow-gray-200/50"
          id="visual-booking-ticket"
        >
          
          {/* Top Banner accent stripe */}
          <div 
            className="h-3.5 w-full" 
            style={{ backgroundColor: accentColor }}
          />

          {/* Ticket Header */}
          <div className="p-6 sm:p-8 flex justify-between items-start border-b border-dashed border-[#EDEAE4] relative">
            
            {/* Left side ticket branding */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">OFFICIAL RESEVERTION</span>
              <h3 className="text-lg font-serif font-bold text-[#2D2522]">L’Atelier de Terre & Fleur</h3>
              <p className="text-[10px] text-gray-400">Tĩnh tại bản tâm • Nuôi dưỡng tâm hồn</p>
            </div>

            {/* Right side status */}
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-green-50 border border-green-200 text-green-700">
                <BookmarkCheck className="w-3 h-3" /> ĐÃ XÁC NHẬN
              </span>
              <p className="text-[10px] text-gray-400 font-mono mt-2">Mã Vé: #{booking.id}</p>
            </div>

            {/* Tear-off Ticket Half Circle holes left and right */}
            <div className="absolute bottom-[-10px] left-[-10px] w-5 h-5 bg-[#FAF7F2] rounded-full border-r border-[#EDEAE4]"></div>
            <div className="absolute bottom-[-10px] right-[-10px] w-5 h-5 bg-[#FAF7F2] rounded-full border-l border-[#EDEAE4]"></div>
          </div>

          {/* Ticket Middle - Main Details and Custom items selected */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Big Class name display */}
            <div>
              <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">CLASS / WORKSHOP</p>
              <h4 className="text-xl font-serif text-[#2D2522] font-semibold mt-0.5">{booking.workshopTitle}</h4>
            </div>

            {/* 3 Columns details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-neutral-100 py-4 text-xs">
              <div className="space-y-1">
                <span className="text-gray-400 flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gray-300" /> Ngày học</span>
                <p className="font-bold text-[#2D2522]">{formatVNValDate(booking.date)}</p>
              </div>
              <div className="space-y-1">
                <span className="text-gray-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gray-300" /> Giờ học</span>
                <p className="font-bold text-[#2D2522] font-mono">{booking.timeSlot}</p>
              </div>
              <div className="space-y-1">
                <span className="text-gray-400 flex items-center gap-1"><Users className="w-3.5 h-3.5 text-gray-300" /> Khách dự</span>
                <p className="font-bold text-[#2D2522] font-mono">{booking.guests} thành viên</p>
              </div>
            </div>

            {/* Customizer Selection review */}
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EDEAE4]">
              <h5 className="text-[10px] font-bold text-[#2D2522] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                🎨 Ý tưởng sáng tạo của bạn đã chọn:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {isPottery && booking.customDetails.pottery ? (
                  <>
                    <div className="bg-white p-2.5 rounded-xl border border-neutral-100 flex flex-col justify-between">
                      <span className="text-[9px] text-gray-400 uppercase">Đất Sét Mộc</span>
                      <p className="font-semibold text-[#8C624E] mt-0.5">{booking.customDetails.pottery.clayType.split(' ')[0]}</p>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-neutral-100 flex flex-col justify-between">
                      <span className="text-[9px] text-gray-400 uppercase">Hệ Nước Men</span>
                      <p className="font-semibold text-[#8C624E] mt-0.5">{booking.customDetails.pottery.glazeType.split(' ')[0]}</p>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-neutral-100 flex flex-col justify-between">
                      <span className="text-[9px] text-gray-400 uppercase">Dáng Tạo Hình</span>
                      <p className="font-semibold text-[#8C624E] mt-0.5">{booking.customDetails.pottery.shapeType.split(' ')[0]}</p>
                    </div>
                  </>
                ) : booking.customDetails.flower && (
                  <>
                    <div className="bg-white p-2.5 rounded-xl border border-neutral-100 flex flex-col justify-between">
                      <span className="text-[9px] text-gray-400 uppercase">Dải Màu Hoa</span>
                      <p className="font-semibold text-[#D49085] mt-0.5">{booking.customDetails.flower.colorPalette.split(' ')[0]}</p>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-neutral-100 flex flex-col justify-between">
                      <span className="text-[9px] text-gray-400 uppercase">Phom Bố Cục</span>
                      <p className="font-semibold text-[#D49085] mt-0.5">{booking.customDetails.flower.styleType.split(' ')[0]}</p>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-neutral-100 flex flex-col justify-between">
                      <span className="text-[9px] text-gray-400 uppercase">Bình Gốm Đi Kèm</span>
                      <p className="font-semibold text-[#D49085] mt-0.5">{booking.customDetails.flower.vaseType.split(' ').slice(-2).join(' ')}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bottom contact detail row & Simulated QR Code */}
            <div className="flex flex-col sm:flex-row gap-6 items-center pt-2 justify-between">
              
              {/* Contact list info */}
              <div className="space-y-2 text-xs w-full sm:w-auto" id="ticket-guest-contact">
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase">GUEST / HỌC VIÊN</span>
                  <span className="font-bold text-[#2D2522] text-sm">{booking.customerName}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div>
                    <span className="text-gray-400 text-[8px] uppercase block">SĐT liên lạc</span>
                    <span className="font-semibold font-mono text-[#2D2522]">{booking.customerPhone}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[8px] uppercase block">Tổng phí trọn gói</span>
                    <span className="font-bold font-mono text-[#2D2522]">{new Intl.NumberFormat('vi-VN').format(booking.totalPrice)}đ</span>
                  </div>
                </div>
              </div>

              {/* Simulated QR Code for ticketing scanner */}
              <div className="relative shrink-0 flex flex-col items-center bg-[#FCFAF7] p-3 rounded-2xl border border-[#EDEAE4] hover:scale-103 transition cursor-help w-32" id="ticket-qrcode-card">
                <div className="w-24 h-24 bg-white rounded-lg border border-[#EDEAE4] p-1.5 flex items-center justify-center relative overflow-hidden">
                  
                  {/* Outer design box */}
                  <div className="w-full h-full border border-dashed border-neutral-300 relative">
                    {/* Simulated block pattern of QR code */}
                    <div className="absolute top-1 left-1 w-5 h-5 bg-neutral-900 border border-white"></div>
                    <div className="absolute top-1 right-1 w-5 h-5 bg-neutral-900 border border-white"></div>
                    <div className="absolute bottom-1 left-1 w-5 h-5 bg-neutral-900 border border-white"></div>
                    
                    {/* Tiny random blocks inside */}
                    <div className="absolute top-7 left-3 w-2 h-4 bg-neutral-800"></div>
                    <div className="absolute top-2 left-7 w-4 h-2 bg-neutral-800"></div>
                    <div className="absolute top-8 right-3 w-3 h-3 bg-neutral-800"></div>
                    <div className="absolute bottom-3 right-3 w-4 h-4 bg-neutral-800"></div>
                    <div className="absolute bottom-2 right-8 w-2 h-3 bg-neutral-800"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-neutral-900"></div>
                  </div>
                </div>
                <span className="text-[8px] uppercase tracking-widest text-neutral-400 font-bold block text-center mt-1.5 font-mono">SCAN TO CHECKIN</span>
              </div>

            </div>

          </div>

          {/* Ticket Footer details */}
          <div className="bg-[#FAF8F5] p-5 border-t border-[#EDEAE4] text-xs text-[#7A6C65] space-y-2" id="ticket-instructions">
            <span className="font-bold text-[#2D2522] flex items-center gap-1">📍 Hướng dẫn chuẩn bị:</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed">
              <li>Địa chỉ Atelier: Tầng 2, Biệt thự cổ kiểu Pháp, Số 18 Ngách Cát Linh, Ba Đình, Hà Nội.</li>
              <li>Khi đi quý khách vui lòng ăn vận trang phục thoải mái. Atelier cung cấp đầy đủ tạp dề da cao cấp chống thấm bẩn cát đất và chống bám lá.</li>
              <li>Quý khách vui lòng có mặt trước từ 10 - 15 phút để thưởng thức trà nóng nhẹ buổi sương khai mạc nhé.</li>
            </ul>
          </div>

        </motion.div>

        {/* Action button row to continue or restart */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8" id="ticket-action-row">
          <button
            id="btn-book-another-class"
            onClick={onReset}
            className={`px-6 py-3.5 rounded-full text-white font-medium text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${bgAccent}`}
          >
            Đặt Lịch Thêm Workshop Khác
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            id="btn-download-ticket-mock"
            onClick={() => alert('Cảm ơn bạn! Vé điện tử đã được chụp màn hình và lưu thành công về điện thoại.')}
            className="px-6 py-3.5 rounded-full bg-white border border-[#DDD5C7] text-[#5C4A3C] font-medium text-sm transition-all hover:bg-[#FAF7F2] hover:border-[#8C624E] cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Download className="w-4 h-4" /> Tải Vé Về Máy
          </button>
        </div>

      </div>
    </section>
  );
}
