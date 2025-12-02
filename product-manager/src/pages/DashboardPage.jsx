// src/pages/DashboardPage.jsx
import React from 'react';
import { Box, CssBaseline, Toolbar, Container, Typography, Button, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Đảm bảo đường dẫn import đúng với máy bạn (../components/...)
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar"; 

// --- 1. CẤU HÌNH CỘT (Sửa để tự giãn đều) ---
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  
  // Thêm flex: 1 để cột này tự động giãn ra chiếm hết khoảng trống
  { field: 'name', headerName: 'Họ tên', flex: 1 }, 
  
  { field: 'age', headerName: 'Tuổi', type: 'number', width: 100 },
  
  // Thêm flex: 1 để cột này cũng tự giãn
  { field: 'role', headerName: 'Phòng ban', flex: 1 }, 
  
  { 
    field: 'actions', headerName: 'Hành động', width: 150,
    renderCell: () => (
      <div>
        <IconButton size="small" color="primary"><EditIcon /></IconButton>
        <IconButton size="small" color="error"><DeleteIcon /></IconButton>
      </div>
    )
  }
];

const rows = [
  { id: 1, name: 'Nguyễn Văn A', age: 25, role: 'Kế toán' },
  { id: 2, name: 'Trần Thị B', age: 36, role: 'Marketing' },
  { id: 3, name: 'Lê Văn C', age: 19, role: 'IT' },
  { id: 4, name: 'Phạm Văn D', age: 28, role: 'Nhân sự' },
  { id: 5, name: 'Đỗ Thị E', age: 22, role: 'Kinh doanh' },
];

export default function DashboardPage({ user, onLogout }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <TopBar user={user} onLogout={onLogout} />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', height: '100vh', overflow: 'auto' }}>
        <Toolbar /> 
        
        {/* --- 2. QUAN TRỌNG: maxWidth={false} sẽ tắt giới hạn chiều rộng --- */}
        <Container maxWidth={false}>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4" component="h1">Nhân sự</Typography>
                <Button variant="contained" startIcon={<AddIcon />}>Thêm mới</Button>
            </Box>

            {/* Bảng dữ liệu */}
            <Box sx={{ height: 500, width: '100%', bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                    pageSizeOptions={[5, 10, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>

        </Container>
      </Box>
    </Box>
  );
}