import React from 'react';
import { Container, Box, Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion'; // Importing framer-motion
import { useMediaQuery, useTheme } from '@mui/material'; // Importing useMediaQuery for responsiveness

const animations = {
  fadeIn: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  },
  zoomIn: {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.8 } },
  },
};

const faqs = [
  'What services do you offer?',
  'How can I book an appointment?',
  'What is the cancellation policy?',
  'Do you offer teleconsultations?',
  'How do I contact customer support?',
];

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

return (
<Container maxWidth="md" sx={{ minHeight: '100vh', py: isMobile ? 5 : 10 }}>
  <Grid container spacing={4}>
    <Grid item xs={12}>
      <motion.div initial="hidden" whileInView="visible" variants={animations.fadeIn}>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#00796B' }}
        >
          About the Platform
        </Typography>
      </motion.div>
    </Grid>

    <Grid item xs={12}>
      {/* <motion.div initial="hidden" whileInView="visible" variants={animations.zoomIn}>
        <Typography
          variant={isMobile ? 'h6' : 'h4'}
          align="center"
          sx={{ fontWeight: 'bold', color: '#00796B', mb: 4 }}
        >
          Key Features
        </Typography>
      </motion.div> */}
    </Grid>

    <Grid container spacing={4} justifyContent="center" alignItems="stretch">
      {/* Feature 1 */}
      <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
        <motion.div initial="hidden" whileInView="visible" variants={animations.zoomIn} style={{ width: '100%' }}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              textAlign: 'center',
              backgroundColor: '#E0F2F1',
              color: '#004D40',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#B2DFDB',
                transform: 'scale(1.05)',
                cursor: 'pointer',
              },
            }}
          >
            <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 'bold' }}>
              Seamless Booking
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Easily book appointments through our app or website with just a few clicks.
            </Typography>
          </Box>
        </motion.div>
      </Grid>

      {/* Feature 2 */}
      <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
        <motion.div initial="hidden" whileInView="visible" variants={animations.zoomIn} style={{ width: '100%' }}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              textAlign: 'center',
              backgroundColor: '#E0F2F1',
              color: '#004D40',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#B2DFDB',
                transform: 'scale(1.05)',
                cursor: 'pointer',
              },
            }}
          >
            <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 'bold' }}>
              Teleconsultations
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Consult with medical experts from the comfort of your home.
            </Typography>
          </Box>
        </motion.div>
      </Grid>

      {/* Feature 3 */}
      <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
        <motion.div initial="hidden" whileInView="visible" variants={animations.zoomIn} style={{ width: '100%' }}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              textAlign: 'center',
              backgroundColor: '#E0F2F1',
              color: '#004D40',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#B2DFDB',
                transform: 'scale(1.05)',
                cursor: 'pointer',
              },
            }}
          >
            <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 'bold' }}>
              Dedicated Support
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Our team is here to assist you via helpline or our Contact Us page.
            </Typography>
          </Box>
        </motion.div>
      </Grid>
    </Grid>
  </Grid>
  <Container maxWidth="md" sx={{ minHeight: '100vh', py: isMobile ? 5 : 10 }}> 
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <motion.div initial="hidden" whileInView="visible" variants={animations.fadeIn}>
            <Typography
              variant={isMobile ? 'h4' : 'h3'} 
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#00796B' }}
            >
            Frequently Asked Questions
            </Typography>
          </motion.div>
        </Grid>

        <Grid item xs={12}>
          {/* <motion.div initial="hidden" whileInView="visible" variants={animations.zoomIn}>
            <Typography
              variant={isMobile ? 'h6' : 'h4'} 
              align="center"
              sx={{ fontWeight: 'bold', color: '#00796B', mb: 4 }}
            >
            </Typography>
          </motion.div> */}

          {faqs.map((faq, index) => (
            <motion.div key={index} initial="hidden" whileInView="visible" variants={animations.zoomIn}>
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant={isMobile ? 'body1' : 'h6'}>{faq}</Typography> 
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {faq === 'What services do you offer?' &&
                      'We offer appointment booking, teleconsultations, and health management tools.'}
                    {faq === 'How can I book an appointment?' &&
                      'You can book an appointment through our app or website by navigating to the appointment section.'}
                    {faq === 'What is the cancellation policy?' &&
                      'Appointments can be canceled up to 24 hours before the scheduled time without any charge.'}
                    {faq === 'Do you offer teleconsultations?' &&
                      'Yes, we offer teleconsultations for specific health issues. Check with your doctor if eligible.'}
                    {faq === 'How do I contact customer support?' &&
                      'You can reach out to our support team via the Contact Us page or call our helpline.'}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Grid>
      </Grid>
    </Container>
</Container>

  );
};

export default About;
