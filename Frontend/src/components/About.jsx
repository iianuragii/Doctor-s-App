import React from 'react';
import { Container, Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion'; // Importing framer-motion

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
  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', py: 10 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <motion.div initial="hidden" whileInView="visible" variants={animations.fadeIn}>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#00796B' }}
            >
              About Us
            </Typography>
          </motion.div>
        </Grid>

        <Grid item xs={12}>
          <motion.div initial="hidden" whileInView="visible" variants={animations.zoomIn}>
            <Typography
              variant="h4"
              align="center"
              sx={{ fontWeight: 'bold', color: '#00796B', mb: 4 }}
            >
              Frequently Asked Questions
            </Typography>
          </motion.div>

          {faqs.map((faq, index) => (
            <motion.div key={index} initial="hidden" whileInView="visible" variants={animations.zoomIn}>
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{faq}</Typography>
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
  );
};

export default About;
