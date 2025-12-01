import { useState } from 'react';
import './App.css';

function App() {
  // --- STATE ---
  const [user, setUser] = useState(null);
  
  // Dữ liệu mẫu (sẽ thay bằng SQL sau)
  const [products, setProducts] = useState([
    { id: 1, name: 'iPhone 15', price: 20000000 },
    { id: 2, name: 'Samsung Galaxy', price: 15000000 },
  ]);

  const [formData, setFormData] = useState({ id: '', name: '', price: '' });
  const [isEditing, setIsEditing] = useState(false);

  // --- LOGIC XỬ LÝ ---

  // 1. Đăng nhập (Gọi API Node.js SQL Server)
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      // Gọi xuống Backend cổng 3000
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        setUser({ name: data.user.full_name || data.user.username });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Không thể kết nối đến server!");
    }
  };

  const handleLogout = () => setUser(null);

  // CRUD (Giữ nguyên logic cũ tạm thời)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addProduct = () => {
    if (!formData.name || !formData.price) return;
    const newProduct = { id: Date.now(), name: formData.name, price: Number(formData.price) };
    setProducts([...products, newProduct]);
    setFormData({ id: '', name: '', price: '' });
  };

  const deleteProduct = (id) => {
    if (window.confirm("Xóa nhé?")) setProducts(products.filter(p => p.id !== id));
  };

  // --- GIAO DIỆN (RENDER) ---

  // 1. Nếu CHƯA đăng nhập -> Hiện Form ở giữa màn hình
  if (!user) {
    return (
      <div className="login-page"> {/* Class căn giữa */}
        <div className="login-form">
          <h2>Đăng Nhập</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Tài khoản</label>
              <input name="username" type="text" placeholder="Nhập tài khoản" required />
            </div>
            <div className="input-group">
              <label>Mật khẩu</label>
              <input name="password" type="password" placeholder="Nhập mật khẩu" required />
            </div>
            <button type="submit" className="btn-login">Vào hệ thống</button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Nếu ĐÃ đăng nhập -> Hiện Dashboard
  return (
    <div className="dashboard-container">
      <div className="header">
        <h3>Xin chào, {user.name}</h3>
        <button onClick={handleLogout} style={{background: '#6c757d'}}>Đăng xuất</button>
      </div>

      {/* Form nhập liệu */}
      <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h4>Thêm sản phẩm</h4>
        <div style={{ display: 'flex', gap: '10px' }}>
            <input name="name" placeholder="Tên SP" value={formData.name} onChange={handleInputChange} style={{padding: '8px'}} />
            <input name="price" type="number" placeholder="Giá" value={formData.price} onChange={handleInputChange} style={{padding: '8px'}} />
            <button onClick={addProduct}>Thêm</button>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Sản Phẩm</th>
            <th>Giá</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td><button onClick={() => deleteProduct(p.id)} style={{background: '#dc3545'}}>Xóa</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;