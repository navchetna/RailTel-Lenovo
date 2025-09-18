import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Avatar, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem,
  Divider,
  Chip,
  Button
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccount from '@mui/icons-material/SupervisorAccount';
import Shield from '@mui/icons-material/Shield';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface NavbarProps {
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  onLogout?: () => void;
  onGoBack?: () => void;
}

const Navbar_admin: React.FC<NavbarProps> = ({ user, onLogout, onGoBack }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        backgroundColor: 'white',
        borderBottom: '2px solid #d32f2f',
        zIndex: 1300,
        boxShadow: 'none',
      }}
    >
      <Box sx={{ 
        py: { xs: 1.5, md: 1 },
        px: { xs: 2, md: 1, sm: 5 }, // Added sm: 5 as requested
        width: '100%' // Ensure full width
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          width: '100%', // Ensure full width
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1.5, sm: 0 }
        }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              cursor: onGoBack ? 'pointer' : 'default',
              transition: 'opacity 0.2s',
              '&:hover': onGoBack ? {
                opacity: 0.8
              } : {}
            }}
            onClick={onGoBack}
          >
            <AdminPanelSettings sx={{ fontSize: 32, color: '#d32f2f' }} />
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography sx={{ 
                fontWeight: 700, 
                color: '#d32f2f',
                fontSize: '1.2rem'
              }}>
                Rail GPT Admin
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.75rem' }}>
                Administrative Control Panel
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            flexWrap: 'wrap',
            paddingRight: { xs: 1, sm: 2 } // Add padding to avoid scrollbar collision
          }}>
            {/* User Profile Section */}
            <IconButton
              onClick={handleMenu}
              size="small"
              sx={{
                p: 0.5,
                borderRadius: 1.5,
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: '#f9fafb',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar 
                  src={user.avatarUrl}
                  alt={user.name}
                  sx={{ 
                    width: 28, 
                    height: 28,
                    backgroundColor: '#dbeafe',
                    border: '1px solid #e5e7eb',
                  }}
                >
                  {!user.avatarUrl && (
                    <AccountCircleIcon sx={{ color: '#3b82f6', fontSize: 16 }} />
                  )}
                </Avatar>
                <Box sx={{ 
                  display: { xs: 'none', sm: 'flex' },
                  flexDirection: 'column', 
                  alignItems: 'flex-start',
                  minWidth: 0,
                }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#111827',
                      fontWeight: 500,
                      fontSize: '0.8rem',
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100px',
                      lineHeight: 1.1,
                    }}
                  >
                    {user.name}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#6b7280',
                      fontSize: '0.7rem',
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100px',
                      lineHeight: 1,
                    }}
                  >
                    {user.email}
                  </Typography>
                </Box>
                <KeyboardArrowDownIcon 
                  sx={{ 
                    color: '#9ca3af',
                    fontSize: 14,
                    transition: 'transform 0.2s',
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </Box>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{
                mt: 0.5,
                '& .MuiPaper-root': {
                  borderRadius: 2,
                  minWidth: 180,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e5e7eb',
                  '& .MuiMenuItem-root': {
                    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontSize: '0.875rem',
                    py: 1,
                    px: 1.5,
                    gap: 1.5,
                    transition: 'background-color 0.2s',
                  },
                },
              }}
            >
              <MenuItem 
                onClick={handleClose}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  }
                }}
              >
                <PersonIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                Profile
              </MenuItem>
              <MenuItem 
                onClick={handleClose}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  }
                }}
              >
                <SettingsIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                Settings
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem 
                onClick={handleLogout}
                sx={{
                  color: '#dc2626',
                  '&:hover': {
                    backgroundColor: '#fef2f2',
                  }
                }}
              >
                <LogoutIcon sx={{ fontSize: 16, color: '#dc2626' }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Navbar_admin;