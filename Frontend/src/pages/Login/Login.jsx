import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

/**
 * Component trang đăng nhập
 * Xử lý authentication và kết nối MetaMask
 */
const Login = () => {
  // Hooks để quản lý state
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const navigate = useNavigate();

  /**
   * Kiểm tra kết nối MetaMask khi component mount
   */
  useEffect(() => {
    checkMetaMaskConnection();
  }, []);

  /**
   * Kiểm tra nếu đã kết nối MetaMask trước đó
   */
  const checkMetaMaskConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Lỗi kiểm tra MetaMask:', error);
      }
    }
  };

  /**
   * Hiển thị thông báo cho người dùng
   */
  const showNotification = (message, type = 'info') => {
    // Tạo element thông báo
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
      success: 'check-circle',
      error: 'exclamation-circle',
      info: 'info-circle'
    };
    
    notification.innerHTML = `
      <i class="fas fa-${icons[type]}"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Tự động xóa sau 3 giây
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  /**
   * Xử lý kết nối MetaMask và đăng nhập
   */
  const handleMetaMaskLogin = async () => {
    setLoading(true);

    try {
      // Kiểm tra MetaMask đã cài đặt chưa
      if (typeof window.ethereum === 'undefined') {
        showNotification('Vui lòng cài đặt MetaMask để tiếp tục!', 'error');
        // Mở trang cài đặt MetaMask
        window.open('https://metamask.io/download/', '_blank');
        setLoading(false);
        return;
      }

      // Request kết nối với MetaMask
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      const account = accounts[0];
      setWalletAddress(account);
      
      // Lưu thông tin wallet
      localStorage.setItem('walletAddress', account);
      localStorage.setItem('token', 'metamask-' + account);
      
      showNotification(`Kết nối thành công: ${account.substring(0, 10)}...`, 'success');
      
      // Chuyển hướng đến dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      console.error('Lỗi kết nối MetaMask:', error);
      
      if (error.code === 4001) {
        showNotification('Bạn đã từ chối kết nối với MetaMask', 'error');
      } else {
        showNotification('Không thể kết nối với MetaMask', 'error');
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="login-container">
      {/* Background animation với các khối blockchain */}
      <div className="blockchain-bg">
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
      </div>

      {/* Card đăng nhập */}
      <div className="login-card">
        {/* Header với logo */}
        <div className="card-header">
          <div className="logo">
            <i className="fas fa-cube"></i>
          </div>
          <h1>Hệ Thống Truy Vết</h1>
          <p>Blockchain Order Tracking</p>
        </div>

        {/* Form đăng nhập */}
        <div className="login-form">
          {/* Hiển thị địa chỉ wallet nếu đã kết nối */}
          {walletAddress && (
            <div className="wallet-info">
              <i className="fas fa-check-circle"></i>
              <p>Đã kết nối: {walletAddress.substring(0, 10)}...{walletAddress.substring(walletAddress.length - 8)}</p>
            </div>
          )}

          {/* Nút kết nối MetaMask */}
          <button 
            className="btn-metamask-main" 
            onClick={handleMetaMaskLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Đang kết nối...</span>
              </>
            ) : (
              <>
                <i className="fab fa-ethereum"></i>
                <span>{walletAddress ? 'Kết nối lại MetaMask' : 'Kết nối với MetaMask'}</span>
                <i className="fas fa-arrow-right"></i>
              </>
            )}
          </button>

          {/* Thông tin hướng dẫn */}
          <div className="metamask-info">
            <p className="info-text">
              <i className="fas fa-info-circle"></i>
              Sử dụng MetaMask wallet để đăng nhập và quản lý đơn hàng trên blockchain
            </p>
            {typeof window.ethereum === 'undefined' && (
              <a 
                href="https://metamask.io/download/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="install-link"
              >
                <i className="fas fa-download"></i>
                Cài đặt MetaMask
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="features">
        <div className="feature-item">
          <i className="fas fa-shield-alt"></i>
          <div>
            <h3>Bảo mật cao</h3>
            <p>Công nghệ Blockchain</p>
          </div>
        </div>
        <div className="feature-item">
          <i className="fas fa-chart-line"></i>
          <div>
            <h3>Theo dõi realtime</h3>
            <p>Cập nhật liên tục</p>
          </div>
        </div>
        <div className="feature-item">
          <i className="fas fa-clock"></i>
          <div>
            <h3>Minh bạch</h3>
            <p>Lịch sử đầy đủ</p>
          </div>
        </div>
      </div>

      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </div>
  );
};

export default Login;
