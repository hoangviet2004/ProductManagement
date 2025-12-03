// src/pages/DashboardPage.jsx
import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// --- IMPORT ICONS ---
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// --- IMPORT BIỂU ĐỒ CHÍNH CHỦ MATERIAL UI ---
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";

// --- DỮ LIỆU GIẢ LẬP ---
const revenueDetails = [
  { label: 'Chuyển khoản', value: '10.000.000₫', sub: '65%' },
  { label: 'Tiền mặt', value: '5.200.000₫', sub: '35%' },
];

// 2. Chi tiết đơn hàng mới (Lấy 3 đơn mới nhất)
const newOrdersMini = [
  { id: '#002', name: 'Hoàng Tùng B', status: 'Chờ xử lý' },
  { id: '#004', name: 'Phạm Văn D', status: 'Mới tạo' },
  { id: '#006', name: 'Nguyễn Thị F', status: 'Chờ xử lý' },
];

// 3. Chi tiết cảnh báo kho (Lấy 3 sản phẩm thấp nhất)
const lowStockMini = [
  { name: 'Bút bi Thiên Long', stock: 5, unit: 'hộp' },
  { name: 'Giấy A4 Double A', stock: 2, unit: 'ram' },
  { name: 'Kẹp ghim màu', stock: 0, unit: 'hộp' },
];
// 1. Dữ liệu cho Biểu đồ (MUI X Charts dùng mảng riêng biệt)
const chartLabels = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "CN",
];
const dataTuanNay = [15, 20, 25, 18, 30, 45, 50]; // Doanh thu tuần này
const dataTuanTruoc = [10, 18, 12, 20, 25, 35, 40]; // Doanh thu tuần trước

// 2. Dữ liệu đơn hàng mới nhất
const recentOrders = [
  {
    id: "#ORD001",
    customer: "Hoàng Tùng A",
    total: "15.500.000",
    status: "completed",
  },
  {
    id: "#ORD002",
    customer: "Hoàng Tùng B",
    total: "2.100.000",
    status: "pending",
  },
  {
    id: "#ORD003",
    customer: "Hoàng Tùng C",
    total: "30.000.000",
    status: "completed",
  },
  {
    id: "#ORD004",
    customer: "Hoàng Tùng D",
    total: "550.000",
    status: "cancelled",
  },
  {
    id: "#ORD005",
    customer: "Hoàng Tùng E",
    total: "12.000.000",
    status: "completed",
  },
];

// 3. Dữ liệu sản phẩm
const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Tên Sản Phẩm", flex: 1 },
  { field: "price", headerName: "Giá bán", width: 150 },
  { field: "stock", headerName: "Tồn kho", width: 100 },
];
const productRows = [
  { id: 1, name: "iPhone 15 Pro Max", price: "30.000.000", stock: 10 },
  { id: 2, name: "Samsung S24 Ultra", price: "28.000.000", stock: 15 },
  { id: 3, name: "MacBook Air M2", price: "25.000.000", stock: 5 },
];

export default function DashboardPage({ user, onLogout }) {
  const [currentView, setCurrentView] = useState("dashboard");

  // --- COMPONENT CON: THẺ THỐNG KÊ ---
  // --- COMPONENT CON: THẺ THỐNG KÊ (PHIÊN BẢN TO & THOÁNG) ---
  const StatCard = ({ title, icon, color, items, totalValue }) => (
    <Paper
      elevation={0}
      sx={{
        p: 3, // Tăng padding lên 3 cho thoáng
        border: "1px solid #e0e0e0",
        borderRadius: 4, // Bo tròn nhiều hơn chút cho hiện đại
        height: "100%",
        minHeight: "260px", // QUAN TRỌNG: Ép thẻ phải cao ít nhất 260px
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Căn đều nội dung trên dưới
        transition: "transform 0.2s", // Hiệu ứng hover nhẹ
        "&:hover": {
           transform: "translateY(-4px)",
           boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
        }
      }}
    >
      {/* 1. Header: Tiêu đề và Tổng số to */}
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
           <Box>
              <Typography
                color="textSecondary"
                variant="subtitle2"
                fontWeight={700}
                sx={{ textTransform: "uppercase", letterSpacing: 1, mb: 1 }}
              >
                {title}
              </Typography>
              <Typography variant="h4" fontWeight="800" sx={{ color: "#2d3748" }}>
                {totalValue}
              </Typography>
           </Box>
           <Box 
             sx={{ 
               p: 1.5, 
               borderRadius: "12px", 
               bgcolor: `${color}15`, 
               color: color,
               display: 'flex', alignItems: 'center', justifyContent: 'center'
             }}
           >
             {icon}
           </Box>
        </Box>
      </Box>

      {/* 2. Danh sách chi tiết (List Items) */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
        {items.map((item, index) => (
          <Box 
            key={index} 
            sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                pb: 1,
                borderBottom: index !== items.length - 1 ? '1px dashed #f1f5f9' : 'none'
            }}
          >
            {/* Cột trái */}
            <Box>
                <Typography variant="body2" fontWeight={600} sx={{ color: '#475569' }}>
                    {item.label || item.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    {item.sub || item.id || `${item.unit}`}
                </Typography>
            </Box>

            {/* Cột phải */}
            <Box sx={{ textAlign: 'right' }}>
                 {(item.value || item.stock !== undefined) && (
                    <Typography variant="body2" fontWeight={700} sx={{ color: color }}>
                        {item.value || item.stock}
                    </Typography>
                 )}
                 {item.status && (
                    <Chip 
                        label={item.status} 
                        size="small" 
                        sx={{ 
                            height: 24, // Chip to hơn chút
                            fontSize: '11px', 
                            bgcolor: `${color}15`, 
                            color: color,
                            fontWeight: 700,
                            borderRadius: '6px'
                        }} 
                    />
                 )}
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );

  const renderContent = () => {
    switch (currentView) {
      // 1. DASHBOARD
      case "dashboard":
        return (
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
            
            <Typography variant="h5" sx={{ fontWeight: "800", color: "#1e293b", letterSpacing: -0.5 }}>
              Tổng quan kinh doanh
            </Typography>

            {/* --- HÀNG TRÊN: CÁC THẺ STATS --- */}
            <Grid container spacing={3} sx={{ width: "100%", m: 0 }}>
              
              <Grid item xs={12} md={4} sx={{ paddingLeft: "100px !important" }}>
                <StatCard
                  title="Doanh thu ngày"
                  totalValue="15.200.000₫"
                  icon={<AttachMoneyIcon fontSize="large" />} // Icon to
                  color="#10b981" // Xanh lá tươi
                  items={revenueDetails}
                />
              </Grid>

              <Grid item xs={12} md={4} sx={{ paddingLeft: "50px !important" }}>
                <StatCard
                  title="Đơn hàng mới"
                  totalValue="18"
                  icon={<ShoppingCartIcon fontSize="large" />}
                  color="#3b82f6" // Xanh dương tươi
                  items={newOrdersMini}
                />
              </Grid>

              <Grid item xs={12} md={4} sx={{ paddingLeft: "50px !important" }}>
                <StatCard
                  title="Cảnh báo kho"
                  totalValue="5 SP"
                  icon={<WarningAmberIcon fontSize="large" />}
                  color="#f59e0b" // Cam tươi
                  items={lowStockMini}
                />
              </Grid>
            </Grid>

            {/* --- HÀNG DƯỚI: BIỂU ĐỒ & BẢNG --- */}
            <Grid container spacing={3} sx={{ width: "100%", m: 0 }}>
              
              <Grid item  sx={{ paddingLeft: "100px !important", width: { xs: "100%", lg: "55%" } }}>
                 <Paper sx={{ p: 3, borderRadius: 4, boxShadow: "none", border: "1px solid #e0e0e0", height: "500px", width: "100%" }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>Phân tích doanh thu</Typography>
                    <Box sx={{ width: "100%", height: "90%" }}>
                      <BarChart
                        dataset={chartLabels.map((label, index) => ({
                          day: label,
                          tuanNay: dataTuanNay[index],
                          tuanTruoc: dataTuanTruoc[index],
                        }))}
                        xAxis={[{ scaleType: "band", dataKey: "day", categoryGapRatio: 0.4 }]} // categoryGapRatio: chỉnh độ rộng cột
                        series={[
                          { dataKey: "tuanNay", label: "Tuần này", color: "#3b82f6" },
                          { dataKey: "tuanTruoc", label: "Tuần trước", color: "#e2e8f0" },
                        ]}
                        slotProps={{ legend: { hidden: false } }}
                        borderRadius={6}
                      />
                    </Box>
                 </Paper>
              </Grid>

              <Grid item xs={12} lg={3} sx={{ paddingLeft: "22px !important" }}>
                 <Paper sx={{ p: 0, borderRadius: 4, boxShadow: "none", border: "1px solid #e0e0e0", height: "500px", width: "100%", display: "flex", flexDirection: "column" }}>
                    <Box sx={{ p: 3, borderBottom: "1px solid #f1f5f9", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" fontWeight={700}>Giao dịch mới</Typography>
                      <Button size="small" endIcon={<ArrowForwardIcon />}>Xem tất cả</Button>
                    </Box>
                    <Box sx={{ overflow: "auto", flex: 1 }}>
                      <Table>
                        <TableBody>
                          {recentOrders.map((row) => (
                            <TableRow key={row.id} hover>
                              <TableCell sx={{ borderBottom: "1px solid #f8fafc", py: 2 }}>
                                <Box>
                                    <Typography variant="subtitle2" fontWeight={700} color="#334155">{row.customer}</Typography>
                                    <Typography variant="caption" color="textSecondary">{row.id}</Typography>
                                </Box>
                              </TableCell>
                              <TableCell align="right" sx={{ borderBottom: "1px solid #f8fafc", py: 2 }}>
                                <Typography fontWeight={700} color="#334155">{row.total}</Typography>
                                {row.status === 'completed' && <Chip label="Hoàn thành" size="small" sx={{ mt: 0.5, bgcolor: '#dcfce7', color: '#166534', fontWeight: 700, fontSize: '10px' }} />}
                                {row.status === 'pending' && <Chip label="Chờ xử lý" size="small" sx={{ mt: 0.5, bgcolor: '#fef9c3', color: '#854d0e', fontWeight: 700, fontSize: '10px' }} />}
                                {row.status === 'cancelled' && <Chip label="Đã hủy" size="small" sx={{ mt: 0.5, bgcolor: '#fee2e2', color: '#991b1b', fontWeight: 700, fontSize: '10px' }} />}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                 </Paper>
              </Grid>
            </Grid>
          </Box>
        );

      case "create_order":
        return (
          <Box>
            <Typography>Màn hình POS (Đang phát triển)</Typography>
          </Box>
        );

      case "product_list":
        return (
          <Box sx={{ height: 600, width: "100%", bgcolor: "white", p: 1 }}>
            <DataGrid rows={productRows} columns={productColumns} />
          </Box>
        );

      default:
        return (
          <Box>
            <Typography>Đang phát triển: {currentView}</Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar user={user} onLogout={onLogout} />
      <Sidebar onMenuClick={setCurrentView} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "#f8fafc",
          height: "100vh",
          overflow: "auto",
          width: "100%",
        }}
      >
        <Toolbar />

        {/* --- SỬA TẠI ĐÂY: Thay Container bằng Box --- */}
        <Box sx={{ width: "100%", maxWidth: "100%" }}>{renderContent()}</Box>
      </Box>
    </Box>
  );
}
