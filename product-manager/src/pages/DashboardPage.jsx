// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, Container, Typography, Grid, Paper, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// Import các Icon trang trí
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar"; 

// --- DỮ LIỆU MẪU ---
const productColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Tên Sản Phẩm', flex: 1 },
  { field: 'price', headerName: 'Giá bán', width: 150 },
  { field: 'stock', headerName: 'Tồn kho', width: 100 },
];
const productRows = [
  { id: 1, name: 'iPhone 15 Pro Max', price: '30.000.000', stock: 10 },
  { id: 2, name: 'Samsung S24 Ultra', price: '28.000.000', stock: 15 },
  { id: 3, name: 'MacBook Air M2', price: '25.000.000', stock: 5 },
];

export default function DashboardPage({ user, onLogout }) {
  // Mặc định hiển thị Dashboard tổng quan
  const [currentView, setCurrentView] = useState('dashboard');

  // --- HÀM QUYẾT ĐỊNH HIỂN THỊ CÁI GÌ ---
  const renderContent = () => {
    switch (currentView) {
      
      // 1. MÀN HÌNH TỔNG QUAN
      case 'dashboard':
        return (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>Tổng quan kinh doanh</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, bgcolor: '#e3f2fd', display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                     <Typography color="textSecondary">Doanh thu hôm nay</Typography>
                     <Typography variant="h4" fontWeight="bold">15tr</Typography>
                  </Box>
                  <AttachMoneyIcon sx={{ fontSize: 50, opacity: 0.5 }} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, bgcolor: '#e8f5e9', display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                     <Typography color="textSecondary">Đơn hàng mới</Typography>
                     <Typography variant="h4" fontWeight="bold">8</Typography>
                  </Box>
                  <TrendingUpIcon sx={{ fontSize: 50, opacity: 0.5 }} />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );

      // 2. MÀN HÌNH TẠO ĐƠN MỚI
      case 'create_order':
        return (
          <Box>
             <Typography variant="h5" mb={2}>Tạo đơn hàng bán lẻ</Typography>
             <Paper sx={{ p: 4, textAlign: 'center', height: '300px', borderStyle: 'dashed' }}>
                <Typography color="textSecondary">Giao diện POS bán hàng sẽ ở đây...</Typography>
                <Button variant="contained" sx={{ mt: 2 }}>Thêm sản phẩm vào giỏ</Button>
             </Paper>
          </Box>
        );

      // 3. MÀN HÌNH DANH SÁCH SẢN PHẨM
      case 'product_list':
        return (
          <Box sx={{ height: 600, width: '100%', bgcolor: 'white', p: 1 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Danh sách sản phẩm</Typography>
            <DataGrid
              rows={productRows}
              columns={productColumns}
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
              checkboxSelection
            />
          </Box>
        );

      // 4. MÀN HÌNH NHẬP KHO
      case 'import_warehouse':
        return (
           <Box>
             <Typography variant="h5">Nhập kho hàng hóa</Typography>
             <Typography>Form nhập phiếu nhập kho sẽ hiển thị tại đây.</Typography>
           </Box>
        );

      // 5. CÁC TRƯỜNG HỢP KHÁC (Chưa làm xong)
      default:
        return (
          <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography variant="h4" color="textSecondary">Chức năng đang phát triển</Typography>
            <Typography>Bạn đang chọn mục: <b>{currentView}</b></Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBar user={user} onLogout={onLogout} />
      
      {/* Sidebar truyền hàm chuyển trang xuống */}
      <Sidebar onMenuClick={setCurrentView} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', height: '100vh', overflow: 'auto' }}>
        <Toolbar /> 
        <Container maxWidth={false}>
            {/* Hiển thị nội dung tương ứng */}
            {renderContent()}
        </Container>
      </Box>
    </Box>
  );
}