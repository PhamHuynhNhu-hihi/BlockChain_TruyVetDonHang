import React from 'react';
import './Dashboard.css';

/**
 * Component trang Dashboard (Bảng điều khiển)
 * Hiển thị sau khi đăng nhập thành công
 */
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <p>Chào mừng đến với hệ thống truy vết đơn hàng Blockchain!</p>
        <p className="demo-note">Trang này đang được phát triển...</p>
      </div>
    </div>
  );
};

export default Dashboard;
