/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Calendar as CalendarIcon, Clock, Users, User, Phone, Mail, FileText, CheckCircle2, Ticket } from 'lucide-react';
import { TIME_SLOTS, WORKSHOPS } from '../data';
import { PotteryCustomSelection, FlowerCustomSelection, Booking, WorkshopType } from '../types';

interface BookingFormProps {
  workshopType: WorkshopType;
  potterySelection: PotteryCustomSelection;
  flowerSelection: FlowerCustomSelection;
  onSubmitBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
}

export default function BookingForm({
  workshopType,
  potterySelection,
  flowerSelection,
  onSubmitBooking,
}: BookingFormProps) {
  const isPottery = workshopType === 'pottery';
  const activeWorkshop = WORKSHOPS.find((w) => w.type === workshopType) || WORKSHOPS[0];

  // Dynamic Theme Colors
  const accentColor = isPottery ? '#8C624E' : '#D49085';
  const textAccentClass = isPottery ? 'text-[#8C624E]' : 'text-[#D49085]';
  const bgAccentClass = isPottery ? 'bg-[#8C624E] hover:bg-[#6E4B3B]' : 'bg-[#D49085] hover:bg-[#C27D72]';
  const focusBorderClass = isPottery ? 'focus:border-[#8C624E] focus:ring-[#8C624E]/10' : 'focus:border-[#D49085] focus:ring-[#D49085]/10';

  // State
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [note, setNote] = useState<string>('');

  // Validation Warnings
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Generate next 14 days starting from today for our customized calendar
  const generateAvailableDays = () => {
    const days = [];
    const weekdays = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    
    // Starting from tomorrow for realism or today
    const baseDate = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const dateString = `${yyyy}-${mm}-${dd}`;
      
      days.push({
        dateStr: dateString,
        dayNum: d.getDate(),
        monthNum: d.getMonth() + 1,
        weekday: weekdays[d.getDay()],
        isWeekend: d.getDay() === 0 || d.getDay() === 6
      });
    }
    return days;
  };

  const availableDays = generateAvailableDays();

  // Price Calculation
  const basePrice = activeWorkshop.price;
  const rawPrice = basePrice * guestCount;
  // Small group discount: 3+ guests get 10% off
  const discountAmount = guestCount >= 3 ? rawPrice * 0.1 : 0;
  const totalPrice = rawPrice - discountAmount;

  // Validation handler
  const handleValidate = () => {
    const tempErrors: Record<string, string> = {};

    if (!selectedDate) tempErrors.date = 'Vui lòng chọn ngày tham gia từ biểu lịch';
    if (!selectedSlot) tempErrors.slot = 'Vui lòng lựa chọn khung giờ bạn mong muốn';
    
    if (!fullName.trim()) {
      tempErrors.fullName = 'Vui lòng điền họ & tên người đặt lịch';
    } else if (fullName.trim().length < 3) {
      tempErrors.fullName = 'Tên vui lòng dài trên 3 ký tự';
    }

    const vnPhoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (!phone) {
      tempErrors.phone = 'Vui lòng cung cấp số điện thoại liên lạc';
    } else if (!vnPhoneRegex.test(phone.replace(/\s/g, ''))) {
      tempErrors.phone = 'Số điện thoại không hợp lệ (Ví dụ: 0987654321)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      tempErrors.email = 'Vui lòng điền địa chỉ email của bạn';
    } else if (!emailRegex.test(email)) {
      tempErrors.email = 'Email không hợp lệ (Ví dụ: ten@domain.com)';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit trigger
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!handleValidate()) {
      // Find first error and scroll there safely
      const firstErrorKey = Object.keys(errors)[0];
      const errorEl = document.getElementById(`form-field-${firstErrorKey}`);
      if (errorEl) {
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const customSelection = isPottery
      ? { pottery: potterySelection }
      : { flower: flowerSelection };

    onSubmitBooking({
      workshopType,
      workshopTitle: activeWorkshop.title,
      date: selectedDate,
      timeSlot: selectedSlot,
      customerName: fullName,
      customerPhone: phone,
      customerEmail: email,
      guests: guestCount,
      note,
      totalPrice,
      customDetails: customSelection,
    });
  };

  return (
    <section id="booking-form-section" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Step Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3" id="booking-form-intro">
          <span className="text-xs font-bold tracking-widest uppercase text-gray-400 font-mono">Step 02 / Reservation</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#2D2522]">
            Đăng Ký <span className={`${textAccentClass} italic font-normal`}>Chỗ Ngồi Ưu Tiên</span>
          </h2>
          <div className="h-[2px] w-12 bg-[#EBE3D5] mx-auto my-2"></div>
          <p className="text-xs text-[#7A6C65]">
            Hệ thống tự động đồng bộ thực tế lựa chọn gốm và hoa phía trên để thiết lập riêng dụng cụ cho bạn tại bàn vẽ.
          </p>
        </div>

        {/* Core Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-8 bg-[#FCFAF7] border border-[#EDEAE4] p-6 sm:p-10 rounded-3xl shadow-sm" id="workshop-registration-form">
          
          {/* Active selection micro indicator widget */}
          <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-2xl border border-[#EDEAE4]">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{isPottery ? '🍯' : '🌸'}</span>
              <div>
                <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">Khóa Đóng Dấu Đặt Lịch</p>
                <h4 className="text-sm font-serif font-bold text-[#2D2522]">{activeWorkshop.title}</h4>
              </div>
            </div>
            
            {/* Custom option pill labels summary */}
            <div className="flex flex-wrap gap-2.5 sm:ml-auto">
              {isPottery ? (
                <>
                  <span className="text-[10px] bg-[#FAF3EE] border border-[#8C624E]/20 text-[#8C624E] font-medium px-2 py-0.5 rounded-full">
                    🏺 {potterySelection.shapeType}
                  </span>
                  <span className="text-[10px] bg-[#FAF3EE] border border-[#8C624E]/20 text-[#8C624E] font-medium px-2 py-0.5 rounded-full">
                    🪨 {potterySelection.clayType.split(' ').slice(-2).join(' ')}
                  </span>
                  <span className="text-[10px] bg-[#FAF3EE] border border-[#8C624E]/20 text-[#8C624E] font-medium px-2 py-0.5 rounded-full">
                    ✨ {potterySelection.glazeType.split(' ').slice(1, 3).join(' ')}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[10px] bg-[#FFF5F4] border border-[#D49085]/20 text-[#D49085] font-medium px-2 py-0.5 rounded-full">
                    🌸 {flowerSelection.colorPalette.split(' ')[0]}
                  </span>
                  <span className="text-[10px] bg-[#FFF5F4] border border-[#D49085]/20 text-[#D49085] font-medium px-2 py-0.5 rounded-full">
                    🌿 {flowerSelection.styleType.split(' ').slice(-2).join(' ')}
                  </span>
                  <span className="text-[10px] bg-[#FFF5F4] border border-[#D49085]/20 text-[#D49085] font-medium px-2 py-0.5 rounded-full">
                    🏺 {flowerSelection.vaseType.split(' ').slice(-2).join(' ')}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* BLOCK 1: SELECT DAY IN NEXT 14 DAYS */}
          <div className="space-y-4" id="form-field-date">
            <h3 className="text-xs font-bold text-[#2D2522] uppercase tracking-wider flex items-center gap-2">
              <CalendarIcon className={`w-4 h-4 ${textAccentClass}`} /> 1. Lựa Chọn Ngày Tham Gia
            </h3>
            
            {/* Elegant Horizontal Scroll of Days */}
            <div className="overflow-x-auto pb-2 flex gap-2.5 scrollbar-thin scrollbar-thumb-gray-200" id="days-carousel">
              {availableDays.map((day) => {
                const isSelected = selectedDate === day.dateStr;
                return (
                  <button
                    key={day.dateStr}
                    type="button"
                    id={`day-selector-${day.dateStr}`}
                    onClick={() => {
                      setSelectedDate(day.dateStr);
                      if (errors.date) {
                        setErrors(prev => {
                          const c = { ...prev };
                          delete c.date;
                          return c;
                        });
                      }
                    }}
                    className={`flex-none w-16 py-3.5 rounded-xl border flex flex-col items-center justify-between text-center transition-all cursor-pointer ${
                      isSelected
                        ? `bg-neutral-900 border-neutral-900 text-white shadow-md scale-103`
                        : day.isWeekend
                        ? 'bg-[#FDF9F8] border-[#F2DDD9] hover:bg-neutral-50'
                        : 'bg-white border-[#EDEAE4] hover:bg-neutral-50'
                    }`}
                  >
                    <span className={`text-[9px] font-medium uppercase tracking-wider ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                      {day.weekday}
                    </span>
                    <span className="text-lg font-bold font-mono py-0.5 block">{day.dayNum}</span>
                    <span className={`text-[8px] tracking-wide ${isSelected ? 'text-[#EBE3D5]' : 'text-[#8C624E]/70'}`}>
                      Th {day.monthNum}
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.date && <p className="text-xs text-red-500 font-medium">{errors.date}</p>}
          </div>

          {/* BLOCK 2: SELECT TIME SLOT */}
          <div className="space-y-4" id="form-field-slot">
            <h3 className="text-xs font-bold text-[#2D2522] uppercase tracking-wider flex items-center gap-2">
              <Clock className={`w-4 h-4 ${textAccentClass}`} /> 2. Khung Giờ Bạn Mong Muốn (Time Slot)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" id="slots-grid">
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedSlot === slot.time;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    id={`slot-selector-${slot.id}`}
                    onClick={() => {
                      setSelectedSlot(slot.time);
                      if (errors.slot) {
                        setErrors(prev => {
                          const c = { ...prev };
                          delete c.slot;
                          return c;
                        });
                      }
                    }}
                    className={`p-3.5 rounded-xl border-2 text-left transition cursor-pointer ${
                      isSelected
                        ? `border-neutral-950 bg-neutral-950 text-white shadow-xs`
                        : 'border-[#EDEAE4] bg-white hover:border-gray-300'
                    }`}
                  >
                    <p className={`text-[10px] font-bold uppercase tracking-wide mb-1 ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                      {slot.id === 'morning' ? '🌱 Ca Sáng' : slot.id === 'afternoon' ? '☀️ Ca Chiều' : '🌌 Ca Tối'}
                    </p>
                    <p className="text-xs font-bold font-mono">{slot.time}</p>
                    <p className={`text-[9px] mt-2 ${isSelected ? 'text-gray-400' : 'text-gray-400'}`}>
                      {slot.id === 'morning' ? 'Chỉ còn 3 chỗ' : slot.id === 'afternoon' ? 'Chỉ còn 2 chỗ' : 'Còn trống 6 chỗ'}
                    </p>
                  </button>
                );
              })}
            </div>
            {errors.slot && <p className="text-xs text-red-500 font-medium">{errors.slot}</p>}
          </div>

          {/* BLOCK 3: GUEST STEPS */}
          <div className="space-y-4" id="form-field-guests">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-[#2D2522] uppercase tracking-wider flex items-center gap-2">
                <Users className={`w-4 h-4 ${textAccentClass}`} /> 3. Số Lượng Khách Dự Giờ (Guests)
              </h3>
              <span className="text-[10px] text-gray-400">Giới hạn nhóm tối đa 6 người</span>
            </div>
            <div className="flex items-center gap-3 bg-white border border-[#EDEAE4] p-3 rounded-xl w-fit" id="guests-stepper">
              <button
                type="button"
                id="btn-guest-decrement"
                disabled={guestCount <= 1}
                onClick={() => setGuestCount(g => Math.max(1, g - 1))}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-gray-500 hover:bg-gray-50 disabled:opacity-30 cursor-pointer"
              >
                -
              </button>
              <span className="w-12 text-center font-bold font-mono text-sm">{guestCount} người</span>
              <button
                type="button"
                id="btn-guest-increment"
                disabled={guestCount >= 6}
                onClick={() => setGuestCount(g => Math.min(6, g + 1))}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-gray-500 hover:bg-gray-50 disabled:opacity-30 cursor-pointer"
              >
                +
              </button>
            </div>
            {guestCount >= 3 && (
              <p className="text-[11px] text-[#2E7D32] bg-[#E8F5E9] border border-[#C8E6C9] py-1.5 px-3 rounded-lg w-fit">
                🎁 Ghép nhóm ưu tiên: Giảm ngay 10% tổng chi phí cho hóa đơn đăng ký nhóm từ 3 người lớn trở lên.
              </p>
            )}
          </div>

          {/* BLOCK 4: CUSTOMER INFORMATION */}
          <div className="space-y-4 border-t border-[#F2ECE4] pt-6" id="personal-info-block">
            <h3 className="text-xs font-bold text-[#2D2522] uppercase tracking-wider">
              4. Thông Tin Liên Hệ Của Bạn
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="personal-inputs-grid">
              
              {/* Name */}
              <div className="space-y-1.5" id="form-field-fullName">
                <label className="text-xs font-bold text-[#5C4A3C]">Họ & Tên lót:</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    id="input-fullname"
                    placeholder="Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) {
                        setErrors(prev => {
                          const c = { ...prev };
                          delete c.fullName;
                          return c;
                        });
                      }
                    }}
                    className={`w-full bg-white border border-[#EDEAE4] rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-[#2D2522] placeholder-gray-300 outline-hidden transition ${focusBorderClass}`}
                  />
                </div>
                {errors.fullName && <p className="text-[11px] text-red-500 font-medium">{errors.fullName}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1.5" id="form-field-phone">
                <label className="text-xs font-bold text-[#5C4A3C]">Số điện thoại:</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    id="input-phone"
                    placeholder="0987123456"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) {
                        setErrors(prev => {
                          const c = { ...prev };
                          delete c.phone;
                          return c;
                        });
                      }
                    }}
                    className={`w-full bg-white border border-[#EDEAE4] rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-[#2D2522] placeholder-gray-300 outline-hidden transition ${focusBorderClass}`}
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-red-500 font-medium">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5 sm:col-span-2" id="form-field-email">
                <label className="text-xs font-bold text-[#5C4A3C]">Địa chỉ Email:</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    id="input-email"
                    placeholder="nguyenvana@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors(prev => {
                          const c = { ...prev };
                          delete c.email;
                          return c;
                        });
                      }
                    }}
                    className={`w-full bg-white border border-[#EDEAE4] rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-[#2D2522] placeholder-gray-300 outline-hidden transition ${focusBorderClass}`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-red-500 font-medium">{errors.email}</p>}
              </div>

              {/* Ghi chú */}
              <div className="space-y-1.5 sm:col-span-2" id="form-field-note">
                <label className="text-xs font-bold text-[#5C4A3C]">Dự tính đặc biệt (Tùy chọn):</label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                  <textarea
                    id="input-note"
                    rows={3}
                    placeholder="Ví dụ: Lớp học kỉ niệm ngày tụ họp nhóm, muốn làm đĩa khắc chữ làm quà tặng, hoặc có dị ứng phấn hoa dị ứng phấn bột..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className={`w-full bg-white border border-[#EDEAE4] rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-[#2D2522] placeholder-gray-300 outline-hidden transition ${focusBorderClass}`}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* DYNAMIC PRICE ESTIMATE BOX */}
          <div className="bg-[#FAF6F4] p-6 rounded-2xl border border-[#F2E0DC] space-y-4" id="billing-summary-block">
            <h4 className="text-xs font-bold text-[#2D2522] uppercase tracking-wider">Tóm Tắt Phiếu Thanh Toán Tiền Dự Kiến</h4>
            <div className="space-y-2 text-xs text-[#5F544E]">
              <div className="flex justify-between">
                <span>Đơn giá {activeWorkshop.title}</span>
                <span className="font-mono font-medium">{new Intl.NumberFormat('vi-VN').format(basePrice)}đ x {guestCount}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#2E7D32]">
                  <span>Ưu đãi hội viên (Nhóm lớn 3+)</span>
                  <span className="font-mono font-bold">- {new Intl.NumberFormat('vi-VN').format(discountAmount)}đ</span>
                </div>
              )}
              <div className="border-t border-[#E8DDDA] pt-2 flex justify-between items-center text-sm font-bold text-[#2D2522]">
                <span>TỔNG ĐI TIỀN TRỌN GÓI</span>
                <span className={`text-base font-serif ${textAccentClass}`}>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                </span>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 leading-normal">
              * Lưu ý: Atelier không thu bất kỳ chi phí phát sinh nào tại xưởng. Phí đã bao gồm đất, trà hoa quả dã ngoại, lò nung sấy hai lần và đóng gói hộp quà thành phẩm bảo vệ.
            </p>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            id="btn-confirm-booking-form"
            className={`w-full py-4 px-6 rounded-2xl text-white font-medium text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${bgAccentClass}`}
          >
            <Ticket className="w-4 h-4" />
            Xác Nhận Đăng Ký Chỗ - Nhận Vé Điện Tử
          </button>

        </form>

      </div>
    </section>
  );
}
