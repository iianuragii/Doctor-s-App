import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, IconButton, Box, Button, 
  Avatar, Container, Grid, useMediaQuery, useTheme, 
  Drawer, List, ListItem, ListItemText 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 
import { Link as ScrollLink } from 'react-scroll'; 
import { useNavigate } from 'react-router-dom';
import background1 from '../../assets/background1.png';
import background2 from '../../assets/background2.png';
import background3 from '../../assets/background3.png';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const parallaxStyles = (bgImage) => ({
    backgroundImage: `url(${bgImage})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '100vh',
    fontFamily: 'Inter, sans-serif',
  });

  const textStyles = {
    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)', // Adds shadow for better readability
    fontFamily: 'Inter, sans-serif',
  };

  const handleAppointmentClick = () => {
    navigate('/appointment');
  };

  return (
    <Box>
      <AppBar position="sticky" sx={{ backgroundColor: '#00796B' }}>
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1, ...textStyles }}>
            DoctorG
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit">
                <ScrollLink to="home" smooth={true} duration={500}>
                  Home
                </ScrollLink>
              </Button>
              <Button color="inherit">
                <ScrollLink to="about" smooth={true} duration={500}>
                  About
                </ScrollLink>
              </Button>
              <Button color="inherit" onClick={handleAppointmentClick}>
                Appointment
              </Button>
            </Box>
          )}

          <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <List>
              <ListItem button>
                <ScrollLink to="home" smooth={true} duration={500} onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary="Home" />
                </ScrollLink>
              </ListItem>
              <ListItem button>
                <ScrollLink to="about" smooth={true} duration={500} onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary="About" />
                </ScrollLink>
              </ListItem>
              <ListItem button onClick={handleAppointmentClick}>
                <ListItemText primary="Appointment" />
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>

      {/* Parallax Sections */}
      <Box id="home" sx={parallaxStyles(background2)}>
        <Container sx={{ textAlign: 'center', py: isMobile ? 5 : 10 }}>
          <Typography
            variant={isMobile ? 'h4' : 'h2'}
            color="white"
            gutterBottom
            sx={{ fontWeight: 'bold', ...textStyles, borderBottom: '2px solid white' }}
          >
            Welcome to Your Health Dashboard
          </Typography>
          <Typography variant="h6" color="white" sx={textStyles}>
            Book Appointments and Manage Health Effortlessly
          </Typography>
        </Container>
      </Box>

      <Box
        id="about"
        sx={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(45deg, #F0F4F8 30%, #90E4C1 90%)', 
          py: 10 
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography
                variant={isMobile ? 'h5' : 'h3'}
                align="center"
                gutterBottom
                sx={{ fontWeight: 'bold', color: '#00796B' }}
              >
                About Us
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="center" >
                Our healthcare platform allows patients to seamlessly book appointments with doctors.
                We aim to simplify healthcare management for both doctors and patients.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box id="appointment" sx={parallaxStyles(background3)}>
        <Container sx={{ textAlign: 'center', py: isMobile ? 5 : 16 }}>
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            color="white"
            gutterBottom
            sx={{ fontWeight: 'bold', ...textStyles, borderBottom: '2px solid white' }}
          >
            Book an Appointment
          </Typography>
          <Typography variant="h6" color="white" sx={textStyles}>
            Easy scheduling at your fingertips
          </Typography>
        </Container>
      </Box>

      <Box component="footer" sx={{ backgroundColor: '#00796B', color: 'white', py: 2 }}>
        <Typography variant="body2" align="center" sx={textStyles}>
          © 2024 DoctorG. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
