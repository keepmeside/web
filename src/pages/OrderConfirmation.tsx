import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Phone, Mail, Truck, Store, Share2, Download, ArrowLeft } from 'lucide-react';

interface OrderItem {
  combo: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  notes?: string;
}

interface OrderData {
  orderId: string;
  orderItems: OrderItem[];
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    notes: string;
  };
  deliveryInfo: {
    type: 'delivery' | 'pickup';
    address?: string;
    branchId?: number;
    deliveryTime: string;
  };
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  promoCode?: string;
}

const branches = [
  { id: 1, name: 'GANU Quận 1', address: '123 Nguyễn Huệ, Quận 1, TP.HCM', phone: '028 3822 1234' },
  { id: 2, name: 'GANU Quận 3', address: '456 Võ Văn Tần, Quận 3, TP.HCM', phone: '028 3930 5678' },
  { id: 3, name: 'GANU Quận 7', address: '789 Nguyễn Thị Thập, Quận 7, TP.HCM', phone: '028 5412 9012' },
  { id: 4, name: 'GANU Thủ Đức', address: '321 Võ Văn Ngân, TP. Thủ Đức, TP.HCM', phone: '028 7108 3456' }
];

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    if (location.state) {
      setOrderData(location.state as OrderData);
      
      // Simulate sending confirmation email/SMS
      setTimeout(() => {
        if ((location.state as OrderData).customerInfo.email) {
          setEmailSent(true);
        }
        setSmsSent(true);
      }, 2000);
    } else {
      // Redirect if no order data
      navigate('/combo');
    }
  }, [location.state, navigate]);

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    );
  }

  const selectedBranch = branches.find(b => b.id === orderData.deliveryInfo.branchId);
  const estimatedTime = orderData.deliveryInfo.type === 'delivery' ? '30-45 phút' : '15-20 phút';
  const orderDate = new Date().toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const shareOrder = async () => {
    setIsSharing(true);
    
    const shareData = {
      title: `Đơn hàng GANU #${orderData.orderId}`,
      text: `Tôi vừa đặt combo gà nướng ngon tại GANU! Mã đơn hàng: ${orderData.orderId}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        alert('Đã sao chép thông tin đơn hàng!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const downloadReceipt = () => {
    // Simulate download receipt
    const receiptContent = `
HÓA ĐƠN ĐIỆN TỬ - GANU
========================
Mã đơn hàng: ${orderData.orderId}
Ngày đặt: ${orderDate}
Khách hàng: ${orderData.customerInfo.name}
SĐT: ${orderData.customerInfo.phone}

CHI TIẾT ĐƠN HÀNG:
${orderData.orderItems.map(item => 
  `${item.combo.name} x${item.quantity} - ${(item.combo.price * item.quantity).toLocaleString('vi-VN')}đ`
).join('\n')}

Tạm tính: ${orderData.subtotal.toLocaleString('vi-VN')}đ
Phí giao hàng: ${orderData.deliveryFee.toLocaleString('vi-VN')}đ
Giảm giá: -${orderData.discount.toLocaleString('vi-VN')}đ
Tổng cộng: ${orderData.total.toLocaleString('vi-VN')}đ

Cảm ơn bạn đã chọn GANU!
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GANU_${orderData.orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Đặt Hàng Thành Công! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              Cảm ơn bạn đã tin tưởng GANU. Đơn hàng của bạn đang được xử lý.
            </p>
          </div>

          {/* Order ID & Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Mã đơn hàng: #{orderData.orderId}
                </h2>
                <p className="text-gray-600 mb-2">Đặt lúc: {orderDate}</p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-yellow-600 font-semibold">Đang xử lý</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex gap-3">
                <button
                  onClick={shareOrder}
                  disabled={isSharing}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Chia sẻ
                </button>
                <button
                  onClick={downloadReceipt}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Tải hóa đơn
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Chi tiết đơn hàng</h3>
              
              <div className="space-y-4 mb-6">
                {orderData.orderItems.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.combo.image}
                      alt={item.combo.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.combo.name}</h4>
                      <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      {item.notes && (
                        <p className="text-sm text-gray-500 italic">Ghi chú: {item.notes}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">
                        {(item.combo.price * item.quantity).toLocaleString('vi-VN')}đ
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span>{orderData.subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí giao hàng:</span>
                  <span>{orderData.deliveryFee === 0 ? 'Miễn phí' : `${orderData.deliveryFee.toLocaleString('vi-VN')}đ`}</span>
                </div>
                {orderData.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá{orderData.promoCode ? ` (${orderData.promoCode})` : ''}:</span>
                    <span>-{orderData.discount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-orange-600">{orderData.total.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>
            </div>

            {/* Delivery & Customer Info */}
            <div className="space-y-6">
              {/* Delivery Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  {orderData.deliveryInfo.type === 'delivery' ? (
                    <Truck className="w-6 h-6" />
                  ) : (
                    <Store className="w-6 h-6" />
                  )}
                  {orderData.deliveryInfo.type === 'delivery' ? 'Thông tin giao hàng' : 'Thông tin lấy hàng'}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {orderData.deliveryInfo.type === 'delivery' ? 'Địa chỉ giao hàng:' : 'Địa chỉ cửa hàng:'}
                      </p>
                      <p className="text-gray-600">
                        {orderData.deliveryInfo.type === 'delivery' 
                          ? orderData.deliveryInfo.address 
                          : selectedBranch?.address
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        Thời gian {orderData.deliveryInfo.type === 'delivery' ? 'giao hàng' : 'lấy hàng'}:
                      </p>
                      <p className="text-gray-600">{orderData.deliveryInfo.deliveryTime}</p>
                      <p className="text-sm text-green-600 font-semibold">
                        Dự kiến: {estimatedTime}
                      </p>
                    </div>
                  </div>
                  
                  {orderData.deliveryInfo.type === 'pickup' && selectedBranch && (
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">Hotline cửa hàng:</p>
                        <a 
                          href={`tel:${selectedBranch.phone}`}
                          className="text-orange-600 hover:text-orange-700 font-semibold"
                        >
                          {selectedBranch.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Thông tin khách hàng</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-800">Họ và tên:</p>
                    <p className="text-gray-600">{orderData.customerInfo.name}</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-gray-800">Số điện thoại:</p>
                    <p className="text-gray-600">{orderData.customerInfo.phone}</p>
                  </div>
                  
                  {orderData.customerInfo.email && (
                    <div>
                      <p className="font-semibold text-gray-800">Email:</p>
                      <p className="text-gray-600">{orderData.customerInfo.email}</p>
                    </div>
                  )}
                  
                  {orderData.customerInfo.notes && (
                    <div>
                      <p className="font-semibold text-gray-800">Ghi chú:</p>
                      <p className="text-gray-600">{orderData.customerInfo.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Notification Status */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Thông báo xác nhận</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      smsSent ? 'bg-green-500' : 'bg-yellow-400 animate-pulse'
                    }`}></div>
                    <span className={smsSent ? 'text-green-600' : 'text-yellow-600'}>
                      {smsSent ? '✓ Đã gửi SMS xác nhận' : 'Đang gửi SMS...'}
                    </span>
                  </div>
                  
                  {orderData.customerInfo.email && (
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        emailSent ? 'bg-green-500' : 'bg-yellow-400 animate-pulse'
                      }`}></div>
                      <span className={emailSent ? 'text-green-600' : 'text-yellow-600'}>
                        {emailSent ? '✓ Đã gửi email xác nhận' : 'Đang gửi email...'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-400 rounded-2xl p-6 mt-6 text-white">
            <h3 className="text-xl font-bold mb-4">Bước tiếp theo 📋</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold">1</span>
                </div>
                <p className="font-semibold">Xác nhận đơn hàng</p>
                <p className="text-sm opacity-90">Chúng tôi sẽ gọi xác nhận trong 5-10 phút</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold">2</span>
                </div>
                <p className="font-semibold">Chuẩn bị món ăn</p>
                <p className="text-sm opacity-90">Đầu bếp bắt đầu chế biến combo của bạn</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold">3</span>
                </div>
                <p className="font-semibold">
                  {orderData.deliveryInfo.type === 'delivery' ? 'Giao hàng' : 'Lấy hàng'}
                </p>
                <p className="text-sm opacity-90">
                  {orderData.deliveryInfo.type === 'delivery' 
                    ? 'Shipper sẽ giao đến địa chỉ của bạn'
                    : 'Đến cửa hàng lấy combo theo giờ hẹn'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Về trang chủ
            </button>
            
            <Link
              to="/combo"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Đặt thêm combo khác
            </Link>
            
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Liên hệ hỗ trợ
            </Link>
          </div>

          {/* Support Info */}
          <div className="text-center mt-8 p-6 bg-gray-100 rounded-2xl">
            <h4 className="font-bold text-gray-800 mb-2">Cần hỗ trợ? 🤝</h4>
            <p className="text-gray-600 mb-3">
              Liên hệ hotline <a href="tel:1900123456" className="text-orange-600 font-semibold">1900 123 456</a> 
              hoặc chat với chúng tôi qua Facebook/Zalo
            </p>
            <p className="text-sm text-gray-500">
              Thời gian hỗ trợ: 8:00 - 22:00 hàng ngày
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}