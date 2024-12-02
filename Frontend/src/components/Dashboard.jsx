import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion'; 
import CustomCarousel from './CustomCarousel';
import background2 from '../../assets/background2.png';
import background3 from '../../assets/background3.png';
import hospital1 from '../../assets/hospital1.jpg';
import hospital2 from '../../assets/hospital2.jpg';
import hospital3 from '../../assets/hospital3.jpg';
import hospital4 from '../../assets/hospital4.jpg';
import hospital5 from '../../assets/hospital5.jpg';
import hospital6 from '../../assets/hospital6.jpg';
import About from './About';
import Navbar from './Navbar'; 

const Dashboard = () => {
  const theme = useTheme();
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

  return (
    <Box>
      <Navbar />
      <Box id="home" sx={parallaxStyles(background2)}>
        <Container sx={{ textAlign: 'center', py: isMobile ? 5 : 8 }}>
          <motion.div initial="hidden" animate="visible" variants={animations.zoomIn}>
            <Typography
              variant={isMobile ? 'h4' : 'h2'}
              color="#048c74"
              gutterBottom
              sx={{ fontWeight: 'bold', ...textStyles, borderBottom: '2px solid white' }}
            >
              Welcome to Your Health Dashboard
            </Typography>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={animations.zoomIn}>
            <Typography  color="#048c74" sx={{ fontSize: isMobile?"0.7rem":"2rem"}}>
              Book Appointments and Manage Health Effortlessly
            </Typography>
          </motion.div>

           {/* Custom Carousel */}
           <Box sx={{ marginTop: '32px', textAlign: 'center' }}>
              <Typography
                color="#048c74"
                sx={{
                  fontWeight: 'semibold',
                  fontSize: isMobile?"1rem": "1.7rem",
                  marginBottom: '16px', 
                }}
              >
                Partnered Hospitals
              </Typography>

              <CustomCarousel images={images} />
            </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Box id="about" sx={{ paddingTop: '0px' }}>
        <About />
      </Box>

      {/* Appointment Section */}
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
      </Box>

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

