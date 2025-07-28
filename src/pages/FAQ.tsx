import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle, Phone, Mail, Clock, MapPin, Star, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: number;
  notHelpful: number;
}

const categories = [
  { id: 'all', name: 'Tất cả', icon: HelpCircle },
  { id: 'menu', name: 'Thực đơn & Combo', icon: Star },
  { id: 'order', name: 'Đặt hàng & Thanh toán', icon: MessageCircle },
  { id: 'delivery', name: 'Giao hàng & Lấy hàng', icon: MapPin },
  { id: 'policy', name: 'Chính sách & Quy định', icon: Clock },
  { id: 'other', name: 'Khác', icon: Phone }
];

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'GANU có những combo gà nướng nào?',
    answer: 'GANU hiện có 8 combo gà nướng đa dạng:\n\n• **Combo Cơ Bản** (149k): 1/2 con gà + cơm + salad + nước ngọt\n• **Combo Gia Đình** (299k): 1 con gà + 2 cơm + 2 salad + 2 nước ngọt\n• **Combo Đặc Biệt** (199k): 1/2 con gà + cơm + salad + soup + nước ngọt\n• **Combo BBQ Hàn Quốc** (229k): Gà nướng kiểu Hàn + kimchi + cơm + nước ngọt\n• **Combo Mật Ong** (189k): Gà nướng mật ong + cơm + salad + nước ngọt\n• **Combo Cay Đặc Biệt** (199k): Gà nướng cay + cơm + salad + nước ngọt\n• **Combo Healthy** (169k): Gà nướng + salad lớn + nước ép trái cây\n• **Combo Tiết Kiệm** (99k): 1/4 con gà + cơm + nước ngọt\n\nTất cả combo đều được chế biến tươi ngon với gia vị đặc biệt của GANU.',
    category: 'menu',
    tags: ['combo', 'thực đơn', 'giá cả'],
    helpful: 156,
    notHelpful: 8
  },
  {
    id: 2,
    question: 'Làm thế nào để đặt hàng tại GANU?',
    answer: 'Bạn có thể đặt hàng GANU qua nhiều cách:\n\n**1. Đặt hàng online:**\n• Truy cập website GANU\n• Chọn combo yêu thích\n• Điền thông tin giao hàng\n• Thanh toán online hoặc COD\n\n**2. Gọi điện trực tiếp:**\n• Hotline: 1900 123 456\n• Thời gian: 8:00 - 22:00 hàng ngày\n\n**3. Đặt hàng qua app:**\n• Tải app GANU trên App Store/Google Play\n• Đăng ký tài khoản\n• Đặt hàng và theo dõi đơn hàng\n\n**4. Đến trực tiếp cửa hàng:**\n• 4 cửa hàng tại TP.HCM\n• Đặt hàng tại quầy hoặc dùng tại chỗ\n\nTất cả đơn hàng đều được xác nhận trong vòng 5-10 phút.',
    category: 'order',
    tags: ['đặt hàng', 'online', 'hotline'],
    helpful: 234,
    notHelpful: 12
  },
  {
    id: 3,
    question: 'GANU có giao hàng tận nơi không? Phí giao hàng bao nhiêu?',
    answer: 'GANU có dịch vụ giao hàng tận nơi với các thông tin sau:\n\n**Khu vực giao hàng:**\n• Quận 1, 3, 7, Thủ Đức và các quận lân cận\n• Bán kính 15km từ cửa hàng gần nhất\n\n**Phí giao hàng:**\n• Miễn phí giao hàng cho đơn từ 200k\n• Dưới 200k: phí giao hàng 25k\n• Khu vực xa (10-15km): phí giao hàng 35k\n\n**Thời gian giao hàng:**\n• Trong giờ cao điểm: 45-60 phút\n• Giờ bình thường: 30-45 phút\n• Giao hàng nhanh (phí +15k): 20-30 phút\n\n**Thanh toán:**\n• COD (tiền mặt khi nhận hàng)\n• Chuyển khoản ngân hàng\n• Ví điện tử (MoMo, ZaloPay)\n\nShipper sẽ gọi trước 10-15 phút khi đến nơi.',
    category: 'delivery',
    tags: ['giao hàng', 'phí ship', 'thời gian'],
    helpful: 189,
    notHelpful: 15
  },
  {
    id: 4,
    question: 'Tôi có thể hủy hoặc thay đổi đơn hàng không?',
    answer: 'GANU cho phép hủy/thay đổi đơn hàng trong các trường hợp sau:\n\n**Hủy đơn hàng:**\n• Được phép hủy trong vòng 10 phút sau khi đặt\n• Sau 10 phút: chỉ hủy được nếu đơn chưa vào bếp\n• Đơn đã vào bếp: không thể hủy\n• Hoàn tiền 100% nếu hủy đúng quy định\n\n**Thay đổi đơn hàng:**\n• Thay đổi địa chỉ: trong vòng 15 phút\n• Thay đổi combo: trong vòng 10 phút\n• Thay đổi thời gian giao: trước 30 phút\n\n**Cách thực hiện:**\n• Gọi hotline: 1900 123 456\n• Chat với CSKH qua website\n• Liên hệ qua Facebook/Zalo\n\n**Lưu ý:**\n• Đơn hàng đã thanh toán online sẽ được hoàn tiền trong 1-3 ngày làm việc\n• Phí giao hàng có thể thay đổi nếu đổi địa chỉ',
    category: 'order',
    tags: ['hủy đơn', 'thay đổi', 'hoàn tiền'],
    helpful: 167,
    notHelpful: 23
  },
  {
    id: 5,
    question: 'Gà nướng GANU có an toàn vệ sinh thực phẩm không?',
    answer: 'GANU cam kết đảm bảo an toàn vệ sinh thực phẩm tuyệt đối:\n\n**Nguồn gốc nguyên liệu:**\n• Gà tươi từ các trang trại uy tín, có chứng nhận VietGAP\n• Rau củ organic từ Đà Lạt\n• Gia vị nhập khẩu chính hãng\n\n**Quy trình chế biến:**\n• Bếp mở, khách hàng có thể quan sát\n• Đầu bếp có chứng chỉ an toàn thực phẩm\n• Nhiệt độ nướng đạt chuẩn 75°C diệt khuẩn\n• Thời gian từ chế biến đến phục vụ < 30 phút\n\n**Chứng nhận:**\n• Giấy phép kinh doanh thực phẩm\n• Chứng nhận HACCP\n• Kiểm tra định kỳ từ Sở Y tế\n• Bảo hiểm trách nhiệm sản phẩm\n\n**Cam kết:**\n• Hoàn tiền 200% nếu phát hiện vấn đề vệ sinh\n• Hotline khiếu nại 24/7: 1900 123 456',
    category: 'policy',
    tags: ['an toàn', 'vệ sinh', 'chất lượng'],
    helpful: 298,
    notHelpful: 7
  },
  {
    id: 6,
    question: 'GANU có chương trình khuyến mãi nào không?',
    answer: 'GANU thường xuyên có các chương trình khuyến mãi hấp dẫn:\n\n**Khuyến mãi thường xuyên:**\n• Thứ 2 hàng tuần: Giảm 20% combo gia đình\n• Thứ 6: Buy 1 Get 1 combo cơ bản (14h-16h)\n• Cuối tuần: Miễn phí giao hàng toàn bộ đơn\n\n**Khuyến mãi đặc biệt:**\n• Sinh nhật GANU (tháng 3): Giảm 50% tất cả combo\n• Ngày lễ lớn: Combo giá sốc từ 99k\n• Black Friday: Giảm đến 70%\n\n**Chương trình thành viên:**\n• Tích điểm: 1k = 1 điểm\n• Đổi quà từ 100 điểm\n• Thành viên VIP: Giảm 10% mọi đơn hàng\n\n**Mã giảm giá:**\n• GANU2024: Giảm 15% đơn đầu tiên\n• COMBO99: Giảm 20k combo từ 200k\n• FREESHIP: Miễn phí giao hàng\n\n**Cách cập nhật:**\n• Follow Facebook: GANU Official\n• Đăng ký newsletter trên website\n• Tải app GANU để nhận thông báo',
    category: 'other',
    tags: ['khuyến mãi', 'giảm giá', 'thành viên'],
    helpful: 445,
    notHelpful: 18
  },
  {
    id: 7,
    question: 'Thời gian hoạt động của các cửa hàng GANU?',
    answer: 'Thông tin giờ hoạt động các cửa hàng GANU:\n\n**GANU Quận 1:**\n• Địa chỉ: 123 Nguyễn Huệ, Quận 1\n• Thời gian: 10:00 - 22:00 (T2-CN)\n• Hotline: 028 3822 1234\n\n**GANU Quận 3:**\n• Địa chỉ: 456 Võ Văn Tần, Quận 3\n• Thời gian: 10:00 - 22:00 (T2-CN)\n• Hotline: 028 3930 5678\n\n**GANU Quận 7:**\n• Địa chỉ: 789 Nguyễn Thị Thập, Quận 7\n• Thời gian: 10:00 - 23:00 (T2-CN)\n• Hotline: 028 5412 9012\n\n**GANU Thủ Đức:**\n• Địa chỉ: 321 Võ Văn Ngân, TP. Thủ Đức\n• Thời gian: 10:00 - 22:30 (T2-CN)\n• Hotline: 028 7108 3456\n\n**Lưu ý:**\n• Ngày lễ có thể đóng cửa sớm hơn\n• Đặt hàng online: 8:00 - 22:00\n• Giao hàng: 10:00 - 21:30',
    category: 'other',
    tags: ['giờ mở cửa', 'địa chỉ', 'liên hệ'],
    helpful: 178,
    notHelpful: 9
  },
  {
    id: 8,
    question: 'GANU có phục vụ khách hàng ăn chay không?',
    answer: 'GANU hiện tại chuyên về gà nướng nhưng cũng có các lựa chọn cho khách ăn chay:\n\n**Món chay có sẵn:**\n• Salad rau củ tươi (không có thịt)\n• Cơm trắng\n• Soup rau củ\n• Nước ép trái cây tươi\n• Bánh mì nướng\n\n**Combo chay đặc biệt:**\n• Combo Healthy Chay (129k): Salad lớn + soup rau + cơm + nước ép\n• Có thể đặt trước 30 phút\n\n**Lưu ý quan trọng:**\n• Bếp chung với món có thịt\n• Không phù hợp với khách ăn chay nghiêm ngặt\n• Có thể có dầu mỡ từ việc nướng gà\n\n**Khuyến nghị:**\n• Thông báo trước khi đặt hàng\n• Yêu cầu chế biến riêng nếu cần\n• Liên hệ trước để được tư vấn chi tiết\n\n**Kế hoạch tương lai:**\n• GANU đang nghiên cứu thêm menu chay\n• Dự kiến ra mắt "GANU Veggie" trong năm 2024',
    category: 'menu',
    tags: ['ăn chay', 'vegetarian', 'salad'],
    helpful: 89,
    notHelpful: 34
  },
  {
    id: 9,
    question: 'Tôi bị dị ứng thực phẩm, GANU có thể tùy chỉnh món ăn không?',
    answer: 'GANU sẵn sàng hỗ trợ khách hàng có dị ứng thực phẩm:\n\n**Các dị ứng phổ biến được hỗ trợ:**\n• Dị ứng đậu phộng: Loại bỏ hoàn toàn\n• Dị ứng gluten: Thay cơm bằng salad\n• Dị ứng sữa: Không sử dụng butter, cheese\n• Dị ứng hải sản: Đảm bảo không chéo nhiễm\n\n**Quy trình đặc biệt:**\n• Thông báo dị ứng khi đặt hàng\n• Đầu bếp chế biến riêng biệt\n• Sử dụng dụng cụ sạch\n• Kiểm tra kỹ nguyên liệu\n\n**Thông tin cần cung cấp:**\n• Loại dị ứng cụ thể\n• Mức độ nghiêm trọng\n• Các thực phẩm cần tránh\n• Số điện thoại liên lạc khẩn cấp\n\n**Cam kết:**\n• Đào tạo nhân viên về dị ứng thực phẩm\n• Có danh sách nguyên liệu chi tiết\n• Hỗ trợ 24/7 nếu có vấn đề\n\n**Lưu ý:**\n• Phí tùy chỉnh: +20k/món\n• Thời gian chế biến tăng 10-15 phút\n• Không đảm bảo 100% với dị ứng nghiêm trọng',
    category: 'menu',
    tags: ['dị ứng', 'tùy chỉnh', 'an toàn'],
    helpful: 123,
    notHelpful: 16
  },
  {
    id: 10,
    question: 'GANU có nhận đặt tiệc sinh nhật hoặc sự kiện không?',
    answer: 'GANU rất vui được phục vụ các sự kiện đặc biệt:\n\n**Loại sự kiện:**\n• Sinh nhật (từ 10 người)\n• Tiệc công ty\n• Họp mặt gia đình\n• Sự kiện doanh nghiệp\n• Tiệc tốt nghiệp\n\n**Dịch vụ tiệc:**\n• **Gói Cơ Bản** (200k/người): Combo + nước ngọt + bánh sinh nhật\n• **Gói Cao Cấp** (350k/người): Combo đặc biệt + nước ép + bánh + trang trí\n• **Gói VIP** (500k/người): Full combo + rượu vang + bánh cao cấp + MC\n\n**Ưu đãi nhóm:**\n• 10-20 người: Giảm 10%\n• 21-50 người: Giảm 15%\n• Trên 50 người: Giảm 20%\n\n**Dịch vụ kèm theo:**\n• Trang trí bàn tiệc\n• Bánh sinh nhật theo yêu cầu\n• Nhạc nền, micro\n• Chụp ảnh lưu niệm\n• Quà tặng cho khách\n\n**Đặt trước:**\n• Tối thiểu 3 ngày\n• Đặt cọc 30% tổng bill\n• Xác nhận menu 1 ngày trước\n\n**Liên hệ đặt tiệc:**\n• Hotline: 1900 123 456 (ext 2)\n• Email: events@ganu.vn',
    category: 'other',
    tags: ['tiệc', 'sinh nhật', 'sự kiện'],
    helpful: 267,
    notHelpful: 11
  }
];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [helpfulVotes, setHelpfulVotes] = useState<{[key: number]: 'helpful' | 'not-helpful' | null}>({});

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleVote = (faqId: number, voteType: 'helpful' | 'not-helpful') => {
    setHelpfulVotes(prev => ({
      ...prev,
      [faqId]: prev[faqId] === voteType ? null : voteType
    }));
  };

  const formatAnswer = (answer: string) => {
    return answer.split('\n').map((line, index) => {
      if (line.startsWith('• **') && line.includes('**:')) {
        const [title, ...rest] = line.split('**:');
        return (
          <div key={index} className="mb-2">
            <span className="font-semibold text-orange-600">{title.replace('• **', '')}:</span>
            <span className="ml-1">{rest.join('**:')}</span>
          </div>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h4 key={index} className="font-bold text-gray-800 mt-4 mb-2">
            {line.replace(/\*\*/g, '')}
          </h4>
        );
      } else if (line.startsWith('• ')) {
        return (
          <div key={index} className="ml-4 mb-1 flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>{line.substring(2)}</span>
          </div>
        );
      } else if (line.trim() === '') {
        return <div key={index} className="mb-2"></div>;
      } else {
        return (
          <p key={index} className="mb-2">
            {line}
          </p>
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <HelpCircle className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Câu Hỏi Thường Gặp
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Tìm câu trả lời nhanh chóng cho mọi thắc mắc về GANU
            </p>
            <div className="flex justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold">{faqData.length}+</div>
                <div className="text-sm opacity-90">Câu hỏi</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{categories.length - 1}</div>
                <div className="text-sm opacity-90">Danh mục</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm opacity-90">Hỗ trợ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Tìm kiếm câu hỏi, từ khóa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              />
            </div>
            {searchTerm && (
              <p className="mt-3 text-gray-600 text-center">
                Tìm thấy <span className="font-semibold text-orange-600">{filteredFAQs.length}</span> kết quả cho "{searchTerm}"
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                    selectedCategory === category.id
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Không tìm thấy câu hỏi nào
                </h3>
                <p className="text-gray-500 mb-6">
                  Thử thay đổi từ khóa tìm kiếm hoặc danh mục
                </p>
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
                  Đặt câu hỏi mới
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => {
                  const isExpanded = expandedItems.has(faq.id);
                  const userVote = helpfulVotes[faq.id];
                  
                  return (
                    <div
                      key={faq.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleExpanded(faq.id)}
                        className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                              {faq.question}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {faq.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            {isExpanded ? (
                              <ChevronUp className="w-6 h-6 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </button>
                      
                      {isExpanded && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-200 pt-6">
                            <div className="text-gray-700 leading-relaxed">
                              {formatAnswer(faq.answer)}
                            </div>
                            
                            <div className="mt-6 pt-4 border-t border-gray-100">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <span className="text-sm text-gray-500">Câu trả lời này có hữu ích không?</span>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleVote(faq.id, 'helpful')}
                                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                                        userVote === 'helpful'
                                          ? 'bg-green-500 text-white'
                                          : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
                                      }`}
                                    >
                                      👍 Có ({faq.helpful + (userVote === 'helpful' ? 1 : 0)})
                                    </button>
                                    <button
                                      onClick={() => handleVote(faq.id, 'not-helpful')}
                                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                                        userVote === 'not-helpful'
                                          ? 'bg-red-500 text-white'
                                          : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                                      }`}
                                    >
                                      👎 Không ({faq.notHelpful + (userVote === 'not-helpful' ? 1 : 0)})
                                    </button>
                                  </div>
                                </div>
                                
                                <button className="text-orange-600 hover:text-orange-700 text-sm font-semibold">
                                  Chia sẻ
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-yellow-400 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Vẫn Chưa Tìm Thấy Câu Trả Lời? 🤔
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Đội ngũ hỗ trợ khách hàng GANU luôn sẵn sàng giúp đỡ bạn 24/7
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white bg-opacity-10 rounded-2xl p-6">
                <Phone className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Hotline</h3>
                <p className="mb-3">Gọi ngay để được hỗ trợ</p>
                <a 
                  href="tel:1900123456"
                  className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                >
                  1900 123 456
                </a>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-2xl p-6">
                <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                <p className="mb-3">Chat trực tiếp với CSKH</p>
                <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Bắt đầu chat
                </button>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-2xl p-6">
                <Mail className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="mb-3">Gửi email chi tiết</p>
                <a 
                  href="mailto:support@ganu.vn"
                  className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                >
                  support@ganu.vn
                </a>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Thời gian hỗ trợ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5" />
                  <span>Hotline: 24/7</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5" />
                  <span>Live Chat: 8:00 - 22:00</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span>Email: Phản hồi trong 2h</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span>Tại cửa hàng: 10:00 - 22:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}