import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, MapPin, Clock, Phone, User, Mail, MessageSquare, CreditCard, Truck, Store } from 'lucide-react';

interface ComboData {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  ingredients: string[];
}

interface OrderItem {
  combo: ComboData;
  quantity: number;
  notes?: string;
}

interface DeliveryInfo {
  type: 'delivery' | 'pickup';
  address?: string;
  branchId?: number;
  deliveryTime: string;
}

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const combos: { [key: string]: ComboData } = {
  '1': {
    id: 1,
    name: 'Combo Gà Nướng Mật Ong',
    price: 159000,
    originalPrice: 199000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=honey%20glazed%20grilled%20chicken%20with%20rice%20and%20salad%20golden%20color%20appetizing&image_size=square_hd',
    description: 'Gà nướng tẩm mật ong, cơm trắng, salad tươi, nước sốt đặc biệt',
    ingredients: ['Gà ta tươi', 'Mật ong nguyên chất', 'Cơm jasmine', 'Salad tươi']
  },
  '2': {
    id: 2,
    name: 'Combo Gà Nướng Teriyaki',
    price: 179000,
    originalPrice: 219000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=teriyaki%20grilled%20chicken%20with%20vegetables%20and%20rice%20japanese%20style%20presentation&image_size=square_hd',
    description: 'Gà nướng sốt Teriyaki Nhật Bản, rau củ nướng, cơm',
    ingredients: ['Gà ta tươi', 'Sốt Teriyaki', 'Rau củ nướng', 'Cơm jasmine']
  },
  '3': {
    id: 3,
    name: 'Combo Gà Nướng Cay Hàn Quốc',
    price: 169000,
    originalPrice: 209000,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=spicy%20korean%20grilled%20chicken%20with%20kimchi%20and%20rice%20vibrant%20red%20color&image_size=square_hd',
    description: 'Gà nướng cay kiểu Hàn, kimchi, cơm, súp miso',
    ingredients: ['Gà ta tươi', 'Gia vị Hàn Quốc', 'Kimchi', 'Cơm jasmine']
  }
};

const branches = [
  { id: 1, name: 'GANU Quận 1', address: '123 Nguyễn Huệ, Quận 1, TP.HCM' },
  { id: 2, name: 'GANU Quận 3', address: '456 Võ Văn Tần, Quận 3, TP.HCM' },
  { id: 3, name: 'GANU Quận 7', address: '789 Nguyễn Thị Thập, Quận 7, TP.HCM' },
  { id: 4, name: 'GANU Thủ Đức', address: '321 Võ Văn Ngân, TP. Thủ Đức, TP.HCM' }
];

const deliveryTimes = [
  'Giao ngay (30-45 phút)',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '17:00 - 18:00',
  '18:00 - 19:00',
  '19:00 - 20:00'
];

export default function Order() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    type: 'delivery',
    address: '',
    branchId: 1,
    deliveryTime: deliveryTimes[0]
  });
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id && combos[id]) {
      const quantity = parseInt(searchParams.get('quantity') || '1');
      const combo = combos[id];
      setOrderItems([{ combo, quantity }]);
    }
  }, [id, searchParams]);

  const addCombo = (comboId: string) => {
    const combo = combos[comboId];
    if (!combo) return;

    const existingItem = orderItems.find(item => item.combo.id === combo.id);
    if (existingItem) {
      updateQuantity(combo.id, existingItem.quantity + 1);
    } else {
      setOrderItems([...orderItems, { combo, quantity: 1 }]);
    }
  };

  const updateQuantity = (comboId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setOrderItems(orderItems.filter(item => item.combo.id !== comboId));
    } else {
      setOrderItems(orderItems.map(item => 
        item.combo.id === comboId 
          ? { ...item, quantity: Math.min(newQuantity, 10) }
          : item
      ));
    }
  };

  const updateItemNotes = (comboId: number, notes: string) => {
    setOrderItems(orderItems.map(item => 
      item.combo.id === comboId 
        ? { ...item, notes }
        : item
    ));
  };

  const applyPromoCode = () => {
    // Simple promo code logic
    const validCodes = {
      'GANU20': 20,
      'WELCOME10': 10,
      'STUDENT15': 15
    };

    if (validCodes[promoCode as keyof typeof validCodes]) {
      setDiscount(validCodes[promoCode as keyof typeof validCodes]);
      setIsPromoApplied(true);
      setErrors({ ...errors, promo: '' });
    } else {
      setErrors({ ...errors, promo: 'Mã khuyến mãi không hợp lệ' });
      setIsPromoApplied(false);
      setDiscount(0);
    }
  };

  const calculateSubtotal = () => {
    return orderItems.reduce((total, item) => total + (item.combo.price * item.quantity), 0);
  };

  const calculateDeliveryFee = () => {
    return deliveryInfo.type === 'delivery' ? 25000 : 0;
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    return Math.round(subtotal * discount / 100);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = calculateDeliveryFee();
    const discountAmount = calculateDiscount();
    return subtotal + deliveryFee - discountAmount;
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(customerInfo.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (customerInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (deliveryInfo.type === 'delivery' && !deliveryInfo.address?.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ giao hàng';
    }

    if (orderItems.length === 0) {
      newErrors.items = 'Vui lòng chọn ít nhất một combo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate order ID
      const orderId = 'GANU' + Date.now().toString().slice(-6);
      
      // Navigate to confirmation page with order data
      navigate('/order-confirmation', {
        state: {
          orderId,
          orderItems,
          customerInfo,
          deliveryInfo,
          subtotal: calculateSubtotal(),
          deliveryFee: calculateDeliveryFee(),
          discount: calculateDiscount(),
          total: calculateTotal(),
          promoCode: isPromoApplied ? promoCode : null
        }
      });
    } catch (error) {
      console.error('Order submission failed:', error);
      setErrors({ submit: 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderItems.length === 0 && id && !combos[id]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Combo không tồn tại</h2>
          <p className="text-gray-600 mb-4">Combo bạn muốn đặt không tồn tại hoặc đã bị xóa</p>
          <button
            onClick={() => navigate('/combo')}
            className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Chọn combo khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Đặt Hàng 🛒
            </h1>
            <p className="text-gray-600">
              Hoàn tất thông tin để đặt combo gà nướng ngon
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Items & Customer Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6" />
                    Combo đã chọn
                  </h2>
                  <button
                    type="button"
                    onClick={() => navigate('/combo')}
                    className="text-orange-500 hover:text-orange-600 font-semibold"
                  >
                    + Thêm combo
                  </button>
                </div>

                {orderItems.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🍗</div>
                    <p className="text-gray-600 mb-4">Chưa có combo nào được chọn</p>
                    <button
                      type="button"
                      onClick={() => navigate('/combo')}
                      className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Chọn combo
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orderItems.map((item) => (
                      <div key={item.combo.id} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex gap-4">
                          <img
                            src={item.combo.image}
                            alt={item.combo.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800 mb-1">{item.combo.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{item.combo.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.combo.id, item.quantity - 1)}
                                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-semibold">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.combo.id, item.quantity + 1)}
                                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              
                              <div className="text-right">
                                <div className="font-bold text-orange-600">
                                  {(item.combo.price * item.quantity).toLocaleString('vi-VN')}đ
                                </div>
                                {item.combo.originalPrice > item.combo.price && (
                                  <div className="text-sm text-gray-500 line-through">
                                    {(item.combo.originalPrice * item.quantity).toLocaleString('vi-VN')}đ
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="mt-3">
                              <input
                                type="text"
                                placeholder="Ghi chú cho combo này (tùy chọn)"
                                value={item.notes || ''}
                                onChange={(e) => updateItemNotes(item.combo.id, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {errors.items && (
                  <p className="text-red-500 text-sm mt-2">{errors.items}</p>
                )}
              </div>

              {/* Customer Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Thông tin khách hàng
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nhập họ và tên"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nhập số điện thoại"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email (tùy chọn)
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nhập email để nhận xác nhận đơn hàng"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ghi chú đơn hàng
                    </label>
                    <textarea
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Ghi chú thêm về đơn hàng (tùy chọn)"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Truck className="w-6 h-6" />
                  Thông tin giao hàng
                </h2>
                
                {/* Delivery Type */}
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setDeliveryInfo({ ...deliveryInfo, type: 'delivery' })}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        deliveryInfo.type === 'delivery'
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Truck className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                      <div className="font-semibold">Giao hàng</div>
                      <div className="text-sm text-gray-600">Phí giao hàng: 25.000đ</div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setDeliveryInfo({ ...deliveryInfo, type: 'pickup' })}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        deliveryInfo.type === 'pickup'
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Store className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                      <div className="font-semibold">Lấy tại cửa hàng</div>
                      <div className="text-sm text-gray-600">Miễn phí</div>
                    </button>
                  </div>
                </div>
                
                {/* Address or Branch Selection */}
                {deliveryInfo.type === 'delivery' ? (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Địa chỉ giao hàng *
                    </label>
                    <input
                      type="text"
                      value={deliveryInfo.address || ''}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nhập địa chỉ giao hàng đầy đủ"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                ) : (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Chọn chi nhánh
                    </label>
                    <select
                      value={deliveryInfo.branchId}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, branchId: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.name} - {branch.address}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                {/* Delivery Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Thời gian {deliveryInfo.type === 'delivery' ? 'giao hàng' : 'lấy hàng'}
                  </label>
                  <select
                    value={deliveryInfo.deliveryTime}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, deliveryTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {deliveryTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6" />
                  Tóm tắt đơn hàng
                </h2>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mã khuyến mãi
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.promo ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nhập mã"
                      disabled={isPromoApplied}
                    />
                    <button
                      type="button"
                      onClick={applyPromoCode}
                      disabled={!promoCode || isPromoApplied}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {isPromoApplied ? '✓' : 'Áp dụng'}
                    </button>
                  </div>
                  {errors.promo && <p className="text-red-500 text-sm mt-1">{errors.promo}</p>}
                  {isPromoApplied && (
                    <p className="text-green-600 text-sm mt-1">✓ Mã khuyến mãi đã được áp dụng</p>
                  )}
                </div>
                
                {/* Order Summary */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-semibold">{calculateSubtotal().toLocaleString('vi-VN')}đ</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí giao hàng:</span>
                    <span className="font-semibold">
                      {calculateDeliveryFee() === 0 ? 'Miễn phí' : `${calculateDeliveryFee().toLocaleString('vi-VN')}đ`}
                    </span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá ({discount}%):</span>
                      <span className="font-semibold">-{calculateDiscount().toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}
                  
                  <hr className="border-gray-200" />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-orange-600">{calculateTotal().toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || orderItems.length === 0}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang xử lý...
                    </div>
                  ) : (
                    `Đặt hàng • ${calculateTotal().toLocaleString('vi-VN')}đ`
                  )}
                </button>
                
                {errors.submit && (
                  <p className="text-red-500 text-sm mt-2 text-center">{errors.submit}</p>
                )}
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  Bằng cách đặt hàng, bạn đồng ý với điều khoản sử dụng của GANU
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}