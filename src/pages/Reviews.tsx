import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Filter, Search, Calendar, MapPin, User, Camera, Heart, Share2, Flag, ChevronDown, ChevronUp } from 'lucide-react';

interface Review {
  id: number;
  customerName: string;
  avatar: string;
  rating: number;
  date: string;
  location: string;
  orderType: 'dine-in' | 'delivery' | 'pickup';
  combos: string[];
  title: string;
  content: string;
  images?: string[];
  likes: number;
  dislikes: number;
  helpful: number;
  verified: boolean;
  response?: {
    author: string;
    date: string;
    content: string;
  };
}

const filterOptions = {
  rating: [
    { value: 'all', label: 'Tất cả đánh giá' },
    { value: '5', label: '5 sao' },
    { value: '4', label: '4 sao' },
    { value: '3', label: '3 sao' },
    { value: '2', label: '2 sao' },
    { value: '1', label: '1 sao' }
  ],
  orderType: [
    { value: 'all', label: 'Tất cả' },
    { value: 'dine-in', label: 'Tại cửa hàng' },
    { value: 'delivery', label: 'Giao hàng' },
    { value: 'pickup', label: 'Lấy hàng' }
  ],
  location: [
    { value: 'all', label: 'Tất cả cửa hàng' },
    { value: 'GANU Quận 1', label: 'GANU Quận 1' },
    { value: 'GANU Quận 3', label: 'GANU Quận 3' },
    { value: 'GANU Quận 7', label: 'GANU Quận 7' },
    { value: 'GANU Thủ Đức', label: 'GANU Thủ Đức' }
  ]
};

const reviews: Review[] = [
  {
    id: 1,
    customerName: 'Nguyễn Thị Mai',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=happy%20vietnamese%20woman%20customer%20smiling%20portrait%20friendly%20face&image_size=square',
    rating: 5,
    date: '2024-01-15',
    location: 'GANU Quận 1',
    orderType: 'dine-in',
    combos: ['Combo Đặc Biệt', 'Combo Gia Đình'],
    title: 'Gà nướng ngon tuyệt vời, không gian ấm cúng!',
    content: 'Mình đã đến GANU cùng gia đình vào cuối tuần và thực sự rất ấn tượng. Gà nướng có vị rất đặc biệt, da giòn thịt mềm, gia vị thấm đều. Salad tươi ngon, nước sốt đặc biệt rất hợp khẩu vị. Nhân viên phục vụ nhiệt tình, không gian nhà hàng sạch sẽ và ấm cúng. Chắc chắn sẽ quay lại!',
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=delicious%20grilled%20chicken%20combo%20on%20table%20restaurant%20setting%20food%20photography&image_size=landscape_4_3',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=happy%20family%20dining%20at%20ganu%20restaurant%20warm%20atmosphere&image_size=landscape_4_3'
    ],
    likes: 45,
    dislikes: 2,
    helpful: 38,
    verified: true,
    response: {
      author: 'GANU Team',
      date: '2024-01-16',
      content: 'Cảm ơn chị Mai đã dành thời gian chia sẻ trải nghiệm tuyệt vời tại GANU! Chúng tôi rất vui khi gia đình chị hài lòng với món ăn và dịch vụ. Hy vọng sẽ được đón tiếp gia đình chị trong những lần tới. Chúc gia đình chị luôn khỏe mạnh và hạnh phúc! 🧡'
    }
  },
  {
    id: 2,
    customerName: 'Trần Văn Hùng',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=vietnamese%20man%20customer%20satisfied%20expression%20portrait&image_size=square',
    rating: 4,
    date: '2024-01-12',
    location: 'GANU Quận 7',
    orderType: 'delivery',
    combos: ['Combo BBQ Hàn Quốc'],
    title: 'Giao hàng nhanh, món ăn vẫn nóng và ngon',
    content: 'Đặt combo BBQ Hàn Quốc qua app, giao hàng đúng giờ hẹn. Gà nướng vẫn còn nóng, vị BBQ Hàn Quốc rất độc đáo và ngon. Kimchi chua cay vừa phải, rất hợp với gà nướng. Cơm dẻo, salad tươi. Chỉ có điều muốn phần gà to hơn một chút thì tuyệt vời. Nhìn chung rất hài lòng!',
    likes: 32,
    dislikes: 1,
    helpful: 28,
    verified: true,
    response: {
      author: 'GANU Team',
      date: '2024-01-13',
      content: 'Cảm ơn anh Hùng đã tin tưởng đặt hàng GANU! Chúng tôi ghi nhận góp ý về phần gà và sẽ cải thiện trong thời gian tới. Hy vọng anh sẽ tiếp tục ủng hộ GANU! 🔥'
    }
  },
  {
    id: 3,
    customerName: 'Lê Thị Hoa',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=young%20vietnamese%20woman%20happy%20customer%20portrait%20cheerful&image_size=square',
    rating: 5,
    date: '2024-01-10',
    location: 'GANU Quận 3',
    orderType: 'pickup',
    combos: ['Combo Healthy'],
    title: 'Lựa chọn tuyệt vời cho người ăn kiêng!',
    content: 'Mình đang ăn kiêng nên chọn Combo Healthy. Salad rất tươi ngon với nhiều loại rau củ, gà nướng không quá nhiều dầu mỡ, nước ép trái cây tự nhiên rất thơm ngon. Phần ăn vừa đủ, không quá no mà vẫn đảm bảo dinh dưỡng. Giá cả hợp lý. Sẽ đặt thường xuyên!',
    likes: 28,
    dislikes: 0,
    helpful: 25,
    verified: true
  },
  {
    id: 4,
    customerName: 'Phạm Minh Tuấn',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=vietnamese%20young%20man%20customer%20satisfied%20smile%20portrait&image_size=square',
    rating: 3,
    date: '2024-01-08',
    location: 'GANU Thủ Đức',
    orderType: 'dine-in',
    combos: ['Combo Cơ Bản'],
    title: 'Món ăn ngon nhưng thời gian chờ hơi lâu',
    content: 'Gà nướng có vị ngon, gia vị đậm đà. Salad tươi, cơm dẻo. Tuy nhiên, thời gian chờ món hơi lâu (khoảng 25 phút) mặc dù nhà hàng không quá đông. Nhân viên thái độ tốt nhưng cần cải thiện tốc độ phục vụ. Giá cả ổn so với chất lượng.',
    likes: 15,
    dislikes: 3,
    helpful: 12,
    verified: true,
    response: {
      author: 'GANU Team',
      date: '2024-01-09',
      content: 'Cảm ơn anh Tuấn đã góp ý. Chúng tôi xin lỗi về thời gian chờ lâu và sẽ cải thiện quy trình để phục vụ nhanh hơn. Hy vọng anh sẽ cho GANU thêm cơ hội! 🙏'
    }
  },
  {
    id: 5,
    customerName: 'Võ Thị Lan',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=middle%20aged%20vietnamese%20woman%20customer%20kind%20face%20portrait&image_size=square',
    rating: 5,
    date: '2024-01-06',
    location: 'GANU Quận 1',
    orderType: 'dine-in',
    combos: ['Combo Mật Ong'],
    title: 'Combo mật ong tuyệt vời, phù hợp cả gia đình',
    content: 'Đưa cả nhà đến thử combo mật ong sau khi thấy quảng cáo. Gà nướng mật ong có vị ngọt tự nhiên, không quá ngọt, da giòn rụm. Con nhỏ rất thích. Nước sốt đặc biệt rất ngon. Không gian nhà hàng sạch sẽ, có chỗ để xe tiện lợi. Giá cả hợp lý cho chất lượng.',
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=honey%20glazed%20grilled%20chicken%20golden%20color%20appetizing%20food%20photography&image_size=landscape_4_3'
    ],
    likes: 41,
    dislikes: 1,
    helpful: 35,
    verified: true
  },
  {
    id: 6,
    customerName: 'Đặng Văn Nam',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=vietnamese%20man%20customer%20neutral%20expression%20portrait&image_size=square',
    rating: 2,
    date: '2024-01-05',
    location: 'GANU Quận 7',
    orderType: 'delivery',
    combos: ['Combo Cay Đặc Biệt'],
    title: 'Gà hơi khô, giao hàng chậm',
    content: 'Đặt combo cay đặc biệt nhưng gà hơi khô, có lẽ nướng quá lâu. Độ cay vừa phải nhưng thiếu vị đậm đà. Giao hàng chậm hơn dự kiến 20 phút. Salad thì ổn. Hy vọng lần sau sẽ tốt hơn.',
    likes: 8,
    dislikes: 12,
    helpful: 6,
    verified: true,
    response: {
      author: 'GANU Team',
      date: '2024-01-06',
      content: 'Chúng tôi xin lỗi anh Nam về trải nghiệm không như mong đợi. Chúng tôi đã ghi nhận và sẽ cải thiện quy trình nướng cũng như thời gian giao hàng. Xin liên hệ hotline để được hỗ trợ thêm. 📞'
    }
  },
  {
    id: 7,
    customerName: 'Bùi Thị Thu',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=young%20vietnamese%20woman%20customer%20happy%20expression%20portrait&image_size=square',
    rating: 4,
    date: '2024-01-03',
    location: 'GANU Quận 3',
    orderType: 'dine-in',
    combos: ['Combo Tiết Kiệm'],
    title: 'Giá rẻ mà chất lượng tốt',
    content: 'Sinh viên nên chọn combo tiết kiệm, giá chỉ 99k mà được 1/4 con gà + cơm + nước ngọt. Gà nướng vẫn ngon, phần ăn vừa đủ cho một người. Nhân viên thân thiện, không gian thoải mái để ngồi học bài. Wifi mạnh, có ổ cắm điện. Rất phù hợp với sinh viên!',
    likes: 52,
    dislikes: 2,
    helpful: 48,
    verified: true
  },
  {
    id: 8,
    customerName: 'Hoàng Văn Đức',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=vietnamese%20man%20customer%20satisfied%20smile%20portrait&image_size=square',
    rating: 5,
    date: '2024-01-01',
    location: 'GANU Quận 1',
    orderType: 'pickup',
    combos: ['Combo Gia Đình'],
    title: 'Đặt tiệc sinh nhật con, mọi người đều khen ngon!',
    content: 'Đặt combo gia đình cho tiệc sinh nhật con trai 10 tuổi. GANU hỗ trợ rất tốt, có bánh sinh nhật miễn phí, trang trí bàn đẹp. Gà nướng ngon, trẻ con và người lớn đều thích. Phục vụ chu đáo, nhiệt tình. Giá cả hợp lý cho một bữa tiệc ý nghĩa. Cảm ơn GANU!',
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=birthday%20party%20setup%20with%20grilled%20chicken%20family%20celebration%20happy%20atmosphere&image_size=landscape_4_3'
    ],
    likes: 67,
    dislikes: 0,
    helpful: 58,
    verified: true,
    response: {
      author: 'GANU Team',
      date: '2024-01-02',
      content: 'Cảm ơn anh Đức đã tin tưởng chọn GANU cho sinh nhật bé! Chúng tôi rất vui khi cả gia đình hài lòng. Chúc bé sinh nhật vui vẻ và luôn khỏe mạnh! 🎂🎉'
    }
  }
];

const overallStats = {
  totalReviews: 1247,
  averageRating: 4.6,
  ratingDistribution: {
    5: 68,
    4: 22,
    3: 7,
    2: 2,
    1: 1
  }
};

export default function Reviews() {
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedOrderType, setSelectedOrderType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());
  const [helpfulVotes, setHelpfulVotes] = useState<Set<number>>(new Set());

  const filteredReviews = reviews.filter(review => {
    const matchesRating = selectedRating === 'all' || review.rating.toString() === selectedRating;
    const matchesOrderType = selectedOrderType === 'all' || review.orderType === selectedOrderType;
    const matchesLocation = selectedLocation === 'all' || review.location === selectedLocation;
    const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRating && matchesOrderType && matchesLocation && matchesSearch;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const toggleLike = (reviewId: number) => {
    const newLiked = new Set(likedReviews);
    if (newLiked.has(reviewId)) {
      newLiked.delete(reviewId);
    } else {
      newLiked.add(reviewId);
    }
    setLikedReviews(newLiked);
  };

  const toggleHelpful = (reviewId: number) => {
    const newHelpful = new Set(helpfulVotes);
    if (newHelpful.has(reviewId)) {
      newHelpful.delete(reviewId);
    } else {
      newHelpful.add(reviewId);
    }
    setHelpfulVotes(newHelpful);
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };
    
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getOrderTypeLabel = (type: string) => {
    const labels = {
      'dine-in': 'Tại cửa hàng',
      'delivery': 'Giao hàng',
      'pickup': 'Lấy hàng'
    };
    return labels[type as keyof typeof labels] || type;
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
                <Star className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Đánh Giá Khách Hàng
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Khám phá trải nghiệm thực tế từ những khách hàng đã thử GANU
            </p>
            
            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white bg-opacity-10 rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{overallStats.averageRating}/5</div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(overallStats.averageRating), 'lg')}
                </div>
                <div className="text-sm opacity-90">Đánh giá trung bình</div>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{overallStats.totalReviews.toLocaleString()}</div>
                <div className="text-sm opacity-90">Tổng số đánh giá</div>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{overallStats.ratingDistribution[5]}%</div>
                <div className="text-sm opacity-90">Đánh giá 5 sao</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rating Distribution */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Phân bố đánh giá</h2>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-20">
                    <span className="text-sm font-semibold">{rating}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-yellow-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${overallStats.ratingDistribution[rating as keyof typeof overallStats.ratingDistribution]}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">
                    {overallStats.ratingDistribution[rating as keyof typeof overallStats.ratingDistribution]}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm đánh giá..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5" />
                Bộ lọc
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                  <option value="highest">Đánh giá cao nhất</option>
                  <option value="lowest">Đánh giá thấp nhất</option>
                  <option value="helpful">Hữu ích nhất</option>
                </select>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg border border-gray-200">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Đánh giá</label>
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {filterOptions.rating.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Loại đơn hàng</label>
                  <select
                    value={selectedOrderType}
                    onChange={(e) => setSelectedOrderType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {filterOptions.orderType.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Cửa hàng</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {filterOptions.location.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            
            {/* Results Count */}
            <div className="mt-4 text-center text-gray-600">
              Hiển thị {sortedReviews.length} trong tổng số {reviews.length} đánh giá
            </div>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {sortedReviews.length === 0 ? (
              <div className="text-center py-16">
                <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Không tìm thấy đánh giá nào
                </h3>
                <p className="text-gray-500">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {sortedReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Review Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={review.avatar}
                        alt={review.customerName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-800">{review.customerName}</h3>
                          {review.verified && (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                              ✓ Đã xác thực
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(review.date).toLocaleDateString('vi-VN')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{review.location}</span>
                          </div>
                          <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                            {getOrderTypeLabel(review.orderType)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        {renderStars(review.rating)}
                        <div className="text-sm text-gray-500 mt-1">
                          {review.rating}/5
                        </div>
                      </div>
                    </div>

                    {/* Combos */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {review.combos.map((combo, index) => (
                          <span
                            key={index}
                            className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold"
                          >
                            {combo}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-800 mb-2">{review.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{review.content}</p>
                    </div>

                    {/* Review Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="mb-4">
                        <div className="flex gap-2 overflow-x-auto">
                          {review.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Review image ${index + 1}`}
                              className="w-24 h-24 object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Review Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleHelpful(review.id)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                            helpfulVotes.has(review.id)
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
                          }`}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          Hữu ích ({review.helpful + (helpfulVotes.has(review.id) ? 1 : 0)})
                        </button>
                        
                        <button
                          onClick={() => toggleLike(review.id)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                            likedReviews.has(review.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                          }`}
                        >
                          <Heart className="w-4 h-4" />
                          Thích ({review.likes + (likedReviews.has(review.id) ? 1 : 0)})
                        </button>
                        
                        <button className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <Share2 className="w-4 h-4" />
                          Chia sẻ
                        </button>
                        
                        <button className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">
                          <Flag className="w-4 h-4" />
                          Báo cáo
                        </button>
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        {review.dislikes > 0 && (
                          <span className="flex items-center gap-1">
                            <ThumbsDown className="w-4 h-4" />
                            {review.dislikes}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Store Response */}
                    {review.response && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="bg-orange-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-orange-700">{review.response.author}</div>
                              <div className="text-xs text-orange-600">
                                {new Date(review.response.date).toLocaleDateString('vi-VN')}
                              </div>
                            </div>
                          </div>
                          <p className="text-orange-800 leading-relaxed">{review.response.content}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bạn đã thử GANU chưa?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Chia sẻ trải nghiệm của bạn và giúp những khách hàng khác đưa ra lựa chọn tốt nhất!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
              Viết đánh giá
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-orange-600 transition-colors">
              Đặt hàng ngay
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}