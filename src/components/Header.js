// Header.js
"use client";
import { useContext, useCallback } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function Header({ coinData }) {
  const { theme, toggleTheme, currency, setCurrency } =
    useContext(ThemeContext);

  const {
    loading,
    fetchCoins,
    searchTerm,
    setSearchTerm,
    error,
    filteredCoins,
    coins,
  } = coinData;

  const handleCurrencyChange = useCallback(
    (e) => {
      const newCurrency = e.target.value;
      setCurrency(newCurrency);
      // Immediate fetch without debouncing
      fetchCoins(newCurrency);
    },
    [fetchCoins, setCurrency]
  );

  const handleRefresh = useCallback(() => {
    fetchCoins(currency);
  }, [fetchCoins, currency]);

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
    },
    [setSearchTerm]
  );

  return (
    <Box
      sx={{
        mb: 4,
        p: 3,
        borderRadius: 2,
        background: "transparent",
        border:
          theme === "dark"
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow:
          theme === "dark"
            ? "0 4px 20px rgba(0, 0, 0, 0.2)"
            : "0 4px 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
        gap={2}
      >
        <Typography
          variant="h4"
          color="primary"
          sx={{
            fontWeight: 700,
            background:
              theme === "dark"
                ? "linear-gradient(45deg, #4A90E2 30%, #50E3C2 90%)"
                : "linear-gradient(45deg, #2E6BC5 30%, #4A90E2 90%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Crypto Dashboard
        </Typography>

        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          {/* Search Field */}
          <TextField
            variant="outlined"
            placeholder="Search coins..."
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            sx={{
              minWidth: 200,
              "& .MuiOutlinedInput-root": {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(255, 255, 255, 0.9)",
                color: theme === "dark" ? "#FFFFFF" : "#1E1E2F",
                borderRadius: 2,
                "& fieldset": {
                  borderColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(0, 0, 0, 0.2)",
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
              "& .MuiOutlinedInput-input": {
                color: theme === "dark" ? "#FFFFFF" : "#1E1E2F",
                "&::placeholder": {
                  color:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.6)"
                      : "rgba(0, 0, 0, 0.6)",
                  opacity: 1,
                },
              },
            }}
          />

          {/* Currency Select */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={currency}
              onChange={handleCurrencyChange}
              disabled={loading}
              sx={{
                borderRadius: 2,
                backgroundColor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.02)",
                color: theme === "dark" ? "#FFFFFF" : "#1E1E2F",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.23)"
                      : "rgba(0, 0, 0, 0.23)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.4)"
                      : "rgba(0, 0, 0, 0.4)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4A90E2",
                },
                "& .MuiSvgIcon-root": {
                  color: theme === "dark" ? "#FFFFFF" : "#1E1E2F",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: theme === "dark" ? "#0D0D1B" : "#FFFFFF",
                    color: theme === "dark" ? "#FFFFFF" : "#1E1E2F",
                    "& .MuiMenuItem-root": {
                      color: theme === "dark" ? "#FFFFFF" : "#1E1E2F",
                      "&:hover": {
                        backgroundColor:
                          theme === "dark"
                            ? "rgba(255, 255, 255, 0.08)"
                            : "rgba(0, 0, 0, 0.04)",
                      },
                    },
                  },
                },
              }}
            >
              <MenuItem value="usd">USD ($)</MenuItem>
              <MenuItem value="eur">EUR (€)</MenuItem>
              <MenuItem value="gbp">GBP (£)</MenuItem>
              <MenuItem value="inr">INR (₹)</MenuItem>
            </Select>
          </FormControl>

          {/* Theme Toggle Button */}
          <Button
            variant="contained"
            onClick={toggleTheme}
            startIcon={theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              backgroundColor: theme === "dark" ? "#4A90E2" : "#2E6BC5",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#5A9FEF" : "#3A7BCF",
                transform: "translateY(-2px)",
                boxShadow:
                  theme === "dark"
                    ? "0 8px 25px rgba(74, 144, 226, 0.3)"
                    : "0 8px 25px rgba(46, 107, 197, 0.3)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </Button>

          {/* Refresh Button */}
          <IconButton
            onClick={handleRefresh}
            disabled={loading}
            sx={{
              color: theme === "dark" ? "#4A90E2" : "#2E6BC5",
              backgroundColor:
                theme === "dark"
                  ? "rgba(74, 144, 226, 0.1)"
                  : "rgba(46, 107, 197, 0.1)",
              borderRadius: 2,
              "&:hover": {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(74, 144, 226, 0.2)"
                    : "rgba(46, 107, 197, 0.2)",
                transform: "rotate(180deg)",
              },
              "&:disabled": {
                color:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.3)"
                    : "rgba(0, 0, 0, 0.3)",
                backgroundColor: "transparent",
              },
              transition: "all 0.3s ease",
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <RefreshIcon />
            )}
          </IconButton>
        </Box>
      </Box>

      {/* Loading Indicator */}
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" py={2}>
          <CircularProgress
            sx={{
              color: theme === "dark" ? "#4A90E2" : "#2E6BC5",
              mr: 2,
            }}
            size={24}
          />
          <Typography
            variant="body2"
            sx={{
              color:
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(0, 0, 0, 0.7)",
            }}
          >
            Fetching latest data...
          </Typography>
        </Box>
      )}

      {/* Error Alert */}
      {error && (
        <Alert
          severity="error"
          sx={{
            mt: 2,
            borderRadius: 2,
            backgroundColor:
              theme === "dark"
                ? "rgba(244, 67, 54, 0.1)"
                : "rgba(244, 67, 54, 0.05)",
            color: theme === "dark" ? "#FFFFFF" : "#1E1E2F",
            border:
              theme === "dark"
                ? "1px solid rgba(244, 67, 54, 0.3)"
                : "1px solid rgba(244, 67, 54, 0.2)",
            "& .MuiAlert-icon": {
              color: "#f44336",
            },
          }}
        >
          {error}
        </Alert>
      )}
    </Box>
  );
}
