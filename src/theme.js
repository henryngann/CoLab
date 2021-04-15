import { createMuiTheme }  from '@material-ui/core/styles'
const theme = createMuiTheme({
    palette: {
        primary: {
          light: '#84d1ff',
          main: '#48A0F1',
          dark: '#0072be',
          contrastText: '#fff',
        },
        secondary: {
        //   light: '#ff7961',
          main: '#FFFFFF',
        //   dark: '#ba000d',
          contrastText: '#000',
        },
        text: {
        //   secondary: "#f3f3f3",
        },
      },
  shape: {
    borderRadius: 28,
  }, 
  overrides: {
    MuiFormLabel: {
      root: {
        marginTop: 6,
        marginLeft: 8
      }
    }
  }
})
export default theme