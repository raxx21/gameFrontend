import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { fetchGames } from '../api/gameApi';
import { Game } from '../types/game';
import GameList from '../components/GameList';
import PaginationControls from '../components/PaginationControls';

const VideoGamesPage = () => {
  const [data, setData] = useState<Game[]>([]);
  const [filteredData, setFilteredData] = useState<Game[]>([]);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [ratingRange, setRatingRange] = useState<number[]>([1, 100]);
  const [orderBy, setOrderBy] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    filterData();
  }, [orderBy, ratingRange, nameFilter, data]);

  const getData = async () => {
    const data = await fetchGames();
    setData(data);
    setFilteredData(data);
  };

  const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
  };

  const filterData = () => {
    const filtered = data
      .filter((game) => {
        const rating = parseInt(game.rating);
        const isRatingInRange = rating >= ratingRange[0] && rating <= ratingRange[1];
        const isNameMatching = nameFilter === '' || game.name.toLowerCase().includes(nameFilter.toLowerCase());
        return isRatingInRange && isNameMatching;
      })
      .sort((a, b) => {
        if (orderBy === 'Name') {
          return a.name.localeCompare(b.name);
        } else if (orderBy === 'Release Date') {
          return new Date(a.firstReleaseDate).getTime() - new Date(b.firstReleaseDate).getTime();
        } else if (orderBy === 'Rating') {
          return parseInt(a.rating) - parseInt(b.rating);
        }
        return 0;
      });

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleRatingRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRating(value);
    switch (value) {
      case '1-10':
        setRatingRange([1, 10]);
        break;
      case '11-20':
        setRatingRange([11, 20]);
        break;
      case '21-30':
        setRatingRange([21, 30]);
        break;
      case '31-40':
        setRatingRange([31, 40]);
        break;
      case '41-50':
        setRatingRange([41, 50]);
        break;
      case '51-60':
        setRatingRange([51, 60]);
        break;
      case '61-70':
        setRatingRange([61, 70]);
        break;
      case '71-80':
        setRatingRange([71, 80]);
        break;
      case '81-90':
        setRatingRange([81, 90]);
        break;
      case '91-100':
        setRatingRange([91, 100]);
        break;
      default:
        setRatingRange([1, 100]);
    }
  };

  const clear = () => {
    setNameFilter('');
    setRatingRange([1, 100]);
    setRating('');
    setOrderBy('');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box className="gameContainer" sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: {
        xs: 'column', 
        sm: 'column', 
        md: 'row',
      }, }}>
        <Box sx={{ width: { xs: '93%', md: '25%' }, mr: { xs: 0, md: 4 }, mb: { xs: 5, md: 0 }, backgroundColor: "#0e1a2b", p: 3, height: '400px' }}>
          <Typography variant="h6" gutterBottom>
            Filter Results
          </Typography>
          <TextField
            label="Name (contains)"
            variant="outlined"
            value={nameFilter}
            onChange={handleNameFilterChange}
            fullWidth
            sx={{ mb: 3, backgroundColor: '#2A2A3D', input: { color: '#fff' } }}
            InputLabelProps={{ style: { color: '#B2B2B2' } }}
          />
          <TextField
            select
            label="Minimum Score"
            variant="outlined"
            fullWidth
            sx={{ mb: 3, backgroundColor: '#2A2A3D', color: '#fff', '& .MuiInputBase-input': {
              color: '#fff',
            }, }}
            InputLabelProps={{ style: { color: '#B2B2B2' } }}
            onChange={handleRatingRangeChange}
            value={rating}
          >
            <MenuItem value="1-10">1-10</MenuItem>
            <MenuItem value="11-20">11-20</MenuItem>
            <MenuItem value="21-30">21-30</MenuItem>
            <MenuItem value="31-40">31-40</MenuItem>
            <MenuItem value="41-50">41-50</MenuItem>
            <MenuItem value="51-60">51-60</MenuItem>
            <MenuItem value="61-70">61-70</MenuItem>
            <MenuItem value="71-80">71-80</MenuItem>
            <MenuItem value="81-90">81-90</MenuItem>
            <MenuItem value="91-100">91-100</MenuItem>
          </TextField>

          <TextField
            select
            label="Order by"
            variant="outlined"
            fullWidth
            sx={{ mb: 3, backgroundColor: '#2A2A3D', color: '#fff','& .MuiInputBase-input': {
              color: '#fff',
            }, }}
            InputLabelProps={{ style: { color: '#B2B2B2' } }}
            onChange={(e) => { setOrderBy(e.target.value) }}
            value={orderBy}
          >
            <MenuItem value="Release Date">Release Date</MenuItem>
            <MenuItem value="Rating">Score</MenuItem>
            <MenuItem value="Name">Name</MenuItem>
          </TextField>
          <Button variant="contained" color="primary" onClick={clear} fullWidth>
            Clear
          </Button>
        </Box>
        <Box sx={{ width: { xs: '100%', md: '75%' } }}>
          <GameList games={paginatedData} />

          {/* Pagination Controls */}
          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(event, value) => setCurrentPage(value)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default VideoGamesPage;
