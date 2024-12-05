import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import axios from 'axios';

const AppointmentPage = () => {
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await axios.get('http://localhost:4000/output'); // Replace with your API endpoint
        setAppointmentDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch appointment details');
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, []);

  if (loading) {
    return (
      <Typography variant="h6" align="center">
        Loading appointment details...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Appointment Details
      </Typography>

      {/* Patient Details Section */}
      <Typography variant="h6" gutterBottom>
        Patient Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              border: '1px solid #ccc',
              padding: 2,
              borderRadius: '8px',
              marginBottom: 2,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Name: <span style={{ fontWeight: 'normal' }}>{appointmentDetails?.patientName}</span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              border: '1px solid #ccc',
              padding: 2,
              borderRadius: '8px',
              marginBottom: 2,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Age: <span style={{ fontWeight: 'normal' }}>{appointmentDetails?.patientAge}</span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              border: '1px solid #ccc',
              padding: 2,
              borderRadius: '8px',
              marginBottom: 2,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Gender: <span style={{ fontWeight: 'normal' }}>{appointmentDetails?.patientGender}</span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              border: '1px solid #ccc',
              padding: 2,
              borderRadius: '8px',
              marginBottom: 2,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Contact Number: <span style={{ fontWeight: 'normal' }}>{appointmentDetails?.patientContact}</span>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Doctor Details Section */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
        Doctor Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              border: '1px solid #ccc',
              padding: 2,
              borderRadius: '8px',
              marginBottom: 2,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Doctor Name: <span style={{ fontWeight: 'normal' }}>{appointmentDetails?.doctorName}</span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              border: '1px solid #ccc',
              padding: 2,
              borderRadius: '8px',
              marginBottom: 2,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Designation: <span style={{ fontWeight: 'normal' }}>{appointmentDetails?.designation}</span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              border: '1px solid #ccc',
              padding: 2,
              borderRadius: '8px',
              marginBottom: 2,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Department: <span style={{ fontWeight: 'normal' }}>{appointmentDetails?.dept}</span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              border: '1px solid #ccc',
              padding: 2,
              borderRadius: '8px',
              marginBottom: 2,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Allocation Date: <span style={{ fontWeight: 'normal' }}>{appointmentDetails?.allocationDate}</span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              border: '1px solid #ccc',
              padding: 2,
              borderRadius: '8px',
              marginBottom: 2,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Allocation Time: <span style={{ fontWeight: 'normal' }}>{appointmentDetails?.allocationTime}</span>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Box sx={{ marginTop: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
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
          Confirm Appointment
        </Button>
      </Box>
    </Box>
  );
};

export default AppointmentPage;
