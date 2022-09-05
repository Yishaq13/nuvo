import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#1E1ED7',
    },
    secondary: {
      main: '#3C4257',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#000',
    },
  },

  components: {
    MuiCardHeader: {
      styleOverrides: {
        subheader: {
          fontSize: '0.875rem',
        },
      },
    },
  },
})

export default theme
