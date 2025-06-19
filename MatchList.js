import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('/api/matches');
        setMatches(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch matches');
        setLoading(false);
      }
    };

    fetchMatches();
    const interval = setInterval(fetchMatches, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

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

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {matches.map((match) => (
          <Grid item xs={12} sm={6} md={4} key={match.id}>
            <Card>
              <CardActionArea onClick={() => navigate(`/match/${match.id}`)}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {match.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {match.status}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {match.teams?.[0]} vs {match.teams?.[1]}
                  </Typography>
                  {match.score && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Score: {match.score}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MatchList;
