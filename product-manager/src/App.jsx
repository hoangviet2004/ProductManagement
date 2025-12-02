// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import DashboardPage from './pages/DashboardPage'; 

function App() {
  // --- 1. SỬA STATE: Kiểm tra localStorage ngay khi mở app ---
  const [user, setUser] = useState(() => {
    // Lấy dữ liệu từ bộ nhớ trình duyệt
    const savedUser = localStorage.getItem('user');
    // Nếu có thì chuyển từ chuỗi JSON sang Object, nếu không thì là null
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // --- LOGIC XỬ LÝ ---

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        const userData = { name: data.user.full_name || data.user.username };
        
        // --- 2. SỬA LOGIN: Lưu vào localStorage ---
        localStorage.setItem('user', JSON.stringify(userData));
        
        setUser(userData);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Không thể kết nối đến server!");
    }
  };

  const handleLogout = () => {
    // --- 3. SỬA LOGOUT: Xóa khỏi localStorage ---
    localStorage.removeItem('user');
    setUser(null);
  };

  // --- GIAO DIỆN (RENDER) ---

  if (!user) {
    return (
      <div className="login-page">
        <div className="login-form">
          <h2>Đăng Nhập Hệ Thống</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Tài khoản</label>
              <input name="username" type="text" placeholder="Nhập tài khoản..." required />
            </div>
            <div className="input-group">
              <label>Mật khẩu</label>
              <input name="password" type="password" placeholder="Nhập mật khẩu..." required />
            </div>
            <button type="submit" className="btn-login">Vào hệ thống</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <DashboardPage user={user} onLogout={handleLogout} />
  );
}

export default App;