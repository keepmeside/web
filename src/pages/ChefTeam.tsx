import { useState } from 'react';
import { Star, Award, Clock, Users, ChefHat, Heart, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

interface Chef {
  id: number;
  name: string;
  position: string;
  experience: number;
  specialties: string[];
  image: string;
  bio: string;
  achievements: string[];
  rating: number;
  totalReviews: number;
  location: string;
  phone?: string;
  email?: string;
  social?: {
    instagram?: string;
    facebook?: string;
  };
  signature_dish: string;
  philosophy: string;
}

const chefs: Chef[] = [
  {
    id: 1,
    name: 'Nguyễn Văn Minh',
    position: 'Bếp trưởng',
    experience: 15,
    specialties: ['Gà nướng than hoa', 'Gia vị truyền thống', 'Món nướng BBQ'],
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20vietnamese%20head%20chef%20in%20white%20uniform%20holding%20grilled%20chicken%20in%20modern%20kitchen%20confident%20smile&image_size=portrait_4_3',
    bio: 'Với hơn 15 năm kinh nghiệm trong nghề, Chef Minh là người đã tạo nên công thức gia vị độc đáo của GANU. Anh từng tu nghiệp tại các nhà hàng nổi tiếng và mang về những kỹ thuật nướng tinh tế nhất.',
    achievements: [
      'Giải Nhất Cuộc thi Đầu bếp Việt Nam 2019',
      'Chứng chỉ Bếp trưởng Quốc tế',
      'Top 10 Đầu bếp trẻ xuất sắc 2020'
    ],
    rating: 4.9,
    totalReviews: 156,
    location: 'GANU Quận 1',
    phone: '0901234567',
    email: 'chef.minh@ganu.vn',
    social: {
      instagram: '@chef_minh_ganu',
      facebook: 'Chef Minh GANU'
    },
    signature_dish: 'Gà nướng mật ong sả chanh',
    philosophy: 'Nấu ăn là nghệ thuật, mỗi món ăn phải chứa đựng tâm hồn và tình yêu của người làm ra nó.'
  },
  {
    id: 2,
    name: 'Trần Thị Hương',
    position: 'Phó bếp trưởng',
    experience: 12,
    specialties: ['Nước sốt đặc biệt', 'Salad tươi', 'Món khai vị'],
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20vietnamese%20female%20sous%20chef%20in%20white%20uniform%20preparing%20sauce%20in%20modern%20kitchen%20focused%20expression&image_size=portrait_4_3',
    bio: 'Chef Hương chuyên về các loại nước sốt và món khai vị. Cô có tài năng đặc biệt trong việc kết hợp các hương vị để tạo ra những món ăn kèm hoàn hảo cho gà nướng.',
    achievements: [
      'Giải Nhì Cuộc thi Nước sốt sáng tạo 2021',
      'Chứng chỉ An toàn thực phẩm Quốc tế',
      'Đầu bếp xuất sắc năm 2022'
    ],
    rating: 4.8,
    totalReviews: 98,
    location: 'GANU Quận 3',
    phone: '0912345678',
    email: 'chef.huong@ganu.vn',
    social: {
      instagram: '@chef_huong_sauces'
    },
    signature_dish: 'Nước sốt tỏi ớt đặc biệt',
    philosophy: 'Nước sốt là linh hồn của món ăn, nó có thể biến một món đơn giản thành tuyệt tác.'
  },
  {
    id: 3,
    name: 'Lê Hoàng Nam',
    position: 'Chuyên gia nướng',
    experience: 10,
    specialties: ['Kỹ thuật nướng than', 'Kiểm soát nhiệt độ', 'Thịt nướng'],
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20vietnamese%20grill%20master%20chef%20working%20with%20charcoal%20grill%20wearing%20apron%20concentrated%20on%20grilling&image_size=portrait_4_3',
    bio: 'Chef Nam là chuyên gia về kỹ thuật nướng than hoa. Anh có khả năng kiểm soát nhiệt độ và thời gian nướng một cách hoàn hảo, đảm bảo mỗi miếng gà đều có độ chín vừa phải.',
    achievements: [
      'Chứng chỉ Chuyên gia nướng BBQ',
      'Giải Ba Cuộc thi Kỹ thuật nướng 2020',
      'Huấn luyện viên nướng cấp cao'
    ],
    rating: 4.7,
    totalReviews: 87,
    location: 'GANU Quận 7',
    phone: '0923456789',
    email: 'chef.nam@ganu.vn',
    signature_dish: 'Gà nướng than hoa truyền thống',
    philosophy: 'Nướng than không chỉ là kỹ thuật mà còn là nghệ thuật cân bằng giữa lửa và thời gian.'
  },
  {
    id: 4,
    name: 'Phạm Thị Lan',
    position: 'Đầu bếp sáng tạo',
    experience: 8,
    specialties: ['Combo sáng tạo', 'Fusion food', 'Presentation'],
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=creative%20vietnamese%20female%20chef%20plating%20artistic%20grilled%20chicken%20dish%20modern%20kitchen%20innovative%20presentation&image_size=portrait_4_3',
    bio: 'Chef Lan là người đứng sau những combo sáng tạo và độc đáo của GANU. Cô luôn tìm tòi những cách kết hợp mới để mang đến trải nghiệm ẩm thực thú vị cho khách hàng.',
    achievements: [
      'Giải Sáng tạo món ăn 2022',
      'Chứng chỉ Nghệ thuật trình bày món ăn',
      'Top 5 Đầu bếp trẻ sáng tạo'
    ],
    rating: 4.6,
    totalReviews: 72,
    location: 'GANU Thủ Đức',
    phone: '0934567890',
    email: 'chef.lan@ganu.vn',
    social: {
      instagram: '@chef_lan_creative',
      facebook: 'Chef Lan Creative'
    },
    signature_dish: 'Combo Fusion Gà Nướng Hàn Quốc',
    philosophy: 'Sáng tạo không có giới hạn, mỗi món ăn là một câu chuyện được kể qua hương vị.'
  }
];

const teamStats = [
  { icon: Users, label: 'Đầu bếp chuyên nghiệp', value: '15+' },
  { icon: Clock, label: 'Năm kinh nghiệm trung bình', value: '12' },
  { icon: Award, label: 'Giải thưởng đạt được', value: '25+' },
  { icon: Heart, label: 'Khách hàng hài lòng', value: '98%' }
];

export default function ChefTeam() {
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const positions = ['all', 'Bếp trưởng', 'Phó bếp trưởng', 'Chuyên gia nướng', 'Đầu bếp sáng tạo'];
  
  const filteredChefs = activeFilter === 'all' 
    ? chefs 
    : chefs.filter(chef => chef.position === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <ChefHat className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Đội Ngũ Đầu Bếp GANU
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Những nghệ nhân ẩm thực tài ba đứng sau hương vị tuyệt vời của GANU
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {teamStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Philosophy */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Triết Lý Ẩm Thực GANU
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Tại GANU, chúng tôi tin rằng mỗi món ăn không chỉ là sự kết hợp của nguyên liệu, 
              mà còn là tình yêu, đam mê và tâm huyết của những người đầu bếp. 
              Đội ngũ đầu bếp của chúng tôi không ngừng học hỏi, sáng tạo để mang đến 
              những trải nghiệm ẩm thực tuyệt vời nhất cho khách hàng.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-orange-50 rounded-2xl">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Tình Yêu</h3>
                <p className="text-gray-600">Mỗi món ăn được chế biến với tình yêu và sự tận tâm</p>
              </div>
              
              <div className="text-center p-6 bg-yellow-50 rounded-2xl">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Chất Lượng</h3>
                <p className="text-gray-600">Cam kết chất lượng cao trong từng nguyên liệu và quy trình</p>
              </div>
              
              <div className="text-center p-6 bg-red-50 rounded-2xl">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Sáng Tạo</h3>
                <p className="text-gray-600">Không ngừng đổi mới và sáng tạo trong ẩm thực</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chef Filter */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {positions.map((position) => (
              <button
                key={position}
                onClick={() => setActiveFilter(position)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeFilter === position
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                {position === 'all' ? 'Tất cả' : position}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredChefs.map((chef) => (
              <div
                key={chef.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedChef(chef)}
              >
                <div className="relative">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">{chef.rating}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {chef.experience} năm kinh nghiệm
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{chef.name}</h3>
                      <p className="text-orange-600 font-semibold">{chef.position}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{chef.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{chef.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Chuyên môn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {chef.specialties.slice(0, 3).map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{chef.totalReviews} đánh giá</span>
                      </div>
                    </div>
                    
                    <button className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Detail Modal */}
      {selectedChef && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedChef(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all z-10"
              >
                ✕
              </button>
              
              <img
                src={selectedChef.image}
                alt={selectedChef.name}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedChef.name}</h2>
                      <p className="text-xl text-orange-600 font-semibold mb-2">{selectedChef.position}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedChef.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{selectedChef.experience} năm kinh nghiệm</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-lg font-bold">{selectedChef.rating}</span>
                      </div>
                      <p className="text-sm text-gray-500">{selectedChef.totalReviews} đánh giá</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{selectedChef.bio}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Món đặc trưng:</h3>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="font-semibold text-orange-700">{selectedChef.signature_dish}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Triết lý nấu ăn:</h3>
                    <blockquote className="italic text-gray-600 border-l-4 border-orange-500 pl-4">
                      "{selectedChef.philosophy}"
                    </blockquote>
                  </div>
                </div>
                
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Chuyên môn:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedChef.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-orange-100 text-orange-700 px-3 py-2 rounded-full text-sm font-semibold"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Thành tích:</h3>
                    <ul className="space-y-2">
                      {selectedChef.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Award className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Liên hệ:</h3>
                    <div className="space-y-3">
                      {selectedChef.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <a 
                            href={`tel:${selectedChef.phone}`}
                            className="text-orange-600 hover:text-orange-700 font-semibold"
                          >
                            {selectedChef.phone}
                          </a>
                        </div>
                      )}
                      
                      {selectedChef.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <a 
                            href={`mailto:${selectedChef.email}`}
                            className="text-orange-600 hover:text-orange-700 font-semibold"
                          >
                            {selectedChef.email}
                          </a>
                        </div>
                      )}
                      
                      {selectedChef.social && (
                        <div className="flex items-center gap-4">
                          {selectedChef.social.instagram && (
                            <a 
                              href={`https://instagram.com/${selectedChef.social.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-pink-600 hover:text-pink-700"
                            >
                              <Instagram className="w-5 h-5" />
                              <span>{selectedChef.social.instagram}</span>
                            </a>
                          )}
                          
                          {selectedChef.social.facebook && (
                            <a 
                              href={`https://facebook.com/${selectedChef.social.facebook}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                            >
                              <Facebook className="w-5 h-5" />
                              <span>{selectedChef.social.facebook}</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Join Our Team CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-yellow-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Gia Nhập Đội Ngũ GANU! 👨‍🍳
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Bạn có đam mê với ẩm thực và muốn trở thành một phần của gia đình GANU? 
            Chúng tôi luôn chào đón những tài năng mới!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Xem vị trí tuyển dụng
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
              Gửi CV ứng tuyển
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}