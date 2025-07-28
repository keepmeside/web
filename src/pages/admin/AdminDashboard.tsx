import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Users,
  Star,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MessageSquare
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock data
const statsData = [
  {
    title: 'Tổng doanh thu',
    value: '125.5M',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    title: 'Đơn hàng hôm nay',
    value: '248',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingBag,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    title: 'Khách hàng mới',
    value: '1,234',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    title: 'Đánh giá trung bình',
    value: '4.8',
    change: '+0.2',
    trend: 'up',
    icon: Star,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  }
];

const revenueData = [
  { month: 'T1', revenue: 45000000, orders: 1200 },
  { month: 'T2', revenue: 52000000, orders: 1350 },
  { month: 'T3', revenue: 48000000, orders: 1180 },
  { month: 'T4', revenue: 61000000, orders: 1520 },
  { month: 'T5', revenue: 55000000, orders: 1400 },
  { month: 'T6', revenue: 67000000, orders: 1680 },
  { month: 'T7', revenue: 72000000, orders: 1850 },
  { month: 'T8', revenue: 69000000, orders: 1720 },
  { month: 'T9', revenue: 78000000, orders: 1950 },
  { month: 'T10', revenue: 82000000, orders: 2100 },
  { month: 'T11', revenue: 88000000, orders: 2250 },
  { month: 'T12', revenue: 95000000, orders: 2400 }
];

const topCombos = [
  { name: 'Combo Gà Nướng Đặc Biệt', sales: 1250, revenue: 62500000 },
  { name: 'Combo Gà Nướng Gia Đình', sales: 980, revenue: 58800000 },
  { name: 'Combo Gà Nướng Cay', sales: 850, revenue: 42500000 },
  { name: 'Combo Gà Nướng Mật Ong', sales: 720, revenue: 39600000 },
  { name: 'Combo Gà Nướng Truyền Thống', sales: 650, revenue: 32500000 }
];

const orderStatusData = [
  { name: 'Hoàn thành', value: 1850, color: '#10B981' },
  { name: 'Đang xử lý', value: 320, color: '#F59E0B' },
  { name: 'Đang giao', value: 180, color: '#3B82F6' },
  { name: 'Đã hủy', value: 45, color: '#EF4444' }
];

const recentOrders = [
  {
    id: '#ORD-2024-001',
    customer: 'Nguyễn Văn A',
    combo: 'Combo Gà Nướng Đặc Biệt',
    amount: 299000,
    status: 'completed',
    time: '10 phút trước'
  },
  {
    id: '#ORD-2024-002',
    customer: 'Trần Thị B',
    combo: 'Combo Gà Nướng Gia Đình',
    amount: 599000,
    status: 'processing',
    time: '15 phút trước'
  },
  {
    id: '#ORD-2024-003',
    customer: 'Lê Văn C',
    combo: 'Combo Gà Nướng Cay',
    amount: 249000,
    status: 'shipping',
    time: '25 phút trước'
  },
  {
    id: '#ORD-2024-004',
    customer: 'Phạm Thị D',
    combo: 'Combo Gà Nướng Mật Ong',
    amount: 279000,
    status: 'cancelled',
    time: '30 phút trước'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'processing':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'shipping':
      return <AlertCircle className="w-4 h-4 text-blue-500" />;
    case 'cancelled':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return null;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Hoàn thành';
    case 'processing':
      return 'Đang xử lý';
    case 'shipping':
      return 'Đang giao';
    case 'cancelled':
      return 'Đã hủy';
    default:
      return status;
  }
};

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Tổng quan hoạt động kinh doanh</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="7d">7 ngày qua</option>
            <option value="30d">30 ngày qua</option>
            <option value="90d">3 tháng qua</option>
            <option value="1y">1 năm qua</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-white rounded-xl shadow-sm border ${stat.borderColor} p-6`}>
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Doanh thu theo tháng</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-600">Doanh thu</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip 
                  formatter={(value: any) => [`${(value / 1000000).toFixed(1)}M VNĐ`, 'Doanh thu']}
                  labelStyle={{ color: '#374151' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#f97316" 
                  strokeWidth={3}
                  dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Trạng thái đơn hàng</h3>
          <div className="h-80 flex items-center">
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value} đơn`, 'Số lượng']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-3">
              {orderStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Combos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Combo bán chạy</h3>
            <Link 
              to="/admin/combos" 
              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="space-y-4">
            {topCombos.map((combo, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{combo.name}</p>
                    <p className="text-sm text-gray-500">{combo.sales} đã bán</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{(combo.revenue / 1000000).toFixed(1)}M</p>
                  <p className="text-sm text-gray-500">VNĐ</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Đơn hàng gần đây</h3>
            <Link 
              to="/admin/orders" 
              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.amount.toLocaleString()}đ</p>
                  <p className="text-sm text-gray-500">{order.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/orders"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
          >
            <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-orange-600" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">Quản lý đơn hàng</span>
          </Link>
          <Link
            to="/admin/combos"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
          >
            <Eye className="w-5 h-5 text-gray-600 group-hover:text-orange-600" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">Xem combo</span>
          </Link>
          <Link
            to="/admin/reviews"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
          >
            <MessageSquare className="w-5 h-5 text-gray-600 group-hover:text-orange-600" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">Đánh giá mới</span>
          </Link>
          <Link
            to="/admin/posts"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
          >
            <Users className="w-5 h-5 text-gray-600 group-hover:text-orange-600" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">Viết bài mới</span>
          </Link>
        </div>
      </div>
    </div>
  );
}