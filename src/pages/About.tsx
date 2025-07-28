import { Play, Award, Users, Heart, Target } from 'lucide-react';

const milestones = [
  {
    year: '2020',
    title: 'Khởi đầu hành trình',
    description: 'GANU được thành lập với ước mơ mang đến những món gà nướng ngon nhất'
  },
  {
    year: '2021',
    title: 'Mở rộng đầu tiên',
    description: 'Khai trương chi nhánh thứ 2 và phát triển công thức độc quyền'
  },
  {
    year: '2022',
    title: 'Đột phá công nghệ',
    description: 'Ra mắt ứng dụng đặt hàng online và hệ thống giao hàng nhanh'
  },
  {
    year: '2023',
    title: 'Mở rộng toàn quốc',
    description: 'Có mặt tại 15 tỉnh thành với hơn 50 cửa hàng'
  },
  {
    year: '2024',
    title: 'Thương hiệu hàng đầu',
    description: 'Trở thành chuỗi gà nướng được yêu thích nhất Việt Nam'
  }
];

const values = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Tình yêu ẩm thực',
    description: 'Chúng tôi đặt tình yêu và đam mê vào từng món ăn'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Chất lượng hàng đầu',
    description: 'Cam kết sử dụng nguyên liệu tươi ngon, quy trình chuẩn'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Phục vụ tận tâm',
    description: 'Khách hàng là trung tâm của mọi hoạt động'
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Đổi mới không ngừng',
    description: 'Luôn sáng tạo để mang đến trải nghiệm tốt nhất'
  }
];

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-orange-500 to-yellow-400 flex items-center">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Câu Chuyện GANU</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Hành trình từ một ước mơ nhỏ đến thương hiệu gà nướng hàng đầu Việt Nam
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Khởi Nguồn Từ Tình Yêu Ẩm Thực 🍗
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  GANU ra đời từ niềm đam mê ẩm thực và mong muốn mang đến cho mọi người 
                  những bữa ăn ngon, ấm cúng như trong gia đình. Chúng tôi bắt đầu từ một 
                  quán nhỏ với công thức gà nướng truyền thống được truyền lại qua nhiều thế hệ.
                </p>
                <p>
                  Với phương châm "Ngon từ tâm, chất từ nguồn", GANU không ngừng cải tiến 
                  và hoàn thiện để mang đến những món ăn chất lượng cao nhất. Mỗi con gà 
                  được chọn lọc kỹ càng, ướp gia vị theo công thức độc quyền và nướng 
                  bằng lò than hồng truyền thống.
                </p>
                <p>
                  Hôm nay, GANU tự hào là thương hiệu gà nướng được yêu thích bởi hàng 
                  triệu khách hàng trên toàn quốc. Chúng tôi không chỉ phục vụ món ăn 
                  mà còn tạo nên những khoảnh khắc đáng nhớ cho mọi gia đình.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20grilled%20chicken%20cooking%20process%20chef%20preparing%20food%20warm%20kitchen%20atmosphere&image_size=square_hd"
                alt="Quá trình chế biến gà nướng"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black bg-opacity-20 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Video Introduction */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Video Giới Thiệu 🎬
            </h2>
            <p className="text-lg text-gray-600">
              Khám phá câu chuyện đằng sau thương hiệu GANU
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video flex items-center justify-center">
                <img
                  src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20video%20thumbnail%20ganu%20restaurant%20brand%20story%20cooking%20process&image_size=landscape_16_9"
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-6 transition-all duration-300 transform hover:scale-110">
                    <Play className="w-12 h-12 text-white ml-1" />
                  </button>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-4">
              "Hành trình từ bếp lửa đến trái tim khách hàng" - 5 phút
            </p>
          </div>
        </div>
      </section>

      {/* Development Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Hành Trình Phát Triển 📈
            </h2>
            <p className="text-lg text-gray-600">
              Những cột mốc quan trọng trong lịch sử GANU
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-yellow-400 rounded-full" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="text-2xl font-bold text-orange-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative z-10">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full border-4 border-white shadow-lg" />
                  </div>
                  
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-yellow-400">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tầm Nhìn & Sứ Mệnh 🎯
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">🔮 Tầm Nhìn</h3>
              <p className="text-lg leading-relaxed">
                Trở thành thương hiệu gà nướng hàng đầu Đông Nam Á, được biết đến 
                với chất lượng vượt trội và dịch vụ tận tâm. GANU sẽ là lựa chọn 
                đầu tiên khi khách hàng nghĩ đến món gà nướng ngon.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">🎯 Sứ Mệnh</h3>
              <p className="text-lg leading-relaxed">
                Mang đến những bữa ăn ngon, bổ dưỡng và an toàn cho mọi gia đình. 
                Chúng tôi cam kết sử dụng nguyên liệu tươi ngon nhất, quy trình 
                chế biến chuẩn và phục vụ khách hàng với tất cả tình yêu thương.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Giá Trị Cốt Lõi ✨
            </h2>
            <p className="text-lg text-gray-600">
              Những nguyên tắc định hướng mọi hoạt động của GANU
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">{value.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">Cửa hàng</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">1M+</div>
              <div className="text-gray-600">Khách hàng</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">15</div>
              <div className="text-gray-600">Tỉnh thành</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">4.9</div>
              <div className="text-gray-600">Đánh giá trung bình</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}