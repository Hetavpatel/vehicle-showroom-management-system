import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingScreen = () => (
  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh">
    <CircularProgress color="primary" />
    <Typography mt={2}>Loading portal content…</Typography>
  </Box>
);

export default LoadingScreen;
