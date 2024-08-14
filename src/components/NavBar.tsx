import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'start', flexDirection: {xs: 'column', sm: 'column', md: 'row'}, alignItems: 'flex-start', ml: 5}}>
        <Typography sx={{color: "#fff", textDecoration: "none",  mr: 10}} component={Link} to="/" variant="h4" gutterBottom>
        VIDEO GAMES
        </Typography>
        <Typography sx={{color: "#fff", textDecoration: "none"}} component={Link} to="/contact" variant="h4" gutterBottom>
        CONTACT
        </Typography>
    </Box>
  )
}

export default NavBar