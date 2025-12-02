// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Collapse, Divider } from '@mui/material';

// Import Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import ComputerIcon from '@mui/icons-material/Computer';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import logoImg from '../assets/logo.png';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SourceIcon from '@mui/icons-material/Source';
import SavingsIcon from '@mui/icons-material/Savings';
const drawerWidth = 250;

export default function Sidebar({ onMenuClick }) {
  // State mở rộng menu cha
  const [openSales, setOpenSales] = useState(false);
  const [openWarehouse, setOpenWarehouse] = useState(false);
  const [openFinance, setOpenFinance] = useState(false);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar /> 
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid #eee' }}>
          <img src={logoImg} alt="Logo" style={{ width: '150px', height: '150px', marginBottom: '10px', objectFit: 'contain' }} />
      </Box>

      <Box sx={{ overflow: 'auto' }}>
        <List component="nav">
          
          {/* 1. TỔNG QUAN */}
          <ListItemButton onClick={() => onMenuClick('dashboard')}>
            <ListItemIcon><DashboardIcon sx={{ color: '#007bff' }}/></ListItemIcon>
            <ListItemText primary="Tổng quan" primaryTypographyProps={{ fontWeight: 'bold' }}/>
          </ListItemButton>
          <Divider sx={{ my: 1 }} />

          {/* 2. BÁN HÀNG */}
          <ListItemButton onClick={() => setOpenSales(!openSales)}>
            <ListItemIcon><ComputerIcon /></ListItemIcon>
            <ListItemText primary="Bán hàng" />
            {openSales ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSales} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* Gửi mã 'create_order' */}
              <ListItemButton sx={{ pl: 4 }} onClick={() => onMenuClick('create_order')}>
                <ListItemIcon><ReceiptLongIcon /></ListItemIcon>
                <ListItemText primary="Bán hàng tại quầy" />
              </ListItemButton>
              {/* Gửi mã 'order_list' */}
              <ListItemButton sx={{ pl: 4 }} onClick={() => onMenuClick('order_list')}>
                <ListItemIcon><WorkHistoryIcon /></ListItemIcon>
                <ListItemText primary="Lịch sử giao dịch" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* 3. KHO VÀ SẢN PHẨM */}
          <ListItemButton onClick={() => setOpenWarehouse(!openWarehouse)}>
            <ListItemIcon><WarehouseIcon /></ListItemIcon>
            <ListItemText primary="Kho và Sản phẩm" />
            {openWarehouse ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openWarehouse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* Gửi mã 'product_list' */}
              <ListItemButton sx={{ pl: 4 }} onClick={() => onMenuClick('product_list')}>
                <ListItemIcon><SourceIcon /></ListItemIcon>
                <ListItemText primary="Sản phẩm" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => onMenuClick('import_warehouse')}>
                <ListItemIcon><AddShoppingCartIcon /></ListItemIcon>
                <ListItemText primary="Nhập hàng" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => onMenuClick('import_warehouse')}>
                <ListItemIcon><InventoryIcon /></ListItemIcon>
                <ListItemText primary="Kiểm kho" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* 4. TÀI CHÍNH */}
          <ListItemButton onClick={() => setOpenFinance(!openFinance)}>
            <ListItemIcon><LocalAtmIcon /></ListItemIcon>
            <ListItemText primary="Tài chính" />
            {openFinance ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openFinance} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => onMenuClick('revenue')}>
                <ListItemIcon><SavingsIcon /></ListItemIcon>
                <ListItemText primary="Doanh thu" />
              </ListItemButton>
            </List>
          </Collapse>

        </List>
      </Box>
    </Drawer>
  );
}