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
  const StatCard = ({ title, icon, color, items, totalValue }) => (
    <Paper
      elevation={0}
      sx={{
        p: 4, // Padding vừa phải
        border: "1px solid #e0e0e0",
        borderRadius: 4,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* 1. Header của Card */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, alignItems: "center" }}>
        <Box>
           <Typography
            color="textSecondary"
            variant="subtitle2"
            fontWeight={700}
            sx={{ textTransform: "uppercase", letterSpacing: 0.5, fontSize: '11px' }}
          >
            {title}
          </Typography>
          {/* Nếu có tổng số (Total Value) thì hiện ở đây */}
          {totalValue && (
             <Typography variant="h5" fontWeight="bold" color={color}>
                {totalValue}
             </Typography>
          )}
        </Box>
        <Box sx={{ p: 1, borderRadius: "50%", bgcolor: `${color}15`, color: color }}>
          {icon}
        </Box>
      </Box>

      {/* 2. Danh sách chi tiết (List Items) */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flex : 1 }}>
        {items.map((item, index) => (
          <Box 
            key={index} 
            sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                pb: index !== items.length - 1 ? 1 : 0, // Border dưới trừ item cuối
                borderBottom: index !== items.length - 1 ? '1px dashed #eee' : 'none'
            }}
          >
            {/* Cột trái: Tên / Label */}
            <Box>
                <Typography variant="body2" fontWeight={600} sx={{ color: '#333' }}>
                    {item.label || item.name}
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ fontSize: '10px' }}>
                    {item.sub || item.id || `${item.unit}`}
                </Typography>
            </Box>

            {/* Cột phải: Giá trị / Trạng thái */}
            <Box sx={{ textAlign: 'right' }}>
                 {/* Nếu là số tiền/số lượng */}
                 {(item.value || item.stock !== undefined) && (
                    <Typography variant="body2" fontWeight={700} color={color}>
                        {item.value || item.stock}
                    </Typography>
                 )}
                 {/* Nếu là trạng thái (status) */}
                 {item.status && (
                    <Chip 
                        label={item.status} 
                        size="small" 
                        sx={{ 
                            height: 20, 
                            fontSize: '9px', 
                            bgcolor: `${color}10`, 
                            color: color,
                            fontWeight: 700
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
          <Box sx={{ width: "100%", boxSizing: "border-box" }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#1a237e" }}>
              Tổng quan kinh doanh
            </Typography>

            {/* GRID CONTAINER CHO 3 CARD TRÊN */}
            <Grid container spacing={3} sx={{ width: "100%", margin: 0 }}>
              
              {/* CARD 1: DOANH THU (Có chi tiết tiền mặt/chuyển khoản) */}
              <Grid item xs={12} md={4} sx={{ paddingLeft: "24px !important" }}>
                <StatCard
                  title="DOANH THU HÔM NAY"
                  totalValue="15.200.000₫" // Vẫn hiện số tổng
                  icon={<AttachMoneyIcon />}
                  color="#2e7d32" // Xanh lá
                  items={revenueDetails} // Truyền dữ liệu chi tiết vào
                />
              </Grid>

              {/* CARD 2: ĐƠN HÀNG MỚI (List đơn hàng) */}
              <Grid item xs={12} md={4} sx={{ paddingLeft: "24px !important" }}>
                <StatCard
                  title="ĐƠN HÀNG MỚI"
                  totalValue="18"
                  icon={<ShoppingCartIcon />}
                  color="#1976d2" // Xanh dương
                  items={newOrdersMini} // List đơn hàng
                />
              </Grid>

              {/* CARD 3: SẮP HẾT HÀNG (List sản phẩm) */}
              <Grid item xs={12} md={4} sx={{ paddingLeft: "24px !important" }}>
                <StatCard
                  title="CẢNH BÁO KHO"
                  totalValue="5 SP"
                  icon={<WarningAmberIcon />}
                  color="#ed6c02" // Cam
                  items={lowStockMini} // List sản phẩm sắp hết
                />
              </Grid>

              {/* ... (GIỮ NGUYÊN PHẦN BIỂU ĐỒ VÀ TABLE DƯỚI ĐÂY) ... */}
              <Grid item xs={12} lg={8} sx={{ paddingLeft: "24px !important", mt: 3 }}>
                 {/* ... Code Biểu đồ giữ nguyên ... */}
                 <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, height: "450px", width: "100%" }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Phân tích doanh thu</Typography>
                    <div style={{ width: "100%", height: "90%" }}>
                      <BarChart
                        dataset={chartLabels.map((label, index) => ({
                          day: label,
                          tuanNay: dataTuanNay[index],
                          tuanTruoc: dataTuanTruoc[index],
                        }))}
                        xAxis={[{ scaleType: "band", dataKey: "day" }]}
                        series={[
                          { dataKey: "tuanNay", label: "Tuần này", color: "#3b82f6" },
                          { dataKey: "tuanTruoc", label: "Tuần trước", color: "#cbd5e1" },
                        ]}
                        slotProps={{ legend: { hidden: false } }}
                        borderRadius={4}
                      />
                    </div>
                 </Paper>
              </Grid>

              <Grid item xs={12} lg={4} sx={{ paddingLeft: "24px !important", mt: 3 }}>
                 {/* ... Code Table giữ nguyên ... */}
                 <Paper sx={{ p: 0, borderRadius: 2, boxShadow: 2, height: "450px", width: "100%", display: "flex", flexDirection: "column" }}>
                    <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
                      <Typography variant="h6">Giao dịch mới</Typography>
                    </Box>
                    <Box sx={{ overflow: "auto", flex: 1 }}>
                      <Table>
                        <TableBody>
                          {recentOrders.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell>
                                <Typography variant="subtitle2" fontWeight="bold">{row.customer}</Typography>
                                <Typography variant="caption">{row.id}</Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Typography fontWeight="bold">{row.total}</Typography>
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
