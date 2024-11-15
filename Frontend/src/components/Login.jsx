import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  TextField, 
  Typography 
} from '@mui/material';
import { teal } from '@mui/material/colors';
import LoginImage from "../../assets/SignUpImage1.png";

const globalStyles = {
  fontFamily: 'Inter, sans-serif',
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log('Login successful:', data);
        navigate('/dashboard'); // Navigate to the dashboard on successful login
      } else if (response.status === 401) {
        setError('Invalid email or password. Please try again.'); // Display error message
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('Failed to connect to the server.');
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
              src={LoginImage}
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
              Welcome Back to DoctorG
            </Typography>

            <Typography 
              variant="body1" 
              textAlign="center" 
              color={teal[700]} 
              mb={3}
              sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}  
            >
              Log in to continue to your account
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
              onSubmit={handleLoginClick} 
              sx={{ mt: 3 }}
            >
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
                sx={{ mb: 2, fontSize: { xs: '0.85rem', md: '1rem' } }}
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
                Log In
              </Button>

              <Button 
                href="/forgot-password" 
                variant="text" 
                sx={{ 
                  color: teal[600], 
                  mt: 2, 
                  display: 'block', 
                  textAlign: 'center', 
                  fontSize: { xs: '0.85rem', md: '1rem' } 
                }}
              >
                Forgot Password?
              </Button>
            </Box>

            <Typography 
              variant="body2" 
              textAlign="center" 
              mt={2} 
              sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}
            >
              Don't have an account?{' '}
              <Button 
                href="/" 
                variant="text" 
                sx={{ 
                  color: teal[600], 
                  fontWeight: 'bold', 
                  fontSize: { xs: '0.85rem', md: '1rem' } 
                }}
              >
                Sign up
              </Button>
            </Typography>

            <Typography 
              variant="caption" 
              textAlign="center" 
              mt={4} 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', md: '0.85rem' } }}
            >
              By logging in, you agree to our{''}
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

export default Login;
