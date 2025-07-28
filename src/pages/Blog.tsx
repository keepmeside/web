import { useState } from 'react';
import { Search, Calendar, User, Eye, Heart, MessageCircle, Tag, Filter, ChevronRight, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  publishDate: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  category: string;
  tags: string[];
  featuredImage: string;
  featured: boolean;
}

const categories = [
  { value: 'all', label: 'Tất cả bài viết', count: 24 },
  { value: 'recipe', label: 'Công thức nấu ăn', count: 8 },
  { value: 'tips', label: 'Mẹo vặt', count: 6 },
  { value: 'nutrition', label: 'Dinh dưỡng', count: 4 },
  { value: 'story', label: 'Câu chuyện GANU', count: 3 },
  { value: 'news', label: 'Tin tức', count: 3 }
];

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'bi-quyet-nuong-ga-hoan-hao',
    title: 'Bí Quyết Nướng Gà Hoàn Hảo Như Đầu Bếp GANU',
    excerpt: 'Khám phá những bí mật đằng sau món gà nướng đặc trưng của GANU. Từ cách chọn gà, ướp gia vị đến kỹ thuật nướng để có được da giòn thịt mềm.',
    content: '',
    author: 'Chef Minh Tuấn',
    authorAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20vietnamese%20chef%20portrait%20friendly%20smile&image_size=square',
    publishDate: '2024-01-15',
    readTime: 8,
    views: 2450,
    likes: 156,
    comments: 23,
    category: 'recipe',
    tags: ['gà nướng', 'công thức', 'bí quyết', 'đầu bếp'],
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=perfectly%20grilled%20chicken%20golden%20crispy%20skin%20professional%20food%20photography&image_size=landscape_16_9',
    featured: true
  },
  {
    id: 2,
    slug: 'cach-chon-ga-tuoi-ngon',
    title: 'Cách Chọn Gà Tươi Ngon Cho Bữa Cơm Gia Đình',
    excerpt: 'Hướng dẫn chi tiết cách nhận biết gà tươi, gà ta, gà công nghiệp và những tiêu chí quan trọng khi mua gà để đảm bảo chất lượng và an toàn thực phẩm.',
    content: '',
    author: 'Chuyên gia Dinh Dưỡng',
    authorAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=nutrition%20expert%20vietnamese%20woman%20professional%20portrait&image_size=square',
    publishDate: '2024-01-12',
    readTime: 6,
    views: 1890,
    likes: 98,
    comments: 15,
    category: 'tips',
    tags: ['chọn gà', 'mẹo vặt', 'an toàn thực phẩm'],
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20chicken%20selection%20market%20quality%20food%20safety&image_size=landscape_16_9',
    featured: false
  },
  {
    id: 3,
    slug: 'gia-tri-dinh-duong-ga-nuong',
    title: 'Giá Trị Dinh Dưỡng Tuyệt Vời Của Gà Nướng',
    excerpt: 'Tìm hiểu về hàm lượng protein, vitamin và khoáng chất trong gà nướng. Tại sao gà nướng là lựa chọn tốt cho người tập gym và ăn kiêng.',
    content: '',
    author: 'BS. Nguyễn Thị Lan',
    authorAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=female%20doctor%20nutritionist%20vietnamese%20professional%20portrait&image_size=square',
    publishDate: '2024-01-10',
    readTime: 5,
    views: 1654,
    likes: 87,
    comments: 12,
    category: 'nutrition',
    tags: ['dinh dưỡng', 'protein', 'sức khỏe', 'gym'],
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=nutritional%20value%20grilled%20chicken%20healthy%20eating%20infographic&image_size=landscape_16_9',
    featured: true
  },
  {
    id: 4,
    slug: 'hanh-trinh-phat-trien-ganu',
    title: 'Hành Trình 10 Năm Phát Triển Thương Hiệu GANU',
    excerpt: 'Câu chuyện về hành trình từ một quán gà nướng nhỏ đến chuỗi nhà hàng được yêu thích. Những thử thách, thành công và bài học quý báu.',
    content: '',
    author: 'GANU Team',
    authorAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=ganu%20team%20logo%20brand%20identity%20professional&image_size=square',
    publishDate: '2024-01-08',
    readTime: 10,
    views: 3200,
    likes: 245,
    comments: 34,
    category: 'story',
    tags: ['thương hiệu', 'câu chuyện', 'phát triển', 'GANU'],
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=ganu%20restaurant%20development%20journey%20timeline%20success%20story&image_size=landscape_16_9',
    featured: true
  },
  {
    id: 5,
    slug: 'meo-lam-salad-tuoi-ngon',
    title: '5 Mẹo Làm Salad Tươi Ngon Đi Kèm Gà Nướng',
    excerpt: 'Hướng dẫn cách làm các loại salad đơn giản, bổ dưỡng và ngon miệng để kết hợp hoàn hảo với gà nướng. Từ salad rau củ đến salad trái cây.',
    content: '',
    author: 'Chef Thảo Nguyên',
    authorAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=female%20chef%20vietnamese%20salad%20expert%20portrait&image_size=square',
    publishDate: '2024-01-06',
    readTime: 7,
    views: 1456,
    likes: 76,
    comments: 18,
    category: 'recipe',
    tags: ['salad', 'rau củ', 'công thức', 'healthy'],
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20colorful%20salad%20vegetables%20healthy%20food%20photography&image_size=landscape_16_9',
    featured: false
  },
  {
    id: 6,
    slug: 'xu-huong-an-uong-2024',
    title: 'Xu Hướng Ăn Uống Healthy 2024: Gà Nướng Dẫn Đầu',
    excerpt: 'Phân tích xu hướng ăn uống lành mạnh năm 2024 và vị trí của gà nướng trong thực đơn healthy. Tại sao gà nướng được ưa chuộng?',
    content: '',
    author: 'Chuyên gia Ẩm thực',
    authorAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=food%20expert%20analyst%20vietnamese%20professional%20portrait&image_size=square',
    publishDate: '2024-01-04',
    readTime: 6,
    views: 2100,
    likes: 134,
    comments: 21,
    category: 'news',
    tags: ['xu hướng', 'healthy', '2024', 'thị trường'],
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=healthy%20eating%20trend%202024%20grilled%20chicken%20lifestyle&image_size=landscape_16_9',
    featured: false
  },
  {
    id: 7,
    slug: 'cach-bao-quan-ga-nuong',
    title: 'Cách Bảo Quản Gà Nướng Để Giữ Nguyên Hương Vị',
    excerpt: 'Mẹo bảo quản gà nướng trong tủ lạnh, cách hâm nóng lại để giữ được độ giòn của da và độ mềm của thịt. Thời gian bảo quản tối đa.',
    content: '',
    author: 'Chuyên gia An toàn Thực phẩm',
    authorAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=food%20safety%20expert%20vietnamese%20professional%20portrait&image_size=square',
    publishDate: '2024-01-02',
    readTime: 4,
    views: 1234,
    likes: 65,
    comments: 9,
    category: 'tips',
    tags: ['bảo quản', 'an toàn', 'mẹo vặt'],
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=food%20storage%20preservation%20grilled%20chicken%20refrigerator&image_size=landscape_16_9',
    featured: false
  },
  {
    id: 8,
    slug: 'combo-ga-nuong-cho-tre-em',
    title: 'Thiết Kế Combo Gà Nướng Phù Hợp Cho Trẻ Em',
    excerpt: 'Hướng dẫn cách điều chỉnh khẩu phần, độ cay và cách trình bày để thu hút trẻ em. Những lưu ý về dinh dưỡng cho trẻ khi ăn gà nướng.',
    content: '',
    author: 'Chuyên gia Dinh dưỡng Trẻ em',
    authorAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=child%20nutrition%20expert%20vietnamese%20woman%20professional&image_size=square',
    publishDate: '2023-12-30',
    readTime: 5,
    views: 1567,
    likes: 89,
    comments: 16,
    category: 'nutrition',
    tags: ['trẻ em', 'dinh dưỡng', 'gia đình'],
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=kid%20friendly%20grilled%20chicken%20meal%20colorful%20presentation&image_size=landscape_16_9',
    featured: false
  }
];

const popularTags = [
  'gà nướng', 'công thức', 'mẹo vặt', 'dinh dưỡng', 'healthy', 
  'bí quyết', 'an toàn thực phẩm', 'gia đình', 'đầu bếp', 'GANU'
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'mostLiked'>('latest');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPosts = blogPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      return matchesSearch && matchesCategory && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.views - a.views;
        case 'mostLiked':
          return b.likes - a.likes;
        default:
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      }
    });

  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
                <MessageCircle className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Blog GANU
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Khám phá thế giới ẩm thực gà nướng cùng những bí quyết từ đầu bếp
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>Cập nhật hàng tuần</span>
              </div>
              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <Heart className="w-5 h-5 text-red-300" />
                <span>Từ đầu bếp chuyên nghiệp</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Bài Viết Nổi Bật ⭐
            </h2>
            <p className="text-lg text-gray-600">
              Những bài viết được yêu thích nhất từ cộng đồng GANU
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className={`group ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`relative ${index === 0 ? 'h-80' : 'h-48'}`}>
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {categories.find(cat => cat.value === post.category)?.label}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{post.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`p-6 ${index === 0 ? 'lg:p-8' : ''}`}>
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} phút đọc</span>
                      </div>
                    </div>
                    <h3 className={`font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors ${index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                      {post.title}
                    </h3>
                    <p className={`text-gray-600 mb-4 ${index === 0 ? 'text-lg' : ''}`}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-orange-600 font-semibold group-hover:gap-2 transition-all">
                        <span>Đọc tiếp</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết, công thức, mẹo vặt..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>
              
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular' | 'mostLiked')}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="latest">Mới nhất</option>
                <option value="popular">Phổ biến</option>
                <option value="mostLiked">Yêu thích nhất</option>
              </select>
              
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                <span>Lọc</span>
              </button>
            </div>
            
            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Lọc theo thẻ:</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag('')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      !selectedTag
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Tất cả
                  </button>
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedTag === tag
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Tất Cả Bài Viết ({filteredPosts.length})
            </h2>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Không tìm thấy bài viết nào
              </h3>
              <p className="text-gray-600 mb-6">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedTag('');
                }}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Xóa bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative h-48">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {categories.find(cat => cat.value === post.category)?.label}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.publishDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime} phút</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-orange-600 font-semibold group-hover:gap-2 transition-all">
                          <span>Đọc tiếp</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                      
                      {/* Tags */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-gray-400 text-xs">+{post.tags.length - 3}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Đăng Ký Nhận Bài Viết Mới 📧
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Nhận những bài viết mới nhất về công thức nấu ăn và mẹo vặt từ GANU
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Đăng ký
              </button>
            </div>
            <p className="text-sm mt-4 opacity-75">
              Chúng tôi cam kết không spam và bảo mật thông tin của bạn
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}