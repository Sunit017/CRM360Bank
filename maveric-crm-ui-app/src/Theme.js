import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: 'AvenirLTSD, Arial, sans-serif', // Override with Avenir
  },

  palette: {
    mode: "light",
    primary: { main: "#0b51ee" },
    background: { paper: "#fff" },
    // action: {
    //   selected: "#E7A615",
    //   hover: "#2453d8",
    //   disabled: "#9B9B9B",
    // },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#4b53bc",
            color: "#fff",
          },
        },
      },
    },
    MuiListItemButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          height: 130,
          top: 90,
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            color: "#fff",
            backgroundColor: "#4b53bc",
            "&:hover": {
              // backgroundColor: "#3f4140",
              textDecoration: "underline",
            },
          },
        },
        {
          props: { variant: "containedMenu" },
          style: {
            "&:hover": {
              // backgroundColor: "#3f4140",
              textDecoration: "underline",
            },
          },
        },
      ],
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#ff0000",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#000",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "small",
          "&.Mui-focused": {
            color: "#00b994",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#00b994",
              borderWidth: "0.15rem",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00b994",
            },
            "&.Mui-disabled": {
              "&:hover fieldset": {
                borderColor: "rgba(0, 0, 0, 0.26)",
                borderWidth: "1px",
              },
            },
            "&.Mui-error": {
              "&:hover fieldset": {
                borderColor: "#d32f2f",
                borderWidth: "0.15rem",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#d32f2f",
              },
            },
          },
        },
      },
    },
  },
});
