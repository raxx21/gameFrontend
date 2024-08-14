import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, Button, Snackbar, Alert } from '@mui/material';
import { createGame } from '../api/gameApi';

interface GameAttributes {
  firstReleaseDate: string;
  name: string;
  rating: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<GameAttributes>({
    firstReleaseDate: '',
    name: '',
    rating: '',
    summary: '',
    createdAt: '',
    updatedAt: '',
    publishedAt: ''
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = () => {
    const localDate = new Date();
    const isoDate = localDate.toISOString();
    setFormData({
      ...formData,
      createdAt: isoDate,
      updatedAt: isoDate,
      publishedAt: isoDate,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!formData.name || !formData.rating || !formData.firstReleaseDate || !formData.summary) {
      setSnackbarMessage('Please fill in all required fields.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    handleDateChange();
    
    try {
      await createGame(formData);
      setSnackbarMessage('Game created successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('Something went wrong!');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
      setFormData({
        firstReleaseDate: '',
        name: '',
        rating: '',
        summary: '',
        createdAt: '',
        updatedAt: '',
        publishedAt: ''
      });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', color: '#fff', p: 4 }}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          GET IN TOUCH
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ maxWidth: '500px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent suscipit ultrices magna, nec aliquam augue facilisis non.
        </Typography>
        <Box sx={{ mt: 4, backgroundColor: '#2A2A3D', p: 3, borderRadius: 1, maxWidth: '500px' }}>
          <Typography variant="h6" gutterBottom>
            Contact Form
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="outlined"
                name='name'
                fullWidth
                sx={{ backgroundColor: '#182c47' }}
                InputLabelProps={{ style: { color: '#B2B2B2' } }}
                inputProps={{ style: { color: '#fff' } }}
                onChange={handleChange}
                value={formData.name}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Rating"
                variant="outlined"
                name='rating'
                type='number'
                fullWidth
                sx={{ backgroundColor: '#182c47' }}
                InputLabelProps={{ style: { color: '#B2B2B2' } }}
                inputProps={{ style: { color: '#fff' } }}
                onChange={handleChange}
                value={formData.rating}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Release Date"
                variant="outlined"
                name='firstReleaseDate'
                type='date'
                fullWidth
                sx={{ backgroundColor: '#182c47' }}
                InputLabelProps={{ style: { color: '#B2B2B2' } }}
                inputProps={{ style: { color: '#fff' } }}
                onChange={handleChange}
                value={formData.firstReleaseDate}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Summary"
                variant="outlined"
                fullWidth
                name='summary'
                multiline
                rows={4}
                sx={{ backgroundColor: '#182c47' }}
                InputLabelProps={{ style: { color: '#B2B2B2' } }}
                inputProps={{ style: { color: '#fff' } }}
                onChange={handleChange}
                value={formData.summary}
                required
              />
            </Grid>
          </Grid>
          <Button variant="contained" onClick={handleSubmit} color="primary" sx={{ mt: 2 }}>
            Send
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;
