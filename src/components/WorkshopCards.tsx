/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Clock, Users, ArrowRight, Sparkles, Check, HelpCircle } from 'lucide-react';
import { Workshop } from '../types';
import { WORKSHOPS } from '../data';

interface WorkshopCardsProps {
  onSelectWorkshop: (type: 'pottery' | 'flower') => void;
  selectedWorkshopId: string | null;
}

export default function WorkshopCards({ onSelectWorkshop, selectedWorkshopId }: WorkshopCardsProps) {
  // Utility format currency
  const formatCVND = (v: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v);
  };

  return (
    <section id="workshops-list-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" id="workshops-header">
          <span className="text-xs uppercase tracking-widest text-[#8C624E] font-medium font-mono">Dành riêng cho bạn</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2D2522]">
            Lựa Chọn <span className="text-[#8C624E] italic font-normal">Hành Trình Sáng Tạo</span>
          </h2>
          <div className="h-[2px] w-20 bg-[#E8DCC4] mx-auto my-3"></div>
          <p className="text-sm text-[#7A6C65] font-sans">
            Mỗi lớp học tại Atelier được thiết kế tách biệt, tập trung vào chất lượng trải nghiệm riêng tư tuyệt đối. Trà bánh sẵn sàng gửi đến quý khách khi vừa tự tay hoàn thành tác phẩm đầy ý niệm của mình.
          </p>
        </div>

        {/* Outer Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8" id="workshops-grid">
          {WORKSHOPS.map((workshop, wsIndex) => {
            const isSelected = selectedWorkshopId === workshop.id;
            const isPottery = workshop.type === 'pottery';

            // Distinct themes based on user's color specifications: 
            // Clay: brown-white theme; Flower: pink-white theme.
            const cardTheme = isPottery
              ? {
                  accentColor: '#8C624E', 
                  cardBg: 'bg-[#FCFAF7]',
                  borderHover: 'hover:border-[#8C624E]/50',
                  selectedBorder: 'border-[#8C624E]',
                  badgeColor: 'bg-[#8C624E]/10 text-[#8C624E]',
                  btnBg: 'bg-[#8C624E] hover:bg-[#6E4B3B]',
                  textAccent: 'text-[#8C624E]'
                }
              : {
                  accentColor: '#D49085',
                  cardBg: 'bg-[#FDF9F8]',
                  borderHover: 'hover:border-[#D49085]/50',
                  selectedBorder: 'border-[#D49085]',
                  badgeColor: 'bg-[#F5ECE8] text-[#D49085]',
                  btnBg: 'bg-[#D49085] hover:bg-[#C27D72]',
                  textAccent: 'text-[#D49085]'
                };

            return (
              <motion.div
                key={workshop.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: wsIndex * 0.1 }}
                className={`flex flex-col rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                  isSelected ? `${cardTheme.selectedBorder} shadow-xl shadow-gray-100` : 'border-[#EBE3D5] hover:shadow-lg'
                } ${cardTheme.cardBg}`}
                id={`workshop-card-${workshop.id}`}
              >
                {/* Workshop Banner */}
                <div className="relative h-64 md:h-76 overflow-hidden">
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md bg-white/95 ${cardTheme.textAccent}`}>
                      {isPottery ? 'Khóa Học Đất Sét & Men' : 'Khóa Học Hoa Nghệ Thuật'}
                    </span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex justify-between items-end text-white">
                    <div>
                      <h3 className="text-2xl font-serif">{workshop.title}</h3>
                      <p className="text-xs text-[#EBE3D5] mt-1 font-mono tracking-wider">{workshop.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold font-mono text-[#F4D3D3]/100">
                        {isPottery ? '650.000đ' : '850.000đ'}
                      </p>
                      <p className="text-[10px] text-gray-200">trọn gói / học viên</p>
                    </div>
                  </div>
                </div>

                {/* Card Content body */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                  
                  {/* Descriptions and Core Info badges */}
                  <div className="space-y-4">
                    <p className="text-sm text-[#5F544E] leading-relaxed">
                      {workshop.description}
                    </p>

                    {/* Quick Metadata badges */}
                    <div className="flex flex-wrap gap-4 text-xs text-[#5C4A3C] font-medium" id={`workshop-${workshop.id}-meta`}>
                      <span className="flex items-center gap-1.5 bg-white border border-[#EDEAE4] px-2.5 py-1 rounded-full shadow-xs">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        Thời gian: {workshop.duration}
                      </span>
                      <span className="flex items-center gap-1.5 bg-white border border-[#EDEAE4] px-2.5 py-1 rounded-full shadow-xs">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        Tối đa: {workshop.capacity} học viên / ca
                      </span>
                    </div>

                    {/* Highlights section */}
                    <div className="bg-white p-4 rounded-2xl border border-[#EDEAE4]" id={`workshop-${workshop.id}-highlights`}>
                      <h4 className="text-xs font-bold text-[#2D2522] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" /> Điểm nhấn khóa học:
                      </h4>
                      <ul className="text-xs text-[#5F544E] space-y-1.5 list-none">
                        {workshop.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className={`text-[10px] font-bold shrink-0 mt-0.5 ${cardTheme.textAccent}`}>✦</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Included Materials checklist - Elegant and spacious */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-[#2D2522] uppercase tracking-wider">Đã bao gồm trong chi phí:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id={`workshop-${workshop.id}-included-grid`}>
                      {workshop.included.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#73645C]">
                          <div className={`mt-0.5 rounded-full p-0.5 bg-white border shrink-0`}>
                            <Check className={`w-3 h-3 ${cardTheme.textAccent}`} />
                          </div>
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Selection Action */}
                  <button
                    id={`btn-select-workshop-${workshop.id}`}
                    onClick={() => onSelectWorkshop(workshop.type)}
                    className={`w-full py-4 px-6 rounded-2xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-transparent border-2 border-[#5C4A3C] text-[#5C4A3C] shadow-inner'
                        : `${cardTheme.btnBg} text-white shadow-md hover:shadow-lg`
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4 text-[#594B40] stroke-[3]" />
                        Đang Lựa Chọn Workshop Này
                      </>
                    ) : (
                      <>
                        Chọn {isPottery ? 'Workshop Làm Gốm' : 'Workshop Cắm Hoa'}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Micro FAQ notice */}
        <div className="mt-12 bg-[#FAF7F2] p-6 rounded-2xl border border-[#EBE3D5] max-w-2xl mx-auto flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-[#8C624E] shrink-0 mt-0.5" />
          <div className="text-xs text-[#7A6C65] space-y-1">
            <p className="font-bold text-[#2D2522]">Bạn muốn tham gia cả hai lớp học?</p>
            <p className="leading-relaxed">Atelier hỗ trợ quý khách ghép lịch học Gốm vào buổi sáng và Cắm Hoa vào buổi chiều trong cùng ngày. Vui lòng đặt từng lịch hoặc điền ghi chú đặc biệt bên dưới mẫu đặt lịch để được bộ phận tư vấn viên liên hệ hỗ trợ riêng biệt nhé!</p>
          </div>
        </div>

      </div>
    </section>
  );
}
