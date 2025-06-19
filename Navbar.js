import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SportsCricketIcon sx={{ display: 'flex', mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LIVE CRICKET SCORES
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
