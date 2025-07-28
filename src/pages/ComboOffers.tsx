import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Clock, Users, Star, Tag, Calendar, ArrowRight } from 'lucide-react';

interface Offer {
  id: number;
  title: string;
  description: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  image: string;
  validUntil: string;
  minOrder?: number;
  maxDiscount?: number;
  code: string;
  isActive: boolean;
  category: string;
  terms: string[];
  applicableProducts: number[];
}

interface ComboOffer {
  id: number;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  description: string;
  validUntil: string;
  isLimited: boolean;
  soldCount: number;
  totalAvailable: number;
}

const offers: Offer[] = [
  {
    id: 1,
    title: 'Giảm 30% Combo Đầu Tuần',
    description: 'Khởi đầu tuần mới với ưu đãi hấp dẫn! Giảm ngay 30% cho tất cả combo gà nướng.',
    discount: 30,
    discountType: 'percentage',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=monday%20special%20offer%20grilled%20chicken%20combo%20discount%20banner%20vibrant%20colors&image_size=landscape_16_9',
    validUntil: '2024-02-29',
    minOrder: 150000,
    maxDiscount: 100000,
    code: 'MONDAY30',
    isActive: true,
    category: 'weekly',
    terms: [
      'Áp dụng từ thứ 2 đến thứ 4 hàng tuần',
      'Đơn hàng tối thiểu 150.000đ',
      'Giảm tối đa 100.000đ',
      'Không áp dụng cùng ưu đãi khác'
    ],
    applicableProducts: [1, 2, 3, 4]
  },
  {
    id: 2,
    title: 'Mua 2 Tặng 1 Combo Gia Đình',
    description: 'Ưu đãi đặc biệt cho gia đình! Mua 2 combo bất kỳ, tặng ngay 1 combo gà nướng mật ong.',
    discount: 0,
    discountType: 'fixed',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=family%20combo%20buy%202%20get%201%20free%20promotion%20happy%20family%20dining&image_size=landscape_16_9',
    validUntil: '2024-03-15',
    code: 'FAMILY321',
    isActive: true,
    category: 'family',
    terms: [
      'Mua 2 combo bất kỳ, tặng 1 combo gà nướng mật ong',
      'Combo tặng có giá trị tối đa 159.000đ',
      'Áp dụng cho đơn hàng từ 3 người trở lên',
      'Không áp dụng cùng ưu đãi khác'
    ],
    applicableProducts: [1, 2, 3, 4, 5, 6]
  },
  {
    id: 3,
    title: 'Flash Sale Cuối Tuần',
    description: 'Chỉ trong 48h! Giảm sốc 50% cho combo Teriyaki và combo cay Hàn Quốc.',
    discount: 50,
    discountType: 'percentage',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=flash%20sale%20weekend%20special%20teriyaki%20korean%20chicken%20combo%20lightning%20effect&image_size=landscape_16_9',
    validUntil: '2024-01-28',
    code: 'FLASH50',
    isActive: true,
    category: 'flash',
    terms: [
      'Chỉ áp dụng thứ 7 và chủ nhật',
      'Giới hạn 100 suất mỗi ngày',
      'Chỉ áp dụng cho combo Teriyaki và combo cay Hàn Quốc',
      'Không hoàn lại khi hủy đơn'
    ],
    applicableProducts: [2, 3]
  },
  {
    id: 4,
    title: 'Sinh Viên Tiết Kiệm',
    description: 'Ưu đãi đặc biệt cho sinh viên! Giảm 20% khi xuất trình thẻ sinh viên.',
    discount: 20,
    discountType: 'percentage',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=student%20discount%20offer%20young%20people%20eating%20grilled%20chicken%20university%20setting&image_size=landscape_16_9',
    validUntil: '2024-12-31',
    maxDiscount: 50000,
    code: 'STUDENT20',
    isActive: true,
    category: 'student',
    terms: [
      'Xuất trình thẻ sinh viên còn hiệu lực',
      'Áp dụng từ thứ 2 đến thứ 6',
      'Giảm tối đa 50.000đ',
      'Mỗi thẻ sinh viên chỉ sử dụng 1 lần/ngày'
    ],
    applicableProducts: [1, 2, 3, 4]
  }
];

const comboOffers: ComboOffer[] = [
  {
    id: 1,
    name: 'Combo Gà Nướng Mật Ong - Giá Sốc',
    originalPrice: 199000,
    discountedPrice: 139000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=honey%20grilled%20chicken%20combo%20special%20price%20limited%20time%20offer&image_size=square_hd',
    description: 'Combo bestseller với giá ưu đãi không thể bỏ lỡ!',
    validUntil: '2024-02-15',
    isLimited: true,
    soldCount: 87,
    totalAvailable: 100
  },
  {
    id: 2,
    name: 'Combo Teriyaki Premium',
    originalPrice: 219000,
    discountedPrice: 179000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20teriyaki%20chicken%20combo%20special%20offer%20japanese%20style&image_size=square_hd',
    description: 'Hương vị Nhật Bản đặc biệt với giá ưu đãi',
    validUntil: '2024-02-20',
    isLimited: false,
    soldCount: 0,
    totalAvailable: 0
  }
];

const categories = [
  { id: 'all', name: 'Tất cả', icon: Gift },
  { id: 'weekly', name: 'Ưu đãi tuần', icon: Calendar },
  { id: 'family', name: 'Gia đình', icon: Users },
  { id: 'flash', name: 'Flash Sale', icon: Clock },
  { id: 'student', name: 'Sinh viên', icon: Star }
];

export default function ComboOffers() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredOffers = offers.filter(offer => 
    selectedCategory === 'all' || offer.category === selectedCategory
  );

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const calculateTimeLeft = (validUntil: string) => {
    const difference = new Date(validUntil).getTime() - new Date().getTime();
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      return { days, hours };
    }
    return null;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Ưu Đãi Đặc Biệt 🎉
          </h1>
          <p className="text-xl text-white mb-8">
            Khám phá những ưu đãi hấp dẫn và tiết kiệm ngay hôm nay!
          </p>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">🔥 HOT DEAL</div>
              <div className="text-lg">Giảm đến 50% combo cuối tuần!</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white shadow-sm sticky top-[72px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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

      {/* Limited Time Offers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Ưu Đãi Có Hạn ⏰
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {comboOffers.map((offer) => {
              const timeLeft = calculateTimeLeft(offer.validUntil);
              const progress = offer.isLimited ? (offer.soldCount / offer.totalAvailable) * 100 : 0;
              
              return (
                <div key={offer.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img
                      src={offer.image}
                      alt={offer.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        🔥 Giá sốc
                      </span>
                    </div>
                    {timeLeft && (
                      <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                        {timeLeft.days}d {timeLeft.hours}h
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{offer.name}</h3>
                    <p className="text-gray-600 mb-4">{offer.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-3xl font-bold text-red-600">
                          {offer.discountedPrice.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="ml-2 text-lg text-gray-500 line-through">
                          {offer.originalPrice.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                      <div className="text-green-600 font-semibold">
                        -{Math.round(((offer.originalPrice - offer.discountedPrice) / offer.originalPrice) * 100)}%
                      </div>
                    </div>
                    
                    {offer.isLimited && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Đã bán: {offer.soldCount}/{offer.totalAvailable}</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <Link
                      to={`/order/${offer.id}`}
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      Đặt ngay
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Discount Codes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Mã Giảm Giá 🎫
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredOffers.map((offer) => {
              const timeLeft = calculateTimeLeft(offer.validUntil);
              
              return (
                <div key={offer.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="flex">
                    <div className="w-1/3">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="w-2/3 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-800">{offer.title}</h3>
                        {offer.isActive && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                            Đang áp dụng
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4 text-sm">{offer.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Tag className="w-5 h-5 text-orange-500" />
                          <span className="font-bold text-2xl text-orange-600">
                            {offer.discountType === 'percentage' ? `${offer.discount}%` : 'Tặng kèm'}
                          </span>
                        </div>
                        {timeLeft && (
                          <div className="text-sm text-red-600 font-semibold">
                            Còn {timeLeft.days}d {timeLeft.hours}h
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-3 text-center">
                          <span className="font-mono font-bold text-lg text-gray-800">{offer.code}</span>
                        </div>
                        <button
                          onClick={() => copyCode(offer.code)}
                          className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                            copiedCode === offer.code
                              ? 'bg-green-500 text-white'
                              : 'bg-orange-500 text-white hover:bg-orange-600'
                          }`}
                        >
                          {copiedCode === offer.code ? '✓ Đã sao' : 'Sao chép'}
                        </button>
                      </div>
                      
                      <div className="mt-4">
                        <details className="text-sm">
                          <summary className="cursor-pointer text-gray-600 hover:text-gray-800 font-semibold">
                            Điều kiện áp dụng
                          </summary>
                          <ul className="mt-2 space-y-1 text-gray-600">
                            {offer.terms.map((term, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                <span>{term}</span>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Cách Sử Dụng Mã Giảm Giá 📝
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Chọn Combo</h3>
              <p className="text-gray-600">Chọn combo yêu thích và thêm vào giỏ hàng</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nhập Mã</h3>
              <p className="text-gray-600">Nhập mã giảm giá vào ô "Mã khuyến mãi" khi thanh toán</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nhận Ưu Đãi</h3>
              <p className="text-gray-600">Giảm giá được áp dụng ngay lập tức</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Đừng Bỏ Lỡ Ưu Đãi! 🚀
          </h2>
          <p className="text-xl text-white mb-8">
            Đăng ký nhận thông báo để không bỏ lỡ những ưu đãi hấp dẫn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Đăng ký
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}