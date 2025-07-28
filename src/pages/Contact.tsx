import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Facebook, Instagram, Youtube, Star, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  branch: string;
}

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string[];
  color: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Hotline',
    details: ['1900 1234', '028 3456 7890'],
    color: 'text-green-600'
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Email',
    details: ['info@ganu.vn', 'support@ganu.vn'],
    color: 'text-blue-600'
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Địa chỉ',
    details: ['123 Đường ABC, Quận 1, TP.HCM', '456 Đường XYZ, Quận 7, TP.HCM'],
    color: 'text-red-600'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Giờ mở cửa',
    details: ['Thứ 2 - Chủ nhật: 8:00 - 22:00', 'Phục vụ cả ngày lễ'],
    color: 'text-orange-600'
  }
];

const branches = [
  { value: 'quan1', label: 'GANU Quận 1' },
  { value: 'quan3', label: 'GANU Quận 3' },
  { value: 'quan7', label: 'GANU Quận 7' },
  { value: 'thuduc', label: 'GANU Thủ Đức' },
  { value: 'other', label: 'Chi nhánh khác' }
];

const subjects = [
  { value: 'order', label: 'Đặt hàng & Giao hàng' },
  { value: 'menu', label: 'Thực đơn & Combo' },
  { value: 'service', label: 'Chất lượng dịch vụ' },
  { value: 'feedback', label: 'Góp ý & Khiếu nại' },
  { value: 'partnership', label: 'Hợp tác kinh doanh' },
  { value: 'other', label: 'Khác' }
];

const socialLinks = [
  {
    icon: <Facebook className="w-6 h-6" />,
    name: 'Facebook',
    url: 'https://facebook.com/ganu.vn',
    color: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    icon: <Instagram className="w-6 h-6" />,
    name: 'Instagram',
    url: 'https://instagram.com/ganu.vn',
    color: 'bg-pink-600 hover:bg-pink-700'
  },
  {
    icon: <Youtube className="w-6 h-6" />,
    name: 'Youtube',
    url: 'https://youtube.com/ganu.vn',
    color: 'bg-red-600 hover:bg-red-700'
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    name: 'Zalo',
    url: 'https://zalo.me/ganu.vn',
    color: 'bg-blue-500 hover:bg-blue-600'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    branch: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    if (!formData.subject) newErrors.subject = 'Vui lòng chọn chủ đề';
    if (!formData.message.trim()) newErrors.message = 'Vui lòng nhập nội dung';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        branch: ''
      });
      setErrors({});
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Phone className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Liên Hệ GANU
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>Phản hồi trong 30 phút</span>
              </div>
              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 ${info.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={info.color}>{info.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Gửi Tin Nhắn 📝
                </h2>
                <p className="text-gray-600">
                  Điền thông tin bên dưới và chúng tôi sẽ phản hồi trong thời gian sớm nhất
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-700">Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm nhất.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-700">Có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ hotline.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nhập họ và tên"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nhập số điện thoại"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập địa chỉ email"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Chi nhánh quan tâm
                    </label>
                    <select
                      value={formData.branch}
                      onChange={(e) => handleInputChange('branch', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    >
                      <option value="">Chọn chi nhánh</option>
                      {branches.map((branch) => (
                        <option key={branch.value} value={branch.value}>
                          {branch.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Chủ đề *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Chọn chủ đề</option>
                      {subjects.map((subject) => (
                        <option key={subject.value} value={subject.value}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                    {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nội dung tin nhắn *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold py-4 px-6 rounded-lg hover:from-orange-600 hover:to-yellow-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Gửi tin nhắn
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Vị Trí Cửa Hàng 📍
                  </h3>
                  <p className="text-gray-600">
                    Tìm GANU gần bạn nhất
                  </p>
                </div>
                <div className="h-80 bg-gray-200 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4326!2d106.6297!3d10.8231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ5JzIzLjIiTiAxMDbCsDM3JzQ2LjkiRQ!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="GANU Location"
                  ></iframe>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Kết Nối Với GANU 🌟
                </h3>
                <p className="text-gray-600 mb-6">
                  Theo dõi chúng tôi để cập nhật những ưu đãi mới nhất
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} text-white p-4 rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105`}
                    >
                      {social.icon}
                      <span className="font-semibold">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-r from-orange-500 to-yellow-400 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Liên Hệ Nhanh 🚀
                </h3>
                <div className="space-y-4">
                  <a
                    href="tel:19001234"
                    className="flex items-center gap-3 bg-white bg-opacity-20 p-3 rounded-lg hover:bg-opacity-30 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Gọi ngay: 1900 1234</span>
                  </a>
                  <a
                    href="mailto:info@ganu.vn"
                    className="flex items-center gap-3 bg-white bg-opacity-20 p-3 rounded-lg hover:bg-opacity-30 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Email: info@ganu.vn</span>
                  </a>
                  <a
                    href="https://zalo.me/ganu.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white bg-opacity-20 p-3 rounded-lg hover:bg-opacity-30 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Chat Zalo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Có Thể Bạn Quan Tâm 💡
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/faq"
              className="bg-gray-50 hover:bg-gray-100 p-6 rounded-xl transition-colors group"
            >
              <div className="text-4xl mb-4">❓</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-600">
                Câu hỏi thường gặp
              </h3>
              <p className="text-gray-600">
                Tìm câu trả lời nhanh chóng
              </p>
            </a>
            <a
              href="/order"
              className="bg-gray-50 hover:bg-gray-100 p-6 rounded-xl transition-colors group"
            >
              <div className="text-4xl mb-4">🍗</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-600">
                Đặt hàng ngay
              </h3>
              <p className="text-gray-600">
                Thưởng thức gà nướng GANU
              </p>
            </a>
            <a
              href="/location"
              className="bg-gray-50 hover:bg-gray-100 p-6 rounded-xl transition-colors group"
            >
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-600">
                Tìm cửa hàng
              </h3>
              <p className="text-gray-600">
                Địa chỉ các chi nhánh
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}