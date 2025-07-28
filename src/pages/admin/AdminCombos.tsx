import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  DollarSign,
  Package,
  Image,
  Tag,
  Clock,
  MoreHorizontal,
  RefreshCw,
  Download,
  Upload,
  X,
  Save,
  Camera
} from 'lucide-react';

// Mock data
const mockCombos = [
  {
    id: 'CB001',
    name: 'Combo Gà Nướng Đặc Biệt',
    description: 'Gà nướng thơm ngon với gia vị đặc biệt, kèm cơm và rau củ tươi ngon',
    price: 299000,
    originalPrice: 349000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=delicious%20grilled%20chicken%20combo%20with%20rice%20and%20vegetables%20on%20wooden%20plate&image_size=square_hd',
    category: 'Combo Đặc Biệt',
    status: 'active',
    isPromotion: true,
    promotionText: 'Giảm 50k',
    rating: 4.8,
    reviewCount: 156,
    soldCount: 1250,
    ingredients: ['Gà tươi', 'Cơm trắng', 'Rau củ', 'Nước sốt đặc biệt'],
    cookingTime: 25,
    calories: 650,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15'
  },
  {
    id: 'CB002',
    name: 'Combo Gà Nướng Gia Đình',
    description: 'Combo dành cho 4-6 người với gà nướng nguyên con và các món phụ',
    price: 599000,
    originalPrice: 699000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=family%20grilled%20chicken%20combo%20whole%20chicken%20with%20side%20dishes%20for%20sharing&image_size=square_hd',
    category: 'Combo Gia Đình',
    status: 'active',
    isPromotion: true,
    promotionText: 'Tiết kiệm 100k',
    rating: 4.9,
    reviewCount: 89,
    soldCount: 567,
    ingredients: ['Gà nguyên con', 'Cơm trắng (4 phần)', 'Rau củ', 'Nước sốt', 'Canh'],
    cookingTime: 45,
    calories: 2400,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-12'
  },
  {
    id: 'CB003',
    name: 'Combo Gà Nướng Cay',
    description: 'Gà nướng với gia vị cay nồng, phù hợp cho những ai yêu thích vị cay',
    price: 249000,
    originalPrice: 249000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=spicy%20grilled%20chicken%20combo%20with%20hot%20sauce%20and%20chili%20peppers&image_size=square_hd',
    category: 'Combo Cay',
    status: 'active',
    isPromotion: false,
    promotionText: '',
    rating: 4.6,
    reviewCount: 234,
    soldCount: 890,
    ingredients: ['Gà tươi', 'Gia vị cay', 'Cơm trắng', 'Rau sống'],
    cookingTime: 20,
    calories: 580,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-14'
  },
  {
    id: 'CB004',
    name: 'Combo Gà Nướng Mật Ong',
    description: 'Gà nướng tẩm mật ong thơm ngọt, vị thanh mát dễ ăn',
    price: 279000,
    originalPrice: 279000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=honey%20glazed%20grilled%20chicken%20combo%20golden%20color%20with%20sweet%20sauce&image_size=square_hd',
    category: 'Combo Ngọt',
    status: 'active',
    isPromotion: false,
    promotionText: '',
    rating: 4.7,
    reviewCount: 178,
    soldCount: 723,
    ingredients: ['Gà tươi', 'Mật ong', 'Cơm trắng', 'Rau củ'],
    cookingTime: 30,
    calories: 620,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-10'
  },
  {
    id: 'CB005',
    name: 'Combo Gà Nướng Truyền Thống',
    description: 'Gà nướng theo công thức truyền thống của GANU, hương vị đậm đà',
    price: 199000,
    originalPrice: 199000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20grilled%20chicken%20combo%20classic%20style%20with%20herbs%20and%20spices&image_size=square_hd',
    category: 'Combo Truyền Thống',
    status: 'inactive',
    isPromotion: false,
    promotionText: '',
    rating: 4.5,
    reviewCount: 312,
    soldCount: 1456,
    ingredients: ['Gà tươi', 'Gia vị truyền thống', 'Cơm trắng'],
    cookingTime: 25,
    calories: 550,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-08'
  }
];

const categories = [
  'Tất cả danh mục',
  'Combo Đặc Biệt',
  'Combo Gia Đình',
  'Combo Cay',
  'Combo Ngọt',
  'Combo Truyền Thống'
];

const statusConfig = {
  active: {
    label: 'Đang bán',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  inactive: {
    label: 'Ngừng bán',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  draft: {
    label: 'Bản nháp',
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200'
  }
};

export default function AdminCombos() {
  const [combos, setCombos] = useState(mockCombos);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tất cả danh mục');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCombos, setSelectedCombos] = useState<string[]>([]);
  const [showComboForm, setShowComboForm] = useState(false);
  const [editingCombo, setEditingCombo] = useState<any>(null);
  const [showComboDetail, setShowComboDetail] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'Combo Đặc Biệt',
    status: 'active',
    isPromotion: false,
    promotionText: '',
    ingredients: [''],
    cookingTime: '',
    calories: '',
    image: ''
  });

  const filteredCombos = combos.filter(combo => {
    const matchesSearch = 
      combo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      combo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      combo.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'Tất cả danh mục' || combo.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || combo.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSelectCombo = (comboId: string) => {
    setSelectedCombos(prev => 
      prev.includes(comboId) 
        ? prev.filter(id => id !== comboId)
        : [...prev, comboId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCombos(
      selectedCombos.length === filteredCombos.length 
        ? [] 
        : filteredCombos.map(combo => combo.id)
    );
  };

  const handleEditCombo = (combo: any) => {
    setEditingCombo(combo);
    setFormData({
      name: combo.name,
      description: combo.description,
      price: combo.price.toString(),
      originalPrice: combo.originalPrice.toString(),
      category: combo.category,
      status: combo.status,
      isPromotion: combo.isPromotion,
      promotionText: combo.promotionText,
      ingredients: combo.ingredients,
      cookingTime: combo.cookingTime.toString(),
      calories: combo.calories.toString(),
      image: combo.image
    });
    setShowComboForm(true);
  };

  const handleDeleteCombo = (comboId: string) => {
    setCombos(combos.filter(combo => combo.id !== comboId));
  };

  const handleSaveCombo = () => {
    if (editingCombo) {
      // Update existing combo
      setCombos(combos.map(combo => 
        combo.id === editingCombo.id 
          ? {
              ...combo,
              ...formData,
              price: parseInt(formData.price),
              originalPrice: parseInt(formData.originalPrice),
              cookingTime: parseInt(formData.cookingTime),
              calories: parseInt(formData.calories),
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : combo
      ));
    } else {
      // Create new combo
      const newCombo = {
        id: `CB${String(combos.length + 1).padStart(3, '0')}`,
        ...formData,
        price: parseInt(formData.price),
        originalPrice: parseInt(formData.originalPrice),
        cookingTime: parseInt(formData.cookingTime),
        calories: parseInt(formData.calories),
        rating: 0,
        reviewCount: 0,
        soldCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setCombos([...combos, newCombo]);
    }
    
    setShowComboForm(false);
    setEditingCombo(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: 'Combo Đặc Biệt',
      status: 'active',
      isPromotion: false,
      promotionText: '',
      ingredients: [''],
      cookingTime: '',
      calories: '',
      image: ''
    });
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + 'đ';
  };

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config.color} ${config.bgColor} ${config.borderColor}`}>
        {config.label}
      </span>
    );
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, '']
    });
  };

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index)
    });
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({
      ...formData,
      ingredients: newIngredients
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Combo</h1>
          <p className="text-gray-600">Thêm, chỉnh sửa và quản lý các combo gà nướng</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Xuất Excel
          </button>
          <button 
            onClick={() => {
              resetForm();
              setEditingCombo(null);
              setShowComboForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Thêm Combo
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng combo</p>
              <p className="text-2xl font-bold text-gray-900">{combos.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang bán</p>
              <p className="text-2xl font-bold text-green-600">
                {combos.filter(c => c.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Star className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Có khuyến mãi</p>
              <p className="text-2xl font-bold text-orange-600">
                {combos.filter(c => c.isPromotion).length}
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Tag className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng đã bán</p>
              <p className="text-2xl font-bold text-purple-600">
                {combos.reduce((sum, combo) => sum + combo.soldCount, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm combo theo tên, mô tả, mã..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang bán</option>
              <option value="inactive">Ngừng bán</option>
              <option value="draft">Bản nháp</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Bộ lọc
            </button>

            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Làm mới
            </button>
          </div>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Khoảng giá</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option value="all">Tất cả</option>
                  <option value="under-200k">Dưới 200.000đ</option>
                  <option value="200k-400k">200.000đ - 400.000đ</option>
                  <option value="400k-600k">400.000đ - 600.000đ</option>
                  <option value="over-600k">Trên 600.000đ</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option value="all">Tất cả</option>
                  <option value="5-star">5 sao</option>
                  <option value="4-star">4 sao trở lên</option>
                  <option value="3-star">3 sao trở lên</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sắp xếp</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                  <option value="price-asc">Giá thấp đến cao</option>
                  <option value="price-desc">Giá cao đến thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="sold">Bán chạy nhất</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Combos Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCombos.length === filteredCombos.length && filteredCombos.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {selectedCombos.length > 0 ? `Đã chọn ${selectedCombos.length}` : 'Chọn tất cả'}
                </span>
              </label>
              {selectedCombos.length > 0 && (
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded transition-colors">
                    Kích hoạt hàng loạt
                  </button>
                  <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
                    Xóa hàng loạt
                  </button>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">
              Hiển thị {filteredCombos.length} / {combos.length} combo
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Combo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đánh giá</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đã bán</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCombos.map((combo) => (
                <tr key={combo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedCombos.includes(combo.id)}
                        onChange={() => handleSelectCombo(combo.id)}
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={combo.image}
                            alt={combo.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{combo.name}</p>
                          <p className="text-sm text-gray-500 truncate">{combo.description}</p>
                          <p className="text-xs text-gray-400">ID: {combo.id}</p>
                          {combo.isPromotion && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                              {combo.promotionText}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{combo.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900">{formatCurrency(combo.price)}</p>
                      {combo.originalPrice !== combo.price && (
                        <p className="text-gray-500 line-through text-xs">{formatCurrency(combo.originalPrice)}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{combo.rating}</span>
                      <span className="text-sm text-gray-500">({combo.reviewCount})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{combo.soldCount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(combo.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedCombo(combo);
                          setShowComboDetail(true);
                        }}
                        className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditCombo(combo)}
                        className="p-1 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCombo(combo.id)}
                        className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="relative group">
                        <button className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        <div className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                          <div className="py-1">
                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                              Sao chép combo
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                              Xem thống kê
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                              Xuất báo cáo
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCombos.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy combo</h3>
            <p className="text-gray-500">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác</p>
          </div>
        )}
      </div>

      {/* Combo Form Modal */}
      {showComboForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowComboForm(false)}></div>
            
            <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingCombo ? 'Chỉnh sửa combo' : 'Thêm combo mới'}
                </h3>
                <button
                  onClick={() => setShowComboForm(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSaveCombo(); }} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tên combo *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Nhập tên combo"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả *</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Mô tả chi tiết về combo"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Giá bán *</label>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="0"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Giá gốc</label>
                        <input
                          type="number"
                          value={formData.originalPrice}
                          onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục *</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        >
                          {categories.slice(1).map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái *</label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        >
                          <option value="active">Đang bán</option>
                          <option value="inactive">Ngừng bán</option>
                          <option value="draft">Bản nháp</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian nấu (phút)</label>
                        <input
                          type="number"
                          value={formData.cookingTime}
                          onChange={(e) => setFormData({ ...formData, cookingTime: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Calories</label>
                        <input
                          type="number"
                          value={formData.calories}
                          onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh combo</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                        {formData.image ? (
                          <div className="space-y-3">
                            <img
                              src={formData.image}
                              alt="Preview"
                              className="w-full h-32 object-cover rounded-lg mx-auto"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, image: '' })}
                              className="text-sm text-red-600 hover:text-red-800"
                            >
                              Xóa ảnh
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                            <div>
                              <button
                                type="button"
                                className="text-orange-600 hover:text-orange-800 font-medium"
                              >
                                Tải ảnh lên
                              </button>
                              <p className="text-sm text-gray-500">hoặc kéo thả ảnh vào đây</p>
                            </div>
                            <p className="text-xs text-gray-400">PNG, JPG, GIF tối đa 10MB</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Thành phần</label>
                      <div className="space-y-2">
                        {formData.ingredients.map((ingredient, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={ingredient}
                              onChange={(e) => updateIngredient(index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              placeholder="Nhập thành phần"
                            />
                            {formData.ingredients.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeIngredient(index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addIngredient}
                          className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-colors"
                        >
                          + Thêm thành phần
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.isPromotion}
                          onChange={(e) => setFormData({ ...formData, isPromotion: e.target.checked })}
                          className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Có khuyến mãi</span>
                      </label>
                      {formData.isPromotion && (
                        <input
                          type="text"
                          value={formData.promotionText}
                          onChange={(e) => setFormData({ ...formData, promotionText: e.target.value })}
                          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Nhập text khuyến mãi (VD: Giảm 50k)"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowComboForm(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {editingCombo ? 'Cập nhật' : 'Thêm combo'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Combo Detail Modal */}
      {showComboDetail && selectedCombo && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowComboDetail(false)}></div>
            
            <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Chi tiết combo: {selectedCombo.name}</h3>
                <button
                  onClick={() => setShowComboDetail(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Image and Basic Info */}
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={selectedCombo.image}
                      alt={selectedCombo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Thông tin cơ bản</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mã combo:</span>
                        <span className="font-medium">{selectedCombo.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Danh mục:</span>
                        <span className="font-medium">{selectedCombo.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Thời gian nấu:</span>
                        <span className="font-medium">{selectedCombo.cookingTime} phút</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Calories:</span>
                        <span className="font-medium">{selectedCombo.calories} kcal</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ngày tạo:</span>
                        <span className="font-medium">{selectedCombo.createdAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cập nhật:</span>
                        <span className="font-medium">{selectedCombo.updatedAt}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Mô tả</h4>
                    <p className="text-gray-700 text-sm">{selectedCombo.description}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Giá và khuyến mãi</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Giá bán:</span>
                        <span className="text-lg font-bold text-orange-600">{formatCurrency(selectedCombo.price)}</span>
                      </div>
                      {selectedCombo.originalPrice !== selectedCombo.price && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Giá gốc:</span>
                          <span className="text-gray-500 line-through">{formatCurrency(selectedCombo.originalPrice)}</span>
                        </div>
                      )}
                      {selectedCombo.isPromotion && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Khuyến mãi:</span>
                          <span className="text-red-600 font-medium">{selectedCombo.promotionText}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Thống kê</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-bold text-lg">{selectedCombo.rating}</span>
                        </div>
                        <p className="text-xs text-gray-600">{selectedCombo.reviewCount} đánh giá</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-lg">{selectedCombo.soldCount.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">Đã bán</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Thành phần</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCombo.ingredients.map((ingredient: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        setShowComboDetail(false);
                        handleEditCombo(selectedCombo);
                      }}
                      className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Chỉnh sửa combo
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Xem thống kê
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}