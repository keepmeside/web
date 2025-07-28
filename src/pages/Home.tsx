import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Clock, MapPin, Users } from 'lucide-react';

const bannerSlides = [
  {
    id: 1,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=delicious%20grilled%20chicken%20combo%20with%20rice%20and%20vegetables%20on%20wooden%20table%20warm%20lighting%20restaurant%20style&image_size=landscape_16_9',
    title: 'Combo Gà Nướng Đặc Biệt',
    subtitle: 'Thưởng thức hương vị đậm đà, tươi ngon mỗi ngày',
    cta: 'Đặt ngay'
  },
  {
    id: 2,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20grilled%20chicken%20with%20golden%20crispy%20skin%20served%20with%20sauce%20professional%20food%20photography&image_size=landscape_16_9',
    title: 'Gà Nướng Cao Cấp',
    subtitle: 'Công thức độc quyền, da giòn thịt mềm',
    cta: 'Khám phá'
  },
  {
    id: 3,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=family%20enjoying%20grilled%20chicken%20dinner%20together%20happy%20atmosphere%20restaurant%20setting&image_size=landscape_16_9',
    title: 'Bữa Cơm Gia Đình',
    subtitle: 'Kết nối yêu thương qua từng bữa ăn',
    cta: 'Đặt bàn'
  }
];

const featuredCombos = [
  {
    id: 1,
    name: 'Combo Gà Nướng Mật Ong',
    price: 159000,
    originalPrice: 199000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=honey%20glazed%20grilled%20chicken%20with%20rice%20and%20salad%20golden%20color%20appetizing&image_size=square_hd',
    description: 'Gà nướng tẩm mật ong, cơm trắng, salad tươi',
    rating: 4.8,
    reviews: 156
  },
  {
    id: 2,
    name: 'Combo Gà Nướng Teriyaki',
    price: 179000,
    originalPrice: 219000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=teriyaki%20grilled%20chicken%20with%20vegetables%20and%20rice%20japanese%20style%20presentation&image_size=square_hd',
    description: 'Gà nướng sốt Teriyaki, rau củ nướng, cơm',
    rating: 4.9,
    reviews: 203
  },
  {
    id: 3,
    name: 'Combo Gà Nướng Cay',
    price: 169000,
    originalPrice: 209000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=spicy%20grilled%20chicken%20with%20chili%20sauce%20and%20rice%20vibrant%20red%20color&image_size=square_hd',
    description: 'Gà nướng cay đặc biệt, cơm, kimchi',
    rating: 4.7,
    reviews: 89
  }
];

const currentOffers = [
  {
    id: 1,
    title: 'Giảm 20% cho đơn hàng đầu tiên',
    description: 'Áp dụng cho khách hàng mới, đơn tối thiểu 200k',
    code: 'GANU20',
    validUntil: '31/12/2024'
  },
  {
    id: 2,
    title: 'Mua 2 tặng 1 combo drink',
    description: 'Khi mua 2 combo bất kỳ, tặng 1 nước uống',
    code: 'COMBO21',
    validUntil: '15/01/2025'
  }
];

const recentReviews = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    rating: 5,
    comment: 'Gà nướng rất ngon, da giòn thịt mềm. Sẽ quay lại!',
    date: '2 ngày trước',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=happy%20customer%20avatar%20smiling%20person%20profile%20picture&image_size=square'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    rating: 5,
    comment: 'Dịch vụ tuyệt vời, giao hàng nhanh. Combo rất đáng tiền.',
    date: '1 tuần trước',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=satisfied%20female%20customer%20smiling%20avatar%20profile&image_size=square'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    rating: 4,
    comment: 'Hương vị đậm đà, phần ăn vừa đủ cho 2 người.',
    date: '2 tuần trước',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=happy%20male%20customer%20thumbs%20up%20avatar%20profile&image_size=square'
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                <Link
                  to="/combo"
                  className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-8 py-3 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {slide.cta} 🔥
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Combos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Combo Nổi Bật Hôm Nay 🍗
            </h2>
            <p className="text-lg text-gray-600">
              Những combo được yêu thích nhất với hương vị đặc biệt
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCombos.map((combo) => (
              <div key={combo.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={combo.image}
                    alt={combo.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{Math.round(((combo.originalPrice - combo.price) / combo.originalPrice) * 100)}%
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{combo.name}</h3>
                  <p className="text-gray-600 mb-4">{combo.description}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(combo.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {combo.rating} ({combo.reviews} đánh giá)
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-orange-600">
                        {combo.price.toLocaleString('vi-VN')}đ
                      </span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        {combo.originalPrice.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/combo/${combo.id}`}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-center font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Chi tiết
                    </Link>
                    <Link
                      to={`/order/${combo.id}`}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-2 px-4 rounded-lg text-center font-semibold hover:shadow-lg transition-all"
                    >
                      Đặt ngay
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/combo"
              className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Xem tất cả combo
            </Link>
          </div>
        </div>
      </section>

      {/* Current Offers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ưu Đãi Hiện Tại 🎉
            </h2>
            <p className="text-lg text-gray-600">
              Đừng bỏ lỡ những khuyến mãi hấp dẫn
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentOffers.map((offer) => (
              <div key={offer.id} className="bg-gradient-to-r from-orange-500 to-yellow-400 rounded-2xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                <p className="mb-4 opacity-90">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm opacity-75">Mã: </span>
                    <span className="font-bold text-lg">{offer.code}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-75">Có hiệu lực đến</div>
                    <div className="font-semibold">{offer.validUntil}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Khách Hàng Nói Gì 💬
            </h2>
            <p className="text-lg text-gray-600">
              Những đánh giá chân thực từ khách hàng
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 italic">"{review.comment}"</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/reviews"
              className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Xem tất cả đánh giá
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link
              to="/order"
              className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Đặt Hàng Nhanh</h3>
              <p className="text-sm text-gray-600">Giao hàng trong 30 phút</p>
            </Link>
            
            <Link
              to="/location"
              className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Tìm Cửa Hàng</h3>
              <p className="text-sm text-gray-600">Hệ thống toàn quốc</p>
            </Link>
            
            <Link
              to="/chef-team"
              className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Đội Ngũ Đầu Bếp</h3>
              <p className="text-sm text-gray-600">Chuyên gia ẩm thực</p>
            </Link>
            
            <Link
              to="/contact"
              className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Hỗ Trợ 24/7</h3>
              <p className="text-sm text-gray-600">Luôn sẵn sàng phục vụ</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}