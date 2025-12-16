import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import OrderDetail from './pages/OrderDetail/OrderDetail';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css';

/**
 * Component chính của ứng dụng
 * Quản lý routing cho User và Admin
 */
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Trang chủ - User tra cứu đơn hàng */}
          <Route path="/" element={<Home />} />
          
          {/* Trang chi tiết đơn hàng */}
          <Route path="/order/:id" element={<OrderDetail />} />
          
          {/* Trang đăng nhập Admin */}
          <Route path="/admin/login" element={<Login />} />
          
          {/* Trang dashboard Admin (sau khi đăng nhập) */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
