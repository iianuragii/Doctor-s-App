import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  TextField, 
  Typography 
} from '@mui/material';
import { teal } from '@mui/material/colors';
import SignUpImage2 from "../../assets/SignUpImage2.png";
import jwt_decode from 'jwt-decode';

const globalStyles = {
  fontFamily: 'Inter, sans-serif',
};

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', role: 'Patient' });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSignUpClick = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch('http://localhost:4000/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();     

  //     console.log('Signup successful:', data);
  //     navigate('/dashboard'); 
  //   } catch (err) {
  //     console.error('Network error:', err);
  //     setError('Failed to connect to the server.');
  //   }
  // };
  // const handleSignUpClick = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const response = await fetch('http://localhost:4000/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  
  //     const data = await response.json();
  
  //     console.log('Signup successful:', data);
  
  //     // Use switch case to navigate based on role
  //     switch (formData.role) {
  //       case 'Patient':
  //         navigate('/dashboard');
  //         break;
  //       case 'Hospital':
  //         navigate('/hospital');
  //         break;
  //       default:
  //         setError('Invalid role selected');
  //     }
  //   } catch (err) {
  //     console.error('Network error:', err);
  //     setError('Failed to connect to the server.');
  //   }
  // };
  // const handleSignUpClick = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const response = await fetch('http://localhost:4000/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  
  //     const data = await response.json();
  
  //     if (response.ok) {
  //       console.log('Signup successful:', data);
  //       console.log('Server Response:', data);

  
  //       // Store the token in localStorage
  //       if (data.token) {
  //         localStorage.setItem('token', data.token);
  //         console.log("token",decodedToken);
  
  //         // Decode the token to get user details
  //         const decodedToken = jwt_decode(data.token);
  //         console.log('Decoded Token:', decodedToken);
  //       }
  
  //       // Navigate based on role
  //       switch (formData.role) {
  //         case 'Patient':
  //           navigate('/dashboard');
  //           break;
  //         case 'Hospital':
  //           navigate('/hospital');
  //           break;
  //         default:
  //           setError('Invalid role selected');
  //       }
  //     } else {
  //       setError(data.message || 'Signup failed');
  //     }
  //   } catch (err) {
  //     console.error('Network error:', err);
  //     setError('Failed to connect to the server.');
  //   }
  // };
  const handleSignUpClick = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);
  
        // Store the JWT token in localStorage
        if (data.token) {
          localStorage.setItem('token', data.token);
  
          // Decode the token to get user details (optional)
          const decodedToken = jwt_decode(data.token);
          console.log('Decoded Token:', decodedToken);
  
          // Check if the token is valid
          if (isTokenExpired(data.token)) {
            setError('Your session has expired. Please sign up again.');
            localStorage.removeItem('token');
            return;
          }
  
          // Navigate to the dashboard directly upon successful signup
          navigate('/dashboard');
        } else {
          setError('No token received. Please contact support.');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('Failed to connect to the server.');
    }
  };
  
  // Function to check if the token is expired
  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwt_decode(token);
      if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
        return true; // Token is expired
      }
      return false; // Token is valid
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // Treat any error as expired
    }
  };
  

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        ...globalStyles 
      }}
    >
      <Paper elevation={8} sx={{ borderRadius: 3, overflow: 'hidden', width: '100%' }}>
        <Grid container>
          <Grid item 
            xs={12} 
            md={6} 
            sx={{ 
              display: { xs: 'none', md: 'block' }, 
              alignSelf: 'flex-start', 
              overflow: 'hidden',
              p: 2, 
              mt: -4,
            }}
          >
            <Box
              component="img"
              src={SignUpImage2}
              alt="Doctor Consultation"
              sx={{ 
                width: '115%',  
                height: '115%', 
                objectFit: 'cover' 
              }}
            />
          </Grid>

          <Grid 
            item 
            xs={12} 
            md={6} 
            sx={{ 
              p: { xs: 2, md: 4 }, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center' 
            }}
          >
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              textAlign="center" 
              color={teal[700]} 
              gutterBottom
              sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}  
            >
              Welcome to DoctorG
            </Typography>

            <Typography 
              variant="body1" 
              textAlign="center" 
              color={teal[700]} 
              mb={3}
              sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}  
            >
              Sign up to get personalized healthcare services!
            </Typography>

            {error && (
              <Typography 
                variant="body2" 
                color="error" 
                textAlign="center" 
                mb={2}
              >
                {error}
              </Typography>
            )}

            <Box 
              component="form" 
              onSubmit={handleSignUpClick} 
              sx={{ mt: 3 }}
            >
              <Typography 
                variant="body2" 
                color="text.secondary" 
                textAlign="center" 
                mb={2}
              >
                Sign up as:
              </Typography>

              <RadioGroup
                row
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                sx={{ mb: 3, justifyContent: 'center' }}
              >
                <FormControlLabel 
                  value="Patient" 
                  control={<Radio color="primary" />} 
                  label="Patient" 
                />
                <FormControlLabel 
                  value="Hospital" 
                  control={<Radio color="primary" />} 
                  label="Hospital" 
                />
              </RadioGroup>

              <TextField
                label="Email Address"
                type="email"
                name="email"
                variant="outlined"
                fullWidth
                required
                value={formData.email}
                onChange={handleInputChange}
                sx={{ mb: 2, fontSize: { xs: '0.85rem', md: '1rem' } }}
              />

              <TextField
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                fullWidth
                required
                value={formData.password}
                onChange={handleInputChange}
                sx={{ mb: 4, fontSize: { xs: '0.85rem', md: '1rem' } }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: teal[600],
                  '&:hover': { backgroundColor: teal[800] },
                  py: { xs: 1, md: 1.5 },
                  fontSize: { xs: '1rem', md: '1.1rem' },
                }}
              >
                Sign Up
              </Button>
            </Box>

            <Typography 
              variant="body2" 
              textAlign="center" 
              mt={2} 
              sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}
            >
              Already have an account?{' '}
              <Button 
                href="/login" 
                variant="text" 
                sx={{ 
                  color: teal[600], 
                  fontWeight: 'bold', 
                  fontSize: { xs: '0.85rem', md: '1rem' } 
                }}
              >
                Log in
              </Button>
            </Typography>

            <Typography 
              variant="caption" 
              textAlign="center" 
              mt={4} 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', md: '0.85rem' } }}
            >
              By signing up, you agree to our{''}
              <Button 
                href="/terms" 
                variant="text" 
                sx={{ 
                  color: teal[500], 
                  textTransform: 'none',
                  fontSize: { xs: '0.75rem', md: '0.85rem' }
                }}
              >
                Terms & Conditions
              </Button>.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Signup;
