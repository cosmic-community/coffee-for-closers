'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Chat as ChatIcon,
  Dashboard as DashboardIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'

export default function Header() {
  const { user, logout } = useAuth()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleMenuClose()
  }

  const navigationItems = [
    { label: 'Profiles', href: '/profiles', icon: <PersonIcon /> },
    { label: 'Coffee Chats', href: '/chats', icon: <ChatIcon /> },
  ]

  const authItems = user
    ? [
        { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
        { label: 'Logout', onClick: handleLogout, icon: <LogoutIcon /> },
      ]
    : [
        { label: 'Login', href: '/login', icon: <LoginIcon /> },
        { label: 'Sign Up', href: '/signup', icon: <PersonAddIcon /> },
      ]

  const renderDesktopMenu = () => (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
      {navigationItems.map((item) => (
        <Button
          key={item.label}
          color="inherit"
          component={Link}
          href={item.href}
          startIcon={item.icon}
          sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
        >
          {item.label}
        </Button>
      ))}
      
      {user ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            onClick={handleProfileMenuOpen}
            sx={{ color: 'white' }}
          >
            <Avatar
              src={user.metadata.profile_image?.imgix_url}
              alt={user.metadata.display_name}
              sx={{ width: 32, height: 32 }}
            >
              {user.metadata.display_name.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem component={Link} href="/dashboard">
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Dashboard
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            component={Link}
            href="/login"
            startIcon={<LoginIcon />}
            sx={{ color: 'white' }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            href="/signup"
            startIcon={<PersonAddIcon />}
            sx={{ 
              backgroundColor: 'white',
              color: theme.palette.primary.main,
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
            }}
          >
            Sign Up
          </Button>
        </Box>
      )}
    </Box>
  )

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
    >
      <List sx={{ width: 250, pt: 2 }}>
        {navigationItems.map((item) => (
          <ListItem
            key={item.label}
            button
            component={Link}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        
        {authItems.map((item) => (
          <ListItem
            key={item.label}
            button
            component={item.href ? Link : 'div'}
            href={item.href}
            onClick={() => {
              setMobileMenuOpen(false)
              if (item.onClick) item.onClick()
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ px: { xs: 0 } }}>
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'white',
                fontWeight: 700,
                fontSize: '1.5rem',
              }}
            >
              ☕ Coffee for Closers
            </Typography>

            {isMobile ? (
              <IconButton
                size="large"
                color="inherit"
                onClick={() => setMobileMenuOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              renderDesktopMenu()
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu()}
    </>
  )
}