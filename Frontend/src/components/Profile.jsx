import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, TextField, Button, Avatar, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        age: '30',
        //profilePicture: 'https://www.gravatar.com/avatar/00000000000000000000000000000000', // Replace with a valid Gravatar or use placeholder
        appointmentHistory: [
          { date: '2024-11-01', details: 'Consultation with Dr. Smith' },
          { date: '2024-09-25', details: 'Follow-up appointment with Dr. Brown' },
        ],
      });

  
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const response = await fetch(`/api/user/${userEmail}`); // Example API endpoint
//       const data = await response.json();
//       setUserData(data);
//     };

//     fetchUserData();
//   }, [userEmail]);

  const handleUpdateProfile = () => {
    // Handle updating the profile (API call to update user data)
    alert('Profile updated!');
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          {/* <Avatar 
            alt="User Profile"
            src={userData.profilePicture || 'https://via.placeholder.com/150'} // Default image if no profile picture
            sx={{ width: 150, height: 150, marginBottom: 2 }}
          /> */}
          <Typography variant="h5">{userData.name}</Typography>
          <Typography variant="body1" color="textSecondary">{userData.email}</Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>Profile Details</Typography>

          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={userData.email}
            disabled
            sx={{ mb: 2 }}
          />
          <TextField
            label="Age"
            variant="outlined"
            fullWidth
            value={userData.age}
            onChange={(e) => setUserData({ ...userData, age: e.target.value })}
            sx={{ mb: 2 }}
          />

          <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6">Appointment History</Typography>
            {userData.appointmentHistory.length > 0 ? (
              <ul>
                {userData.appointmentHistory.map((appointment, index) => (
                  <li key={index}>{appointment.date} - {appointment.details}</li>
                ))}
              </ul>
            ) : (
              <Typography>No appointments found.</Typography>
            )}
          </Box>

          <Button variant="contained" onClick={handleUpdateProfile}>Update Profile</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
