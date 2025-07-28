import { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Star,
  Award,
  Calendar,
  Phone,
  Mail,
  MapPin,
  User,
  ChefHat,
  Clock,
  X,
  Check,
  Camera,
  Upload,
  RefreshCw,
  Download
} from 'lucide-react';

// Mock data
const mockChefs = [
  {
    id: 'CHEF001',
    name: 'Nguyễn Văn Minh',
    position: 'Bếp trưởng',
    specialties: ['Gà nướng', 'Món Á', 'BBQ'],
    experience: 15,
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20head%20chef%20portrait%20asian%20male%20chef%20hat&image_size=square',
    bio: 'Với hơn 15 năm kinh nghiệm trong ngành ẩm thực, Chef Minh đã làm việc tại nhiều nhà hàng nổi tiếng và chuyên về các món nướng truyền thống Việt Nam.',
    phone: '0901234567',
    email: 'minh.chef@ganu.vn',
    joinDate: '2020-01-15',
    location: 'Chi nhánh Quận 1',
    status: 'active',
    rating: 4.9,
    achievements: [
      'Giải nhất cuộc thi Đầu bếp xuất sắc 2023',
      'Chứng chỉ Đầu bếp chuyên nghiệp quốc tế',
      '10 năm kinh nghiệm tại khách sạn 5 sao'
    ],
    skills: [
      { name: 'Nướng BBQ', level: 95 },
      { name: 'Gia vị truyền thống', level: 90 },
      { name: 'Quản lý bếp', level: 88 },
      { name: 'Sáng tạo món mới', level: 85 }
    ],
    workSchedule: {
      monday: '08:00 - 17:00',
      tuesday: '08:00 - 17:00',
      wednesday: '08:00 - 17:00',
      thursday: '08:00 - 17:00',
      friday: '08:00 - 17:00',
      saturday: '09:00 - 18:00',
      sunday: 'Nghỉ'
    },
    socialMedia: {
      facebook: 'https://facebook.com/chefminh',
      instagram: 'https://instagram.com/chefminh_ganu'
    }
  },
  {
    id: 'CHEF002',
    name: 'Trần Thị Lan',
    position: 'Phó bếp trưởng',
    specialties: ['Món chay', 'Salad', 'Đồ uống'],
    experience: 8,
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20chef%20portrait%20asian%20chef%20uniform&image_size=square',
    bio: 'Chef Lan chuyên về các món ăn healthy và đồ uống tươi mát. Cô luôn sáng tạo những món ăn vừa ngon vừa bổ dưỡng.',
    phone: '0912345678',
    email: 'lan.chef@ganu.vn',
    joinDate: '2021-03-20',
    location: 'Chi nhánh Quận 3',
    status: 'active',
    rating: 4.7,
    achievements: [
      'Chứng chỉ Dinh dưỡng ẩm thực',
      'Giải ba cuộc thi Món chay sáng tạo 2022'
    ],
    skills: [
      { name: 'Món chay', level: 92 },
      { name: 'Pha chế đồ uống', level: 88 },
      { name: 'Trang trí món ăn', level: 85 },
      { name: 'Dinh dưỡng học', level: 90 }
    ],
    workSchedule: {
      monday: '09:00 - 18:00',
      tuesday: '09:00 - 18:00',
      wednesday: 'Nghỉ',
      thursday: '09:00 - 18:00',
      friday: '09:00 - 18:00',
      saturday: '09:00 - 18:00',
      sunday: '09:00 - 18:00'
    },
    socialMedia: {
      instagram: 'https://instagram.com/chef_lan_healthy'
    }
  },
  {
    id: 'CHEF003',
    name: 'Lê Hoàng Nam',
    position: 'Đầu bếp chính',
    specialties: ['Gà nướng', 'Món nướng', 'Gia vị'],
    experience: 12,
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=experienced%20male%20chef%20grilling%20chicken%20professional%20kitchen&image_size=square',
    bio: 'Chef Nam là chuyên gia về các món nướng, đặc biệt là gà nướng. Anh có bí quyết gia vị độc đáo tạo nên hương vị đặc trưng của GANU.',
    phone: '0923456789',
    email: 'nam.chef@ganu.vn',
    joinDate: '2019-08-10',
    location: 'Chi nhánh Quận 7',
    status: 'active',
    rating: 4.8,
    achievements: [
      'Chuyên gia nướng BBQ được chứng nhận',
      'Đào tạo hơn 20 đầu bếp trẻ'
    ],
    skills: [
      { name: 'Nướng gà', level: 98 },
      { name: 'Pha chế gia vị', level: 95 },
      { name: 'Kiểm soát nhiệt độ', level: 92 },
      { name: 'Đào tạo nhân viên', level: 87 }
    ],
    workSchedule: {
      monday: '07:00 - 16:00',
      tuesday: '07:00 - 16:00',
      wednesday: '07:00 - 16:00',
      thursday: '07:00 - 16:00',
      friday: '07:00 - 16:00',
      saturday: '08:00 - 17:00',
      sunday: 'Nghỉ'
    },
    socialMedia: {
      facebook: 'https://facebook.com/chef.nam.bbq'
    }
  },
  {
    id: 'CHEF004',
    name: 'Phạm Thị Hương',
    position: 'Đầu bếp',
    specialties: ['Món tráng miệng', 'Bánh', 'Đồ ngọt'],
    experience: 6,
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=young%20female%20pastry%20chef%20asian%20dessert%20specialist&image_size=square',
    bio: 'Chef Hương chuyên về các món tráng miệng và bánh ngọt. Cô luôn tạo ra những món dessert độc đáo để kết thúc bữa ăn một cách hoàn hảo.',
    phone: '0934567890',
    email: 'huong.chef@ganu.vn',
    joinDate: '2022-05-15',
    location: 'Chi nhánh Quận 5',
    status: 'active',
    rating: 4.6,
    achievements: [
      'Chứng chỉ Làm bánh chuyên nghiệp',
      'Giải khuyến khích cuộc thi Dessert sáng tạo 2023'
    ],
    skills: [
      { name: 'Làm bánh', level: 90 },
      { name: 'Trang trí dessert', level: 88 },
      { name: 'Sáng tạo công thức', level: 85 },
      { name: 'Quản lý nguyên liệu', level: 82 }
    ],
    workSchedule: {
      monday: '10:00 - 19:00',
      tuesday: '10:00 - 19:00',
      wednesday: '10:00 - 19:00',
      thursday: 'Nghỉ',
      friday: '10:00 - 19:00',
      saturday: '10:00 - 19:00',
      sunday: '10:00 - 19:00'
    },
    socialMedia: {
      instagram: 'https://instagram.com/chef_huong_dessert'
    }
  },
  {
    id: 'CHEF005',
    name: 'Võ Minh Tuấn',
    position: 'Đầu bếp',
    specialties: ['Soup', 'Nước dùng', 'Món canh'],
    experience: 4,
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=young%20male%20chef%20soup%20specialist%20professional%20kitchen&image_size=square',
    bio: 'Chef Tuấn là chuyên gia về các món soup và nước dùng. Anh có tài nấu những món canh thanh đạm, bổ dưỡng.',
    phone: '0945678901',
    email: 'tuan.chef@ganu.vn',
    joinDate: '2023-01-10',
    location: 'Chi nhánh Quận 2',
    status: 'probation',
    rating: 4.4,
    achievements: [
      'Tốt nghiệp xuất sắc trường Đại học Văn Lang ngành Ẩm thực'
    ],
    skills: [
      { name: 'Nấu soup', level: 85 },
      { name: 'Pha chế nước dùng', level: 88 },
      { name: 'Cân bằng vị', level: 80 },
      { name: 'Học hỏi nhanh', level: 92 }
    ],
    workSchedule: {
      monday: '08:00 - 17:00',
      tuesday: '08:00 - 17:00',
      wednesday: '08:00 - 17:00',
      thursday: '08:00 - 17:00',
      friday: '08:00 - 17:00',
      saturday: 'Nghỉ',
      sunday: 'Nghỉ'
    },
    socialMedia: {}
  }
];

const positions = [
  'Tất cả vị trí',
  'Bếp trưởng',
  'Phó bếp trưởng',
  'Đầu bếp chính',
  'Đầu bếp',
  'Phụ bếp'
];

const locations = [
  'Tất cả chi nhánh',
  'Chi nhánh Quận 1',
  'Chi nhánh Quận 2',
  'Chi nhánh Quận 3',
  'Chi nhánh Quận 5',
  'Chi nhánh Quận 7'
];

const AdminChefs = () => {
  const [chefs, setChefs] = useState(mockChefs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('Tất cả vị trí');
  const [selectedLocation, setSelectedLocation] = useState('Tất cả chi nhánh');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedChefs, setSelectedChefs] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentChef, setCurrentChef] = useState<any>(null);
  const [sortBy, setSortBy] = useState('joinDate');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter chefs
  const filteredChefs = chefs.filter(chef => {
    const matchesSearch = chef.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chef.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chef.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPosition = selectedPosition === 'Tất cả vị trí' || chef.position === selectedPosition;
    const matchesLocation = selectedLocation === 'Tất cả chi nhánh' || chef.location === selectedLocation;
    const matchesStatus = selectedStatus === 'all' || chef.status === selectedStatus;
    
    return matchesSearch && matchesPosition && matchesLocation && matchesStatus;
  }).sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a];
    const bValue = b[sortBy as keyof typeof b];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSelectChef = (chefId: string) => {
    setSelectedChefs(prev => 
      prev.includes(chefId) 
        ? prev.filter(id => id !== chefId)
        : [...prev, chefId]
    );
  };

  const handleSelectAll = () => {
    if (selectedChefs.length === filteredChefs.length) {
      setSelectedChefs([]);
    } else {
      setSelectedChefs(filteredChefs.map(chef => chef.id));
    }
  };

  const handleStatusChange = (chefId: string, newStatus: string) => {
    setChefs(prev => prev.map(chef => 
      chef.id === chefId 
        ? { ...chef, status: newStatus }
        : chef
    ));
  };

  const handleBulkStatusChange = (newStatus: string) => {
    setChefs(prev => prev.map(chef => 
      selectedChefs.includes(chef.id)
        ? { ...chef, status: newStatus }
        : chef
    ));
    setSelectedChefs([]);
  };

  const handleDeleteChef = (chefId: string) => {
    setChefs(prev => prev.filter(chef => chef.id !== chefId));
    setSelectedChefs(prev => prev.filter(id => id !== chefId));
  };

  const handleBulkDelete = () => {
    setChefs(prev => prev.filter(chef => !selectedChefs.includes(chef.id)));
    setSelectedChefs([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'probation':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'vacation':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Đang làm việc';
      case 'probation':
        return 'Thử việc';
      case 'inactive':
        return 'Nghỉ việc';
      case 'vacation':
        return 'Nghỉ phép';
      default:
        return 'Không xác định';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quản lý Đội ngũ Đầu bếp</h1>
          <p className="text-gray-600">Quản lý thông tin và lịch làm việc của đội ngũ đầu bếp</p>
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Xuất danh sách
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Làm mới
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Thêm đầu bếp
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
                placeholder="Tìm kiếm tên, vị trí, chuyên môn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Position Filter */}
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {positions.map(position => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
          
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
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang làm việc</option>
              <option value="probation">Thử việc</option>
              <option value="vacation">Nghỉ phép</option>
              <option value="inactive">Nghỉ việc</option>
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
              <option value="joinDate-desc">Mới gia nhập</option>
              <option value="joinDate-asc">Cũ nhất</option>
              <option value="name-asc">Tên A-Z</option>
              <option value="name-desc">Tên Z-A</option>
              <option value="experience-desc">Kinh nghiệm cao</option>
              <option value="rating-desc">Đánh giá cao</option>
            </select>
            
            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedPosition('Tất cả vị trí');
                setSelectedLocation('Tất cả chi nhánh');
                setSelectedStatus('all');
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedChefs.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-orange-800">
              Đã chọn {selectedChefs.length} đầu bếp
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBulkStatusChange('active')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Check className="w-4 h-4" />
                Kích hoạt
              </button>
              <button
                onClick={() => handleBulkStatusChange('vacation')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Clock className="w-4 h-4" />
                Nghỉ phép
              </button>
              <button
                onClick={() => handleBulkStatusChange('inactive')}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <X className="w-4 h-4" />
                Nghỉ việc
              </button>
              <button
                onClick={handleBulkDelete}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Xóa đã chọn
              </button>
              <button
                onClick={() => setSelectedChefs([])}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Bỏ chọn
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chefs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChefs.map((chef) => (
          <div key={chef.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative">
              <img
                src={chef.avatar}
                alt={chef.name}
                className="w-full h-48 object-cover"
              />
              
              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(chef.status)}`}>
                  {getStatusText(chef.status)}
                </span>
              </div>
              
              {/* Checkbox */}
              <div className="absolute top-3 right-3">
                <input
                  type="checkbox"
                  checked={selectedChefs.includes(chef.id)}
                  onChange={() => handleSelectChef(chef.id)}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>
            
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{chef.name}</h3>
                  <p className="text-orange-600 font-medium">{chef.position}</p>
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(chef.rating)}
                  <span className="text-sm text-gray-500 ml-1">({chef.rating})</span>
                </div>
              </div>
              
              {/* Experience & Location */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  {chef.experience} năm KN
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {chef.location.replace('Chi nhánh ', '')}
                </div>
              </div>
              
              {/* Specialties */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Chuyên môn:</p>
                <div className="flex flex-wrap gap-1">
                  {chef.specialties.slice(0, 3).map(specialty => (
                    <span key={specialty} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                      {specialty}
                    </span>
                  ))}
                  {chef.specialties.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                      +{chef.specialties.length - 3}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Bio */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{chef.bio}</p>
              
              {/* Contact */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {chef.phone}
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {chef.email.split('@')[0]}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCurrentChef(chef);
                      setShowViewModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded transition-colors"
                    title="Xem chi tiết"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setCurrentChef(chef);
                      setShowEditModal(true);
                    }}
                    className="text-gray-600 hover:text-gray-800 p-2 rounded transition-colors"
                    title="Chỉnh sửa"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteChef(chef.id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded transition-colors"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleStatusChange(chef.id, chef.status === 'active' ? 'vacation' : 'active')}
                    className={`text-sm px-3 py-1 rounded-lg transition-colors ${
                      chef.status === 'active' 
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {chef.status === 'active' ? 'Nghỉ phép' : 'Kích hoạt'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredChefs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <ChefHat className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy đầu bếp</h3>
          <p className="text-gray-500 mb-4">Thử thay đổi bộ lọc để xem kết quả khác</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors"
          >
            <Plus className="w-4 h-4" />
            Thêm đầu bếp đầu tiên
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng đầu bếp</p>
              <p className="text-2xl font-bold text-gray-900">{chefs.length}</p>
            </div>
            <ChefHat className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đang làm việc</p>
              <p className="text-2xl font-bold text-gray-900">
                {chefs.filter(chef => chef.status === 'active').length}
              </p>
            </div>
            <Check className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Kinh nghiệm TB</p>
              <p className="text-2xl font-bold text-gray-900">
                {(chefs.reduce((sum, chef) => sum + chef.experience, 0) / chefs.length).toFixed(1)} năm
              </p>
            </div>
            <Award className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đánh giá TB</p>
              <p className="text-2xl font-bold text-gray-900">
                {(chefs.reduce((sum, chef) => sum + chef.rating, 0) / chefs.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <AddChefModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={(newChef) => {
            setChefs(prev => [newChef, ...prev]);
            setShowAddModal(false);
          }}
        />
      )}

      {/* View Modal */}
      {showViewModal && currentChef && (
        <ViewChefModal
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setCurrentChef(null);
          }}
          chef={currentChef}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && currentChef && (
        <EditChefModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setCurrentChef(null);
          }}
          chef={currentChef}
          onSave={(updatedChef) => {
            setChefs(prev => prev.map(chef => 
              chef.id === updatedChef.id ? updatedChef : chef
            ));
            setShowEditModal(false);
            setCurrentChef(null);
          }}
        />
      )}
    </div>
  );
};

// Add Chef Modal Component
const AddChefModal = ({ isOpen, onClose, onAdd }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    position: 'Đầu bếp',
    specialties: '',
    experience: 0,
    bio: '',
    phone: '',
    email: '',
    location: 'Chi nhánh Quận 1',
    status: 'probation'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newChef = {
      id: `CHEF${Date.now()}`,
      name: formData.name,
      position: formData.position,
      specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s),
      experience: formData.experience,
      avatar: `https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent('professional chef portrait ' + formData.name)}&image_size=square`,
      bio: formData.bio,
      phone: formData.phone,
      email: formData.email,
      joinDate: new Date().toISOString().split('T')[0],
      location: formData.location,
      status: formData.status,
      rating: 4.0,
      achievements: [],
      skills: [],
      workSchedule: {
        monday: '08:00 - 17:00',
        tuesday: '08:00 - 17:00',
        wednesday: '08:00 - 17:00',
        thursday: '08:00 - 17:00',
        friday: '08:00 - 17:00',
        saturday: 'Nghỉ',
        sunday: 'Nghỉ'
      },
      socialMedia: {}
    };
    
    onAdd(newChef);
    setFormData({
      name: '',
      position: 'Đầu bếp',
      specialties: '',
      experience: 0,
      bio: '',
      phone: '',
      email: '',
      location: 'Chi nhánh Quận 1',
      status: 'probation'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Thêm đầu bếp mới</h2>
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
                Họ tên *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Nhập họ tên đầu bếp"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vị trí *
              </label>
              <select
                required
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {positions.slice(1).map(position => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Nhập số điện thoại"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Nhập email"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kinh nghiệm (năm) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Nhập số năm kinh nghiệm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chi nhánh *
              </label>
              <select
                required
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {locations.slice(1).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chuyên môn
            </label>
            <input
              type="text"
              value={formData.specialties}
              onChange={(e) => setFormData(prev => ({ ...prev, specialties: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Nhập chuyên môn, phân cách bằng dấu phẩy"
            />
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giới thiệu
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Nhập thông tin giới thiệu về đầu bếp"
            />
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái *
            </label>
            <select
              required
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="probation">Thử việc</option>
              <option value="active">Đang làm việc</option>
              <option value="vacation">Nghỉ phép</option>
              <option value="inactive">Nghỉ việc</option>
            </select>
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
              <Plus className="w-4 h-4" />
              Thêm đầu bếp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// View Chef Modal Component
const ViewChefModal = ({ isOpen, onClose, chef }: any) => {
  if (!isOpen || !chef) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Thông tin đầu bếp</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-6 mb-8">
            <img
              src={chef.avatar}
              alt={chef.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{chef.name}</h1>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  chef.status === 'active' ? 'bg-green-100 text-green-800' :
                  chef.status === 'probation' ? 'bg-yellow-100 text-yellow-800' :
                  chef.status === 'vacation' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {chef.status === 'active' ? 'Đang làm việc' :
                   chef.status === 'probation' ? 'Thử việc' :
                   chef.status === 'vacation' ? 'Nghỉ phép' : 'Nghỉ việc'}
                </span>
              </div>
              <p className="text-xl text-orange-600 font-medium mb-3">{chef.position}</p>
              <div className="flex items-center gap-2 mb-3">
                {renderStars(chef.rating)}
                <span className="text-lg font-medium text-gray-900">({chef.rating})</span>
              </div>
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>{chef.experience} năm kinh nghiệm</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{chef.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Gia nhập: {chef.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Bio */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Giới thiệu</h3>
                <p className="text-gray-700">{chef.bio}</p>
              </div>
              
              {/* Contact */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Thông tin liên hệ</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{chef.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{chef.email}</span>
                  </div>
                </div>
              </div>
              
              {/* Specialties */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Chuyên môn</h3>
                <div className="flex flex-wrap gap-2">
                  {chef.specialties.map((specialty: string) => (
                    <span key={specialty} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Achievements */}
              {chef.achievements.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Thành tích</h3>
                  <ul className="space-y-2">
                    {chef.achievements.map((achievement: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              {/* Skills */}
              {chef.skills.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Kỹ năng</h3>
                  <div className="space-y-3">
                    {chef.skills.map((skill: any) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Work Schedule */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Lịch làm việc</h3>
                <div className="space-y-2">
                  {Object.entries(chef.workSchedule).map(([day, time]: [string, string]) => {
                    const dayNames: { [key: string]: string } = {
                      monday: 'Thứ 2',
                      tuesday: 'Thứ 3',
                      wednesday: 'Thứ 4',
                      thursday: 'Thứ 5',
                      friday: 'Thứ 6',
                      saturday: 'Thứ 7',
                      sunday: 'Chủ nhật'
                    };
                    return (
                      <div key={day} className="flex items-center justify-between py-1">
                        <span className="text-sm font-medium text-gray-700">{dayNames[day]}</span>
                        <span className={`text-sm ${
                          time === 'Nghỉ' ? 'text-red-600' : 'text-gray-600'
                        }`}>{time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Social Media */}
              {Object.keys(chef.socialMedia).length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Mạng xã hội</h3>
                  <div className="space-y-2">
                    {chef.socialMedia.facebook && (
                      <a 
                        href={chef.socialMedia.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span className="text-sm">Facebook</span>
                      </a>
                    )}
                    {chef.socialMedia.instagram && (
                      <a 
                        href={chef.socialMedia.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors"
                      >
                        <span className="text-sm">Instagram</span>
                      </a>
                    )}
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

// Edit Chef Modal Component
const EditChefModal = ({ isOpen, onClose, chef, onSave }: any) => {
  const [formData, setFormData] = useState({
    name: chef?.name || '',
    position: chef?.position || 'Đầu bếp',
    specialties: chef?.specialties?.join(', ') || '',
    experience: chef?.experience || 0,
    bio: chef?.bio || '',
    phone: chef?.phone || '',
    email: chef?.email || '',
    location: chef?.location || 'Chi nhánh Quận 1',
    status: chef?.status || 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedChef = {
      ...chef,
      name: formData.name,
      position: formData.position,
      specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s),
      experience: formData.experience,
      bio: formData.bio,
      phone: formData.phone,
      email: formData.email,
      location: formData.location,
      status: formData.status
    };
    
    onSave(updatedChef);
  };

  if (!isOpen || !chef) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Chỉnh sửa thông tin đầu bếp</h2>
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
                Họ tên *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Nhập họ tên đầu bếp"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vị trí *
              </label>
              <select
                required
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {positions.slice(1).map(position => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Nhập số điện thoại"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Nhập email"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kinh nghiệm (năm) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Nhập số năm kinh nghiệm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chi nhánh *
              </label>
              <select
                required
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {locations.slice(1).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chuyên môn
            </label>
            <input
              type="text"
              value={formData.specialties}
              onChange={(e) => setFormData(prev => ({ ...prev, specialties: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Nhập chuyên môn, phân cách bằng dấu phẩy"
            />
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giới thiệu
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Nhập thông tin giới thiệu về đầu bếp"
            />
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái *
            </label>
            <select
              required
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="probation">Thử việc</option>
              <option value="active">Đang làm việc</option>
              <option value="vacation">Nghỉ phép</option>
              <option value="inactive">Nghỉ việc</option>
            </select>
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

export default AdminChefs;