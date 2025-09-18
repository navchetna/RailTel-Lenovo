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
  IconButton,
  Tabs,
  Tab,
  Grid,
  Alert,
  Snackbar,
  OutlinedInput,
  ListItemText,
  Checkbox,
  SelectChangeEvent
} from '@mui/material';
import {
  Psychology as AIIcon,
  Settings as OperationsIcon,
  Security as SecurityIcon,
  ArrowForward as ArrowForwardIcon,
  FolderOpen as DocumentIcon,
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
  GroupAdd as GroupAddIcon,
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
}

interface User {
  id: number;
  name: string;
  email: string;
  departments: string[];
  role: string;
  status: string;
}

interface UserForm {
  name: string;
  email: string;
  departments: string[];
  role: string;
  password: string;
}

interface DeptForm {
  name: string;
  description: string;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

interface GPTBot {
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
  onLogout?: () => void;
}

// Mock ChatArea component since it's not provided
const ChatArea: React.FC<ChatAreaProps> = ({ onLogout }) => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h4" gutterBottom>
      Welcome to RailTel Document Manager
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Your administrative document management system is ready.
    </Typography>
    <Button variant="contained" onClick={onLogout}>
      Return to Admin Dashboard
    </Button>
  </Box>
);

const railtelDocumentManager: GPTBot = {
  id: 'railtel',
  name: 'RailTel Document Manager',
  description: 'Comprehensive document management system for all RailTel Divisions including HR, Finance, Railway Operations',
  icon: DocumentIcon,
  color: '#d32f2f',
  bgColor: '#ffebee'
};

const initialDepartments: Department[] = [
  { id: 'hr', name: 'Human Resources', description: 'Employee management, recruitment, training, and organizational development', icon: PeopleIcon, color: '#1976d2' },
  { id: 'finance', name: 'Finance', description: 'Financial planning, budgeting, accounting, and revenue management', icon: FinanceIcon, color: '#388e3c' },
  { id: 'operations', name: 'Operations', description: 'Railway operations, infrastructure management, and service delivery', icon: RailwayIcon, color: '#f57c00' },
];

// Updated initial users with multiple departments
const initialUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@railtel.com', departments: ['hr'], role: 'Manager', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@railtel.com', departments: ['finance', 'operations'], role: 'Analyst', status: 'Active' },
  { id: 3, name: 'Mike Johnson', email: 'mike.johnson@railtel.com', departments: ['operations'], role: 'Coordinator', status: 'Inactive' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah.wilson@railtel.com', departments: ['hr'], role: 'Specialist', status: 'Active' }
];

const LandingPage: React.FC<LandingPageProps> = ({ onAuthenticated, onLogout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authenticatedDept, setAuthenticatedDept] = useState<GPTBot | null>(null);
  const [showManagement, setShowManagement] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [openUserDialog, setOpenUserDialog] = useState<boolean>(false);
  const [openDeptDialog, setOpenDeptDialog] = useState<boolean>(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({ open: false, message: '', severity: 'success' });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Updated user form state to handle multiple departments
  const [userForm, setUserForm] = useState<UserForm>({
    name: '',
    email: '',
    departments: [],
    role: '',
    password: ''
  });

  // Department form state
  const [deptForm, setDeptForm] = useState<DeptForm>({
    name: '',
    description: ''
  });

  const handleDocumentManagerClick = (): void => {
    setIsAuthenticated(true);
    setAuthenticatedDept(railtelDocumentManager);
    if (onAuthenticated) {
      onAuthenticated(railtelDocumentManager.id, "admin");
    }
  };

  const handleLogout = (): void => {
    setIsAuthenticated(false);
    setAuthenticatedDept(null);
    setShowManagement(false);
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

  const handleManageClick = (): void => {
    setShowManagement(true);
  };

  const handleBackToDashboard = (): void => {
    setShowManagement(false);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info' = 'success'): void => {
    setSnackbar({ open: true, message, severity });
  };

  // User Management Functions
  const handleAddUser = (): void => {
    setEditingUser(null);
    setUserForm({ name: '', email: '', departments: [], role: '', password: '' });
    setOpenUserDialog(true);
  };

  const handleEditUser = (user: User): void => {
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

  const handleDeleteUser = (userId: number): void => {
    setUsers(users.filter(user => user.id !== userId));
    showSnackbar('User deleted successfully');
  };

  const handleSaveUser = (): void => {
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
      const newUser: User = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        ...userForm,
        status: 'Active'
      };
      setUsers([...users, newUser]);
      showSnackbar('User created successfully');
    }
    setOpenUserDialog(false);
  };

  const handleDepartmentChange = (event: SelectChangeEvent<string[]>): void => {
    const value = event.target.value;
    setUserForm({
      ...userForm,
      departments: typeof value === 'string' ? value.split(',') : value,
    });
  };

  // Department Management Functions
  const handleAddDepartment = (): void => {
    setEditingDept(null);
    setDeptForm({ name: '', description: '' });
    setOpenDeptDialog(true);
  };

  const handleEditDepartment = (dept: Department): void => {
    setEditingDept(dept);
    setDeptForm({ name: dept.name, description: dept.description });
    setOpenDeptDialog(true);
  };

  const handleDeleteDepartment = (deptId: string): void => {
    const usersInDept = users.filter(user => user.departments?.includes(deptId));
    if (usersInDept.length > 0) {
      showSnackbar('Cannot delete department with assigned users', 'error');
      return;
    }
    setDepartments(departments.filter(dept => dept.id !== deptId));
    showSnackbar('Department deleted successfully');
  };

  const handleSaveDepartment = (): void => {
    if (editingDept) {
      setDepartments(departments.map(dept => 
        dept.id === editingDept.id 
          ? { ...dept, name: deptForm.name, description: deptForm.description }
          : dept
      ));
      showSnackbar('Department updated successfully');
    } else {
      const newDept: Department = {
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
  const getDepartmentNames = (departmentIds: string[]): string[] => {
    return departmentIds?.map(id => {
      const dept = departments.find(d => d.id === id);
      return dept ? dept.name : id;
    }) || [];
  };

  // Function to get department colors from IDs
  const getDepartmentColors = (departmentIds: string[]): string[] => {
    return departmentIds?.map(id => {
      const dept = departments.find(d => d.id === id);
      return dept ? dept.color : '#9c27b0';
    }) || [];
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
    setActiveTab(newValue);
  };

  const handleUserFormChange = (field: keyof UserForm) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setUserForm({ ...userForm, [field]: event.target.value });
  };

  const handleDeptFormChange = (field: keyof DeptForm) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setDeptForm({ ...deptForm, [field]: event.target.value });
  };

  const handleSnackbarClose = (): void => {
    setSnackbar({ ...snackbar, open: false });
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
              RailTel Admin - {authenticatedDept.name}
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
          backgroundColor: '#f5f5f5', 
          color: 'red', 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6"></Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              onClick={handleBackToDashboard} 
              color="inherit" 
              variant="outlined"
              size="small"
            >
              Back to Dashboard
            </Button>
            <Button 
              onClick={handleMainLogout} 
              color="inherit" 
              variant="outlined"
              size="small"
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        </Box>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab 
                icon={<PeopleIcon />} 
                label="User Management" 
                iconPosition="start"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
              <Tab 
                icon={<BusinessIcon />} 
                label="Division Management" 
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
                        <TableCell sx={{ fontWeight: 600 }}>Division</TableCell>
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
                  Division Management
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
                  Add Division
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

        {/* All Dialogs remain the same */}
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
                onChange={handleUserFormChange('name')}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={userForm.email}
                onChange={handleUserFormChange('email')}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Divisions</InputLabel>
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
                onChange={handleUserFormChange('role')}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={userForm.password}
                onChange={handleUserFormChange('password')}
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
                onChange={handleDeptFormChange('name')}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={deptForm.description}
                onChange={handleDeptFormChange('description')}
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

        <Dialog open={openLogoutDialog} onClose={handleCancelLogout} maxWidth="xs" fullWidth>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to logout? You will need to login again to access the admin panel.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelLogout}>Cancel</Button>
            <Button 
              onClick={handleConfirmLogout} 
              variant="contained"
              color="error"
              sx={{ backgroundColor: '#d32f2f' }}
            >
              Logout
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert severity={snackbar.severity} onClose={handleSnackbarClose}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Admin Header - Fixed for full width */}
      <Box sx={{ 
        backgroundColor: 'white', 
        borderBottom: '2px solid #d32f2f', 
        py: { xs: 1, md: 1.5 },
        px: { xs: 2, md: 1, sm: 5 }, // Added sm: 5 as mentioned
        width: '100%' // Ensure full width
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          width: '100%', // Ensure full width
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <AdminIcon sx={{ fontSize: 24, color: '#d32f2f' }} />
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography sx={{ 
                fontWeight: 700, 
                color: '#d32f2f',
                fontSize: '1.25rem'
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
            gap: 1.5,
            flexWrap: 'wrap',
            paddingRight: { xs: 1, sm: 2 } // Add padding to avoid scrollbar collision
          }}>
            <Chip 
              icon={<SupervisorIcon />} 
              label="Administrator" 
              sx={{ 
                backgroundColor: '#d32f2f',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.7rem'
              }}
              size="small"
            />
            
            {onLogout && (
              <Button
                onClick={handleMainLogout}
                variant="outlined"
                size="small"
                startIcon={<ExitIcon />}
                sx={{
                  borderColor: '#d32f2f',
                  color: '#d32f2f',
                  fontSize: '0.8rem',
                  '&:hover': {
                    borderColor: '#b71c1c',
                    backgroundColor: '#ffebee'
                  }
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Admin Hero Section - Reduced sizes and padding */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #ffebee 0%, #ffffff 50%, #f9fafb 100%)',
        py: { xs: 3, md: 4 },
        px: { xs: 2, md: 3 }
      }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            textAlign: 'center',
            width: '100%'
          }}>
            <Typography variant="h1" component="h1" sx={{ 
              fontWeight: 'bold',
              color: '#111827',
              mb: { xs: 2, md: 3 },
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              lineHeight: 1.2,
              letterSpacing: '-0.025em'
            }}>
              Rail GPT Admin Portal
              <Box component="span" sx={{ 
                display: 'block', 
                color: '#d32f2f',
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
              }}>
                Administrative Control
              </Box>
            </Typography>
            
            <Typography variant="h6" sx={{ 
              color: '#6b7280',
              mb: { xs: 4, md: 5 },
              lineHeight: 1.6,
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              fontWeight: 400,
              maxWidth: '45rem',
              mx: 'auto'
            }}>
              Access your comprehensive document management system for all RailTel operations and Divisions
            </Typography>

            {/* Management and Document Manager Cards - Properly sized and centered */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              mb: { xs: 4, md: 5 }
            }}>
              <Grid container spacing={3} sx={{ maxWidth: '800px' }}>
                {/* Management Card */}
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 25px -5px rgba(211, 47, 47, 0.15), 0 10px 10px -5px rgba(211, 47, 47, 0.1)',
                      },
                      borderRadius: 2,
                      border: '2px solid #ffcdd2',
                      overflow: 'hidden',
                      position: 'relative',
                      boxShadow: '0 8px 15px rgba(211, 47, 47, 0.08)'
                    }}
                    onClick={handleManageClick}
                  >
                    {/* Management Badge */}
                    <Box sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      zIndex: 1
                    }}>
                      <Chip 
                        icon={<OperationsIcon sx={{ fontSize: '12px !important' }} />}
                        label="MANAGEMENT"
                        size="small"
                        sx={{
                          backgroundColor: '#d32f2f',
                          color: 'white',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          height: 24
                        }}
                      />
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      {/* Management Icon */}
                      <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2
                      }}>
                        <Box sx={{ 
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 60,
                          height: 60,
                          backgroundColor: '#ffffffff',
                          borderRadius: 2,
                          border: '2px solid #ffcdd2'
                        }}>
                          <OperationsIcon sx={{ fontSize: 28, color: '#d32f2f' }} />
                        </Box>
                      </Box>

                      {/* Management Info */}
                      <Typography sx={{ 
                        fontWeight: 700, 
                        color: '#111827', 
                        mb: 2,
                        fontSize: '1.1rem',
                        letterSpacing: '-0.025em',
                        textAlign: 'center'
                      }}>
                        User & Division Management
                      </Typography>
                      <Typography sx={{ 
                        color: '#6b7280', 
                        mb: 3, 
                        lineHeight: 1.6,
                        fontSize: '0.85rem',
                        textAlign: 'center'
                      }}>
                        Create and manage users, assign multiple divisions, and configure organizational structure
                      </Typography>

                      {/* Access Button */}
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                        pt: 2, 
                        borderTop: '1px solid #f3f4f6'
                      }}>
                        <Button
                          variant="contained"
                          endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                          size="medium"
                          sx={{
                            backgroundColor: '#d32f2f',
                            color: 'white',
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                            fontSize: '0.9rem',
                            '&:hover': {
                              backgroundColor: '#b71c1c',
                              transform: 'translateX(2px)'
                            },
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 8px rgba(211, 47, 47, 0.2)'
                          }}
                        >
                          Manage System
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Document Manager Card */}
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 25px -5px rgba(211, 47, 47, 0.15), 0 10px 10px -5px rgba(211, 47, 47, 0.1)',
                      },
                      borderRadius: 2,
                      border: '2px solid #ffcdd2',
                      overflow: 'hidden',
                      position: 'relative',
                      boxShadow: '0 8px 15px rgba(211, 47, 47, 0.08)'
                    }}
                    onClick={handleDocumentManagerClick}
                  >
                    {/* Admin Badge */}
                    <Box sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      zIndex: 1
                    }}>
                      <Chip 
                        icon={<AdminIcon sx={{ fontSize: '12px !important' }} />}
                        label="DOCUMENTS"
                        size="small"
                        sx={{
                          backgroundColor: '#d32f2f',
                          color: 'white',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          height: 24
                        }}
                      />
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      {/* Document Manager Icon */}
                      <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2
                      }}>
                        <Box sx={{ 
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 60,
                          height: 60,
                          backgroundColor: '#ffffffff',
                          
                          borderRadius: 2,
                          border: '2px solid #ffcdd2'
                        }}>
                          <railtelDocumentManager.icon sx={{ fontSize: 28, color: railtelDocumentManager.color }} />
                        </Box>
                      </Box>

                      {/* Document Manager Info */}
                      <Typography sx={{ 
                        fontWeight: 700, 
                        color: '#111827', 
                        mb: 2,
                        fontSize: '1.1rem',
                        letterSpacing: '-0.025em',
                        textAlign: 'center'
                      }}>
                        Document Manager
                      </Typography>
                      <Typography sx={{ 
                        color: '#6b7280', 
                        mb: 3, 
                        lineHeight: 1.6,
                        fontSize: '0.85rem',
                        textAlign: 'center'
                      }}>
                        Comprehensive document management system for all RailTel Divisions
                      </Typography>

                      {/* Access Button */}
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                        pt: 2, 
                        borderTop: '1px solid #ffcdd2'
                      }}>
                        <Button
                          variant="contained"
                          endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                          size="medium"
                          sx={{
                            backgroundColor: '#d32f2f',
                            color: 'white',
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                            fontSize: '0.9rem',
                            '&:hover': {
                              backgroundColor: '#b71c1c',
                              transform: 'translateX(2px)'
                            },
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 8px rgba(211, 47, 47, 0.2)'
                          }}
                        >
                          Enter Manager
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {/* Admin Trust Indicators */}
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 3, sm: 4, md: 5 },
              flexWrap: 'wrap'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AdminIcon sx={{ fontSize: 16, color: '#d32f2f' }} />
                <Typography variant="body2" sx={{ 
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  color: '#374151'
                }}>
                  Enhanced Security
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SecurityIcon sx={{ fontSize: 16, color: '#d32f2f' }} />
                <Typography variant="body2" sx={{ 
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  color: '#374151'
                }}>
                  Document Management
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={handleCancelLogout} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout? You will need to login again to access the admin panel.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout}>Cancel</Button>
          <Button 
            onClick={handleConfirmLogout} 
            variant="contained"
            color="error"
            sx={{ backgroundColor: '#d32f2f' }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LandingPage;