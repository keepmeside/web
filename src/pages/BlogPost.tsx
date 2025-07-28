import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Eye, Heart, MessageCircle, Share2, Tag, Clock, ChevronLeft, ChevronRight, Star, ThumbsUp, ThumbsDown } from 'lucide-react';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  authorBio: string;
  publishDate: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  category: string;
  tags: string[];
  featuredImage: string;
  tableOfContents: { id: string; title: string; level: number }[];
}

interface Comment {
  id: number;
  userName: string;
  userAvatar: string;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

interface RelatedPost {
  id: number;
  slug: string;
  title: string;
  featuredImage: string;
  readTime: number;
  category: string;
}

const blogPost: BlogPost = {
  id: 1,
  slug: 'bi-quyet-nuong-ga-hoan-hao',
  title: 'Bí Quyết Nướng Gà Hoàn Hảo Như Đầu Bếp GANU',
  content: `
    <h2 id="chuan-bi">1. Chuẩn Bị Nguyên Liệu</h2>
    <p>Để có được món gà nướng hoàn hảo như tại GANU, việc chọn lựa nguyên liệu là bước đầu tiên và quan trọng nhất. Một con gà tươi ngon sẽ quyết định 70% thành công của món ăn.</p>
    
    <h3>Chọn gà tươi chất lượng:</h3>
    <ul>
      <li><strong>Gà ta hoặc gà công nghiệp:</strong> Gà ta có thịt chắc, thơm ngon hơn nhưng giá cao. Gà công nghiệp cũng cho kết quả tốt nếu chọn đúng cách.</li>
      <li><strong>Trọng lượng lý tưởng:</strong> 1.2-1.5kg cho gà nguyên con, đảm bảo thịt mềm và không quá già.</li>
      <li><strong>Kiểm tra độ tươi:</strong> Da gà có màu vàng nhạt, không có mùi lạ, thịt đàn hồi khi ấn.</li>
    </ul>

    <h2 id="gia-vi">2. Bí Quyết Gia Vị Đặc Biệt</h2>
    <p>Công thức gia vị của GANU được nghiên cứu và hoàn thiện qua nhiều năm, tạo nên hương vị đặc trưng khó quên.</p>
    
    <h3>Hỗn hợp gia vị cơ bản:</h3>
    <ul>
      <li>2 thìa canh nước mắm ngon</li>
      <li>1 thìa canh dầu hào</li>
      <li>1 thìa cà phê đường nâu</li>
      <li>1 thìa cà phê tiêu đen xay</li>
      <li>2 tép tỏi băm nhuyễn</li>
      <li>1 củ hành tây nhỏ băm nhuyễn</li>
      <li>1 thìa cà phê bột ngũ vị hương</li>
    </ul>

    <h3>Gia vị đặc biệt (bí quyết GANU):</h3>
    <ul>
      <li>1/2 thìa cà phê bột cà ri</li>
      <li>1 thìa cà phê mật ong</li>
      <li>1/2 thìa cà phê dầu mè</li>
      <li>Vài giọt nước cốt chanh</li>
    </ul>

    <h2 id="uop-ga">3. Kỹ Thuật Ướp Gà Chuẩn</h2>
    <p>Việc ướp gà không chỉ đơn giản là trộn gia vị. Có những kỹ thuật đặc biệt giúp gia vị thấm sâu vào từng thớ thịt.</p>
    
    <h3>Các bước ướp chi tiết:</h3>
    <ol>
      <li><strong>Làm sạch gà:</strong> Rửa sạch, lau khô hoàn toàn. Dùng muối chà xát khắp con gà để khử mùi tanh.</li>
      <li><strong>Tạo đường cho gia vị:</strong> Dùng dao nhọn tạo những vết cắt nhỏ sâu 0.5cm trên da gà, đặc biệt ở phần đùi và cánh.</li>
      <li><strong>Massage gia vị:</strong> Thoa đều hỗn hợp gia vị, massage nhẹ nhàng trong 5-10 phút để gia vị thấm sâu.</li>
      <li><strong>Thời gian ướp:</strong> Tối thiểu 4 tiếng, lý tưởng là qua đêm (8-12 tiếng) trong tủ lạnh.</li>
    </ol>

    <h2 id="ky-thuat-nuong">4. Kỹ Thuật Nướng Chuyên Nghiệp</h2>
    <p>Đây là bước quyết định thành bại của món gà nướng. GANU sử dụng lò nướng than hồng kết hợp với kỹ thuật nướng 2 lần để đạt được độ giòn hoàn hảo.</p>
    
    <h3>Chuẩn bị lò nướng:</h3>
    <ul>
      <li><strong>Nhiệt độ:</strong> 180-200°C cho lò điện, than hồng đều cho lò than.</li>
      <li><strong>Vị trí nướng:</strong> Đặt gà cách nguồn nhiệt 15-20cm.</li>
      <li><strong>Dụng cụ:</strong> Khay nướng có lỗ thoát dầu, giấy bạc để tránh cháy.</li>
    </ul>

    <h3>Quy trình nướng 2 lần:</h3>
    <ol>
      <li><strong>Lần 1 (30 phút):</strong> Nướng ở nhiệt độ 180°C, lật mặt sau 15 phút.</li>
      <li><strong>Nghỉ (10 phút):</strong> Lấy gà ra, để nguội, thoa thêm một lớp gia vị mỏng.</li>
      <li><strong>Lần 2 (15-20 phút):</strong> Nướng ở nhiệt độ 200°C để da giòn rụm.</li>
    </ol>

    <h2 id="meo-hay">5. Những Mẹo Hay Từ Đầu Bếp</h2>
    <p>Sau nhiều năm kinh nghiệm, đầu bếp GANU chia sẻ những mẹo nhỏ nhưng tạo nên sự khác biệt lớn.</p>
    
    <ul>
      <li><strong>Kiểm tra độ chín:</strong> Dùng que tre đâm vào phần đùi, nước chảy ra trong suốt là chín vừa.</li>
      <li><strong>Giữ độ ẩm:</strong> Đặt một chén nước nhỏ trong lò khi nướng để gà không bị khô.</li>
      <li><strong>Tạo màu đẹp:</strong> Thoa mật ong pha loãng lên da gà 5 phút cuối để có màu vàng óng.</li>
      <li><strong>Nghỉ thịt:</strong> Để gà nghỉ 5-10 phút sau khi nướng xong trước khi cắt.</li>
    </ul>

    <h2 id="ket-luan">6. Kết Luận</h2>
    <p>Nướng gà hoàn hảo là một nghệ thuật đòi hỏi sự kiên nhẫn và tỉ mỉ. Với những bí quyết trên, bạn hoàn toàn có thể tạo ra những món gà nướng ngon như tại GANU ngay tại nhà.</p>
    
    <p>Hãy thử nghiệm và điều chỉnh theo khẩu vị gia đình. Đừng quên chia sẻ kết quả với chúng tôi qua fanpage GANU nhé!</p>
  `,
  author: 'Chef Minh Tuấn',
  authorAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20vietnamese%20chef%20portrait%20friendly%20smile&image_size=square',
  authorBio: 'Đầu bếp trưởng GANU với hơn 15 năm kinh nghiệm trong lĩnh vực ẩm thực. Chuyên gia về các món nướng và gia vị Á Đông.',
  publishDate: '2024-01-15',
  readTime: 8,
  views: 2450,
  likes: 156,
  comments: 23,
  category: 'recipe',
  tags: ['gà nướng', 'công thức', 'bí quyết', 'đầu bếp'],
  featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=perfectly%20grilled%20chicken%20golden%20crispy%20skin%20professional%20food%20photography&image_size=landscape_16_9',
  tableOfContents: [
    { id: 'chuan-bi', title: 'Chuẩn Bị Nguyên Liệu', level: 2 },
    { id: 'gia-vi', title: 'Bí Quyết Gia Vị Đặc Biệt', level: 2 },
    { id: 'uop-ga', title: 'Kỹ Thuật Ướp Gà Chuẩn', level: 2 },
    { id: 'ky-thuat-nuong', title: 'Kỹ Thuật Nướng Chuyên Nghiệp', level: 2 },
    { id: 'meo-hay', title: 'Những Mẹo Hay Từ Đầu Bếp', level: 2 },
    { id: 'ket-luan', title: 'Kết Luận', level: 2 }
  ]
};

const comments: Comment[] = [
  {
    id: 1,
    userName: 'Nguyễn Thị Mai',
    userAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=happy%20vietnamese%20woman%20customer%20smiling%20portrait&image_size=square',
    content: 'Cảm ơn chef đã chia sẻ! Mình đã thử làm theo và kết quả rất tuyệt vời. Gia đình ai cũng khen ngon. Đặc biệt là bí quyết nướng 2 lần, da gà giòn rụm mà thịt vẫn mềm.',
    date: '2024-01-16',
    likes: 12,
    dislikes: 0,
    replies: [
      {
        id: 11,
        userName: 'Chef Minh Tuấn',
        userAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20vietnamese%20chef%20portrait%20friendly%20smile&image_size=square',
        content: 'Cảm ơn chị Mai! Rất vui khi biết chị thành công. Đó chính là động lực để tôi tiếp tục chia sẻ những bí quyết khác.',
        date: '2024-01-16',
        likes: 5,
        dislikes: 0
      }
    ]
  },
  {
    id: 2,
    userName: 'Trần Văn Hùng',
    userAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=vietnamese%20man%20customer%20satisfied%20expression%20portrait&image_size=square',
    content: 'Mình có thắc mắc về thời gian ướp. Nếu ướp qua đêm thì có bị mặn quá không ạ? Và có cần phải lấy gà ra khỏi tủ lạnh trước khi nướng không?',
    date: '2024-01-16',
    likes: 8,
    dislikes: 0,
    replies: [
      {
        id: 21,
        userName: 'Chef Minh Tuấn',
        userAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20vietnamese%20chef%20portrait%20friendly%20smile&image_size=square',
        content: 'Chào anh Hùng! Ướp qua đêm không bị mặn đâu ạ, vì lượng gia vị đã được tính toán chuẩn. Nên lấy gà ra 30 phút trước khi nướng để gà về nhiệt độ phòng, như vậy sẽ nướng đều hơn.',
        date: '2024-01-16',
        likes: 6,
        dislikes: 0
      }
    ]
  },
  {
    id: 3,
    userName: 'Lê Thị Hoa',
    userAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=young%20vietnamese%20woman%20happy%20customer%20portrait&image_size=square',
    content: 'Bài viết rất chi tiết và dễ hiểu. Mình đã bookmark để làm theo cuối tuần. Có thể chia sẻ thêm cách làm nước sốt đi kèm không ạ?',
    date: '2024-01-15',
    likes: 15,
    dislikes: 1
  },
  {
    id: 4,
    userName: 'Phạm Minh Tuấn',
    userAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=vietnamese%20young%20man%20customer%20satisfied%20smile%20portrait&image_size=square',
    content: 'Mình thử rồi nhưng da gà chưa được giòn như mong muốn. Có phải do lò nướng điện không đạt nhiệt độ cao như lò than không ạ?',
    date: '2024-01-15',
    likes: 3,
    dislikes: 0
  }
];

const relatedPosts: RelatedPost[] = [
  {
    id: 2,
    slug: 'cach-chon-ga-tuoi-ngon',
    title: 'Cách Chọn Gà Tươi Ngon Cho Bữa Cơm Gia Đình',
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20chicken%20selection%20market%20quality%20food%20safety&image_size=landscape_16_9',
    readTime: 6,
    category: 'tips'
  },
  {
    id: 5,
    slug: 'meo-lam-salad-tuoi-ngon',
    title: '5 Mẹo Làm Salad Tươi Ngon Đi Kèm Gà Nướng',
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20colorful%20salad%20vegetables%20healthy%20food%20photography&image_size=landscape_16_9',
    readTime: 7,
    category: 'recipe'
  },
  {
    id: 7,
    slug: 'cach-bao-quan-ga-nuong',
    title: 'Cách Bảo Quản Gà Nướng Để Giữ Nguyên Hương Vị',
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=food%20storage%20preservation%20grilled%20chicken%20refrigerator&image_size=landscape_16_9',
    readTime: 4,
    category: 'tips'
  }
];

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [liked, setLiked] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Simulate fetching blog post by slug
    // In real app, you would fetch from API
    
    // Handle scroll spy for table of contents
    const handleScroll = () => {
      const sections = blogPost.tableOfContents.map(item => item.id);
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogPost.title,
        text: blogPost.content.substring(0, 100) + '...',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link đã được sao chép!');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-orange-600">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-orange-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-800">{blogPost.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-orange-600" />
                  Mục lục
                </h3>
                <nav className="space-y-2">
                  {blogPost.tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === item.id
                          ? 'bg-orange-100 text-orange-700 font-semibold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      style={{ paddingLeft: `${item.level * 8 + 12}px` }}
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Author Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-center">
                  <img
                    src={blogPost.authorAvatar}
                    alt={blogPost.author}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{blogPost.author}</h4>
                  <p className="text-gray-600 text-sm mb-4">{blogPost.authorBio}</p>
                  <div className="flex justify-center gap-2">
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">15+</div>
                      <div className="text-xs text-gray-500">Năm kinh nghiệm</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">50+</div>
                      <div className="text-xs text-gray-500">Bài viết</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {/* Article Header */}
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="relative h-80">
                <img
                  src={blogPost.featuredImage}
                  alt={blogPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                  <div className="p-8 text-white">
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <span className="bg-orange-500 px-3 py-1 rounded-full font-semibold">
                        Công thức nấu ăn
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(blogPost.publishDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{blogPost.readTime} phút đọc</span>
                      </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                      {blogPost.title}
                    </h1>
                  </div>
                </div>
              </div>

              {/* Article Meta */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{blogPost.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{blogPost.views.toLocaleString()} lượt xem</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{blogPost.comments} bình luận</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                        liked
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                      <span>{blogPost.likes + (liked ? 1 : 0)}</span>
                    </button>
                    
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Chia sẻ</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6 md:p-8">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                  style={{
                    '--tw-prose-body': '#374151',
                    '--tw-prose-headings': '#111827',
                    '--tw-prose-links': '#f97316',
                    '--tw-prose-bold': '#111827',
                    '--tw-prose-counters': '#6b7280',
                    '--tw-prose-bullets': '#d1d5db',
                    '--tw-prose-hr': '#e5e7eb',
                    '--tw-prose-quotes': '#111827',
                    '--tw-prose-quote-borders': '#e5e7eb',
                    '--tw-prose-captions': '#6b7280',
                    '--tw-prose-code': '#111827',
                    '--tw-prose-pre-code': '#e5e7eb',
                    '--tw-prose-pre-bg': '#1f2937',
                    '--tw-prose-th-borders': '#d1d5db',
                    '--tw-prose-td-borders': '#e5e7eb'
                  } as React.CSSProperties}
                />
              </div>

              {/* Tags */}
              <div className="p-6 border-t bg-gray-50">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-800">Thẻ:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-orange-100 hover:text-orange-700 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-orange-600" />
                  Bình luận ({comments.length})
                </h2>
                <button
                  onClick={() => setShowCommentForm(!showCommentForm)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Viết bình luận
                </button>
              </div>

              {/* Comment Form */}
              {showCommentForm && (
                <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Để lại bình luận</h3>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Chia sẻ suy nghĩ của bạn về bài viết này..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                  />
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-600">
                      Bình luận của bạn sẽ được kiểm duyệt trước khi hiển thị
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowCommentForm(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Hủy
                      </button>
                      <button
                        className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                        disabled={!newComment.trim()}
                      >
                        Gửi bình luận
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-start gap-4">
                      <img
                        src={comment.userAvatar}
                        alt={comment.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-800">{comment.userName}</h4>
                          <span className="text-sm text-gray-500">{formatDate(comment.date)}</span>
                        </div>
                        <p className="text-gray-700 mb-3">{comment.content}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-600 transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{comment.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors">
                            <ThumbsDown className="w-4 h-4" />
                            <span>{comment.dislikes}</span>
                          </button>
                          <button className="text-sm text-orange-600 hover:text-orange-700 transition-colors">
                            Trả lời
                          </button>
                        </div>
                        
                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-4 ml-8 space-y-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex items-start gap-3">
                                <img
                                  src={reply.userAvatar}
                                  alt={reply.userName}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h5 className="font-semibold text-gray-800 text-sm">{reply.userName}</h5>
                                    <span className="text-xs text-gray-500">{formatDate(reply.date)}</span>
                                  </div>
                                  <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
                                  <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-green-600 transition-colors">
                                      <ThumbsUp className="w-3 h-3" />
                                      <span>{reply.likes}</span>
                                    </button>
                                    <button className="text-xs text-orange-600 hover:text-orange-700 transition-colors">
                                      Trả lời
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-orange-600" />
                Bài viết liên quan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group"
                  >
                    <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative h-40">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            {post.category === 'recipe' ? 'Công thức' : 'Mẹo vặt'}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime} phút đọc</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}