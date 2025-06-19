import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import axios from 'axios';

const MatchDetails = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await axios.get(`/api/match/${id}`);
        setMatch(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch match details');
        setLoading(false);
      }
    };

    fetchMatchDetails();
    const interval = setInterval(fetchMatchDetails, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!match) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">Match not found</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {match.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {match.status}
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {match.teams?.[0]}
                </Typography>
                {match.score?.[match.teams?.[0]] && (
                  <Typography variant="body1">
                    Score: {match.score[match.teams[0]]}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {match.teams?.[1]}
                </Typography>
                {match.score?.[match.teams?.[1]] && (
                  <Typography variant="body1">
                    Score: {match.score[match.teams[1]]}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>

          {match.venue && (
            <Typography variant="body1" sx={{ mt: 3 }}>
              Venue: {match.venue}
            </Typography>
          )}
          
          {match.toss && (
            <Typography variant="body1" sx={{ mt: 1 }}>
              Toss: {match.toss}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default MatchDetails;
