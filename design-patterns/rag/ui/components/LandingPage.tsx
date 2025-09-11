import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  useTheme,
  useMediaQuery,
  Container,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tabs,
  Tab,
  Grid,
  Alert,
  Snackbar,
  OutlinedInput,
  ListItemText,
  Checkbox
} from '@mui/material';
import {
  Psychology as AIIcon,
  Settings as OperationsIcon,
  Security as SecurityIcon,
  ArrowForward as ArrowForwardIcon,
  SmartToy as BotIcon,
  AdminPanelSettings as AdminIcon,
  Shield as ShieldIcon,
  SupervisorAccount as SupervisorIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  AccountBalance as FinanceIcon,
  Train as RailwayIcon,
  PersonAdd as PersonAddIcon,
  GroupAdd as GroupAddIcon
} from '@mui/icons-material';

// Mock ChatArea component since it's not provided
const ChatArea = ({ onLogout }) => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h4" gutterBottom>
      Welcome to RailTel GPT Admin Portal
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Your administrative AI-powered assistant is ready to help.
    </Typography>
    <Button variant="contained" onClick={onLogout}>
      Return to Admin Dashboard
    </Button>
  </Box>
);

const railtelGPT = {
  id: 'railtel',
  name: 'RailTel GPT',
  description: 'Comprehensive AI assistant for all RailTel operations including HR, Finance, Railway Operations, Infrastructure Management, and Strategic Planning',
  icon: BotIcon,
  color: '#d32f2f',
  bgColor: '#ffebee'
};

const initialDepartments = [
  { id: 'hr', name: 'Human Resources', description: 'Employee management, recruitment, training, and organizational development', icon: PeopleIcon, color: '#1976d2' },
  { id: 'finance', name: 'Finance', description: 'Financial planning, budgeting, accounting, and revenue management', icon: FinanceIcon, color: '#388e3c' },
  { id: 'operations', name: 'Operations', description: 'Railway operations, infrastructure management, and service delivery', icon: RailwayIcon, color: '#f57c00' },
];

// Updated initial users with multiple departments
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@railtel.com', departments: ['hr'], role: 'Manager', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@railtel.com', departments: ['finance', 'operations'], role: 'Analyst', status: 'Active' },
  { id: 3, name: 'Mike Johnson', email: 'mike.johnson@railtel.com', departments: ['operations'], role: 'Coordinator', status: 'Inactive' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah.wilson@railtel.com', departments: ['hr'], role: 'Specialist', status: 'Active' }
];

interface LandingPageProps {
  onAuthenticated?: (department: string, user: string) => void;
}

export default function LandingPage({ onAuthenticated }: LandingPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedDept, setAuthenticatedDept] = useState<any>(null);
  const [showManagement, setShowManagement] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState(initialUsers);
  const [departments, setDepartments] = useState(initialDepartments);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openDeptDialog, setOpenDeptDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingDept, setEditingDept] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Updated user form state to handle multiple departments
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    departments: [], // Changed from single department to array
    role: '',
    password: ''
  });

  // Department form state
  const [deptForm, setDeptForm] = useState({
    name: '',
    description: ''
  });

  const handleGPTClick = () => {
    setIsAuthenticated(true);
    setAuthenticatedDept(railtelGPT);
    if (onAuthenticated) {
      onAuthenticated(railtelGPT.id, "admin");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthenticatedDept(null);
    setShowManagement(false);
  };

  const handleManageClick = () => {
    setShowManagement(true);
  };

  const handleBackToDashboard = () => {
    setShowManagement(false);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // Updated User Management Functions
  const handleAddUser = () => {
    setEditingUser(null);
    setUserForm({ name: '', email: '', departments: [], role: '', password: '' });
    setOpenUserDialog(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({ 
      name: user.name,
      email: user.email,
      departments: user.departments || [],
      role: user.role,
      password: ''
    });
    setOpenUserDialog(true);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    showSnackbar('User deleted successfully');
  };

  const handleSaveUser = () => {
    if (userForm.departments.length === 0) {
      showSnackbar('Please select at least one department', 'error');
      return;
    }

    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...userForm, status: user.status }
          : user
      ));
      showSnackbar('User updated successfully');
    } else {
      const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        ...userForm,
        status: 'Active'
      };
      setUsers([...users, newUser]);
      showSnackbar('User created successfully');
    }
    setOpenUserDialog(false);
  };

  // Handle department selection change
  const handleDepartmentChange = (event) => {
    const value = event.target.value;
    setUserForm({
      ...userForm,
      departments: typeof value === 'string' ? value.split(',') : value,
    });
  };

  // Department Management Functions
  const handleAddDepartment = () => {
    setEditingDept(null);
    setDeptForm({ name: '', description: '' });
    setOpenDeptDialog(true);
  };

  const handleEditDepartment = (dept) => {
    setEditingDept(dept);
    setDeptForm({ name: dept.name, description: dept.description });
    setOpenDeptDialog(true);
  };

  const handleDeleteDepartment = (deptId) => {
    const usersInDept = users.filter(user => user.departments?.includes(deptId));
    if (usersInDept.length > 0) {
      showSnackbar('Cannot delete department with assigned users', 'error');
      return;
    }
    setDepartments(departments.filter(dept => dept.id !== deptId));
    showSnackbar('Department deleted successfully');
  };

  const handleSaveDepartment = () => {
    if (editingDept) {
      setDepartments(departments.map(dept => 
        dept.id === editingDept.id 
          ? { ...dept, name: deptForm.name, description: deptForm.description }
          : dept
      ));
      showSnackbar('Department updated successfully');
    } else {
      const newDept = {
        id: deptForm.name.toLowerCase().replace(/\s+/g, ''),
        name: deptForm.name,
        description: deptForm.description,
        icon: BusinessIcon,
        color: '#9c27b0'
      };
      setDepartments([...departments, newDept]);
      showSnackbar('Department created successfully');
    }
    setOpenDeptDialog(false);
  };

  // Function to get department names from IDs
  const getDepartmentNames = (departmentIds) => {
    return departmentIds?.map(id => {
      const dept = departments.find(d => d.id === id);
      return dept ? dept.name : id;
    }) || [];
  };

  // Function to get department colors from IDs
  const getDepartmentColors = (departmentIds) => {
    return departmentIds?.map(id => {
      const dept = departments.find(d => d.id === id);
      return dept ? dept.color : '#9c27b0';
    }) || [];
  };

  if (isAuthenticated && authenticatedDept && !showManagement) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Box sx={{ 
          backgroundColor: '#d32f2f', 
          color: 'white', 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AdminIcon sx={{ fontSize: 24 }} />
            <Typography variant="h6">
              RailTel GPT Admin - {authenticatedDept.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              onClick={handleManageClick} 
              color="inherit" 
              variant="outlined"
              size="small"
              startIcon={<OperationsIcon />}
            >
              Manage
            </Button>
            <Button 
              onClick={handleLogout} 
              color="inherit" 
              variant="outlined"
              size="small"
            >
              Back
            </Button>
          </Box>
        </Box>
        <ChatArea onLogout={handleLogout} />
      </Box>
    );
  }

  if (showManagement) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Box sx={{ 
          backgroundColor: '#d32f2f', 
          color: 'white', 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AdminIcon sx={{ fontSize: 24 }} />
            <Typography variant="h6">
              RailTel GPT Admin - Management Portal
            </Typography>
          </Box>
          <Button 
            onClick={handleBackToDashboard} 
            color="inherit" 
            variant="outlined"
            size="small"
          >
            Back to Dashboard
          </Button>
        </Box>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab 
                icon={<PeopleIcon />} 
                label="User Management" 
                iconPosition="start"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
              <Tab 
                icon={<BusinessIcon />} 
                label="Department Management" 
                iconPosition="start"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
            </Tabs>
          </Box>

          {/* User Management Tab */}
          {activeTab === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#1f2937' }}>
                  User Management
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  onClick={handleAddUser}
                  sx={{ 
                    backgroundColor: '#d32f2f',
                    '&:hover': { backgroundColor: '#b71c1c' }
                  }}
                >
                  Add User
                </Button>
              </Box>

              <Card>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f9fafb' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Departments</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {getDepartmentNames(user.departments).map((deptName, index) => (
                                <Chip 
                                  key={index}
                                  label={deptName}
                                  size="small"
                                  sx={{ 
                                    backgroundColor: getDepartmentColors(user.departments)[index] + '20',
                                    color: getDepartmentColors(user.departments)[index],
                                    fontWeight: 500
                                  }}
                                />
                              ))}
                            </Box>
                          </TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <Chip 
                              label={user.status} 
                              color={user.status === 'Active' ? 'success' : 'default'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleEditUser(user)} size="small">
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteUser(user.id)} size="small" color="error">
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Box>
          )}

          {/* Department Management Tab */}
          {activeTab === 1 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#1f2937' }}>
                  Department Management
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<GroupAddIcon />}
                  onClick={handleAddDepartment}
                  sx={{ 
                    backgroundColor: '#d32f2f',
                    '&:hover': { backgroundColor: '#b71c1c' }
                  }}
                >
                  Add Department
                </Button>
              </Box>

              <Grid container spacing={3}>
                {departments.map((dept) => (
                  <Grid item xs={12} md={6} lg={4} key={dept.id}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box sx={{ 
                            p: 1, 
                            borderRadius: 2, 
                            backgroundColor: dept.color + '20',
                            mr: 2
                          }}>
                            <dept.icon sx={{ color: dept.color, fontSize: 24 }} />
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {dept.name}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                          {dept.description}
                        </Typography>
                        <Chip 
                          label={`${users.filter(u => u.departments?.includes(dept.id)).length} users`}
                          size="small"
                          sx={{ mb: 2 }}
                        />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton onClick={() => handleEditDepartment(dept)} size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            onClick={() => handleDeleteDepartment(dept.id)} 
                            size="small" 
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Container>

        {/* Updated User Dialog with Multi-Select */}
        <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingUser ? 'Edit User' : 'Add New User'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Name"
                value={userForm.name}
                onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Departments</InputLabel>
                <Select
                  multiple
                  value={userForm.departments}
                  onChange={handleDepartmentChange}
                  input={<OutlinedInput label="Departments" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const dept = departments.find(d => d.id === value);
                        return (
                          <Chip 
                            key={value} 
                            label={dept?.name || value} 
                            size="small"
                            sx={{
                              backgroundColor: dept?.color + '20',
                              color: dept?.color
                            }}
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept.id} value={dept.id}>
                      <Checkbox checked={userForm.departments.indexOf(dept.id) > -1} />
                      <ListItemText 
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <dept.icon sx={{ fontSize: 20, color: dept.color }} />
                            {dept.name}
                          </Box>
                        }
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Role"
                value={userForm.role}
                onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={userForm.password}
                onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                margin="normal"
                helperText={editingUser ? "Leave blank to keep current password" : ""}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenUserDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleSaveUser} 
              variant="contained"
              sx={{ backgroundColor: '#d32f2f' }}
            >
              {editingUser ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Department Dialog */}
        <Dialog open={openDeptDialog} onClose={() => setOpenDeptDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingDept ? 'Edit Department' : 'Add New Department'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Department Name"
                value={deptForm.name}
                onChange={(e) => setDeptForm({...deptForm, name: e.target.value})}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={deptForm.description}
                onChange={(e) => setDeptForm({...deptForm, description: e.target.value})}
                margin="normal"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeptDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleSaveDepartment} 
              variant="contained"
              sx={{ backgroundColor: '#d32f2f' }}
            >
              {editingDept ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({...snackbar, open: false})}
        >
          <Alert severity={snackbar.severity} onClose={() => setSnackbar({...snackbar, open: false})}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Admin Header */}
      <Box sx={{ 
        backgroundColor: 'white', 
        borderBottom: '2px solid #d32f2f', 
        py: { xs: 1.5, md: 2 },
        px: { xs: 2, md: 4 }
      }}>
        <Container maxWidth="xl">
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1.5, sm: 0 }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AdminIcon sx={{ fontSize: 32, color: '#d32f2f' }} />
              <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography sx={{ 
                  fontWeight: 700, 
                  color: '#d32f2f',
                  fontSize: '1.6rem'
                }}>
                  Rail GPT Admin
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.85rem' }}>
                  Administrative Control Panel
                </Typography>
              </Box>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              flexWrap: 'wrap'
            }}>
              <Chip 
                icon={<SupervisorIcon />} 
                label="Administrator" 
                sx={{ 
                  backgroundColor: '#d32f2f',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }}
                size="small"
              />
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                color: '#6b7280',
                fontSize: '0.875rem'
              }}>
                <ShieldIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>Admin Access</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Admin Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #ffebee 0%, #ffffff 50%, #f9fafb 100%)',
        py: { xs: 4, md: 6, lg: 8 },
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
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
              lineHeight: { xs: 1.2, md: 1.1 },
              letterSpacing: '-0.025em'
            }}>
              Rail GPT Admin Portal
              <Box component="span" sx={{ 
                display: 'block', 
                color: '#d32f2f',
                mt: { xs: 0.5, md: 0 }
              }}>
                Administrative Control
              </Box>
            </Typography>
            
            <Typography variant="h5" sx={{ 
              color: '#6b7280',
              mb: { xs: 6, md: 8 },
              lineHeight: 1.6,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
              fontWeight: 400,
              maxWidth: '55rem',
              mx: 'auto'
            }}>
              Access your comprehensive AI assistant for all RailTel operations and management
            </Typography>

            {/* Management and GPT Cards - Side by Side */}
            <Grid container spacing={4} sx={{ mb: { xs: 6, md: 8 } }}>
              {/* Management Card */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 25px 35px -5px rgba(25, 118, 210, 0.2), 0 15px 15px -5px rgba(25, 118, 210, 0.12)',
                    },
                    borderRadius: 4,
                    border: '2px solid #bbdefb',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 10px 20px rgba(25, 118, 210, 0.1)'
                  }}
                  onClick={handleManageClick}
                >
                  {/* Management Badge */}
                  <Box sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 1
                  }}>
                    <Chip 
                      icon={<OperationsIcon sx={{ fontSize: '14px !important' }} />}
                      label="MANAGEMENT"
                      size="medium"
                      sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        height: 28,
                        px: 1
                      }}
                    />
                  </Box>

                  <CardContent sx={{ p: { xs: 4, md: 5 }, pb: { xs: 4, md: 5 } }}>
                    {/* Management Icon */}
                    <Box sx={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 4
                    }}>
                      <Box sx={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: { xs: 80, md: 90 },
                        height: { xs: 80, md: 90 },
                        backgroundColor: '#e3f2fd',
                        borderRadius: 3,
                        border: '3px solid #bbdefb'
                      }}>
                        <OperationsIcon sx={{ fontSize: { xs: 40, md: 45 }, color: '#1976d2' }} />
                      </Box>
                    </Box>

                    {/* Management Info */}
                    <Typography sx={{ 
                      fontWeight: 700, 
                      color: '#111827', 
                      mb: 3,
                      fontSize: { xs: '1.5rem', md: '1.8rem' },
                      letterSpacing: '-0.025em',
                      textAlign: 'center'
                    }}>
                      User & Department Management
                    </Typography>
                    <Typography sx={{ 
                      color: '#6b7280', 
                      mb: 5, 
                      lineHeight: 1.7,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      textAlign: 'center'
                    }}>
                      Create and manage users, assign multiple departments, and configure organizational structure
                    </Typography>

                    {/* Access Button */}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      pt: 3, 
                      borderTop: '1px solid #bbdefb'
                    }}>
                      <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon sx={{ fontSize: 20 }} />}
                        size="large"
                        sx={{
                          backgroundColor: '#1976d2',
                          color: 'white',
                          textTransform: 'none',
                          fontWeight: 600,
                          px: 4,
                          py: 1.5,
                          borderRadius: 3,
                          fontSize: '1.1rem',
                          '&:hover': {
                            backgroundColor: '#1565c0',
                            transform: 'translateX(4px)'
                          },
                          transition: 'all 0.2s ease',
                          boxShadow: '0 8px 16px rgba(25, 118, 210, 0.3)'
                        }}
                      >
                        Manage Users & Departments
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* GPT Card */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 25px 35px -5px rgba(211, 47, 47, 0.2), 0 15px 15px -5px rgba(211, 47, 47, 0.12)',
                    },
                    borderRadius: 4,
                    border: '2px solid #ffcdd2',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 10px 20px rgba(211, 47, 47, 0.1)'
                  }}
                  onClick={handleGPTClick}
                >
                  {/* Admin Badge */}
                  <Box sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 1
                  }}>
                    <Chip 
                      icon={<AdminIcon sx={{ fontSize: '14px !important' }} />}
                      label="ADMIN ACCESS"
                      size="medium"
                      sx={{
                        backgroundColor: '#d32f2f',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        height: 28,
                        px: 1
                      }}
                    />
                  </Box>

                  <CardContent sx={{ p: { xs: 4, md: 5 }, pb: { xs: 4, md: 5 } }}>
                    {/* GPT Icon */}
                    <Box sx={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 4
                    }}>
                      <Box sx={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: { xs: 80, md: 90 },
                        height: { xs: 80, md: 90 },
                        backgroundColor: railtelGPT.bgColor,
                        borderRadius: 3,
                        border: '3px solid #ffcdd2'
                      }}>
                        <railtelGPT.icon sx={{ fontSize: { xs: 40, md: 45 }, color: railtelGPT.color }} />
                      </Box>
                    </Box>

                    {/* GPT Info */}
                    <Typography sx={{ 
                      fontWeight: 700, 
                      color: '#111827', 
                      mb: 3,
                      fontSize: { xs: '1.5rem', md: '1.8rem' },
                      letterSpacing: '-0.025em',
                      textAlign: 'center'
                    }}>
                      {railtelGPT.name}
                    </Typography>
                    <Typography sx={{ 
                      color: '#6b7280', 
                      mb: 5, 
                      lineHeight: 1.7,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      textAlign: 'center'
                    }}>
                      {railtelGPT.description}
                    </Typography>

                    {/* Access Button */}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      pt: 3, 
                      borderTop: '1px solid #ffcdd2'
                    }}>
                      <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon sx={{ fontSize: 20 }} />}
                        size="large"
                        sx={{
                          backgroundColor: '#d32f2f',
                          color: 'white',
                          textTransform: 'none',
                          fontWeight: 600,
                          px: 4,
                          py: 1.5,
                          borderRadius: 3,
                          fontSize: '1.1rem',
                          '&:hover': {
                            backgroundColor: '#b71c1c',
                            transform: 'translateX(4px)'
                          },
                          transition: 'all 0.2s ease',
                          boxShadow: '0 8px 16px rgba(211, 47, 47, 0.3)'
                        }}
                      >
                        Enter RailTel GPT
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Admin Trust Indicators */}
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 3, sm: 4, md: 6 },
              flexWrap: 'wrap'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <AdminIcon sx={{ fontSize: { xs: 18, md: 20 }, color: '#d32f2f' }} />
                <Typography variant="body1" sx={{ 
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  color: '#374151'
                }}>
                  Enhanced Security
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SecurityIcon sx={{ fontSize: { xs: 18, md: 20 }, color: '#d32f2f' }} />
                <Typography variant="body1" sx={{ 
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  color: '#374151'
                }}>
                  System Management
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}