import React, { useState } from 'react';
import {
  Box,Typography,Button,Container,useMediaQuery,Avatar,useTheme,} from '@mui/material';
import { motion } from 'framer-motion'; 
import CustomCarousel from './CustomCarousel';
import background2 from '../../assets/background2.png';
import background3 from '../../assets/background3.png';
import hospital1 from '../../assets/hospital1.jpg';
import hospital2 from '../../assets/hospital2.jpg';
import hospital3 from '../../assets/hospital3.jpg';
import { useNavigate } from 'react-router-dom';
import hospital4 from '../../assets/hospital4.jpg';
import hospital5 from '../../assets/hospital5.jpg';
import hospital6 from '../../assets/hospital6.jpg';
import removeBackground from '../../assets/removed-background.png';
import About from './About';
import Navbar from './Navbar'; 

const Dashboard = () => {
  const theme = useTheme();
  const navigate= useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const appBarHeight = isMobile ? 56 : 48; 

  const parallaxStyles = (bgImage) => ({
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: `calc(100vh - ${appBarHeight}px)`, 
    fontFamily: 'Inter, sans-serif',
    paddingTop: `${appBarHeight}px`, 
  });

  const textStyles = {
    //textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)',
    fontFamily: 'Inter, sans-serif',
  };

  const animations = {
    zoomIn: {
      hidden: { scale: 0 },
      visible: { scale: 1, transition: { duration: 0.8 } },
    },
    slideIn: {
      hidden: { x: '-100vw' },
      visible: { x: 0, transition: { type: 'spring', stiffness: 50, damping: 20 } },
    },
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const images = [
    hospital1,
    hospital2,
    hospital3,
    hospital4,
    hospital5,
    hospital6,
  ];

  const handleButtonClick = () => {
    navigate('/appointment'); 
  };

  return (
    <Box>
      <Navbar />
      <Box
      id="home"
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      alignItems="center"
      justifyContent="space-between"
      minHeight="100vh"
      sx={{ 
        backgroundSize: { xs: 'cover', md: 'contain' },
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
        overflowX: 'hidden',
        overflowY: 'hidden',
        fontFamily: 'Inter, sans-serif',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        backdropFilter: { md: 'blur(5px)' }, 
      }}
    >
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        alignItems={{ xs: 'center', md: 'flex-start' }}
        textAlign={{ xs: 'center', md: 'left' }}
        sx={{
          maxWidth: { xs: '100%', md: '50%' },
          p: { xs: 2, md: 10 },
          marginTop: { xs: 8, md: 0 },
        }}
      >

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.7rem', md: '4.8rem' },
              color: '#048c74',
              fontWeight: {xs:'800',md: '800'},
              maxWidth: '450px',
              fontFamily: 'Inter, sans-serif',
              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.4)',
              letterSpacing: '1.5px',
              lineHeight: 1.3,
            }}
          >
            Welcome to Your Health Dashboard
            {/* <Box component="span" sx={{ color: '#00239C' }}> for Your Little Treasure</Box> */}
          </Typography>
        </motion.div>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }} 
          justifyContent="center" 
          alignItems="center" 
          sx={{ mt: 3 }} 
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5 }}
          >
            <Button
              variant="contained"
              onClick={handleButtonClick}
              sx={{
                backgroundColor: '#00796B',
                fontWeight: 'bold',
                padding: { xs: '0.6rem 1.5rem', md: '0.8rem 2rem' },
                fontSize: { xs: '1rem', md: '1.1rem' },
                borderRadius: '30px',
                marginBottom: { xs: '1rem', md: '0' }, 
                marginRight: { md: '1rem' }, 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s',
                '&:hover': {
                  backgroundColor: '#ffffff',
                  color: '#00239C',
                  transform: 'scale(1.05)',
                },
              }}
            >
              Book Appointment Now
            </Button>

            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: '#00796B',
                fontWeight: 'bold',
                padding: { xs: '0.6rem 1.5rem', md: '0.8rem 2rem' },
                fontSize: { xs: '1rem', md: '1.1rem' },
                borderRadius: '30px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s',
                '&:hover': {
                  backgroundColor: '#ffffff',
                  color: '#00239C',
                  transform: 'scale(1.05)',
                },
              }}
            >
              Visit Hospitals
            </Button>
          </motion.div>
        </Box>
      </Box>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 1 }}
        style={{ flex: '1', display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <Avatar
          src={removeBackground}
          alt="Doctor"
          sx={{
            width: { xs: 300, md: 420 },
            height: { xs: 300, md: 420 },
            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
            border: '4px solid white',
          }}
        />
        <Box
              sx={{
              padding: '8px 16px',
              borderRadius: '20px',
              marginTop:'16px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',              
              }}
          > 
              <Typography
              variant="h4"
              sx={{
                  color: '#00796B',
                  fontWeight: 'bold',
                  
                  display: { xs: '', md: 'block' },
                  textAlign: 'center',
                  fontSize: { xs: '0.7rem', md: '1.2rem' },
                  fontFamily: 'Inter, sans-serif',
              }}
              >
              Book Appointments and Manage Health Effortlessly
              </Typography>
          </Box>  
      </motion.div>
    </Box>

      {/* About Platform Section */}
      <Box id="about" sx={{ paddingTop: '0px' }}>
        <About />
      </Box>
      
      {/* Appointment Section */}
      {/* <Box id="appointment" sx={parallaxStyles(background3)}>
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
            py: 2,
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
        >
          Book Your Appointment Now
        </Button>
      </Box> */}

      {/* Footer */}
      <Box component="footer" sx={{ backgroundColor: '#00796B', color: 'white', py: 2 }}>
        <Typography variant="body2" align="center" sx={textStyles}>
          © 2024 DoctorG. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;

