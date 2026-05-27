/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type WorkshopType = 'pottery' | 'flower';

export interface Workshop {
  id: string;
  type: WorkshopType;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  capacity: number;
  included: string[];
  image: string;
  highlights: string[];
}

export interface TimeSlot {
  id: string;
  time: string;
  label: string; // e.g. "Ca sáng (09:00 - 11:30)"
}

export interface PotteryCustomSelection {
  clayType: string;  // e.g. "Đất sét nâu cổ truyền", "Đất sa thạch trắng", "Đất trắng bán sứ"
  glazeType: string; // e.g. "Men bọt tuyết trắng", "Men nâu hạt mè mỹ nghệ", "Men thuỷ tinh ngọc"
  shapeType: string; // e.g. "Bình hoa cổ điển", "Chén trà thiền", "Đĩa decor lượn sóng"
}

export interface FlowerCustomSelection {
  colorPalette: string;  // e.g. "Thuần khiết (Trắng kem & Trắng sữa)", "Tình yêu (Hồng phấn & Trắng san hô)", "Lãng mạn (Hồng dâu & Hồng tro)"
  styleType: string;     // e.g. "Kiểu châu Âu sang trọng", "Kiểu lượn sóng tự nhiên", "Ikebana Nhật Bản tối giản"
  vaseType: string;      // e.g. "Bình gốm mộc tráng men", "Lọ thuỷ tinh xếp nếp", "Khay gỗ rêu ẩm"
}

export interface Booking {
  id: string;
  workshopType: WorkshopType;
  workshopTitle: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:00 - 11:30"
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  guests: number;
  note: string;
  totalPrice: number;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  customDetails: {
    pottery?: PotteryCustomSelection;
    flower?: FlowerCustomSelection;
  };
}
