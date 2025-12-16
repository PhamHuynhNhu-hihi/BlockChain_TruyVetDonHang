import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

/**
 * Component trang chủ - Tra cứu đơn hàng
 * User có thể tra cứu đơn hàng bằng ID mà không cần đăng nhập
 */
const Home = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Xử lý khi người dùng nhập ID đơn hàng
   */
  const handleInputChange = (e) => {
    setOrderId(e.target.value.toUpperCase());
  };

  /**
   * Xử lý tra cứu đơn hàng
   */
  const handleTrackOrder = (e) => {
    e.preventDefault();
    
    if (!orderId.trim()) {
      showNotification('Vui lòng nhập mã đơn hàng', 'error');
      return;
    }

    setLoading(true);
    
    // Giả lập delay tra cứu
    setTimeout(() => {
      setLoading(false);
      // Chuyển đến trang chi tiết đơn hàng
      navigate(`/order/${orderId}`);
    }, 800);
  };

  /**
   * Hiển thị thông báo
   */
  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  /**
   * Demo: Điền ID mẫu
   */
  const fillDemoId = () => {
    setOrderId('ORD001');
  };

  return (
    <div className="home-container">
      {/* Background Animation */}
      <div className="blockchain-bg">
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
      </div>

      {/* Link đến trang Admin */}
      <a href="/admin/login" className="admin-link">
        <i className="fas fa-user-shield"></i>
        Dành cho Admin
      </a>

      {/* Main Content */}
      <div className="home-content">
        {/* Header */}
        <div className="home-header">
          <div className="logo">
            <i className="fas fa-cube"></i>
          </div>
          <h1>Hệ Thống Truy Vết Đơn Hàng</h1>
          <p>Tra cứu thông tin đơn hàng trên Blockchain</p>
        </div>

        {/* Search Form */}
        <form className="search-form" onSubmit={handleTrackOrder}>
          <div className="search-wrapper">
            <i className="fas fa-search"></i>
            <input
              type="text"
              value={orderId}
              onChange={handleInputChange}
              placeholder="Nhập mã đơn hàng (VD: ORD001)"
              className="search-input"
              autoFocus
            />
            {orderId && (
              <i 
                className="fas fa-times clear-btn" 
                onClick={() => setOrderId('')}
              ></i>
            )}
          </div>

          <button type="submit" className="btn-track" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Đang tra cứu...</span>
              </>
            ) : (
              <>
                <span>Tra Cứu Đơn Hàng</span>
                <i className="fas fa-arrow-right"></i>
              </>
            )}
          </button>

          {/* Demo Button */}
          <button 
            type="button" 
            className="btn-demo" 
            onClick={fillDemoId}
          >
            <i className="fas fa-flask"></i>
            Thử với đơn hàng mẫu
          </button>
        </form>

        {/* Features */}
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Bảo mật</h3>
            <p>Dữ liệu được mã hóa và lưu trên Blockchain</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-history"></i>
            <h3>Minh bạch</h3>
            <p>Theo dõi lịch sử đơn hàng đầy đủ</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-bolt"></i>
            <h3>Nhanh chóng</h3>
            <p>Tra cứu thông tin ngay lập tức</p>
          </div>
        </div>
      </div>

      {/* Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </div>
  );
};

export default Home;
