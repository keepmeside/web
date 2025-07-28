import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, Share2, ArrowLeft, Plus, Minus, ShoppingCart, Clock, Users, Flame } from 'lucide-react';

interface ComboData {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  images: string[];
  description: string;
  detailedDescription: string;
  rating: number;
  reviews: number;
  isPopular: boolean;
  ingredients: string[];
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  cookingTime: number;
  servingSize: number;
  spiceLevel: number;
  allergens: string[];
}

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

const comboData: { [key: string]: ComboData } = {
  '1': {
    id: 1,
    name: 'Combo Gà Nướng Mật Ong',
    category: 'honey',
    price: 159000,
    originalPrice: 199000,
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=honey%20glazed%20grilled%20chicken%20with%20rice%20and%20salad%20golden%20color%20appetizing&image_size=landscape_16_9',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=close%20up%20honey%20glazed%20chicken%20drumstick%20golden%20crispy%20skin&image_size=landscape_16_9',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=honey%20sauce%20dripping%20on%20grilled%20chicken%20macro%20photography&image_size=landscape_16_9'
    ],
    description: 'Gà nướng tẩm mật ong, cơm trắng, salad tươi, nước sốt đặc biệt',
    detailedDescription: 'Combo gà nướng mật ong đặc biệt của GANU được chế biến từ gà ta tươi ngon, ướp với mật ong nguyên chất và các gia vị bí mật. Gà được nướng trên than hồng để tạo nên lớp da vàng ươm, giòn rụm bên ngoài và thịt mềm ngọt bên trong. Kèm theo cơm jasmine thơm dẻo, salad tươi giòn và nước sốt mật ong đặc chế.',
    rating: 4.8,
    reviews: 156,
    isPopular: true,
    ingredients: ['Gà ta tươi (500g)', 'Mật ong nguyên chất', 'Cơm jasmine', 'Salad tổng hợp', 'Nước sốt mật ong', 'Rau thơm'],
    nutritionInfo: {
      calories: 650,
      protein: 45,
      carbs: 55,
      fat: 25
    },
    cookingTime: 25,
    servingSize: 1,
    spiceLevel: 1,
    allergens: ['Gluten', 'Đậu nành']
  },
  '2': {
    id: 2,
    name: 'Combo Gà Nướng Teriyaki',
    category: 'teriyaki',
    price: 179000,
    originalPrice: 219000,
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=teriyaki%20grilled%20chicken%20with%20vegetables%20and%20rice%20japanese%20style%20presentation&image_size=landscape_16_9',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=teriyaki%20sauce%20glazed%20chicken%20thigh%20with%20sesame%20seeds&image_size=landscape_16_9',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20vegetables%20with%20teriyaki%20chicken%20colorful%20presentation&image_size=landscape_16_9'
    ],
    description: 'Gà nướng sốt Teriyaki Nhật Bản, rau củ nướng, cơm',
    detailedDescription: 'Combo gà nướng Teriyaki mang hương vị Nhật Bản đặc trưng với sốt Teriyaki ngọt ngào, đậm đà. Gà được ướp kỹ và nướng chín vừa tới, kèm theo rau củ nướng đầy màu sắc và cơm jasmine. Món ăn hoàn hảo cho những ai yêu thích hương vị Á Đông tinh tế.',
    rating: 4.9,
    reviews: 203,
    isPopular: true,
    ingredients: ['Gà ta tươi (500g)', 'Sốt Teriyaki Nhật Bản', 'Rau củ nướng', 'Cơm jasmine', 'Mè rang', 'Rau thơm Nhật'],
    nutritionInfo: {
      calories: 720,
      protein: 48,
      carbs: 62,
      fat: 28
    },
    cookingTime: 30,
    servingSize: 1,
    spiceLevel: 0,
    allergens: ['Gluten', 'Đậu nành', 'Mè']
  }
};

const reviews: Review[] = [
  {
    id: 1,
    userName: 'Nguyễn Minh Anh',
    rating: 5,
    comment: 'Gà nướng rất ngon, da giòn thịt mềm. Sốt mật ong đậm đà, không quá ngọt. Sẽ quay lại ăn tiếp!',
    date: '2024-01-15',
    images: ['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=customer%20photo%20honey%20grilled%20chicken%20on%20plate%20restaurant%20setting&image_size=square']
  },
  {
    id: 2,
    userName: 'Trần Văn Hùng',
    rating: 4,
    comment: 'Combo rất đầy đặn, phù hợp với giá tiền. Gà nướng thơm ngon, cơm dẻo. Chỉ có điều hơi lâu một chút.',
    date: '2024-01-12'
  },
  {
    id: 3,
    userName: 'Lê Thị Mai',
    rating: 5,
    comment: 'Lần đầu ăn ở GANU, rất ấn tượng! Gà nướng mật ong ngon tuyệt, salad tươi ngon. Nhân viên phục vụ nhiệt tình.',
    date: '2024-01-10'
  }
];

export default function ComboDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [combo, setCombo] = useState<ComboData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (id && comboData[id]) {
      setCombo(comboData[id]);
    }
  }, [id]);

  if (!combo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy combo</h2>
          <p className="text-gray-600 mb-4">Combo bạn tìm kiếm không tồn tại hoặc đã bị xóa</p>
          <Link
            to="/combo"
            className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Quay lại danh sách combo
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of combo ${combo.id} to cart`);
  };

  const handleOrderNow = () => {
    navigate(`/order/${combo.id}?quantity=${quantity}`);
  };

  return (
    <div>
      {/* Breadcrumb & Back Button */}
      <section className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Quay lại
            </button>
            <nav className="text-sm text-gray-600">
              <Link to="/" className="hover:text-orange-500">Trang chủ</Link>
              <span className="mx-2">/</span>
              <Link to="/combo" className="hover:text-orange-500">Combo</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-800">{combo.name}</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="relative mb-4">
                <img
                  src={combo.images[currentImageIndex]}
                  alt={combo.name}
                  className="w-full h-96 object-cover rounded-2xl"
                />
                
                {/* Image Navigation */}
                {combo.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : combo.images.length - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev < combo.images.length - 1 ? prev + 1 : 0)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                    >
                      <ArrowLeft className="w-5 h-5 rotate-180" />
                    </button>
                  </>
                )}
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {combo.isPopular && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      🔥 Phổ biến
                    </span>
                  )}
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{Math.round(((combo.originalPrice - combo.price) / combo.originalPrice) * 100)}%
                  </span>
                </div>
              </div>
              
              {/* Thumbnail Images */}
              {combo.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {combo.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index ? 'border-orange-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${combo.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{combo.name}</h1>
                  <p className="text-gray-600">{combo.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Heart className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                  </button>
                  <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                    <Share2 className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(combo.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-lg font-semibold">{combo.rating}</span>
                <span className="ml-2 text-gray-600">({combo.reviews} đánh giá)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-4xl font-bold text-orange-600">
                    {combo.price.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    {combo.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                <p className="text-green-600 font-semibold">
                  Tiết kiệm {(combo.originalPrice - combo.price).toLocaleString('vi-VN')}đ
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Clock className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                  <div className="text-sm text-gray-600">Thời gian</div>
                  <div className="font-semibold">{combo.cookingTime} phút</div>
                </div>
                <div className="text-center">
                  <Users className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                  <div className="text-sm text-gray-600">Khẩu phần</div>
                  <div className="font-semibold">{combo.servingSize} người</div>
                </div>
                <div className="text-center">
                  <Flame className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                  <div className="text-sm text-gray-600">Độ cay</div>
                  <div className="font-semibold">
                    {combo.spiceLevel === 0 ? 'Không cay' : 
                     combo.spiceLevel === 1 ? 'Nhẹ' :
                     combo.spiceLevel === 2 ? 'Vừa' : 'Cay'}
                  </div>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-semibold">Số lượng:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="text-lg font-semibold mb-4">
                  Tổng cộng: {(combo.price * quantity).toLocaleString('vi-VN')}đ
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Thêm vào giỏ
                  </button>
                  <button
                    onClick={handleOrderNow}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Đặt ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Information Tabs */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b">
              {[
                { id: 'description', label: 'Mô tả chi tiết' },
                { id: 'ingredients', label: 'Thành phần' },
                { id: 'nutrition', label: 'Dinh dưỡng' },
                { id: 'reviews', label: 'Đánh giá' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'text-orange-500 border-b-2 border-orange-500'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Mô tả chi tiết</h3>
                  <p className="text-gray-600 leading-relaxed">{combo.detailedDescription}</p>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Thành phần</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {combo.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                        <span className="text-gray-700">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                  {combo.allergens.length > 0 && (
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Thông tin dị ứng:</h4>
                      <p className="text-yellow-700">Có chứa: {combo.allergens.join(', ')}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Thông tin dinh dưỡng</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-3xl font-bold text-orange-600">{combo.nutritionInfo.calories}</div>
                      <div className="text-gray-600">Calories</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">{combo.nutritionInfo.protein}g</div>
                      <div className="text-gray-600">Protein</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">{combo.nutritionInfo.carbs}g</div>
                      <div className="text-gray-600">Carbs</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-600">{combo.nutritionInfo.fat}g</div>
                      <div className="text-gray-600">Fat</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Đánh giá khách hàng</h3>
                    <Link
                      to={`/reviews?combo=${combo.id}`}
                      className="text-orange-500 hover:text-orange-600 font-semibold"
                    >
                      Xem tất cả
                    </Link>
                  </div>
                  
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-800">{review.userName}</h4>
                            <div className="flex items-center">
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
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-600 mb-3">{review.comment}</p>
                        {review.images && (
                          <div className="flex gap-2">
                            {review.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt="Review"
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Combos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Combo tương tự 🍗
          </h2>
          <div className="text-center">
            <Link
              to="/combo"
              className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Xem thêm combo khác
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}