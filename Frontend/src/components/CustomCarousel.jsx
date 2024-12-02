import React, { useState } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const CustomCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLaptop = useMediaQuery(theme.breakpoints.up('md')); // Media query for larger screens (laptops)

  // Adjust the width based on the screen size (1 for mobile, 3 for laptop and larger)
  const getSlideWidth = () => {
    if (isLaptop) return 33.33; // 3 images per slide for laptop and larger screens
    return 100; // 1 image per slide for mobile
  };

  const handleNext = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0); // Reset to first image after reaching the last
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1); // Go to the last image if on the first
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: isMobile ? '300px' : isLaptop ? '800px' : '450px', // Adjust width for laptop
        margin: '0 auto',
        overflow: 'hidden',
        borderRadius: '10px',
      }}
    >
      {/* Image Display */}
      <Box
        sx={{
          display: 'flex',
          transform: `translateX(-${currentIndex * getSlideWidth()}%)`,
          transition: 'transform 0.5s ease',
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              minWidth: `${100 / (isLaptop ? 3 : 1)}%`, // For laptop, divide by 3 for 3 images
              height: '300px',
              marginRight: isLaptop ? '15px' : '0',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ))}
        {/* To ensure circular effect, append the first few images at the end */}
        {images.slice(0, 1).map((image, index) => (
          <Box
            key={images.length + index} // Make sure the key is unique
            sx={{
              minWidth: `${100 / (isLaptop ? 3 : 1)}%`,
              height: '300px',
              marginRight: isLaptop ? '15px' : '0',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ))}
      </Box>

      {/* Navigation Buttons */}
      <IconButton
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default CustomCarousel;
