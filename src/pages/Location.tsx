import { useState } from 'react';
import { MapPin, Clock, Phone, Car, Bus, Bike, Star, Navigation, ExternalLink } from 'lucide-react';

interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: {
    [key: string]: string;
  };
  features: string[];
  images: string[];
  rating: number;
  reviews: number;
  isMainBranch: boolean;
  parking: boolean;
  delivery: boolean;
  takeaway: boolean;
  description: string;
}

const branches: Branch[] = [
  {
    id: 1,
    name: 'GANU Quận 1 - Chi nhánh chính',
    address: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM',
    phone: '028 3822 1234',
    coordinates: {
      lat: 10.7769,
      lng: 106.7009
    },
    openingHours: {
      'Thứ 2 - Thứ 6': '10:00 - 22:00',
      'Thứ 7 - Chủ nhật': '09:00 - 23:00'
    },
    features: ['Wifi miễn phí', 'Điều hòa', 'Bãi đỗ xe', 'Giao hàng', 'Mang về'],
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20grilled%20chicken%20restaurant%20interior%20district%201%20ho%20chi%20minh%20city&image_size=landscape_16_9',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=restaurant%20exterior%20nguyen%20hue%20street%20saigon%20modern%20design&image_size=landscape_16_9'
    ],
    rating: 4.8,
    reviews: 1247,
    isMainBranch: true,
    parking: true,
    delivery: true,
    takeaway: true,
    description: 'Chi nhánh chính của GANU tại trung tâm Sài Gòn, không gian hiện đại và thoáng mát.'
  },
  {
    id: 2,
    name: 'GANU Quận 3',
    address: '456 Võ Văn Tần, Phường 5, Quận 3, TP.HCM',
    phone: '028 3930 5678',
    coordinates: {
      lat: 10.7829,
      lng: 106.6934
    },
    openingHours: {
      'Thứ 2 - Thứ 6': '10:30 - 21:30',
      'Thứ 7 - Chủ nhật': '09:30 - 22:30'
    },
    features: ['Wifi miễn phí', 'Điều hòa', 'Giao hàng', 'Mang về'],
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=cozy%20grilled%20chicken%20restaurant%20vo%20van%20tan%20street%20district%203&image_size=landscape_16_9'
    ],
    rating: 4.6,
    reviews: 892,
    isMainBranch: false,
    parking: false,
    delivery: true,
    takeaway: true,
    description: 'Chi nhánh ấm cúng tại Quận 3, phù hợp cho gia đình và bạn bè.'
  },
  {
    id: 3,
    name: 'GANU Quận 7',
    address: '789 Nguyễn Thị Thập, Phường Tân Phú, Quận 7, TP.HCM',
    phone: '028 5412 9012',
    coordinates: {
      lat: 10.7411,
      lng: 106.6984
    },
    openingHours: {
      'Thứ 2 - Thứ 6': '11:00 - 22:00',
      'Thứ 7 - Chủ nhật': '10:00 - 23:00'
    },
    features: ['Wifi miễn phí', 'Điều hòa', 'Bãi đỗ xe', 'Khu vui chơi trẻ em', 'Giao hàng', 'Mang về'],
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=family%20friendly%20grilled%20chicken%20restaurant%20district%207%20kids%20play%20area&image_size=landscape_16_9'
    ],
    rating: 4.7,
    reviews: 654,
    isMainBranch: false,
    parking: true,
    delivery: true,
    takeaway: true,
    description: 'Chi nhánh rộng rãi tại Quận 7, có khu vui chơi cho trẻ em.'
  },
  {
    id: 4,
    name: 'GANU Thủ Đức',
    address: '321 Võ Văn Ngân, Phường Linh Chiểu, TP. Thủ Đức, TP.HCM',
    phone: '028 7108 3456',
    coordinates: {
      lat: 10.8505,
      lng: 106.7717
    },
    openingHours: {
      'Thứ 2 - Thứ 6': '10:00 - 21:00',
      'Thứ 7 - Chủ nhật': '09:00 - 22:00'
    },
    features: ['Wifi miễn phí', 'Điều hòa', 'Bãi đỗ xe', 'Giao hàng', 'Mang về'],
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=student%20friendly%20grilled%20chicken%20restaurant%20thu%20duc%20university%20area&image_size=landscape_16_9'
    ],
    rating: 4.5,
    reviews: 423,
    isMainBranch: false,
    parking: true,
    delivery: true,
    takeaway: true,
    description: 'Chi nhánh gần các trường đại học, phù hợp cho sinh viên.'
  }
];

const transportOptions = [
  {
    icon: Car,
    title: 'Ô tô',
    description: 'Bãi đỗ xe miễn phí tại các chi nhánh'
  },
  {
    icon: Bike,
    title: 'Xe máy',
    description: 'Chỗ để xe máy an toàn và thuận tiện'
  },
  {
    icon: Bus,
    title: 'Xe buýt',
    description: 'Gần các tuyến xe buýt chính của thành phố'
  }
];

export default function Location() {
  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openGoogleMaps = (branch: Branch) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${branch.coordinates.lat},${branch.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const callBranch = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour * 60 + minute;
    
    // Check if current time is within opening hours
    const dayName = day === 0 ? 'Chủ nhật' : 
                   day === 6 ? 'Thứ 7' : 
                   `Thứ ${day + 1}`;
    
    const todayHours = selectedBranch.openingHours[dayName] || 
                      selectedBranch.openingHours['Thứ 7 - Chủ nhật'] ||
                      selectedBranch.openingHours['Thứ 2 - Thứ 6'];
    
    if (todayHours) {
      const [openTime, closeTime] = todayHours.split(' - ');
      const [openHour, openMin] = openTime.split(':').map(Number);
      const [closeHour, closeMin] = closeTime.split(':').map(Number);
      
      const openMinutes = openHour * 60 + openMin;
      const closeMinutes = closeHour * 60 + closeMin;
      
      return currentTime >= openMinutes && currentTime <= closeMinutes;
    }
    
    return false;
  };

  const isOpen = getCurrentTime();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-blue-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Hệ Thống Cửa Hàng 📍
          </h1>
          <p className="text-xl text-white mb-8">
            Tìm chi nhánh GANU gần bạn nhất để thưởng thức gà nướng ngon
          </p>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
            <div className="text-white">
              <div className="text-2xl font-bold mb-2">🏪 {branches.length} Chi nhánh</div>
              <div className="text-lg">Phục vụ khắp TP.HCM</div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Selection */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {branches.map((branch) => (
              <button
                key={branch.id}
                onClick={() => {
                  setSelectedBranch(branch);
                  setActiveImageIndex(0);
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedBranch.id === branch.id
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {branch.isMainBranch && '⭐ '}
                {branch.name.replace('GANU ', '')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Branch Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Branch Images */}
            <div>
              <div className="relative mb-4">
                <img
                  src={selectedBranch.images[activeImageIndex]}
                  alt={selectedBranch.name}
                  className="w-full h-96 object-cover rounded-2xl"
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    isOpen 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {isOpen ? '🟢 Đang mở cửa' : '🔴 Đã đóng cửa'}
                  </span>
                </div>
                
                {selectedBranch.isMainBranch && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ Chi nhánh chính
                    </span>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images */}
              {selectedBranch.images.length > 1 && (
                <div className="flex gap-2">
                  {selectedBranch.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-1 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === index ? 'border-green-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${selectedBranch.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Branch Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedBranch.name}</h2>
              <p className="text-gray-600 mb-6">{selectedBranch.description}</p>
              
              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(selectedBranch.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-lg font-semibold">{selectedBranch.rating}</span>
                <span className="ml-2 text-gray-600">({selectedBranch.reviews} đánh giá)</span>
              </div>
              
              {/* Address */}
              <div className="flex items-start gap-3 mb-6">
                <MapPin className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Địa chỉ</h3>
                  <p className="text-gray-600">{selectedBranch.address}</p>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start gap-3 mb-6">
                <Phone className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Hotline</h3>
                  <button
                    onClick={() => callBranch(selectedBranch.phone)}
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    {selectedBranch.phone}
                  </button>
                </div>
              </div>
              
              {/* Opening Hours */}
              <div className="flex items-start gap-3 mb-6">
                <Clock className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Giờ hoạt động</h3>
                  <div className="space-y-1">
                    {Object.entries(selectedBranch.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="text-gray-600">{day}:</span>
                        <span className="font-semibold text-gray-800">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Tiện ích</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedBranch.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => openGoogleMaps(selectedBranch)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-5 h-5" />
                  Chỉ đường
                </button>
                <button
                  onClick={() => callBranch(selectedBranch.phone)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Gọi ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Bản Đồ Các Chi Nhánh 🗺️
          </h2>
          
          {/* Google Maps Embed */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Bản đồ Google Maps</h3>
                <p className="text-gray-500 mb-4">Tích hợp Google Maps API để hiển thị vị trí chính xác</p>
                <button
                  onClick={() => openGoogleMaps(selectedBranch)}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
                >
                  <ExternalLink className="w-5 h-5" />
                  Mở Google Maps
                </button>
              </div>
            </div>
          </div>
          
          {/* Branch List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl ${
                  selectedBranch.id === branch.id ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => setSelectedBranch(branch)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-800">
                    {branch.name.replace('GANU ', '')}
                  </h3>
                  {branch.isMainBranch && (
                    <span className="text-yellow-500">⭐</span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{branch.address}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-semibold">{branch.rating}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    getCurrentTime() 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {getCurrentTime() ? 'Mở cửa' : 'Đóng cửa'}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openGoogleMaps(branch);
                    }}
                    className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-semibold hover:bg-green-200 transition-colors"
                  >
                    Chỉ đường
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      callBranch(branch.phone);
                    }}
                    className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-colors"
                  >
                    Gọi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Phương Tiện Di Chuyển 🚗
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transportOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{option.title}</h3>
                  <p className="text-gray-600">{option.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Cần Hỗ Trợ Thêm? 🤝
          </h2>
          <p className="text-xl text-white mb-8">
            Liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1900123456"
              className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Hotline: 1900 123 456
            </a>
            <a
              href="/contact"
              className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-30 transition-all border border-white border-opacity-30"
            >
              Liên hệ trực tuyến
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}