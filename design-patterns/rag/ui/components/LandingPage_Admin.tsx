import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Psychology as AIIcon,
  AccountBalance as FinanceIcon,
  Settings as OperationsIcon,
  People as HRIcon,
  Security as SecurityIcon,
  AccountBalance,
  ArrowForward as ArrowForwardIcon,
  SmartToy as BotIcon,
  Logout as LogoutIcon,
  ExitToApp as ExitIcon
} from '@mui/icons-material';

// Type definitions
interface Department {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

interface ChatAreaProps {
  onLogout: () => void;
}

interface LandingPageProps {
  onAuthenticated?: (department: string, user: string) => void;
  onLogout?: () => void; // Added logout prop
}

// Mock ChatArea component since it's not provided
const ChatArea: React.FC<ChatAreaProps> = ({ onLogout }) => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h4" gutterBottom>
      Welcome to RailTel GPT
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Your AI-powered departmental assistant is ready to help.
    </Typography>
    <Button variant="contained" onClick={onLogout}>
      Return to Department Selection
    </Button>
  </Box>
);

const departments: Department[] = [
  {
    id: 'hr',
    name: 'Human Resources GPT',
    description: 'Employee management, talent acquisition, policy administration, and organizational development',
    icon: HRIcon,
    color: '#1565c0',
    bgColor: '#e3f2fd'
  },
  {
    id: 'finance',
    name: 'Finance & Accounting GPT',
    description: 'Financial planning, budget management, accounting operations, and strategic financial analysis',
    icon: FinanceIcon,
    color: '#0d47a1',
    bgColor: '#e8eaf6'
  },
  {
    id: 'operations',
    name: 'Railway Operations GPT',
    description: 'Network operations, infrastructure management, safety protocols, and maintenance coordination',
    icon: OperationsIcon,
    color: '#263238',
    bgColor: '#eceff1'
  }
];

const LandingPage: React.FC<LandingPageProps> = ({ onAuthenticated, onLogout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authenticatedDept, setAuthenticatedDept] = useState<Department | null>(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDepartmentClick = (dept: Department): void => {
    setIsAuthenticated(true);
    setAuthenticatedDept(dept);
    if (onAuthenticated) {
      onAuthenticated(dept.id, "guest");
    }
  };

  const handleLogout = (): void => {
    setIsAuthenticated(false);
    setAuthenticatedDept(null);
  };

  const handleMainLogout = (): void => {
    setOpenLogoutDialog(true);
  };

  const handleConfirmLogout = (): void => {
    setOpenLogoutDialog(false);
    if (onLogout) {
      onLogout();
    }
  };

  const handleCancelLogout = (): void => {
    setOpenLogoutDialog(false);
  };

  if (isAuthenticated && authenticatedDept) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Box sx={{ 
          backgroundColor: '#1565c0', 
          color: 'white', 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Typography variant="h6">
            RailTel GPT - {authenticatedDept.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              onClick={handleLogout} 
              color="inherit" 
              variant="outlined"
              size="small"
            >
              Back
            </Button>
            {onLogout && (
              <Button 
                onClick={handleMainLogout} 
                color="inherit" 
                variant="outlined"
                size="small"
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            )}
          </Box>
        </Box>
        <ChatArea onLogout={handleLogout} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Header */}
      <Box sx={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e5e7eb', 
        py: { xs: 1.5, md: 1 },  // Also change md: 2 to md: 1
        px: { xs: 2, md: 0.25 },
        width: '100%'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          width: '100%', // Add this
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1.5, sm: 0 }
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AIIcon sx={{ fontSize: 28, color: '#1565c0' }} />
              <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography sx={{ 
                  fontWeight: 600, 
                  color: '#1565c0',
                  fontSize: '1.5rem'
                }}>
                  Rail GPT
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.85rem' }}>
                  AI-Powered Enterprise Assistant
                </Typography>
              </Box>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              flexWrap: 'wrap'
            }}>
              
              {onLogout && (
                <Button
                  onClick={handleMainLogout}
                  variant="outlined"
                  size="small"
                  startIcon={<ExitIcon />}
                  sx={{
                    borderColor: '#1565c0',
                    color: '#1565c0',
                    '&:hover': {
                      borderColor: '#0d47a1',
                      backgroundColor: '#e3f2fd'
                    }
                  }}
                >
                  Logout
                </Button>
              )}
            </Box>
          </Box>
        
      </Box>

      {/* Hero Section - Reduced padding and font sizes */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 50%, #f9fafb 100%)',
        py: { xs: 4, md: 6, lg: 4 },
        px: { xs: 2, md: 4 }
      }}>
        <Container maxWidth="xl">
          <Box sx={{ 
            textAlign: 'center',
            width: '100%'
          }}>
            <Typography variant="h1" component="h1" sx={{ 
              fontWeight: 'bold',
              color: '#111827',
              mb: { xs: 3, md: 4 },
              fontSize: { xs: '1rem', sm: '2.5rem', md: '3rem', lg: '3rem' },
              lineHeight: { xs: 1.2, md: 1.1 },
              letterSpacing: '-0.025em'
            }}>
              Rail GPT : AI-Powered 
              <Box component="span" sx={{ 
                display: 'block', 
                color: '#1565c0',
                mt: { xs: 0.5, md: 0 }
              }}>
                Assistant System
              </Box>
            </Typography>
            
            <Typography variant="h5" sx={{ 
              color: '#6b7280',
              mb: { xs: 4, md: 5 },
              lineHeight: 1.6,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
              fontWeight: 400,
              maxWidth: '55rem',
              mx: 'auto'
            }}>
              
            </Typography>

            {/* Trust Indicators - Reduced spacing */}
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 2, sm: 3, md: 4 },
              flexWrap: 'wrap'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <BotIcon sx={{ fontSize: { xs: 16, md: 18 }, color: '#1565c0' }} />
                <Typography variant="body1" sx={{ 
                  fontWeight: 500,
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
                  color: '#374151'
                }}>
                  AI-Powered Security
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <AccountBalance sx={{ fontSize: { xs: 16, md: 18 }, color: '#1565c0' }} />
                <Typography variant="body1" sx={{ 
                  fontWeight: 500,
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
                  color: '#374151'
                }}>
                  Enterprise Grade
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SecurityIcon sx={{ fontSize: { xs: 16, md: 18 }, color: '#1565c0' }} />
                <Typography variant="body1" sx={{ 
                  fontWeight: 500,
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
                  color: '#374151'
                }}>
                  Neural Authentication
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Departments Section */}
      <Box sx={{ py: { xs: 4, md: 6, lg: 4 }, px: { xs: 2, md: 4 }, backgroundColor: 'white' }}>
        <Container maxWidth="xl">
          <Box sx={{ 
            mb: { xs: 4, md: 6 }, 
            textAlign: 'center',
            maxWidth: '45rem',
            mx: 'auto'
          }}>
            <Typography sx={{ 
              fontWeight: 'bold', 
              color: '#111827', 
              mb: 2,
              fontSize: { xs: '1.50rem', md: '2.25rem', lg: '2.5rem' },
              letterSpacing: '-0.025em'
            }}>
              AI Assistants
            </Typography>
            <Typography variant="h6" sx={{ 
              color: '#6b7280',
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 400,
              lineHeight: 1.6
            }}>
              Pick your division's AI assistant
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
            {departments.map((dept) => (
              <Grid item xs={12} sm={6} lg={4} key={dept.id}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 25px -5px rgba(21, 101, 192, 0.1), 0 10px 10px -5px rgba(21, 101, 192, 0.04)',
                    },
                    borderRadius: 3,
                    border: '1px solid #e5e7eb',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                  onClick={() => handleDepartmentClick(dept)}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 }, pb: { xs: 3, md: 4 } }}>
                    {/* Department Icon */}
                    <Box sx={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: { xs: 52, md: 60 },
                      height: { xs: 52, md: 60 },
                      backgroundColor: dept.bgColor,
                      borderRadius: 2,
                      mb: 3
                    }}>
                      <dept.icon sx={{ fontSize: { xs: 26, md: 30 }, color: dept.color }} />
                    </Box>

                    {/* Department Info */}
                    <Typography sx={{ 
                      fontWeight: 600, 
                      color: '#111827', 
                      mb: 2,
                      fontSize: { xs: '1.2rem', md: '1.35rem' },
                      letterSpacing: '-0.025em'
                    }}>
                      {dept.name}
                    </Typography>
                    <Typography sx={{ 
                      color: '#6b7280', 
                      mb: 4, 
                      lineHeight: 1.6,
                      fontSize: { xs: '0.9rem', md: '0.95rem' }
                    }}>
                      {dept.description}
                    </Typography>

                    {/* Access Button */}
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      pt: 2.5, 
                      borderTop: '1px solid #f3f4f6',
                      mt: 'auto'
                    }}>
                      <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                        sx={{
                          backgroundColor: dept.color,
                          color: 'white',
                          textTransform: 'none',
                          fontWeight: 500,
                          px: 2.5,
                          py: 0.8,
                          borderRadius: 2,
                          fontSize: '0.9rem',
                          '&:hover': {
                            backgroundColor: dept.color,
                            opacity: 0.9,
                            transform: 'translateX(4px)'
                          },
                          transition: 'all 0.2s ease',
                          boxShadow: 'none'
                        }}
                      >
                        Launch AI
                      </Button>
                      <Box sx={{ 
                        width: 36,
                        height: 36,
                        backgroundColor: dept.bgColor,
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <BotIcon sx={{ fontSize: 16, color: dept.color, opacity: 0.7 }} />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={handleCancelLogout} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout? You will need to login again to access Rail GPT.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout}>Cancel</Button>
          <Button 
            onClick={handleConfirmLogout} 
            variant="contained"
            color="error"
            sx={{ backgroundColor: '#1565c0' }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LandingPage;