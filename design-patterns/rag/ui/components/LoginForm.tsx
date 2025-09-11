import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Container,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  Psychology as BrainIcon,
  Security as ShieldIcon,
  Business as BuildingIcon,
  Lock as LockIcon,
  Email as EmailIcon
} from "@mui/icons-material";

interface LoginFormProps {
  onLogin: (credentials: { email: string; password: string }) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      onLogin({ email, password });
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 50%, #f8f9fa 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2
    }}>
      <Container maxWidth="sm">
        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: 2, 
              mb: 2 
            }}>
              <Box sx={{ 
                p: 1.5, 
                bgcolor: '#1565c0', 
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BrainIcon sx={{ fontSize: 32, color: 'white' }} />
              </Box>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 'bold', 
                  color: '#1565c0',
                  lineHeight: 1
                }}>
                  Rail GPT
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#6b7280', 
                  fontSize: '0.875rem',
                  mt: 0.5
                }}>
                  AI-Powered Enterprise Assistant
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Login Card */}
          <Card sx={{
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e5e7eb',
            borderRadius: 3,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 600, 
                  color: '#111827',
                  mb: 1
                }}>
                  Welcome
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Sign in to access your AI departmental assistants
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    InputProps={{
                      startAdornment: (
                        <EmailIcon sx={{ color: '#6b7280', mr: 1, fontSize: 20 }} />
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#1565c0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1565c0',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#1565c0',
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    InputProps={{
                      startAdornment: (
                        <LockIcon sx={{ color: '#6b7280', mr: 1, fontSize: 20 }} />
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#1565c0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1565c0',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#1565c0',
                      },
                    }}
                  />
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    bgcolor: '#1565c0',
                    color: 'white',
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 500,
                    textTransform: 'none',
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: '#0d47a1',
                    },
                    '&:disabled': {
                      bgcolor: '#9e9e9e',
                    },
                  }}
                >
                  {isLoading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CircularProgress size={20} color="inherit" />
                      Signing in...
                    </Box>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <Box sx={{ 
            mt: 4, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: { xs: 2, sm: 4 },
            flexWrap: 'wrap',
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShieldIcon sx={{ fontSize: 16, color: '#1565c0' }} />
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                Secure Access
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BuildingIcon sx={{ fontSize: 16, color: '#1565c0' }} />
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                Enterprise Grade
              </Typography>
            </Box>
          </Box>

          
        </Box>
      </Container>
    </Box>
  );
}