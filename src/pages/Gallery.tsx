import { useState } from 'react';
import { Search, Filter, Download, Share2, Heart, Eye, X, ChevronLeft, ChevronRight, Camera, MapPin, Calendar } from 'lucide-react';

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  location: string;
  date: string;
  photographer?: string;
  likes: number;
  views: number;
  tags: string[];
}

const categories = [
  { id: 'all', name: 'Tất cả', count: 48 },
  { id: 'food', name: 'Món ăn', count: 20 },
  { id: 'restaurant', name: 'Nhà hàng', count: 12 },
  { id: 'chef', name: 'Đầu bếp', count: 8 },
  { id: 'customer', name: 'Khách hàng', count: 8 }
];

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    title: 'Gà nướng mật ong đặc biệt',
    category: 'food',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=delicious%20honey%20glazed%20grilled%20chicken%20on%20wooden%20plate%20with%20herbs%20professional%20food%20photography%20golden%20lighting&image_size=landscape_4_3',
    description: 'Combo gà nướng mật ong với lớp da giòn rụm, thịt mềm ngọt được tẩm ướp gia vị đặc biệt',
    location: 'GANU Quận 1',
    date: '2024-01-15',
    photographer: 'Chef Minh',
    likes: 245,
    views: 1520,
    tags: ['gà nướng', 'mật ong', 'combo đặc biệt']
  },
  {
    id: 2,
    title: 'Không gian nhà hàng hiện đại',
    category: 'restaurant',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20vietnamese%20restaurant%20interior%20warm%20lighting%20wooden%20tables%20orange%20accents%20cozy%20atmosphere&image_size=landscape_16_9',
    description: 'Không gian ấm cúng với thiết kế hiện đại, tạo cảm giác thoải mái cho thực khách',
    location: 'GANU Quận 3',
    date: '2024-01-10',
    photographer: 'GANU Team',
    likes: 189,
    views: 980,
    tags: ['nhà hàng', 'thiết kế', 'không gian']
  },
  {
    id: 3,
    title: 'Chef Minh đang nướng gà',
    category: 'chef',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20vietnamese%20chef%20grilling%20chicken%20over%20charcoal%20fire%20focused%20expression%20kitchen%20action%20shot&image_size=portrait_4_3',
    description: 'Bếp trưởng Minh đang tập trung nướng gà với kỹ thuật than hoa truyền thống',
    location: 'GANU Quận 1',
    date: '2024-01-12',
    photographer: 'GANU Media',
    likes: 156,
    views: 750,
    tags: ['đầu bếp', 'nướng gà', 'than hoa']
  },
  {
    id: 4,
    title: 'Gia đình thưởng thức combo',
    category: 'customer',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=happy%20vietnamese%20family%20enjoying%20grilled%20chicken%20meal%20together%20restaurant%20setting%20smiling%20faces&image_size=landscape_4_3',
    description: 'Gia đình khách hàng vui vẻ thưởng thức bữa ăn tại GANU',
    location: 'GANU Quận 7',
    date: '2024-01-08',
    photographer: 'GANU Team',
    likes: 203,
    views: 1100,
    tags: ['khách hàng', 'gia đình', 'hạnh phúc']
  },
  {
    id: 5,
    title: 'Combo gà nướng BBQ Hàn Quốc',
    category: 'food',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=korean%20style%20bbq%20grilled%20chicken%20with%20kimchi%20side%20dishes%20modern%20presentation%20food%20photography&image_size=square_hd',
    description: 'Sự kết hợp độc đáo giữa gà nướng Việt Nam và hương vị BBQ Hàn Quốc',
    location: 'GANU Thủ Đức',
    date: '2024-01-14',
    photographer: 'Chef Lan',
    likes: 178,
    views: 890,
    tags: ['fusion', 'hàn quốc', 'bbq']
  },
  {
    id: 6,
    title: 'Khu vực bếp mở',
    category: 'restaurant',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=open%20kitchen%20restaurant%20design%20chefs%20working%20modern%20equipment%20clean%20professional%20environment&image_size=landscape_16_9',
    description: 'Khu vực bếp mở cho phép khách hàng quan sát quá trình chế biến món ăn',
    location: 'GANU Quận 1',
    date: '2024-01-11',
    photographer: 'GANU Team',
    likes: 134,
    views: 670,
    tags: ['bếp mở', 'trong suốt', 'chuyên nghiệp']
  },
  {
    id: 7,
    title: 'Chef Hương chuẩn bị nước sốt',
    category: 'chef',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=female%20chef%20preparing%20special%20sauce%20in%20kitchen%20concentrated%20expression%20professional%20cooking&image_size=portrait_4_3',
    description: 'Phó bếp trưởng Hương đang chuẩn bị nước sốt đặc biệt cho combo gà nướng',
    location: 'GANU Quận 3',
    date: '2024-01-13',
    photographer: 'GANU Media',
    likes: 167,
    views: 820,
    tags: ['đầu bếp', 'nước sốt', 'chế biến']
  },
  {
    id: 8,
    title: 'Nhóm bạn trẻ check-in',
    category: 'customer',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=group%20of%20young%20vietnamese%20friends%20taking%20selfie%20with%20grilled%20chicken%20meal%20happy%20restaurant%20atmosphere&image_size=landscape_4_3',
    description: 'Nhóm bạn trẻ vui vẻ chụp ảnh check-in cùng combo gà nướng GANU',
    location: 'GANU Quận 7',
    date: '2024-01-09',
    photographer: 'Customer',
    likes: 289,
    views: 1350,
    tags: ['bạn trẻ', 'check-in', 'vui vẻ']
  },
  {
    id: 9,
    title: 'Salad tươi kèm gà nướng',
    category: 'food',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20salad%20with%20grilled%20chicken%20colorful%20vegetables%20healthy%20meal%20food%20photography%20vibrant%20colors&image_size=square_hd',
    description: 'Salad tươi ngon với rau củ đa dạng, kết hợp hoàn hảo với gà nướng',
    location: 'GANU Quận 3',
    date: '2024-01-16',
    photographer: 'Chef Hương',
    likes: 145,
    views: 720,
    tags: ['salad', 'tươi ngon', 'healthy']
  },
  {
    id: 10,
    title: 'Khu vực VIP sang trọng',
    category: 'restaurant',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20vip%20dining%20area%20elegant%20furniture%20warm%20lighting%20private%20space%20upscale%20restaurant&image_size=landscape_16_9',
    description: 'Khu vực VIP với thiết kế sang trọng, phục vụ các dịp đặc biệt',
    location: 'GANU Quận 1',
    date: '2024-01-07',
    photographer: 'GANU Team',
    likes: 198,
    views: 950,
    tags: ['vip', 'sang trọng', 'đặc biệt']
  },
  {
    id: 11,
    title: 'Chef Nam kiểm tra độ chín',
    category: 'chef',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=chef%20checking%20grilled%20chicken%20doneness%20professional%20technique%20charcoal%20grill%20expertise&image_size=portrait_4_3',
    description: 'Chuyên gia nướng Nam đang kiểm tra độ chín hoàn hảo của gà nướng',
    location: 'GANU Quận 7',
    date: '2024-01-14',
    photographer: 'GANU Media',
    likes: 123,
    views: 650,
    tags: ['chuyên gia', 'kiểm tra', 'hoàn hảo']
  },
  {
    id: 12,
    title: 'Cặp đôi hẹn hò lãng mạn',
    category: 'customer',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=romantic%20young%20couple%20dining%20together%20candlelight%20grilled%20chicken%20dinner%20intimate%20atmosphere&image_size=landscape_4_3',
    description: 'Cặp đôi trẻ thưởng thức bữa tối lãng mạn với combo gà nướng đặc biệt',
    location: 'GANU Quận 3',
    date: '2024-01-06',
    photographer: 'GANU Team',
    likes: 234,
    views: 1200,
    tags: ['cặp đôi', 'lãng mạn', 'hẹn hò']
  }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredImages = galleryImages.filter(image => {
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const openImageModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentImageIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentImageIndex + 1) % filteredImages.length;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const toggleLike = (imageId: number) => {
    const newLikedImages = new Set(likedImages);
    if (newLikedImages.has(imageId)) {
      newLikedImages.delete(imageId);
    } else {
      newLikedImages.add(imageId);
    }
    setLikedImages(newLikedImages);
  };

  const downloadImage = (image: GalleryImage) => {
    // Simulate image download
    const link = document.createElement('a');
    link.href = image.image;
    link.download = `GANU_${image.title.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareImage = async (image: GalleryImage) => {
    const shareData = {
      title: image.title,
      text: image.description,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${image.title} - ${image.description}\n${window.location.href}`
        );
        alert('Đã sao chép link chia sẻ!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
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
                <Camera className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Thư Viện Hình Ảnh GANU
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Khám phá những khoảnh khắc đẹp nhất tại GANU qua ống kính
            </p>
            <div className="flex justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold">{galleryImages.length}+</div>
                <div className="text-sm opacity-90">Hình ảnh</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{categories.length - 1}</div>
                <div className="text-sm opacity-90">Danh mục</div>
              </div>
              <div>
                <div className="text-3xl font-bold">4</div>
                <div className="text-sm opacity-90">Cửa hàng</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm hình ảnh..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg"
            >
              <Filter className="w-5 h-5" />
              Bộ lọc
            </button>

            {/* Desktop Categories */}
            <div className="hidden lg:flex gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedCategory === category.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Categories */}
          {isFilterOpen && (
            <div className="lg:hidden mt-4 grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setIsFilterOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedCategory === category.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredImages.length === 0 ? (
            <div className="text-center py-16">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Không tìm thấy hình ảnh nào
              </h3>
              <p className="text-gray-500">
                Thử thay đổi từ khóa tìm kiếm hoặc danh mục
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => openImageModal(image)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(image.id);
                          }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            likedImages.has(image.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white bg-opacity-90 text-gray-700 hover:bg-red-500 hover:text-white'
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${likedImages.has(image.id) ? 'fill-current' : ''}`} />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            shareImage(image);
                          }}
                          className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-colors"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadImage(image);
                          }}
                          className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-green-500 hover:text-white transition-colors"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {categories.find(cat => cat.id === image.category)?.name}
                      </span>
                    </div>
                    
                    {/* Stats */}
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span>{image.likes + (likedImages.has(image.id) ? 1 : 0)}</span>
                      </div>
                      <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{image.views}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{image.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{image.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{image.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(image.date).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Image */}
              <div className="relative">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Details */}
              <div className="p-6 lg:p-8 overflow-y-auto">
                <div className="mb-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {categories.find(cat => cat.id === selectedImage.category)?.name}
                  </span>
                </div>
                
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                  {selectedImage.title}
                </h2>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {selectedImage.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Địa điểm:</h4>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedImage.location}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Ngày chụp:</h4>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedImage.date).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  
                  {selectedImage.photographer && (
                    <div className="col-span-2">
                      <h4 className="font-semibold text-gray-800 mb-1">Người chụp:</h4>
                      <p className="text-gray-600 flex items-center gap-1">
                        <Camera className="w-4 h-4" />
                        {selectedImage.photographer}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Heart className="w-5 h-5" />
                      <span>{selectedImage.likes + (likedImages.has(selectedImage.id) ? 1 : 0)} lượt thích</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Eye className="w-5 h-5" />
                      <span>{selectedImage.views} lượt xem</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleLike(selectedImage.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                      likedImages.has(selectedImage.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${likedImages.has(selectedImage.id) ? 'fill-current' : ''}`} />
                    Thích
                  </button>
                  
                  <button
                    onClick={() => shareImage(selectedImage)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    Chia sẻ
                  </button>
                  
                  <button
                    onClick={() => downloadImage(selectedImage)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Tải về
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-yellow-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Chia Sẻ Khoảnh Khắc Của Bạn! 📸
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Hãy chia sẻ những hình ảnh đẹp khi thưởng thức món ăn tại GANU. 
            Chúng tôi sẽ đăng những bức ảnh xuất sắc nhất lên thư viện!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Gửi hình ảnh
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
              Xem hướng dẫn
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}