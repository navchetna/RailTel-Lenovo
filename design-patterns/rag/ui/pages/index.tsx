'use client';

import React, { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import { Box } from '@mui/material';
import { ApiType } from '@/types/api';
import Navbar from '@/components/Navbar';
import Navbar_admin from '@/components/Navbar_admin'; // <-- correct import
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import ChatArea from '@/components/ChatArea';
import ChatAreaAdmin from '@/components/ChatArea_Admin';
import SearchLanding from '@/components/SearchLanding';
import SearchResults from '@/components/SearchResults';
import LandingPage from '@/components/LandingPage_Admin';
import AdminLandingPage from '@/components/LandingPage';
import LoginForm from '@/components/LoginForm';

const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatarUrl: '/placeholder.svg',
};

export default function Home() {
  const [currentContext, setCurrentContext] = useState<string>('General');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const { messages, isLoading, error } = useChat();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [selectedApi, setSelectedApi] = useState<ApiType>("semantic_scholar");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<string>('');
  const [userType, setUserType] = useState<'admin' | 'user' | null>(null);

  // Check authentication status on component mount
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const authStatus = localStorage.getItem('isAuthenticated');
    const department = localStorage.getItem('department');
    const user = localStorage.getItem('user');
    const savedUserType = localStorage.getItem('userType');
    
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
      setUserType(savedUserType as 'admin' | 'user');
      if (authStatus === 'true' && department && user) {
        setIsAuthenticated(true);
        setCurrentDepartment(department);
        setCurrentUser(user);
      }
    }
  }, []);

  

  // Handle login form submission
  const handleLogin = (credentials: { email: string; password: string }) => {
    let loginUserType: 'admin' | 'user' | null = null;
    
    // Hardcoded credentials check
    if (credentials.email === 'admin@railtel.com' && credentials.password === 'admin123') {
      loginUserType = 'admin';
    } else if (credentials.email === 'user1@railtel.com' && credentials.password === 'user123') {
      loginUserType = 'user';
    } else {
      // Invalid credentials - you can add error handling here
      alert('Invalid credentials. Please try again.');
      return;
    }
    
    const userName = credentials.email.split('@')[0];
    setUserType(loginUserType);
    setIsLoggedIn(true);
    setCurrentUser(userName);
    
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', userName);
    localStorage.setItem('userType', loginUserType);
  };

  // Handle department selection from landing page
  const handleDepartmentAuthentication = (department: string, user: string) => {
    setIsAuthenticated(true);
    setCurrentDepartment(department);
    
    // Store in localStorage for persistence
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('department', department);
  };

  const handleLogout = () => {
    // Reset all authentication states
    setIsLoggedIn(false);
    setIsAuthenticated(false);
    setCurrentDepartment('');
    setCurrentUser('');
    setUserType(null);
    
    // Clear localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('department');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    
    // Reset other states
    setSelectedConversation(null);
    setIsSearchOpen(false);
    setSearchResults(null);
  };

  const handleTogglePDFViewer = () => {
    setIsPDFViewerOpen(!isPDFViewerOpen);
  };

  const handleToggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchResults(null);
    }
  };

  const handleSearch = (results: any[], api: ApiType, query: string) => {
    setSearchResults(results);
    setSelectedApi(api);
    setSearchQuery(query);
    setIsSearchOpen(true);
  };

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleConversationUpdated = () => {
    setRefreshCounter(prev => prev + 1);
  };

  // Step 1: Show login form if not logged in
  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Step 2: Show appropriate landing page based on user type
  if (!isAuthenticated) {
    return userType === 'admin' 
      ? <AdminLandingPage onAuthenticated={handleDepartmentAuthentication} />
      : <LandingPage onAuthenticated={handleDepartmentAuthentication} />;
  }

  // Step 3: Show main application if both logged in and department selected
  const leftSidebarWidth = isSidebarCollapsed ? 60 : 300;
  const rightSidebarWidth = 76;

  // Update mockUser with current user info
  const authenticatedUser = {
    name: currentUser,
    email: `${currentUser}@railtel.com`,
    avatarUrl: '/placeholder.svg',
    department: currentDepartment
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      return (
      {userType === 'admin' ? (
        <Navbar_admin
          user={authenticatedUser}
          onLogout={handleLogout}
          department={currentDepartment}
        />
      ) : (
        <Navbar
          user={authenticatedUser}
          onLogout={handleLogout}
          department={currentDepartment}
        />
      )}

      <Box
        sx={{
          backgroundColor: 'aliceblue',
          display: 'flex',
          flexGrow: 1,
          pt: '64px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {!isSearchOpen && (
          <LeftSidebar
            onSelectConversation={setSelectedConversation}
            selectedConversation={selectedConversation}
            isCollapsed={isSidebarCollapsed}
            onCollapseChange={handleSidebarCollapse}
            refreshTrigger={refreshCounter}
          />
        )}
        <Box
          component="main"
          sx={{
            position: 'fixed',
            left: isSearchOpen ? 0 : leftSidebarWidth,
            right: rightSidebarWidth,
            top: '64px',
            bottom: 0,
            transition: 'left 0.3s ease-in-out',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '1700px',
              mx: 'auto',
              position: 'relative',
            }}
          >
            {isSearchOpen ? (
              searchResults ? (
                <SearchResults 
                  results={searchResults} 
                  api={selectedApi}
                  query={searchQuery}
                  onSearch={handleSearch}
                />
              ) : (
                <SearchLanding onSearch={handleSearch} />
              )
            ) : (
              // Conditional rendering based on user type
              userType === 'admin' ? (
                <ChatAreaAdmin
                  conversationId={selectedConversation}
                  onTogglePDFViewer={handleTogglePDFViewer}
                  isPDFViewerOpen={isPDFViewerOpen}
                  isCollapsed={isSidebarCollapsed}
                  onCollapseChange={handleSidebarCollapse}
                  onContextChange={setCurrentContext}
                  onSelectConversation={setSelectedConversation}
                  onConversationUpdated={handleConversationUpdated}
                  updateConversationList={() => setRefreshCounter(prev => prev + 1)}
                />
              ) : (
                <ChatArea
                  conversationId={selectedConversation}
                  onTogglePDFViewer={handleTogglePDFViewer}
                  isPDFViewerOpen={isPDFViewerOpen}
                  isCollapsed={isSidebarCollapsed}
                  onCollapseChange={handleSidebarCollapse}
                  onContextChange={setCurrentContext}
                  onSelectConversation={setSelectedConversation}
                  onConversationUpdated={handleConversationUpdated}
                  updateConversationList={() => setRefreshCounter(prev => prev + 1)}
                />
              )
            )}
          </Box>
        </Box>
        {/* <RightSidebar
          messages={messages}
          currentContext={selectedConversation || ''}
          onContextChange={setSelectedConversation}
          onTogglePDFViewer={handleTogglePDFViewer}
          isPDFViewerOpen={isPDFViewerOpen}
          onToggleSearch={handleToggleSearch}
          isSearchOpen={isSearchOpen}
        /> */}
      </Box>
    </Box>
  );
}