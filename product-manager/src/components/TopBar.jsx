import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

export default function TopBar({ user, onLogout }) {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton color="inherit" edge="start" sx={{ mr: 2, display: { sm: 'none' } }}>
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Quản lý sản phẩm
        </Typography>
        
        <Typography variant="body1" sx={{ marginRight: 2 }}>
          Xin chào, {user?.name}
        </Typography>
        
        <Button color="inherit" startIcon={<LogoutIcon />} onClick={onLogout}>
          Thoát
        </Button>
      </Toolbar>
    </AppBar>
  );
}