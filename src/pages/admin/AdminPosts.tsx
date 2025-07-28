import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  Clock,
  MoreHorizontal,
  RefreshCw,
  Download,
  Upload,
  X,
  Save,
  Image,
  FileText,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp
} from 'lucide-react';

// Mock data
const mockPosts = [
  {
    id: 'POST001',
    title: 'Bí quyết nướng gà ngon như nhà hàng tại nhà',
    slug: 'bi-quyet-nuong-ga-ngon-nhu-nha-hang-tai-nha',
    excerpt: 'Khám phá những bí quyết đơn giản để có thể nướng gà thơm ngon, đậm đà hương vị ngay tại nhà của bạn.',
    content: 'Nội dung chi tiết về cách nướng gà...',
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20chicken%20cooking%20tips%20kitchen%20tutorial%20vietnamese%20style&image_size=landscape_16_9',
    category: 'Mẹo nấu ăn',
    tags: ['Gà nướng', 'Mẹo hay', 'Nấu ăn'],
    author: 'Chef Minh',
    status: 'published',
    publishedAt: '2024-01-15',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
    views: 1250,
    likes: 89,
    comments: 23,
    shares: 15,
    readTime: 5,
    isFeatured: true,
    seoTitle: 'Bí quyết nướng gà ngon như nhà hàng | GANU',
    seoDescription: 'Học cách nướng gà thơm ngon với những bí quyết từ đầu bếp chuyên nghiệp. Hướng dẫn chi tiết từ A-Z.',
    seoKeywords: 'nướng gà, mẹo nấu ăn, gà nướng ngon'
  },
  {
    id: 'POST002',
    title: 'Lịch sử và văn hóa ẩm thực gà nướng Việt Nam',
    slug: 'lich-su-va-van-hoa-am-thuc-ga-nuong-viet-nam',
    excerpt: 'Tìm hiểu về nguồn gốc và sự phát triển của món gà nướng trong văn hóa ẩm thực Việt Nam qua các thời kỳ.',
    content: 'Nội dung về lịch sử gà nướng...',
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=vietnamese%20grilled%20chicken%20history%20traditional%20culture%20food&image_size=landscape_16_9',
    category: 'Văn hóa ẩm thực',
    tags: ['Lịch sử', 'Văn hóa', 'Truyền thống'],
    author: 'Nguyễn Văn A',
    status: 'published',
    publishedAt: '2024-01-12',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-12',
    views: 890,
    likes: 67,
    comments: 18,
    shares: 12,
    readTime: 8,
    isFeatured: false,
    seoTitle: 'Lịch sử gà nướng Việt Nam | GANU Blog',
    seoDescription: 'Khám phá nguồn gốc và văn hóa ẩm thực gà nướng truyền thống Việt Nam.',
    seoKeywords: 'lịch sử gà nướng, văn hóa ẩm thực, truyền thống việt nam'
  },
  {
    id: 'POST003',
    title: 'Top 10 combo gà nướng được yêu thích nhất tại GANU',
    slug: 'top-10-combo-ga-nuong-duoc-yeu-thich-nhat-tai-ganu',
    excerpt: 'Điểm qua những combo gà nướng hot nhất, được khách hàng đánh giá cao và đặt nhiều nhất tại GANU.',
    content: 'Nội dung về top combo...',
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=top%20grilled%20chicken%20combos%20popular%20delicious%20restaurant%20menu&image_size=landscape_16_9',
    category: 'Sản phẩm',
    tags: ['Combo', 'Bestseller', 'Menu'],
    author: 'Marketing Team',
    status: 'draft',
    publishedAt: null,
    createdAt: '2024-01-14',
    updatedAt: '2024-01-16',
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    readTime: 6,
    isFeatured: false,
    seoTitle: 'Top 10 combo gà nướng hot nhất | GANU',
    seoDescription: 'Khám phá những combo gà nướng được yêu thích nhất tại GANU với hương vị đặc biệt.',
    seoKeywords: 'combo gà nướng, menu ganu, món ngon'
  },
  {
    id: 'POST004',
    title: 'Dinh dưỡng và lợi ích sức khỏe từ thịt gà nướng',
    slug: 'dinh-duong-va-loi-ich-suc-khoe-tu-thit-ga-nuong',
    excerpt: 'Tìm hiểu về giá trị dinh dưỡng và những lợi ích tuyệt vời mà thịt gà nướng mang lại cho sức khỏe.',
    content: 'Nội dung về dinh dưỡng...',
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=healthy%20grilled%20chicken%20nutrition%20benefits%20wellness%20food&image_size=landscape_16_9',
    category: 'Sức khỏe',
    tags: ['Dinh dưỡng', 'Sức khỏe', 'Protein'],
    author: 'Dr. Lan Anh',
    status: 'published',
    publishedAt: '2024-01-10',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-10',
    views: 756,
    likes: 45,
    comments: 12,
    shares: 8,
    readTime: 7,
    isFeatured: true,
    seoTitle: 'Dinh dưỡng từ gà nướng | GANU Health',
    seoDescription: 'Khám phá giá trị dinh dưỡng và lợi ích sức khỏe từ thịt gà nướng chất lượng.',
    seoKeywords: 'dinh dưỡng gà nướng, sức khỏe, protein'
  },
  {
    id: 'POST005',
    title: 'Câu chuyện thành lập và phát triển thương hiệu GANU',
    slug: 'cau-chuyen-thanh-lap-va-phat-trien-thuong-hieu-ganu',
    excerpt: 'Hành trình từ một quán gà nướng nhỏ đến thương hiệu ẩm thực được yêu thích trên toàn quốc.',
    content: 'Nội dung về câu chuyện GANU...',
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=ganu%20brand%20story%20restaurant%20development%20success%20journey&image_size=landscape_16_9',
    category: 'Về GANU',
    tags: ['Thương hiệu', 'Câu chuyện', 'Phát triển'],
    author: 'CEO GANU',
    status: 'published',
    publishedAt: '2024-01-08',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-08',
    views: 2100,
    likes: 156,
    comments: 45,
    shares: 32,
    readTime: 10,
    isFeatured: true,
    seoTitle: 'Câu chuyện thương hiệu GANU | Về chúng tôi',
    seoDescription: 'Tìm hiểu hành trình phát triển của thương hiệu gà nướng GANU từ những ngày đầu.',
    seoKeywords: 'thương hiệu ganu, câu chuyện, phát triển'
  }
];

const categories = [
  'Tất cả',
  'Mẹo nấu ăn',
  'Văn hóa ẩm thực',
  'Sản phẩm',
  'Sức khỏe',
  'Về GANU',
  'Khuyến mãi',
  'Sự kiện'
];

const AdminPosts = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Tất cả' || post.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a];
    const bValue = b[sortBy as keyof typeof b];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSelectPost = (postId: string) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map(post => post.id));
    }
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    setSelectedPosts(prev => prev.filter(id => id !== postId));
  };

  const handleBulkDelete = () => {
    setPosts(prev => prev.filter(post => !selectedPosts.includes(post.id)));
    setSelectedPosts([]);
  };

  const handleStatusChange = (postId: string, newStatus: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : post
    ));
  };

  const handleCreatePost = (postData: any) => {
    const newPost = {
      ...postData,
      id: `POST${String(posts.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0
    };
    setPosts(prev => [newPost, ...prev]);
    setShowCreateModal(false);
  };

  const handleEditPost = (postData: any) => {
    setPosts(prev => prev.map(post => 
      post.id === currentPost.id 
        ? { ...post, ...postData, updatedAt: new Date().toISOString().split('T')[0] }
        : post
    ));
    setShowEditModal(false);
    setCurrentPost(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quản lý Bài viết</h1>
          <p className="text-gray-600">Quản lý nội dung blog và bài viết của website</p>
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tạo bài viết
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Xuất dữ liệu
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết, tác giả, tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="published">Đã xuất bản</option>
            <option value="draft">Bản nháp</option>
            <option value="archived">Lưu trữ</option>
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
            <option value="updatedAt-desc">Mới nhất</option>
            <option value="updatedAt-asc">Cũ nhất</option>
            <option value="views-desc">Lượt xem cao</option>
            <option value="likes-desc">Lượt thích cao</option>
            <option value="title-asc">Tên A-Z</option>
            <option value="title-desc">Tên Z-A</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedPosts.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-orange-800">
              Đã chọn {selectedPosts.length} bài viết
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Xóa đã chọn
              </button>
              <button
                onClick={() => setSelectedPosts([])}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Bỏ chọn
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-900">Bài viết</th>
                <th className="text-left px-4 py-3 font-medium text-gray-900">Tác giả</th>
                <th className="text-left px-4 py-3 font-medium text-gray-900">Danh mục</th>
                <th className="text-left px-4 py-3 font-medium text-gray-900">Trạng thái</th>
                <th className="text-left px-4 py-3 font-medium text-gray-900">Thống kê</th>
                <th className="text-left px-4 py-3 font-medium text-gray-900">Ngày cập nhật</th>
                <th className="text-center px-4 py-3 font-medium text-gray-900">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedPosts.includes(post.id)}
                      onChange={() => handleSelectPost(post.id)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{post.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {post.isFeatured && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Nổi bật
                            </span>
                          )}
                          {post.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{post.author}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={post.status}
                      onChange={(e) => handleStatusChange(post.id, e.target.value)}
                      className={`text-xs font-medium px-2 py-1 rounded-full border-0 focus:ring-2 focus:ring-orange-500 ${
                        post.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : post.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <option value="published">Đã xuất bản</option>
                      <option value="draft">Bản nháp</option>
                      <option value="archived">Lưu trữ</option>
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {post.updatedAt}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setCurrentPost(post);
                          setShowViewModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setCurrentPost(post);
                          setShowEditModal(true);
                        }}
                        className="text-orange-600 hover:text-orange-800 p-1 rounded transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy bài viết</h3>
            <p className="text-gray-500">Thử thay đổi bộ lọc hoặc tạo bài viết mới</p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng bài viết</p>
              <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đã xuất bản</p>
              <p className="text-2xl font-bold text-gray-900">
                {posts.filter(p => p.status === 'published').length}
              </p>
            </div>
            <Eye className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bản nháp</p>
              <p className="text-2xl font-bold text-gray-900">
                {posts.filter(p => p.status === 'draft').length}
              </p>
            </div>
            <Edit className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng lượt xem</p>
              <p className="text-2xl font-bold text-gray-900">
                {posts.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || showEditModal) && (
        <PostFormModal
          isOpen={showCreateModal || showEditModal}
          onClose={() => {
            setShowCreateModal(false);
            setShowEditModal(false);
            setCurrentPost(null);
          }}
          onSubmit={showCreateModal ? handleCreatePost : handleEditPost}
          post={currentPost}
          categories={categories.slice(1)} // Remove 'Tất cả'
        />
      )}

      {/* View Modal */}
      {showViewModal && currentPost && (
        <PostViewModal
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setCurrentPost(null);
          }}
          post={currentPost}
        />
      )}
    </div>
  );
};

// Post Form Modal Component
const PostFormModal = ({ isOpen, onClose, onSubmit, post, categories }: any) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    category: categories[0] || '',
    tags: [],
    author: '',
    status: 'draft',
    isFeatured: false,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    readTime: 5
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        featuredImage: post.featuredImage || '',
        category: post.category || categories[0] || '',
        tags: post.tags || [],
        author: post.author || '',
        status: post.status || 'draft',
        isFeatured: post.isFeatured || false,
        seoTitle: post.seoTitle || '',
        seoDescription: post.seoDescription || '',
        seoKeywords: post.seoKeywords || '',
        readTime: post.readTime || 5
      });
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {post ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Title */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề bài viết *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Nhập tiêu đề bài viết"
              />
            </div>
            
            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug URL
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="slug-url-bai-viet"
              />
            </div>
            
            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tác giả *
              </label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Tên tác giả"
              />
            </div>
            
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map((category: string) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="draft">Bản nháp</option>
                <option value="published">Đã xuất bản</option>
                <option value="archived">Lưu trữ</option>
              </select>
            </div>
          </div>
          
          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tóm tắt bài viết
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Tóm tắt ngắn gọn về nội dung bài viết"
            />
          </div>
          
          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nội dung bài viết *
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Nội dung chi tiết của bài viết"
            />
          </div>
          
          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ảnh đại diện
            </label>
            <input
              type="url"
              value={formData.featuredImage}
              onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="URL ảnh đại diện"
            />
          </div>
          
          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Nhập tag và nhấn Enter"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Thêm
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-orange-600 hover:text-orange-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          {/* SEO Settings */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cài đặt SEO</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Tiêu đề SEO"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Description
                </label>
                <textarea
                  value={formData.seoDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Mô tả SEO"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Keywords
                </label>
                <input
                  type="text"
                  value={formData.seoKeywords}
                  onChange={(e) => setFormData(prev => ({ ...prev, seoKeywords: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="từ khóa, seo, keywords"
                />
              </div>
            </div>
          </div>
          
          {/* Options */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">Bài viết nổi bật</span>
            </label>
            
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700">Thời gian đọc:</label>
              <input
                type="number"
                min="1"
                max="60"
                value={formData.readTime}
                onChange={(e) => setFormData(prev => ({ ...prev, readTime: parseInt(e.target.value) || 5 }))}
                className="w-16 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <span className="text-sm text-gray-700">phút</span>
            </div>
          </div>
          
          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
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
              <Save className="w-4 h-4" />
              {post ? 'Cập nhật' : 'Tạo bài viết'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Post View Modal Component
const PostViewModal = ({ isOpen, onClose, post }: any) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Chi tiết bài viết</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                post.status === 'published' 
                  ? 'bg-green-100 text-green-800' 
                  : post.status === 'draft'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {post.status === 'published' ? 'Đã xuất bản' : post.status === 'draft' ? 'Bản nháp' : 'Lưu trữ'}
              </span>
              
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {post.category}
              </span>
              
              {post.isFeatured && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Nổi bật
                </span>
              )}
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.publishedAt || post.createdAt}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} phút đọc
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views} lượt xem
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {post.likes} lượt thích
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                {post.comments} bình luận
              </div>
              <div className="flex items-center gap-1">
                <Share2 className="w-4 h-4" />
                {post.shares} chia sẻ
              </div>
            </div>
          </div>
          
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-6">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          
          {/* Excerpt */}
          {post.excerpt && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tóm tắt</h3>
              <p className="text-gray-600 italic">{post.excerpt}</p>
            </div>
          )}
          
          {/* Content */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nội dung</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
            </div>
          </div>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* SEO Info */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin SEO</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                <p className="text-gray-600">{post.seoTitle || 'Chưa thiết lập'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
                <p className="text-gray-600">{post.seoDescription || 'Chưa thiết lập'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Keywords</label>
                <p className="text-gray-600">{post.seoKeywords || 'Chưa thiết lập'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug URL</label>
                <p className="text-gray-600 font-mono">{post.slug}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;