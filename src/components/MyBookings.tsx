/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Bookmark, ClipboardList, Trash2, Calendar, Clock, MapPin, Undo, Info, AlertTriangle, MessageCircle } from 'lucide-react';
import { Booking } from '../types';

interface MyBookingsProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onBackToBooking: () => void;
}

export default function MyBookings({ bookings, onCancelBooking, onBackToBooking }: MyBookingsProps) {
  const activeBookings = bookings.filter((b) => b.status !== 'cancelled');
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled');

  // Format Date translation
  const formatFriendlyDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `Ngày ${parts[2]} / ${parts[1]} / ${parts[0]}`;
  };

  return (
    <section id="my-bookings-page-section" className="py-16 bg-[#FAF7F2] min-h-[700px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#EBE3D5] pb-6 mb-10" id="my-bookings-headline">
          <div>
            <h2 className="text-2xl font-serif text-[#2D2522] flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-[#8C624E]" /> Sổ Lịch Hẹn Chữa Lành
            </h2>
            <p className="text-xs text-[#7A6C65] mt-1 font-sans">
              Quản lý danh sách đặt chỗ, chi tiết thiết kế gốm và hoa tại xưởng của bạn.
            </p>
          </div>

          <button
            id="btn-return-booking-main"
            onClick={onBackToBooking}
            className="text-xs font-semibold px-5 py-2.5 rounded-full border border-[#DDD5C7] hover:border-[#8C624E] bg-white text-[#5C4A3C] transition cursor-pointer"
          >
            Quay Lại Đặt Thêm Lịch
          </button>
        </div>

        {/* BOOKINGS LIST VIEW */}
        <div className="grid grid-cols-1 gap-8" id="my-bookings-view-grid">
          
          {/* Section: ACTIVE BOOKINGS */}
          <div className="space-y-4" id="active-bookings-section">
            <h3 className="text-xs font-bold text-[#2D2522] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              Ca Học Sắp Diễn Ra ({activeBookings.length})
            </h3>

            {activeBookings.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl border border-[#EDEAE4] text-center space-y-3" id="no-active-bookings-card">
                <span className="text-4xl block">🥥</span>
                <p className="text-sm font-semibold text-[#5C4A3C]">Bạn chưa đăng ký lớp học sắp tới nào.</p>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">Trạng thái gốm nâu trắng thanh lịch và hoa hồng kiêu sa đang chờ bạn khám phá.</p>
                <button
                  id="btn-book-first-from-cabinet"
                  onClick={onBackToBooking}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8C624E] font-bold hover:underline cursor-pointer pt-2"
                >
                  Khám phá các buổi Workshop ngay →
                </button>
              </div>
            ) : (
              <div className="space-y-4" id="active-bookings-list">
                {activeBookings.map((b) => {
                  const isPottery = b.workshopType === 'pottery';
                  const labelColor = isPottery ? 'border-[#8C624E]/20 bg-[#FAF3EE] text-[#8C624E]' : 'border-[#D49085]/20 bg-[#FFF5F4] text-[#D49085]';
                  const activeColor = isPottery ? '#8C624E' : '#D49085';

                  return (
                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EDEAE4] shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
                    >
                      {/* Left: Class main and times */}
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${labelColor}`}>
                            {isPottery ? '🍯 Workshop Gốm' : '🌸 Workshop Hoa'}
                          </span>
                          <span className="text-xs font-mono text-gray-400">Vé #{b.id}</span>
                        </div>
                        
                        <h4 className="text-base font-serif font-bold text-[#2D2522]">{b.workshopTitle}</h4>

                        {/* Timing row */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#5F544E]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" /> {formatFriendlyDate(b.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-gray-400" /> {b.timeSlot}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bookmark className="w-3.5 h-3.5 text-gray-400" /> {b.guests} học viên
                          </span>
                        </div>

                        {/* Quick selected preview labels */}
                        <div className="text-[11px] bg-[#FCFAF7] border border-[#F2ECE4] p-2 rounded-xl flex items-center flex-wrap gap-2 text-[#7A6C65]">
                          <span className="font-semibold text-[#2D2522]">Thiết kế của bạn:</span>
                          {isPottery && b.customDetails.pottery ? (
                            <span>
                              {b.customDetails.pottery.shapeType} • {b.customDetails.pottery.clayType.split(' ')[0]} • Men {b.customDetails.pottery.glazeType}
                            </span>
                          ) : b.customDetails.flower && (
                            <span>
                              Màu {b.customDetails.flower.colorPalette.split(' ')[0]} • Phom {b.customDetails.flower.styleType.split(' ').slice(-2).join(' ')} • {b.customDetails.flower.vaseType.split(' ').slice(-1)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Price level + Cancel button */}
                      <div className="flex sm:flex-col justify-between items-end gap-3 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-dashed border-neutral-100">
                        <div className="text-left sm:text-right">
                          <p className="text-[10px] text-gray-400 uppercase">TỔNG TRỌN GÓI</p>
                          <p className="text-sm font-bold font-mono text-[#2D2522]">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(b.totalPrice)}
                          </p>
                        </div>

                        {/* Urgent Cancel Button */}
                        <button
                          id={`btn-cancel-reservation-${b.id}`}
                          onClick={() => {
                            if (confirm('Quý khách có chắc chắn muốn hủy bỏ chỗ ưu tiên này? Chỗ ngồi sẽ nhường lại cho học viên khác.')) {
                              onCancelBooking(b.id);
                            }
                          }}
                          className="flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-800 transition py-1.5 px-3 rounded-lg hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Hủy Lịch Đặt
                        </button>
                      </div>

                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section: HISTORIC CANCELLED BOOKINGS */}
          {cancelledBookings.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-[#EBE3D5]" id="cancelled-bookings-section">
              <h3 className="text-xs font-bold text-[#7A6C65] uppercase tracking-wider">Lịch đã hủy bỏ ({cancelledBookings.length})</h3>
              <div className="space-y-3" id="cancelled-bookings-list">
                {cancelledBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 flex justify-between items-center text-xs opacity-65"
                  >
                    <div>
                      <span className="text-[10px] bg-neutral-200 text-neutral-600 py-0.5 px-2 rounded-full font-bold uppercase mr-2">ĐÃ HỦY ĐẶT</span>
                      <strong className="text-neutral-700">{b.workshopTitle}</strong>
                      <span className="text-neutral-400 mx-2">|</span>
                      <span className="text-neutral-500 font-mono">{formatFriendlyDate(b.date)} • {b.timeSlot}</span>
                    </div>
                    <span className="font-mono text-neutral-500">{new Intl.NumberFormat('vi-VN').format(b.totalPrice)}đ</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STUDIO POLICY INFO PANEL */}
          <div className="bg-white p-6 rounded-2xl border border-[#EDEAE4] space-y-4" id="bookings-policy-panel">
            <h4 className="text-xs font-bold text-[#2D2522] uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4 text-[#8C624E]" /> Chính Sách Thay Đổi & Dời Ca Học
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5F544E] leading-relaxed">
              <div className="space-y-1.5">
                <p className="font-semibold text-[#2D2522] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C624E]"></span> Thay đổi khung giờ / Dời ngày:
                </p>
                <p className="text-gray-500 pl-3">Vui lòng liên hệ hotline ban tư vấn trước 24h diễn ra buổi học để được hỗ trợ chuyển ngày hoàn toàn miễn phí, tránh trường hợp chuẩn bị dư thừa nguyên liệu tươi.</p>
              </div>

              <div className="space-y-1.5">
                <p className="font-semibold text-[#2D2522] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C624E]"></span> Chính sách đóng lớp & hoàn trả:
                </p>
                <p className="text-gray-500 pl-3">Trong trường hợp phát sinh đột xuất, Atelier hỗ trợ bảo lưu vé trong 3 tháng kế tiếp hoặc quy đổi sang phiếu quà tặng hoa sấy/gốm trang trí tương đương trị giá tại cửa hàng.</p>
              </div>
            </div>

            {/* Helpline bar */}
            <div className="border-t border-neutral-100 pt-4 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-2">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-400" /> 18 Ngách Cát Linh, Ba Đình, Hà Nội</span>
              <a 
                href="https://zalo.me" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-[#0068FF] bg-[#0068FF]/10 py-1.5 px-3 rounded-full hover:bg-[#0068FF]/15 transition"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Hỗ trợ Zalo: 0987.1234.xx
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
