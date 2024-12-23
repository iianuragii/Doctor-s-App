import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleAppointmentClick = () => {
    navigate('/appointment');
  };

  const navItems = ['Home', 'About', 'Appointment', 'Hospitals', 'Sign Out'];

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#036c5f' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              fontWeight: 'bold',
              display: { xs: 'block' },
            }}
          >
            DoctorG
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((section) => {
              if (section === 'Sign Out') {
                return (
                  <Button
                    key={section}
                    color="inherit"
                    onClick={handleSignOut}
                    sx={{
                      fontSize: '1rem',
                      marginRight: '1rem',
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                    }}
                  >
                    {section}
                  </Button>
                );
              } else if (section === 'Appointment') {
                return (
                  <Button
                    key={section}
                    color="inherit"
                    onClick={handleAppointmentClick}
                    sx={{
                      fontSize: '1rem',
                      marginRight: '1rem',
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                    }}
                  >
                    {section}
                  </Button>
                );
              }
              return (
                <Button
                  key={section}
                  color="inherit"
                  sx={{
                    fontSize: '1rem',
                    marginRight: '1rem',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                  }}
                >
                  <Link
                    to={section.toLowerCase()}
                    smooth
                    duration={500}
                    style={{ color: '#ffffff' }}
                  >
                    {section}
                  </Link>
                </Button>
              );
            })}
          </Box>

          {/* Mobile Hamburger Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={toggleDrawer(true)}
              sx={{ marginRight: 1 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile View */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '',
            color: '#00239C',
            width: 250,
            border: 'none',
            boxShadow: '4px 0 15px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease',
          },
        }}
      >
        <List>
          {navItems.map((section) =>
            section === 'Sign Out' ? (
              <ListItem
                button
                key={section}
                onClick={() => {
                  handleSignOut();
                  toggleDrawer(false)();
                }}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                  },
                }}
              >
                <ListItemText
                  primary={section}
                  primaryTypographyProps={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: '#28a99e',
                  }}
                />
              </ListItem>
            ) : section === 'Appointment' ? (
              <ListItem
                button
                key={section}
                onClick={() => {
                  handleAppointmentClick();
                  toggleDrawer(false)();
                }} // Navigate and close drawer
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                  },
                }}
              >
                <ListItemText
                  primary={section}
                  primaryTypographyProps={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: '#28a99e',
                  }}
                />
              </ListItem>
            ) : (
              <ListItem
                button
                key={section}
                onClick={toggleDrawer(false)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                  },
                }}
              >
                <Link
                  to={section.toLowerCase()}
                  smooth
                  duration={500}
                  style={{
                    textDecoration: 'none',
                    color: '#28a99e',
                  }}
                >
                  <ListItemText
                    primary={section}
                    primaryTypographyProps={{
                      fontSize: '1.2rem',
                      fontWeight: '600',
                    }}
                  />
                </Link>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
