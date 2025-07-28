import { useState } from 'react';
import {
  Search,
  Filter,
  Star,
  Eye,
  Check,
  X,
  Trash2,
  Calendar,
  User,
  MapPin,
  ShoppingBag,
  Heart,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Image,
  MoreHorizontal,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

// Mock data
const mockReviews = [
  {
    id: 'REV001',
    customerName: 'Nguyễn Văn A',
    customerEmail: 'nguyenvana@email.com',
    customerPhone: '0901234567',
    rating: 5,
    title: 'Gà nướng tuyệt vời!',
    content: 'Combo gà nướng ở đây thực sự ngon, thịt mềm, gia vị đậm đà. Nhân viên phục vụ nhiệt tình. Sẽ quay lại ủng hộ!',
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=delicious%20grilled%20chicken%20combo%20meal%20customer%20photo&image_size=square',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20chicken%20restaurant%20atmosphere%20customer%20dining&image_size=square'
    ],
    orderDate: '2024-01-15',
    reviewDate: '2024-01-16',
    location: 'Chi nhánh Quận 1',
    orderType: 'Tại quán',
    combo: 'Combo Gà Nướng Đặc Biệt',
    status: 'pending',
    isVerified: true,
    likes: 12,
    dislikes: 0,
    helpfulCount: 8,
    response: null,
    responseDate: null,
    tags: ['Ngon', 'Phục vụ tốt', 'Sạch sẽ']
  },
  {
    id: 'REV002',
    customerName: 'Trần Thị B',
    customerEmail: 'tranthib@email.com',
    customerPhone: '0912345678',
    rating: 4,
    title: 'Khá ổn nhưng có thể cải thiện',
    content: 'Gà nướng ngon, tuy nhiên thời gian chờ hơi lâu. Không gian quán thoáng mát. Giá cả hợp lý.',
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20chicken%20combo%20good%20quality%20restaurant%20food&image_size=square'
    ],
    orderDate: '2024-01-14',
    reviewDate: '2024-01-15',
    location: 'Chi nhánh Quận 3',
    orderType: 'Giao hàng',
    combo: 'Combo Gà Nướng Gia Đình',
    status: 'approved',
    isVerified: true,
    likes: 8,
    dislikes: 1,
    helpfulCount: 5,
    response: {
      content: 'Cảm ơn bạn đã đánh giá! Chúng tôi sẽ cải thiện thời gian phục vụ để mang lại trải nghiệm tốt hơn.',
      author: 'GANU Team',
      date: '2024-01-15'
    },
    responseDate: '2024-01-15',
    tags: ['Ngon', 'Chờ lâu', 'Giá tốt']
  },
  {
    id: 'REV003',
    customerName: 'Lê Văn C',
    customerEmail: 'levanc@email.com',
    customerPhone: '0923456789',
    rating: 2,
    title: 'Không như mong đợi',
    content: 'Gà hơi khô, gia vị nhạt. Phục vụ chậm và không nhiệt tình. Cần cải thiện chất lượng.',
    images: [],
    orderDate: '2024-01-13',
    reviewDate: '2024-01-14',
    location: 'Chi nhánh Quận 7',
    orderType: 'Tại quán',
    combo: 'Combo Gà Nướng Cơ Bản',
    status: 'rejected',
    isVerified: false,
    likes: 2,
    dislikes: 5,
    helpfulCount: 1,
    response: {
      content: 'Chúng tôi rất tiếc về trải nghiệm không tốt của bạn. Đội ngũ sẽ kiểm tra và cải thiện chất lượng phục vụ.',
      author: 'GANU Team',
      date: '2024-01-14'
    },
    responseDate: '2024-01-14',
    tags: ['Khô', 'Phục vụ chậm', 'Cần cải thiện']
  },
  {
    id: 'REV004',
    customerName: 'Phạm Thị D',
    customerEmail: 'phamthid@email.com',
    customerPhone: '0934567890',
    rating: 5,
    title: 'Xuất sắc! Sẽ giới thiệu bạn bè',
    content: 'Combo gà nướng rất ngon, thịt mềm, gia vị vừa miệng. Không gian sạch sẽ, nhân viên thân thiện. Giá cả phải chăng.',
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=excellent%20grilled%20chicken%20combo%20five%20star%20quality&image_size=square',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=clean%20restaurant%20interior%20friendly%20staff%20service&image_size=square',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=happy%20customer%20enjoying%20grilled%20chicken%20meal&image_size=square'
    ],
    orderDate: '2024-01-12',
    reviewDate: '2024-01-13',
    location: 'Chi nhánh Quận 5',
    orderType: 'Giao hàng',
    combo: 'Combo Gà Nướng Premium',
    status: 'approved',
    isVerified: true,
    likes: 25,
    dislikes: 0,
    helpfulCount: 18,
    response: {
      content: 'Cảm ơn bạn rất nhiều! Đánh giá của bạn là động lực để chúng tôi tiếp tục cải thiện chất lượng phục vụ.',
      author: 'GANU Team',
      date: '2024-01-13'
    },
    responseDate: '2024-01-13',
    tags: ['Xuất sắc', 'Thân thiện', 'Giá tốt', 'Sạch sẽ']
  },
  {
    id: 'REV005',
    customerName: 'Hoàng Văn E',
    customerEmail: 'hoangvane@email.com',
    customerPhone: '0945678901',
    rating: 3,
    title: 'Bình thường, không có gì đặc biệt',
    content: 'Gà nướng ở mức trung bình, không quá ngon nhưng cũng không tệ. Giá hơi cao so với chất lượng.',
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=average%20grilled%20chicken%20meal%20ordinary%20quality&image_size=square'
    ],
    orderDate: '2024-01-11',
    reviewDate: '2024-01-12',
    location: 'Chi nhánh Quận 2',
    orderType: 'Tại quán',
    combo: 'Combo Gà Nướng Tiêu Chuẩn',
    status: 'pending',
    isVerified: true,
    likes: 3,
    dislikes: 2,
    helpfulCount: 2,
    response: null,
    responseDate: null,
    tags: ['Bình thường', 'Giá cao']
  }
];

const locations = [
  'Tất cả chi nhánh',
  'Chi nhánh Quận 1',
  'Chi nhánh Quận 2',
  'Chi nhánh Quận 3',
  'Chi nhánh Quận 5',
  'Chi nhánh Quận 7'
];

const combos = [
  'Tất cả combo',
  'Combo Gà Nướng Cơ Bản',
  'Combo Gà Nướng Tiêu Chuẩn',
  'Combo Gà Nướng Đặc Biệt',
  'Combo Gà Nướng Gia Đình',
  'Combo Gà Nướng Premium'
];

const AdminReviews = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Tất cả chi nhánh');
  const [selectedCombo, setSelectedCombo] = useState('Tất cả combo');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedOrderType, setSelectedOrderType] = useState('all');
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [currentReview, setCurrentReview] = useState<any>(null);
  const [sortBy, setSortBy] = useState('reviewDate');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.combo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'Tất cả chi nhánh' || review.location === selectedLocation;
    const matchesCombo = selectedCombo === 'Tất cả combo' || review.combo === selectedCombo;
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus;
    const matchesRating = selectedRating === 'all' || review.rating.toString() === selectedRating;
    const matchesOrderType = selectedOrderType === 'all' || review.orderType === selectedOrderType;
    
    return matchesSearch && matchesLocation && matchesCombo && matchesStatus && matchesRating && matchesOrderType;
  }).sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a];
    const bValue = b[sortBy as keyof typeof b];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSelectReview = (reviewId: string) => {
    setSelectedReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const handleSelectAll = () => {
    if (selectedReviews.length === filteredReviews.length) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(filteredReviews.map(review => review.id));
    }
  };

  const handleStatusChange = (reviewId: string, newStatus: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, status: newStatus }
        : review
    ));
  };

  const handleBulkStatusChange = (newStatus: string) => {
    setReviews(prev => prev.map(review => 
      selectedReviews.includes(review.id)
        ? { ...review, status: newStatus }
        : review
    ));
    setSelectedReviews([]);
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
    setSelectedReviews(prev => prev.filter(id => id !== reviewId));
  };

  const handleBulkDelete = () => {
    setReviews(prev => prev.filter(review => !selectedReviews.includes(review.id)));
    setSelectedReviews([]);
  };

  const handleAddResponse = (reviewId: string, responseContent: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            response: {
              content: responseContent,
              author: 'GANU Team',
              date: new Date().toISOString().split('T')[0]
            },
            responseDate: new Date().toISOString().split('T')[0]
          }
        : review
    ));
    setShowResponseModal(false);
    setCurrentReview(null);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Đã duyệt';
      case 'pending':
        return 'Chờ duyệt';
      case 'rejected':
        return 'Từ chối';
      default:
        return 'Không xác định';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quản lý Đánh giá</h1>
          <p className="text-gray-600">Quản lý và phản hồi đánh giá từ khách hàng</p>
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Làm mới
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm khách hàng, nội dung, combo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Location Filter */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          
          {/* Combo Filter */}
          <select
            value={selectedCombo}
            onChange={(e) => setSelectedCombo(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {combos.map(combo => (
              <option key={combo} value={combo}>{combo}</option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ duyệt</option>
            <option value="approved">Đã duyệt</option>
            <option value="rejected">Từ chối</option>
          </select>
          
          {/* Rating Filter */}
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Tất cả đánh giá</option>
            <option value="5">5 sao</option>
            <option value="4">4 sao</option>
            <option value="3">3 sao</option>
            <option value="2">2 sao</option>
            <option value="1">1 sao</option>
          </select>
          
          {/* Order Type Filter */}
          <select
            value={selectedOrderType}
            onChange={(e) => setSelectedOrderType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Tất cả loại đơn</option>
            <option value="Tại quán">Tại quán</option>
            <option value="Giao hàng">Giao hàng</option>
            <option value="Mang về">Mang về</option>
          </select>
          
          {/* Sort */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="reviewDate-desc">Mới nhất</option>
            <option value="reviewDate-asc">Cũ nhất</option>
            <option value="rating-desc">Đánh giá cao</option>
            <option value="rating-asc">Đánh giá thấp</option>
            <option value="likes-desc">Nhiều like</option>
            <option value="helpfulCount-desc">Hữu ích nhất</option>
          </select>
          
          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedLocation('Tất cả chi nhánh');
              setSelectedCombo('Tất cả combo');
              setSelectedStatus('all');
              setSelectedRating('all');
              setSelectedOrderType('all');
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedReviews.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-orange-800">
              Đã chọn {selectedReviews.length} đánh giá
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBulkStatusChange('approved')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Check className="w-4 h-4" />
                Duyệt tất cả
              </button>
              <button
                onClick={() => handleBulkStatusChange('rejected')}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <X className="w-4 h-4" />
                Từ chối tất cả
              </button>
              <button
                onClick={handleBulkDelete}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Xóa đã chọn
              </button>
              <button
                onClick={() => setSelectedReviews([])}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Bỏ chọn
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={selectedReviews.includes(review.id)}
                  onChange={() => handleSelectReview(review.id)}
                  className="mt-1 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-900">{review.customerName}</h3>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-500 ml-1">({review.rating}/5)</span>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                      {getStatusText(review.status)}
                    </span>
                    {review.isVerified && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Đã xác thực
                      </span>
                    )}
                  </div>
                  
                  {/* Review Title */}
                  <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                  
                  {/* Review Content */}
                  <p className="text-gray-700 mb-3 line-clamp-3">{review.content}</p>
                  
                  {/* Images */}
                  {review.images.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {review.images.slice(0, 3).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ))}
                      {review.images.length > 3 && (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-500">
                          +{review.images.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Tags */}
                  {review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {review.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Meta Info */}
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {review.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <ShoppingBag className="w-4 h-4" />
                      {review.combo}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {review.reviewDate}
                    </div>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">{review.orderType}</span>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {review.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsDown className="w-4 h-4" />
                      {review.dislikes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {review.helpfulCount} hữu ích
                    </div>
                  </div>
                  
                  {/* Response */}
                  {review.response && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-orange-800">{review.response.author}</span>
                        <span className="text-sm text-orange-600">{review.response.date}</span>
                      </div>
                      <p className="text-orange-700">{review.response.content}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentReview(review);
                    setShowViewModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 p-2 rounded transition-colors"
                  title="Xem chi tiết"
                >
                  <Eye className="w-4 h-4" />
                </button>
                
                {review.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(review.id, 'approved')}
                      className="text-green-600 hover:text-green-800 p-2 rounded transition-colors"
                      title="Duyệt"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleStatusChange(review.id, 'rejected')}
                      className="text-red-600 hover:text-red-800 p-2 rounded transition-colors"
                      title="Từ chối"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                )}
                
                {!review.response && (
                  <button
                    onClick={() => {
                      setCurrentReview(review);
                      setShowResponseModal(true);
                    }}
                    className="text-orange-600 hover:text-orange-800 p-2 rounded transition-colors"
                    title="Phản hồi"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                )}
                
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="text-red-600 hover:text-red-800 p-2 rounded transition-colors"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredReviews.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy đánh giá</h3>
            <p className="text-gray-500">Thử thay đổi bộ lọc để xem kết quả khác</p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng đánh giá</p>
              <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
            </div>
            <MessageCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Chờ duyệt</p>
              <p className="text-2xl font-bold text-gray-900">
                {reviews.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đã duyệt</p>
              <p className="text-2xl font-bold text-gray-900">
                {reviews.filter(r => r.status === 'approved').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đánh giá trung bình</p>
              <p className="text-2xl font-bold text-gray-900">
                {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đã phản hồi</p>
              <p className="text-2xl font-bold text-gray-900">
                {reviews.filter(r => r.response).length}
              </p>
            </div>
            <MessageCircle className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && currentReview && (
        <ReviewViewModal
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setCurrentReview(null);
          }}
          review={currentReview}
        />
      )}

      {/* Response Modal */}
      {showResponseModal && currentReview && (
        <ResponseModal
          isOpen={showResponseModal}
          onClose={() => {
            setShowResponseModal(false);
            setCurrentReview(null);
          }}
          review={currentReview}
          onSubmit={handleAddResponse}
        />
      )}
    </div>
  );
};

// Review View Modal Component
const ReviewViewModal = ({ isOpen, onClose, review }: any) => {
  if (!isOpen || !review) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Chi tiết đánh giá</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Customer Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Thông tin khách hàng</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
                <p className="text-gray-900">{review.customerName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{review.customerEmail}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <p className="text-gray-900">{review.customerPhone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái xác thực</label>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  review.isVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {review.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Review Info */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                {renderStars(review.rating)}
                <span className="text-lg font-medium text-gray-900">({review.rating}/5)</span>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                review.status === 'approved' ? 'bg-green-100 text-green-800' :
                review.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {review.status === 'approved' ? 'Đã duyệt' :
                 review.status === 'pending' ? 'Chờ duyệt' : 'Từ chối'}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">{review.title}</h3>
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">{review.content}</p>
            
            {/* Images */}
            {review.images.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Hình ảnh đính kèm</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {review.images.map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Tags */}
            {review.tags.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {review.tags.map((tag: string) => (
                    <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Order Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Thông tin đơn hàng</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Combo</label>
                <p className="text-gray-900">{review.combo}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chi nhánh</label>
                <p className="text-gray-900">{review.location}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loại đơn hàng</label>
                <p className="text-gray-900">{review.orderType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đặt hàng</label>
                <p className="text-gray-900">{review.orderDate}</p>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Thống kê tương tác</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-green-500" />
                <span className="text-gray-900">{review.likes} lượt thích</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsDown className="w-5 h-5 text-red-500" />
                <span className="text-gray-900">{review.dislikes} không thích</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-orange-500" />
                <span className="text-gray-900">{review.helpfulCount} đánh giá hữu ích</span>
              </div>
            </div>
          </div>
          
          {/* Response */}
          {review.response && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-medium text-orange-900 mb-2">Phản hồi từ GANU</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-orange-800">{review.response.author}</span>
                <span className="text-sm text-orange-600">{review.response.date}</span>
              </div>
              <p className="text-orange-700">{review.response.content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Response Modal Component
const ResponseModal = ({ isOpen, onClose, review, onSubmit }: any) => {
  const [responseContent, setResponseContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (responseContent.trim()) {
      onSubmit(review.id, responseContent.trim());
      setResponseContent('');
    }
  };

  if (!isOpen || !review) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Phản hồi đánh giá</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Review Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-gray-900">{review.customerName}</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">{review.title}</h3>
            <p className="text-gray-700 text-sm">{review.content}</p>
          </div>
          
          {/* Response Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nội dung phản hồi *
              </label>
              <textarea
                required
                value={responseContent}
                onChange={(e) => setResponseContent(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Nhập nội dung phản hồi cho khách hàng..."
              />
              <p className="text-sm text-gray-500 mt-1">
                Phản hồi sẽ được hiển thị công khai dưới đánh giá của khách hàng.
              </p>
            </div>
            
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Gửi phản hồi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;