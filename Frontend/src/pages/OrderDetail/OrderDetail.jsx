import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderDetail.css';

/**
 * Component trang chi tiết đơn hàng
 * Hiển thị thông tin đầy đủ của đơn hàng được tra cứu
 */
const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);

  /**
   * Load dữ liệu đơn hàng (demo data)
   */
  useEffect(() => {
    // Giả lập API call
    setTimeout(() => {
      // Demo data - sau này sẽ fetch từ backend
      const demoOrders = {
        'ORD001': {
          id: 'ORD001',
          customer: {
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@example.com',
            phone: '0123456789',
            address: '123 Đường ABC, Phường 1, Quận 1, TP.HCM'
          },
          product: 'Laptop Dell XPS 13',
          quantity: 1,
          price: 25000000,
          totalAmount: 25000000,
          status: 'Đang giao hàng',
          createdAt: '2024-12-01T10:00:00',
          updatedAt: '2024-12-07T14:30:00',
          blockchainHash: '0x1234567890abcdef1234567890abcdef12345678',
          trackingHistory: [
            {
              status: 'Đơn hàng đã được tạo',
              timestamp: '2024-12-01T10:00:00',
              location: 'Kho hàng Hà Nội',
              description: 'Đơn hàng được tạo và xác nhận thanh toán'
            },
            {
              status: 'Đã đóng gói',
              timestamp: '2024-12-02T09:30:00',
              location: 'Kho hàng Hà Nội',
              description: 'Sản phẩm đã được đóng gói và chuẩn bị vận chuyển'
            },
            {
              status: 'Đang vận chuyển',
              timestamp: '2024-12-03T14:30:00',
              location: 'Trung tâm phân phối Đà Nẵng',
              description: 'Đơn hàng đang trên đường vận chuyển'
            },
            {
              status: 'Đang giao hàng',
              timestamp: '2024-12-06T09:00:00',
              location: 'Bưu cục TP.HCM',
              description: 'Shipper đang giao hàng đến địa chỉ nhận'
            }
          ]
        },
        'ORD002': {
          id: 'ORD002',
          customer: {
            name: 'Trần Thị B',
            email: 'tranthib@example.com',
            phone: '0987654321',
            address: '456 Đường XYZ, Phường 5, Quận 3, TP.HCM'
          },
          product: 'iPhone 15 Pro Max',
          quantity: 2,
          price: 30000000,
          totalAmount: 60000000,
          status: 'Đã giao hàng',
          createdAt: '2024-11-25T14:00:00',
          updatedAt: '2024-12-05T16:45:00',
          blockchainHash: '0xabcdef1234567890abcdef1234567890abcdef12',
          trackingHistory: [
            {
              status: 'Đơn hàng đã được tạo',
              timestamp: '2024-11-25T14:00:00',
              location: 'Kho hàng TP.HCM',
              description: 'Đơn hàng được tạo và xác nhận thanh toán'
            },
            {
              status: 'Đã đóng gói',
              timestamp: '2024-11-26T10:00:00',
              location: 'Kho hàng TP.HCM',
              description: 'Sản phẩm đã được đóng gói'
            },
            {
              status: 'Đang giao hàng',
              timestamp: '2024-11-27T08:30:00',
              location: 'Bưu cục Quận 3',
              description: 'Shipper đang giao hàng'
            },
            {
              status: 'Đã giao hàng',
              timestamp: '2024-11-28T16:45:00',
              location: 'Địa chỉ khách hàng',
              description: 'Giao hàng thành công, khách hàng đã ký nhận'
            }
          ]
        }
      };

      const order = demoOrders[id];
      
      if (order) {
        setOrderData(order);
      } else {
        setOrderData(null);
      }
      
      setLoading(false);
    }, 1000);
  }, [id]);

  /**
   * Format số tiền VND
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  /**
   * Format ngày giờ
   */
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  /**
   * Lấy màu status
   */
  const getStatusColor = (status) => {
    const colors = {
      'Đơn hàng đã được tạo': '#3b82f6',
      'Đã đóng gói': '#f59e0b',
      'Đang vận chuyển': '#8b5cf6',
      'Đang giao hàng': '#6366f1',
      'Đã giao hàng': '#10b981'
    };
    return colors[status] || '#6366f1';
  };

  if (loading) {
    return (
      <div className="order-detail-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="order-detail-container">
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          <h2>Không tìm thấy đơn hàng</h2>
          <p>Mã đơn hàng <strong>{id}</strong> không tồn tại trong hệ thống</p>
          <button onClick={() => navigate('/')} className="btn-back">
            <i className="fas fa-arrow-left"></i>
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-detail-container">
      {/* Background Animation */}
      <div className="blockchain-bg">
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
      </div>

      <div className="order-detail-content">
        {/* Header */}
        <div className="detail-header">
          <button onClick={() => navigate('/')} className="btn-back-header">
            <i className="fas fa-arrow-left"></i>
            Quay lại
          </button>
          <h1>Thông Tin Đơn Hàng</h1>
        </div>

        {/* Order ID & Status */}
        <div className="order-card">
          <div className="order-id-section">
            <div>
              <span className="label">Mã đơn hàng</span>
              <h2>{orderData.id}</h2>
            </div>
            <div className={`status-badge status-${orderData.status.replace(/\s+/g, '-')}`}>
              <i className="fas fa-circle"></i>
              {orderData.status}
            </div>
          </div>
        </div>

        {/* Blockchain Info */}
        <div className="blockchain-card">
          <div className="card-header">
            <i className="fas fa-link"></i>
            <h3>Thông Tin Blockchain</h3>
          </div>
          <div className="card-body">
            <div className="blockchain-hash">
              <span className="hash-label">Transaction Hash:</span>
              <code className="hash-value">{orderData.blockchainHash}</code>
              <button className="btn-copy" title="Copy">
                <i className="fas fa-copy"></i>
              </button>
            </div>
            <p className="blockchain-note">
              <i className="fas fa-shield-alt"></i>
              Thông tin đơn hàng đã được mã hóa và lưu trữ an toàn trên Blockchain
            </p>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="timeline-card">
          <div className="card-header">
            <i className="fas fa-route"></i>
            <h3>Lịch Sử Vận Chuyển</h3>
          </div>
          <div className="timeline">
            {orderData.trackingHistory.map((item, index) => (
              <div key={index} className="timeline-item">
                <div 
                  className="timeline-icon" 
                  style={{ backgroundColor: getStatusColor(item.status) }}
                >
                  <i className="fas fa-check"></i>
                </div>
                <div className="timeline-content">
                  <h4>{item.status}</h4>
                  <p className="timeline-desc">{item.description}</p>
                  <div className="timeline-meta">
                    <span>
                      <i className="fas fa-clock"></i>
                      {formatDateTime(item.timestamp)}
                    </span>
                    <span>
                      <i className="fas fa-map-marker-alt"></i>
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
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

export default OrderDetail;
