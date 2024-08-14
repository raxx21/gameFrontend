import React from 'react';
import { Grid, Paper, Box, Typography } from '@mui/material';
import { Game } from '../types/game';

interface GameListProps {
  games: Game[];
}

const GameList: React.FC<GameListProps> = ({ games }) => {
  return (
    <Grid container spacing={2}>
      {games.map((game, index) => (
        <Grid item xs={12} key={index}>
          <Paper sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'column', md: 'row' }, backgroundColor: '#0e1a2b', position: 'relative' }}>
            <Box
              sx={{
                width: { md: '150px' },
                backgroundColor: '#000',
                marginRight: { md: '16px' },
                height: { xs: '150px', sm: '150px' },
              }}
            />
            <Box sx={{ flex: 1, color: "#fff", p: 2 }}>
              <Typography variant="h6">{game.name}</Typography>
              <Typography variant="subtitle2">Release Date: {game.firstReleaseDate.slice(0, 10)}</Typography>
              <Typography sx={{ mt: 2 }}>
                {game.summary.slice(0, 110)}...
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <Box sx={{
                display: 'flex',
                position: { xs: 'absolute', sm: 'absolute' },
                top: { xs: 10, sm: 10 },
                right: { xs: 10, sm: 10 },
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                backgroundColor: '#3f51b5',
                borderRadius: '50%',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '18px',
              }}>{game.rating}
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default GameList;
