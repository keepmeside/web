import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Heart } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Tất cả', count: 12 },
  { id: 'honey', name: 'Mật ong', count: 4 },
  { id: 'teriyaki', name: 'Teriyaki', count: 3 },
  { id: 'spicy', name: 'Cay', count: 3 },
  { id: 'family', name: 'Gia đình', count: 2 }
];

const combos = [
  {
    id: 1,
    name: 'Combo Gà Nướng Mật Ong',
    category: 'honey',
    price: 159000,
    originalPrice: 199000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=honey%20glazed%20grilled%20chicken%20with%20rice%20and%20salad%20golden%20color%20appetizing&image_size=square_hd',
    description: 'Gà nướng tẩm mật ong, cơm trắng, salad tươi, nước sốt đặc biệt',
    rating: 4.8,
    reviews: 156,
    isPopular: true,
    ingredients: ['Gà ta tươi', 'Mật ong nguyên chất', 'Cơm jasmine', 'Salad tươi']
  },
  {
    id: 2,
    name: 'Combo Gà Nướng Teriyaki',
    category: 'teriyaki',
    price: 179000,
    originalPrice: 219000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=teriyaki%20grilled%20chicken%20with%20vegetables%20and%20rice%20japanese%20style%20presentation&image_size=square_hd',
    description: 'Gà nướng sốt Teriyaki Nhật Bản, rau củ nướng, cơm',
    rating: 4.9,
    reviews: 203,
    isPopular: true,
    ingredients: ['Gà ta tươi', 'Sốt Teriyaki', 'Rau củ nướng', 'Cơm jasmine']
  },
  {
    id: 3,
    name: 'Combo Gà Nướng Cay Hàn Quốc',
    category: 'spicy',
    price: 169000,
    originalPrice: 209000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=spicy%20korean%20grilled%20chicken%20with%20kimchi%20and%20rice%20vibrant%20red%20color&image_size=square_hd',
    description: 'Gà nướng cay kiểu Hàn, kimchi, cơm, súp miso',
    rating: 4.7,
    reviews: 89,
    isPopular: false,
    ingredients: ['Gà ta tươi', 'Gia vị Hàn Quốc', 'Kimchi', 'Cơm jasmine']
  },
  {
    id: 4,
    name: 'Combo Gà Nướng BBQ Mỹ',
    category: 'honey',
    price: 189000,
    originalPrice: 229000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=american%20bbq%20grilled%20chicken%20with%20corn%20and%20potato%20rustic%20style&image_size=square_hd',
    description: 'Gà nướng BBQ kiểu Mỹ, khoai tây nướng, bắp nướng',
    rating: 4.6,
    reviews: 124,
    isPopular: false,
    ingredients: ['Gà ta tươi', 'Sốt BBQ', 'Khoai tây', 'Bắp ngọt']
  },
  {
    id: 5,
    name: 'Combo Gà Nướng Gia Đình',
    category: 'family',
    price: 299000,
    originalPrice: 359000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=family%20size%20grilled%20chicken%20platter%20with%20multiple%20sides%20generous%20portion&image_size=square_hd',
    description: 'Combo cho 3-4 người: 2 con gà nướng, cơm, salad, nước sốt',
    rating: 4.8,
    reviews: 67,
    isPopular: true,
    ingredients: ['2 con gà ta', 'Cơm jasmine', 'Salad tổng hợp', 'Nước sốt đa dạng']
  },
  {
    id: 6,
    name: 'Combo Gà Nướng Thái Lan',
    category: 'spicy',
    price: 175000,
    originalPrice: 215000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=thai%20style%20grilled%20chicken%20with%20herbs%20and%20sticky%20rice%20exotic%20presentation&image_size=square_hd',
    description: 'Gà nướng lá chuối Thái, cơm dẻo, rau thơm',
    rating: 4.5,
    reviews: 98,
    isPopular: false,
    ingredients: ['Gà ta tươi', 'Lá chuối', 'Cơm dẻo', 'Rau thơm Thái']
  }
];

export default function Combo() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (comboId: number) => {
    setFavorites(prev => 
      prev.includes(comboId) 
        ? prev.filter(id => id !== comboId)
        : [...prev, comboId]
    );
  };

  const filteredCombos = combos
    .filter(combo => {
      const matchesCategory = selectedCategory === 'all' || combo.category === selectedCategory;
      const matchesSearch = combo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           combo.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      }
    });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-yellow-400 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Menu Combo Gà Nướng 🍗
          </h1>
          <p className="text-xl text-white mb-8">
            Khám phá hương vị đặc biệt từ những combo được yêu thích nhất
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-white shadow-sm sticky top-[72px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm combo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="popular">Phổ biến</option>
                <option value="rating">Đánh giá cao</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Combo Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredCombos.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Không tìm thấy combo nào</h3>
              <p className="text-gray-600">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  Tìm thấy {filteredCombos.length} combo
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCombos.map((combo) => (
                  <div key={combo.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className="relative">
                      <img
                        src={combo.image}
                        alt={combo.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {combo.isPopular && (
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            🔥 Phổ biến
                          </span>
                        )}
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          -{Math.round(((combo.originalPrice - combo.price) / combo.originalPrice) * 100)}%
                        </span>
                      </div>
                      
                      {/* Favorite button */}
                      <button
                        onClick={() => toggleFavorite(combo.id)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                      >
                        <Heart 
                          className={`w-5 h-5 ${
                            favorites.includes(combo.id) 
                              ? 'text-red-500 fill-current' 
                              : 'text-gray-400'
                          }`} 
                        />
                      </button>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{combo.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{combo.description}</p>
                      
                      {/* Ingredients */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {combo.ingredients.slice(0, 3).map((ingredient, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {ingredient}
                            </span>
                          ))}
                          {combo.ingredients.length > 3 && (
                            <span className="text-xs text-gray-500">+{combo.ingredients.length - 3} khác</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Rating */}
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
                      
                      {/* Price */}
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
                      
                      {/* Actions */}
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
              
              {/* Load More */}
              {filteredCombos.length >= 6 && (
                <div className="text-center mt-12">
                  <button className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    Xem thêm combo
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Không tìm thấy combo ưng ý? 🤔
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Liên hệ với chúng tôi để được tư vấn combo phù hợp nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Liên hệ tư vấn
            </Link>
            <Link
              to="/chef-team"
              className="bg-white text-gray-700 px-8 py-3 rounded-full font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Gặp đầu bếp
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}