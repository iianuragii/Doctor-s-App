import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Button,
  Avatar, Container, Grid, useMediaQuery, useTheme,
  Drawer, List, ListItem, ListItemText, Accordion,
  AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import background1 from '../../assets/background1.png';
import background2 from '../../assets/background2.png';
import background3 from '../../assets/background3.png';
import About from './About';

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
    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)',
    fontFamily: 'Inter, sans-serif',
  };

  const handleAppointmentClick = () => {
    navigate('/appointment');
  };

  const animations = {
    fadeIn: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    },
    slideIn: {
      hidden: { x: '-100vw' },
      visible: { x: 0, transition: { type: 'spring', stiffness: 50, damping: 20 } },
    },
    zoomIn: {
      hidden: { scale: 0 },
      visible: { scale: 1, transition: { duration: 0.8 } },
    },
    rotateIn: {
      hidden: { rotate: 90, opacity: 0 },
      visible: { rotate: 0, opacity: 1, transition: { duration: 1 } },
    },
    bounceIn: {
      hidden: { y: -100, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300 } },
    },
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

      {/* Parallax Sections with Animations */}
      <Box id="home" sx={parallaxStyles(background2)}>
        <Container sx={{ textAlign: 'center', py: isMobile ? 5 : 10 }}>
        <motion.div initial="hidden" animate="visible" variants={animations.zoomIn}>
        <Typography
          variant={isMobile ? 'h4' : 'h2'}
          color="white"
          gutterBottom
          sx={{ fontWeight: 'bold', ...textStyles, borderBottom: '2px solid white' }}
        >
          Welcome to Your Health Dashboard
        </Typography>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={animations.zoomIn}>
        <Typography variant="h6" color="white" sx={textStyles}>
          Book Appointments and Manage Health Effortlessly
        </Typography>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={animations.zoomIn}>
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 5 }}>
          <Grid item xs={6} sm={4}>
            <Avatar src={background1} variant="rounded" sx={{ width: '100%', height: '100%' }} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Avatar src={background3} variant="rounded" sx={{ width: '100%', height: '100%' }} />
          </Grid>
        </Grid>
      </motion.div>

        </Container>
      </Box>

      <Box id="about">
          <About/>
      </Box>

      <Box id="appointment" sx={parallaxStyles(background3)}>
        <Container sx={{ textAlign: 'center', py: isMobile ? 5 : 16 }}>
        <motion.div initial="hidden" animate="visible" variants={animations.slideIn}>
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              color="white"
              gutterBottom
              sx={{ fontWeight: 'bold', ...textStyles, borderBottom: '2px solid white' }}
            >
              Book an Appointment
            </Typography>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={animations.slideIn}>
            <Typography variant="h6" color="white" sx={textStyles}>
              Easy scheduling at your fingertips
            </Typography>
          </motion.div>
        </Container>
        <Button
          sx={{
            px: 4,
            py:2,
            backgroundColor: '#00796B',
            color: 'white',
            display: 'block',
            margin: '20px auto',
            textAlign: 'center',
            borderRadius: 2,
            '&:hover': {
              backgroundColor: '#00574B',
            },
          }}
          onClick={handleAppointmentClick}
        >
          Book Your Appointment Now
        </Button>
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

