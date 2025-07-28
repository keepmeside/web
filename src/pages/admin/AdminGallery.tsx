import { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Upload,
  Eye,
  Edit,
  Trash2,
  Download,
  Grid,
  List,
  Calendar,
  Tag,
  Image as ImageIcon,
  X,
  Check,
  Star,
  Heart,
  Share2,
  MoreHorizontal,
  RefreshCw,
  FolderPlus,
  Move,
  Copy
} from 'lucide-react';

// Mock data
const mockGalleryItems = [
  {
    id: 'IMG001',
    title: 'Combo Gà Nướng Đặc Biệt',
    description: 'Hình ảnh combo gà nướng đặc biệt với các món ăn kèm',
    imageUrl: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=special%20grilled%20chicken%20combo%20delicious%20presentation&image_size=landscape_4_3',
    category: 'Combo',
    tags: ['Gà nướng', 'Combo', 'Đặc biệt', 'Món chính'],
    uploadDate: '2024-01-15',
    uploadedBy: 'Admin',
    fileSize: '2.5 MB',
    dimensions: '1920x1080',
    format: 'JPG',
    status: 'published',
    views: 1250,
    likes: 89,
    downloads: 45,
    featured: true,
    alt: 'Combo gà nướng đặc biệt với rau củ và nước sốt'
  },
  {
    id: 'IMG002',
    title: 'Không gian nhà hàng',
    description: 'Không gian ấm cúng và hiện đại của nhà hàng GANU',
    imageUrl: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20cozy%20restaurant%20interior%20warm%20lighting&image_size=landscape_4_3',
    category: 'Không gian',
    tags: ['Nhà hàng', 'Không gian', 'Nội thất', 'Ấm cúng'],
    uploadDate: '2024-01-14',
    uploadedBy: 'Admin',
    fileSize: '3.1 MB',
    dimensions: '1920x1280',
    format: 'JPG',
    status: 'published',
    views: 890,
    likes: 67,
    downloads: 23,
    featured: false,
    alt: 'Không gian nhà hàng với bàn ghế gỗ và ánh sáng ấm'
  },
  {
    id: 'IMG003',
    title: 'Đầu bếp chuyên nghiệp',
    description: 'Đội ngũ đầu bếp chuyên nghiệp đang chế biến món ăn',
    imageUrl: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20chef%20cooking%20grilled%20chicken%20kitchen&image_size=landscape_4_3',
    category: 'Đầu bếp',
    tags: ['Đầu bếp', 'Chuyên nghiệp', 'Nấu ăn', 'Bếp'],
    uploadDate: '2024-01-13',
    uploadedBy: 'Admin',
    fileSize: '2.8 MB',
    dimensions: '1920x1080',
    format: 'JPG',
    status: 'published',
    views: 654,
    likes: 45,
    downloads: 18,
    featured: true,
    alt: 'Đầu bếp đang nướng gà với kỹ thuật chuyên nghiệp'
  },
  {
    id: 'IMG004',
    title: 'Combo Gà Nướng Gia Đình',
    description: 'Combo dành cho gia đình với nhiều món ăn phong phú',
    imageUrl: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=family%20grilled%20chicken%20combo%20large%20portion%20sharing&image_size=landscape_4_3',
    category: 'Combo',
    tags: ['Gia đình', 'Combo lớn', 'Chia sẻ', 'Phong phú'],
    uploadDate: '2024-01-12',
    uploadedBy: 'Admin',
    fileSize: '2.9 MB',
    dimensions: '1920x1080',
    format: 'JPG',
    status: 'draft',
    views: 0,
    likes: 0,
    downloads: 0,
    featured: false,
    alt: 'Combo gia đình với nhiều món ăn kèm và nước uống'
  },
  {
    id: 'IMG005',
    title: 'Khách hàng hài lòng',
    description: 'Khách hàng thưởng thức món ăn với nụ cười hài lòng',
    imageUrl: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=happy%20customers%20enjoying%20grilled%20chicken%20restaurant&image_size=landscape_4_3',
    category: 'Khách hàng',
    tags: ['Khách hàng', 'Hài lòng', 'Trải nghiệm', 'Vui vẻ'],
    uploadDate: '2024-01-11',
    uploadedBy: 'Admin',
    fileSize: '2.2 MB',
    dimensions: '1920x1080',
    format: 'JPG',
    status: 'published',
    views: 432,
    likes: 38,
    downloads: 12,
    featured: false,
    alt: 'Gia đình khách hàng vui vẻ thưởng thức bữa ăn'
  },
  {
    id: 'IMG006',
    title: 'Nguyên liệu tươi ngon',
    description: 'Nguyên liệu tươi ngon được chọn lọc kỹ càng',
    imageUrl: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20ingredients%20vegetables%20chicken%20quality%20selection&image_size=landscape_4_3',
    category: 'Nguyên liệu',
    tags: ['Nguyên liệu', 'Tươi ngon', 'Chất lượng', 'Chọn lọc'],
    uploadDate: '2024-01-10',
    uploadedBy: 'Admin',
    fileSize: '3.3 MB',
    dimensions: '1920x1280',
    format: 'JPG',
    status: 'published',
    views: 567,
    likes: 52,
    downloads: 28,
    featured: true,
    alt: 'Nguyên liệu tươi sống với rau củ và thịt gà chất lượng'
  }
];

const categories = [
  'Tất cả danh mục',
  'Combo',
  'Không gian',
  'Đầu bếp',
  'Khách hàng',
  'Nguyên liệu',
  'Sự kiện',
  'Khuyến mãi'
];

const AdminGallery = () => {
  const [galleryItems, setGalleryItems] = useState(mockGalleryItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả danh mục');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [sortBy, setSortBy] = useState('uploadDate');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter gallery items
  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Tất cả danh mục' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
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

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const handleStatusChange = (itemId: string, newStatus: string) => {
    setGalleryItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, status: newStatus }
        : item
    ));
  };

  const handleBulkStatusChange = (newStatus: string) => {
    setGalleryItems(prev => prev.map(item => 
      selectedItems.includes(item.id)
        ? { ...item, status: newStatus }
        : item
    ));
    setSelectedItems([]);
  };

  const handleDeleteItem = (itemId: string) => {
    setGalleryItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedItems(prev => prev.filter(id => id !== itemId));
  };

  const handleBulkDelete = () => {
    setGalleryItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const handleToggleFeatured = (itemId: string) => {
    setGalleryItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, featured: !item.featured }
        : item
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Đã xuất bản';
      case 'draft':
        return 'Bản nháp';
      case 'archived':
        return 'Đã lưu trữ';
      default:
        return 'Không xác định';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quản lý Thư viện</h1>
          <p className="text-gray-600">Quản lý hình ảnh và media cho website</p>
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Xuất thư viện
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Làm mới
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Thêm hình ảnh
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
                placeholder="Tìm kiếm tiêu đề, mô tả, tags..."
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
            <option value="archived">Đã lưu trữ</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
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
              <option value="uploadDate-desc">Mới nhất</option>
              <option value="uploadDate-asc">Cũ nhất</option>
              <option value="title-asc">Tên A-Z</option>
              <option value="title-desc">Tên Z-A</option>
              <option value="views-desc">Nhiều lượt xem</option>
              <option value="likes-desc">Nhiều lượt thích</option>
              <option value="fileSize-desc">Kích thước lớn</option>
            </select>
            
            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Tất cả danh mục');
                setSelectedStatus('all');
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
          
          {/* View Mode */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-orange-800">
              Đã chọn {selectedItems.length} hình ảnh
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBulkStatusChange('published')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Check className="w-4 h-4" />
                Xuất bản
              </button>
              <button
                onClick={() => handleBulkStatusChange('draft')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Chuyển về nháp
              </button>
              <button
                onClick={() => handleBulkStatusChange('archived')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Move className="w-4 h-4" />
                Lưu trữ
              </button>
              <button
                onClick={handleBulkDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Xóa đã chọn
              </button>
              <button
                onClick={() => setSelectedItems([])}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Bỏ chọn
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Items */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group">
              <div className="relative">
                <img
                  src={item.imageUrl}
                  alt={item.alt}
                  className="w-full h-48 object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setCurrentItem(item);
                        setShowViewModal(true);
                      }}
                      className="bg-white text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentItem(item);
                        setShowEditModal(true);
                      }}
                      className="bg-white text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="bg-white text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {getStatusText(item.status)}
                  </span>
                </div>
                
                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Star className="w-3 h-3 mr-1" />
                      Nổi bật
                    </span>
                  </div>
                )}
                
                {/* Checkbox */}
                <div className="absolute bottom-2 left-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 2 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                      +{item.tags.length - 2}
                    </span>
                  )}
                </div>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {item.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {item.likes}
                    </div>
                  </div>
                  <span className="text-xs">{item.fileSize}</span>
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleToggleFeatured(item.id)}
                    className={`text-sm px-3 py-1 rounded-lg transition-colors ${
                      item.featured 
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {item.featured ? 'Bỏ nổi bật' : 'Đặt nổi bật'}
                  </button>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleStatusChange(item.id, item.status === 'published' ? 'draft' : 'published')}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {item.status === 'published' ? 'Ẩn' : 'Xuất bản'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 mr-4"
              />
              <div className="grid grid-cols-12 gap-4 w-full text-sm font-medium text-gray-700">
                <div className="col-span-4">Hình ảnh</div>
                <div className="col-span-2">Danh mục</div>
                <div className="col-span-2">Trạng thái</div>
                <div className="col-span-2">Thống kê</div>
                <div className="col-span-1">Ngày tải</div>
                <div className="col-span-1">Thao tác</div>
              </div>
            </div>
          </div>
          
          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <div key={item.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 mr-4"
                  />
                  <div className="grid grid-cols-12 gap-4 w-full">
                    {/* Image & Info */}
                    <div className="col-span-4 flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.alt}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900 line-clamp-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-1">{item.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{item.dimensions}</span>
                          <span className="text-xs text-gray-500">{item.fileSize}</span>
                          {item.featured && (
                            <span className="inline-flex items-center px-1 py-0.5 rounded text-xs bg-yellow-100 text-yellow-800">
                              <Star className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Category */}
                    <div className="col-span-2 flex items-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                        {item.category}
                      </span>
                    </div>
                    
                    {/* Status */}
                    <div className="col-span-2 flex items-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </div>
                    
                    {/* Stats */}
                    <div className="col-span-2 flex items-center">
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {item.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {item.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {item.downloads}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Upload Date */}
                    <div className="col-span-1 flex items-center">
                      <span className="text-sm text-gray-600">{item.uploadDate}</span>
                    </div>
                    
                    {/* Actions */}
                    <div className="col-span-1 flex items-center">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setCurrentItem(item);
                            setShowViewModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentItem(item);
                            setShowEditModal(true);
                          }}
                          className="text-gray-600 hover:text-gray-800 p-1 rounded transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy hình ảnh</h3>
          <p className="text-gray-500 mb-4">Thử thay đổi bộ lọc để xem kết quả khác</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors"
          >
            <Plus className="w-4 h-4" />
            Thêm hình ảnh đầu tiên
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng hình ảnh</p>
              <p className="text-2xl font-bold text-gray-900">{galleryItems.length}</p>
            </div>
            <ImageIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đã xuất bản</p>
              <p className="text-2xl font-bold text-gray-900">
                {galleryItems.filter(item => item.status === 'published').length}
              </p>
            </div>
            <Check className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Nổi bật</p>
              <p className="text-2xl font-bold text-gray-900">
                {galleryItems.filter(item => item.featured).length}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng lượt xem</p>
              <p className="text-2xl font-bold text-gray-900">
                {galleryItems.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
              </p>
            </div>
            <Eye className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUpload={(newItem) => {
            setGalleryItems(prev => [newItem, ...prev]);
            setShowUploadModal(false);
          }}
        />
      )}

      {/* View Modal */}
      {showViewModal && currentItem && (
        <ViewModal
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setCurrentItem(null);
          }}
          item={currentItem}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && currentItem && (
        <EditModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setCurrentItem(null);
          }}
          item={currentItem}
          onSave={(updatedItem) => {
            setGalleryItems(prev => prev.map(item => 
              item.id === updatedItem.id ? updatedItem : item
            ));
            setShowEditModal(false);
            setCurrentItem(null);
          }}
        />
      )}
    </div>
  );
};

// Upload Modal Component
const UploadModal = ({ isOpen, onClose, onUpload }: any) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Combo',
    tags: '',
    alt: '',
    featured: false,
    status: 'draft'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem = {
      id: `IMG${Date.now()}`,
      title: formData.title,
      description: formData.description,
      imageUrl: `https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(formData.title + ' ' + formData.description)}&image_size=landscape_4_3`,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      uploadDate: new Date().toISOString().split('T')[0],
      uploadedBy: 'Admin',
      fileSize: '2.5 MB',
      dimensions: '1920x1080',
      format: 'JPG',
      status: 'draft',
      views: 0,
      likes: 0,
      downloads: 0,
      featured: formData.featured,
      alt: formData.alt
    };
    
    onUpload(newItem);
    setFormData({
      title: '',
      description: '',
      category: 'Combo',
      tags: '',
      alt: '',
      featured: false,
      status: 'draft'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Thêm hình ảnh mới</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tải lên hình ảnh</h3>
            <p className="text-gray-600 mb-4">Kéo thả file hoặc click để chọn</p>
            <button
              type="button"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Chọn file
            </button>
            <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF tối đa 10MB</p>
          </div>
          
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Nhập tiêu đề cho hình ảnh"
              />
            </div>
            
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
                <option value="Combo">Combo</option>
                <option value="Gà nướng">Gà nướng</option>
                <option value="Salad">Salad</option>
                <option value="Đồ uống">Đồ uống</option>
                <option value="Tráng miệng">Tráng miệng</option>
                <option value="Khuyến mãi">Khuyến mãi</option>
                <option value="Sự kiện">Sự kiện</option>
                <option value="Nhà hàng">Nhà hàng</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Nhập mô tả cho hình ảnh"
            />
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Nhập tags, phân cách bằng dấu phẩy"
            />
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alt text
            </label>
            <input
              type="text"
              value={formData.alt}
              onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Mô tả hình ảnh cho accessibility"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
                <option value="archived">Đã lưu trữ</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Đặt làm hình ảnh nổi bật</span>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-3 mt-8">
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
              <Check className="w-4 h-4" />
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// View Modal Component
const ViewModal = ({ isOpen, onClose, item }: any) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Chi tiết hình ảnh</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                src={item.imageUrl}
                alt={item.alt || item.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Danh mục:</span>
                  <span className="ml-2 text-gray-600">{item.category}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Ngày tải:</span>
                  <span className="ml-2 text-gray-600">{item.uploadDate}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Kích thước:</span>
                  <span className="ml-2 text-gray-600">{item.fileSize}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Định dạng:</span>
                  <span className="ml-2 text-gray-600">{item.format}</span>
                </div>
              </div>
              
              {item.tags && item.tags.length > 0 && (
                <div>
                  <span className="font-medium text-gray-700">Tags:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Edit Modal Component
const EditModal = ({ isOpen, onClose, item, onSave }: any) => {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    category: item?.category || 'Combo',
    tags: item?.tags?.join(', ') || '',
    alt: item?.alt || '',
    featured: item?.featured || false,
    status: item?.status || 'draft'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedItem = {
      ...item,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      alt: formData.alt,
      featured: formData.featured,
      status: formData.status
    };
    
    onSave(updatedItem);
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Chỉnh sửa hình ảnh</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
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
                <option value="Combo">Combo</option>
                <option value="Gà nướng">Gà nướng</option>
                <option value="Salad">Salad</option>
                <option value="Đồ uống">Đồ uống</option>
                <option value="Tráng miệng">Tráng miệng</option>
                <option value="Khuyến mãi">Khuyến mãi</option>
                <option value="Sự kiện">Sự kiện</option>
                <option value="Nhà hàng">Nhà hàng</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Nhập tags, phân cách bằng dấu phẩy"
            />
          </div>
          
          <div className="flex items-center justify-end gap-3 mt-8">
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
              <Check className="w-4 h-4" />
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminGallery;