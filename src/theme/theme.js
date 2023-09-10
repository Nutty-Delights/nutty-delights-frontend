import { createTheme } from '@mui/material/styles';
const font = "'Quicksand', sans-serif";

const theme = createTheme({


    breakpoints: {
        values: {

            xs: 0,
            smx: 300,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,

        }
    },
    palette: {
        // primary: {
        //     main: "#fef9f8"


        // },
        // secondary: {
        //     main: '#ef9273',
        // },






    },

    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    minHeight: 64,
                    backgroundColor: 'white',
                    color: 'black'
                }
            }
        }
    },

    typography: {
        fontFamily: "Quicksand",
        button: {
            textTransform: "none"
        },

    }

});

export default theme;