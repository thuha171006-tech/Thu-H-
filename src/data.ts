/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Workshop, TimeSlot, PotteryCustomSelection, FlowerCustomSelection } from './types';

export const WORKSHOPS: Workshop[] = [
  {
    id: 'pottery',
    type: 'pottery',
    title: 'Terre de l’Atelier',
    subtitle: 'Nghệ Thuật Làm Gốm Thủ Công',
    description: 'Trải nghiệm chạm vào đất, xoay bàn xoay và tự tay kiến tạo tác phẩm gốm mộc mạc tinh tế. Workshop tập trung vào tone màu Nâu Đất Ấm, Cát Mộc và Men Trắng Ngọc, giúp bạn tìm thấy sự tĩnh tại tuyệt đối qua từng thớ đất bấm tay.',
    price: 650000,
    duration: '2 giờ 30 phút',
    level: 'Căn bản (Không cần kinh nghiệm)',
    capacity: 10,
    included: [
      'Toàn bộ đất sét chuyên dụng không giới hạn',
      'Bộ dụng cụ điêu khắc và bàn gốm xoay cá nhân',
      'Quá trình tráng men thủ công bởi thợ lành nghề',
      'Nung 2 lần ở nhiệt độ 1250°C tại lò của Atelier',
      'Nhận tác phẩm hoàn thiện sau 14 ngày (bọc hộp quà)',
      'Thưởng trà thảo mộc cùng bánh ngọt hữu cơ'
    ],
    image: '/anh-gom.jpg',
    highlights: [
      'Học kỹ thuật xoay trục đứng truyền thống',
      'Tạo hình bình cổ điển hoặc chén đĩa uốn sóng',
      'Lựa chọn 3 hệ men sang trọng tự chọn'
    ]
  },
  {
    id: 'flower',
    type: 'flower',
    title: 'Fleur de l’Atelier',
    subtitle: 'Nghệ Thuật Cắm Hoa Mỹ Thuật',
    description: 'Khơi dậy xúc cảm lãng mạn qua việc kết hợp các loài hoa hồng nhập khẩu cao cấp, thảo mộc dại cùng dải ruy băng lụa tơ tằm. Concept tập trung vào màu Hồng Phấn, Hồng Cappuccino kết hợp Trắng Tuyết bồng bềnh, tạo nên một tác phẩm thơ mộng đầy kiêu sa.',
    price: 850000,
    duration: '2 giờ',
    level: 'Căn bản & Nâng cao',
    capacity: 8,
    included: [
      'Hoa tươi nhập khẩu loại 1 (Hoa hồng Ohara, Mao lương, Cẩm tú cầu...)',
      'Bình gốm sứ thủ công cao cấp nguyên bản tự chọn để cắm hoa mang về',
      'Học kỹ năng xử lý hoa, cân bằng phom dáng châu Âu',
      'Bộ dụng cụ cắt tỉa chuyên nghiệp mượn tại chỗ',
      'Khu vực chụp ảnh nghệ thuật chuyên nghiệp với ánh sáng tự nhiên',
      'Nước ép hoa quả & Macaron phong cách Pháp'
    ],
    image: '/anh-hoa.jpg',
    highlights: [
      'Am hiểu bánh xe màu sắc và phân bổ mảng khối',
      'Thực hành cắm phom bay bổng nghệ thuật',
      'Mang trọn bình cắm kèm hoa tươi về làm rạng rỡ không gian'
    ]
  }
];

export const TIME_SLOTS: TimeSlot[] = [
  { id: 'morning', time: '09:00 - 11:30', label: 'Ca Sáng tinh khôi (09:00 - 11:30)' },
  { id: 'afternoon', time: '14:30 - 17:00', label: 'Ca Chiều nắng ấm (14:30 - 17:00)' },
  { id: 'sunset', time: '17:30 - 19:30', label: 'Ca Hoàng hôn ấm cúng (17:30 - 19:30)' }
];

export const POTTERY_OPTIONS = {
  clays: [
    { id: 'sand', name: 'Đất Sét Cát Trắng Mịn', desc: 'Độ láng mượt cao, sau nung ngả trắng sữa thanh tao', color: '#ECEAE2' },
    { id: 'terracotta', name: 'Đất Sét Terracotta Hoàng Thổ', desc: 'Tone nâu cam ấm mộc mạc, đậm hơi thở của đất mẹ', color: '#B37153' },
    { id: 'basalt', name: 'Đất Sét Nâu Đen Thạch Sa', desc: 'Sần nhẹ tinh tế, sắc xám nâu đậm cá tính', color: '#6E615B' }
  ],
  glazes: [
    { id: 'matte_white', name: 'Nước Men Tuyết Trắng Mờ', desc: 'Bề mặt lì bán bóng sang trọng, giữ trọn đường cong gốm', color: '#FAF7F2' },
    { id: 'chestnut', name: 'Nước Men Nâu Trà Hổ Phách', desc: 'Sâu thẳm rạn nhẹ màu nâu trà gỗ ấm cúng', color: '#8F583F' },
    { id: 'speckled', name: 'Men Men Đá Hạt Vừng Gió', desc: 'Lấm chấm thạch sa đầy ngẫu hứng nghệ thuật', color: '#DCD5C9' }
  ],
  shapes: [
    { id: 'classic_vase', name: 'Bình Hoa Thon Cao Cổ Điển', desc: 'Miệng khum hẹp tôn chiều sâu hoa lá', shapeIcon: '∪' },
    { id: 'wave_plate', name: 'Đĩa Decor Lượn Sóng Tự Do', desc: 'Vành đĩa mềm mại như sóng vỗ, ấn tượng độc bản', shapeIcon: '∼' },
    { id: 'zen_cup', name: 'Bát Trà Thiền Khum Tròn Tây Tạng', desc: 'Cảm giác cầm tay vững chãi, khấn khít lòng bàn tay', shapeIcon: '⊂' }
  ]
};

export const FLOWER_OPTIONS = {
  palettes: [
    { id: 'pure_white', name: 'Trắng Tuyết Tinh Khôi (Pure Cloud)', desc: 'Cẩm tú cầu trắng, hồng tuyết bồng bềnh và nhành bạch đàn xanh bạc', colors: ['#FFFFFF', '#F2EFEB', '#8EA99A'] },
    { id: 'blush_pink', name: 'Hồng Phấn Sương Mai (Blush Dawn)', desc: 'Hồng Ohara dịu bạt, Mao lương trắng ngần và Cát tường hồng phấn thơ ngây', colors: ['#F5D1CD', '#FDF5F5', '#FFFFFF'] },
    { id: 'cappuccino', name: 'Hồng Cappuccino Ấm (Warm Wood)', desc: 'Sự giao nhau kỳ diệu của Hồng cappuccino trà sữa và Nhành hoa dại khô', colors: ['#D5ABA5', '#ECD0C9', '#E5CEB6'] }
  ],
  styles: [
    { id: 'french', name: 'Phom Bay Bổng Kiểu Pháp', desc: 'Độ xòe rộng linh hoạt, xen kẽ cành dại nhô cao đầy phóng khoáng' },
    { id: 'ikebana', name: 'Tinh thần Tự Nhiên Đông Phương', desc: 'Bố cục khúc chiết, ít chi tiết nhưng giàu khoảng trống suy ngẫm' },
    { id: 'compact', name: 'Khuôn Tròn Cổ Điển Kiểu Ý', desc: 'Các đóa hoa đan xen xít nhau dày dặn, sang trọng và đầy đặn viên mãn' }
  ],
  vases: [
    { id: 'terracotta_pot', name: 'Bình Gốm Đất Nung Miệng Rộng', desc: 'Sự trầm ấm mộc mạc làm nổi bật sắc hoa nữ tính' },
    { id: 'celadon_porcelain', name: 'Bình Sứ Men Ngọc Bạch Tuyết', desc: 'Mượt mà phản chiếu tinh xảo tôn vẻ xa hoa thượng lưu' },
    { id: 'vintage_glass', name: 'Lọ Thuỷ Tinh Thổi Thủ Công Rạn', desc: 'Nhìn xuyên thấu cuống hoa tươi tắn tràn đầy sức sống' }
  ]
};

export const REVIEWS = [
  {
    name: 'Khánh Linh',
    role: 'Học viên lớp Fleur',
    text: 'Không gian quá mức thanh lịch và thơm mùi tinh dầu gừng sả. Mình cắm một bình hoa hồng trắng kết hợp tone hồng tro cực kỳ sang xịn mang về tặng mẹ, mẹ cứ khen mãi!',
    rating: 5,
    avatar: 'KL'
  },
  {
    name: 'Minh Hoàng',
    role: 'Học viên lớp Terre',
    text: 'Cực kỳ thích tone nâu trắng của những bình gốm ở đây, mang một hơi thở rất tối giản kiểu Nhật kết hợp nét sang trọng của Bắc Âu. Trải nghiệm xoay gốm siêu thư giãn.',
    rating: 5,
    avatar: 'MH'
  },
  {
    name: 'Thu Trà',
    role: 'Học viên lớp Double (Gốm & Hoa)',
    text: 'Atelier đón tiếp chu đáo vô cùng, bánh macaron hạt dẻ cười ngon xỉu. Mình tự nặn bình gốm ở buổi trước rồi buổi sau dùng chính bình ấy cắm hoa. Một trải nghiệm chữa lành đáng giá!',
    rating: 5,
    avatar: 'TT'
  }
];
