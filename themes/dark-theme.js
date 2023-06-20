import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400  // #ff1744,
    }
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          transform: 'translateZ(0)',
          backgroundColor: '#4a148c',
        },
      },
    }
  },
});