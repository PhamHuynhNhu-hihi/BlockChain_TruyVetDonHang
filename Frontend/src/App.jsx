import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css';

/**
 * Component chính của ứng dụng
 * Quản lý routing và các trang chính
 */
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Trang đăng nhập */}
          <Route path="/login" element={<Login />} />
          
          {/* Trang dashboard (bảng điều khiển) */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Chuyển hướng mặc định về trang đăng nhập */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
