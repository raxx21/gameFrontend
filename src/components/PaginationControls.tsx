import React from 'react';
import { Box, Pagination } from '@mui/material';

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
        sx={{
          '& .MuiPaginationItem-root': {
            color: '#fff',
          },
          '& .Mui-selected': {
            backgroundColor: '#3f51b5',
            color: '#fff',
          },
          '& .MuiPaginationItem-ellipsis': {
            color: '#fff',
          },
        }}
      />
    </Box>
  );
};

export default PaginationControls;
