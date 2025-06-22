import { createTheme } from "@mui/material/styles";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    console.error(
      "ThemeContext is not provided. Ensure ThemeProvider wraps the app."
    );
    return { muiTheme: createTheme({ palette: { mode: "light" } }) };
  }

  const { theme } = context;

  const muiTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: "#4A90E2",
        light: "#6BA3F0",
        dark: "#2E6BC5",
      },
      secondary: {
        main: "#50E3C2",
        light: "#7AEAD4",
        dark: "#2DCCA8",
      },
      background: {
        default: theme === "dark" ? "#1A1A2E" : "#FFFFFF",
        paper: theme === "dark" ? "#0D0D1B" : "#F8F9FA",
      },
      text: {
        primary: theme === "dark" ? "#FFFFFF" : "#1E1E2F",
        secondary: theme === "dark" ? "#B0B0C0" : "#666666",
      },
      divider:
        theme === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
      action: {
        hover:
          theme === "dark"
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(0, 0, 0, 0.04)",
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      h1: { fontWeight: 600 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      body1: {
        color: "inherit",
        lineHeight: 1.6,
      },
      body2: {
        color: "inherit",
        lineHeight: 1.6,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: theme === "dark" ? "#1A1A2E" : "#FFFFFF",
            color: theme === "dark" ? "#FFFFFF" : "#1E1E2F",
            transition: "background-color 0.3s ease, color 0.3s ease",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: theme === "dark" ? "#5A9FEF" : "#3A7BCF",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
              backgroundColor:
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(0, 0, 0, 0.02)",
              "& fieldset": {
                borderColor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.23)"
                    : "rgba(0, 0, 0, 0.23)",
              },
              "&:hover fieldset": {
                borderColor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "rgba(0, 0, 0, 0.4)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#4A90E2",
              },
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "12px 16px",
            borderBottom:
              theme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.12)"
                : "1px solid rgba(0, 0, 0, 0.12)",
            backgroundColor: "transparent",
          },
          head: {
            fontWeight: 600,
            backgroundColor:
              theme === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.02)",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor:
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.04)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: theme === "dark" ? "#0D0D1B" : "#F8F9FA",
            backgroundImage: "none",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: theme === "dark" ? "#0D0D1B" : "#FFFFFF",
            color: theme === "dark" ? "#FFFFFF" : "#1E1E2F",
            boxShadow:
              theme === "dark"
                ? "0 2px 4px rgba(0, 0, 0, 0.3)"
                : "0 2px 4px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  });

  return { muiTheme };
};
