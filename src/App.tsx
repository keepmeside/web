import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Location from "@/pages/Location";
import Combo from "@/pages/Combo";
import ComboDetail from "@/pages/ComboDetail";
import ComboOffers from "@/pages/ComboOffers";
import Order from "@/pages/Order";
import OrderConfirmation from "@/pages/OrderConfirmation";
import ChefTeam from "@/pages/ChefTeam";
import Gallery from "@/pages/Gallery";
import FAQ from "@/pages/FAQ";
import Reviews from "@/pages/Reviews";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminCombos from "@/pages/admin/AdminCombos";
import AdminPosts from "@/pages/admin/AdminPosts";
import AdminReviews from "@/pages/admin/AdminReviews";
import AdminGallery from "@/pages/admin/AdminGallery";
import AdminChefs from "@/pages/admin/AdminChefs";
import Layout from "@/components/Layout";
import AdminLayout from "@/components/AdminLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Frontend Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="location" element={<Location />} />
          <Route path="combo" element={<Combo />} />
          <Route path="combo/:id" element={<ComboDetail />} />
          <Route path="offers" element={<ComboOffers />} />
          <Route path="order" element={<Order />} />
          <Route path="order/:id" element={<Order />} />
          <Route path="order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="chef-team" element={<ChefTeam />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="combos" element={<AdminCombos />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="chefs" element={<AdminChefs />} />
        </Route>
      </Routes>
    </Router>
  );
}
