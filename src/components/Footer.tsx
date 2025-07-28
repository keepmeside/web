import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">🍗</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-400">GANU</h3>
                <p className="text-xs text-gray-400">Gà Nướng Ngon</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Chuyên cung cấp các combo gà nướng tươi ngon, đậm đà hương vị với công thức độc quyền. 
              Cam kết chất lượng và dịch vụ tốt nhất cho khách hàng.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Trang chủ</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Giới thiệu</Link></li>
              <li><Link to="/combo" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Menu Combo</Link></li>
              <li><Link to="/offers" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Ưu đãi</Link></li>
              <li><Link to="/location" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Địa điểm</Link></li>
              <li><Link to="/chef-team" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Đội ngũ đầu bếp</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Dịch vụ</h4>
            <ul className="space-y-2">
              <li><Link to="/order" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Đặt hàng online</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Thư viện ảnh</Link></li>
              <li><Link to="/reviews" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Đánh giá khách hàng</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Blog ẩm thực</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Câu hỏi thường gặp</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Liên hệ</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-orange-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">Hotline đặt hàng</p>
                  <p className="text-white font-semibold">1900-1234</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-orange-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <p className="text-white">info@ganu.vn</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">Địa chỉ</p>
                  <p className="text-white text-sm">123 Đường ABC, Quận 1, TP.HCM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-orange-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">Giờ mở cửa</p>
                  <p className="text-white text-sm">8:00 - 22:00 (Hàng ngày)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 GANU - Gà Nướng Ngon. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                Chính sách bảo mật
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                Điều khoản sử dụng
              </Link>
              <Link to="/admin/login" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                Quản trị
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}