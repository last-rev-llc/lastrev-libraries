import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';

export const ArticleLoading = () => {
  const theme = useTheme();

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Skeleton variant="rectangular" sx={{ bgcolor: theme.palette.text.primary }} width={'100%'} height={132} />
      <Skeleton variant="rectangular" sx={{ bgcolor: theme.palette.midnight.A30 }} width={'100%'} height={86} />
      <Skeleton variant="rectangular" sx={{ bgcolor: theme.palette.midnight.A06 }} width={'100%'} height={78} />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Skeleton
          variant="rectangular"
          sx={{ bgcolor: theme.palette.midnight.contrastText }}
          width={250}
          height={'100%'}
        />
        <Skeleton
          variant="rectangular"
          sx={{ bgcolor: theme.palette.midnight.A03 }}
          width={'calc(100% - 250px)'}
          height={'100%'}
        />
      </Box>
    </Box>
  );
};
