"use client";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  Box,
  Typography,
  Button,
  Modal,
  CircularProgress,
  Alert,
  Paper,
  Divider,
  Chip,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useChartData } from "../hooks/useChartData";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ModalChart({ open, selectedCoin, onClose }) {
  const { theme, currency } = useContext(ThemeContext);
  const { chartData, loading, error } = useChartData(selectedCoin, open);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const formatCurrency = (value) => {
    if (!value) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(value);
  };

  const formatPercentage = (value) => {
    if (value === null || value === undefined) return "N/A";
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor:
          theme === "dark"
            ? "rgba(15, 15, 25, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
        titleColor: theme === "dark" ? "#ffffff" : "#000000",
        bodyColor: theme === "dark" ? "#ffffff" : "#000000",
        borderColor: "#4A90E2",
        borderWidth: 2,
        cornerRadius: 12,
        padding: 12,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function (context) {
            return `Price: ${formatCurrency(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.05)",
          lineWidth: 1,
        },
        ticks: {
          color: theme === "dark" ? "#8A8A8A" : "#666666",
          font: {
            size: 11,
            weight: "500",
          },
          maxTicksLimit: 7,
        },
        border: {
          display: false,
        },
      },
      y: {
        display: true,
        position: "right",
        grid: {
          display: true,
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.05)",
          lineWidth: 1,
        },
        ticks: {
          color: theme === "dark" ? "#8A8A8A" : "#666666",
          font: {
            size: 11,
            weight: "500",
          },
          callback: function (value) {
            return formatCurrency(value);
          },
          maxTicksLimit: 8,
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 6,
        hoverBorderWidth: 2,
      },
      line: {
        borderWidth: 3,
        tension: 0.4,
      },
    },
  };

  // Enhanced chart data with gradient
  const enhancedChartData =
    chartData.datasets.length > 0
      ? {
          ...chartData,
          datasets: [
            {
              ...chartData.datasets[0],
              borderColor:
                selectedCoin?.price_change_percentage_24h >= 0
                  ? "#10B981"
                  : "#EF4444",
              backgroundColor:
                selectedCoin?.price_change_percentage_24h >= 0
                  ? "rgba(16, 185, 129, 0.1)"
                  : "rgba(239, 68, 68, 0.1)",
              pointBackgroundColor:
                selectedCoin?.price_change_percentage_24h >= 0
                  ? "#10B981"
                  : "#EF4444",
              pointBorderColor:
                selectedCoin?.price_change_percentage_24h >= 0
                  ? "#10B981"
                  : "#EF4444",
              pointHoverBackgroundColor:
                selectedCoin?.price_change_percentage_24h >= 0
                  ? "#059669"
                  : "#DC2626",
              pointHoverBorderColor:
                selectedCoin?.price_change_percentage_24h >= 0
                  ? "#059669"
                  : "#DC2626",
            },
          ],
        }
      : chartData;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={24}
          sx={{
            width: { xs: "95%", sm: "90%", md: "85%", lg: "75%", xl: "65%" },
            maxWidth: "900px",
            height: { xs: "95%", sm: "90%", md: "85%" },
            maxHeight: "800px",
            bgcolor:
              theme === "dark"
                ? "rgba(15, 15, 25, 0.98)"
                : "rgba(255, 255, 255, 0.98)",
            borderRadius: "24px",
            border:
              theme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.05)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative",
            // Custom scrollbar styles
            "& *::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "& *::-webkit-scrollbar-track": {
              background:
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(0, 0, 0, 0.05)",
              borderRadius: "4px",
            },
            "& *::-webkit-scrollbar-thumb": {
              background:
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
              "&:hover": {
                background:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.3)"
                    : "rgba(0, 0, 0, 0.3)",
              },
            },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 3,
              pb: 2,
              borderBottom: `1px solid ${
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)"
              }`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              {selectedCoin?.image && (
                <Box
                  component="img"
                  src={selectedCoin.image}
                  alt={selectedCoin.name}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    boxShadow:
                      theme === "dark"
                        ? "0 4px 12px rgba(0, 0, 0, 0.3)"
                        : "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
              )}
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    mb: 0.5,
                  }}
                >
                  {selectedCoin?.name || "Coin"} Chart
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontWeight: 500,
                  }}
                >
                  {selectedCoin?.symbol} • 7-day trend
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={handleClose}
              sx={{
                color:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(0, 0, 0, 0.7)",
                bgcolor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                "&:hover": {
                  bgcolor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)",
                  transform: "scale(1.05)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Stats Bar */}
          {selectedCoin && (
            <Box
              sx={{
                p: 3,
                py: 2,
                borderBottom: `1px solid ${
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)"
                }`,
                flexShrink: 0,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Current Price
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="text.primary"
                    >
                      {formatCurrency(selectedCoin.current_price)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      24h Change
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap={0.5}
                    >
                      {selectedCoin.price_change_percentage_24h >= 0 ? (
                        <TrendingUpIcon
                          sx={{ color: "#10B981", fontSize: 20 }}
                        />
                      ) : (
                        <TrendingDownIcon
                          sx={{ color: "#EF4444", fontSize: 20 }}
                        />
                      )}
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                          color:
                            selectedCoin.price_change_percentage_24h >= 0
                              ? "#10B981"
                              : "#EF4444",
                        }}
                      >
                        {formatPercentage(
                          selectedCoin.price_change_percentage_24h
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Market Cap
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="text.primary"
                    >
                      {formatCurrency(selectedCoin.market_cap)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Chart Content */}
          <Box
            sx={{
              flex: 1,
              p: 3,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <CircularProgress size={48} sx={{ color: "#4A90E2" }} />
                <Typography variant="body1" color="text.secondary">
                  Loading chart data...
                </Typography>
              </Box>
            ) : error ? (
              <Alert
                severity="error"
                sx={{
                  borderRadius: 3,
                  bgcolor:
                    theme === "dark"
                      ? "rgba(239, 68, 68, 0.1)"
                      : "rgba(239, 68, 68, 0.05)",
                  border: `1px solid ${
                    theme === "dark"
                      ? "rgba(239, 68, 68, 0.2)"
                      : "rgba(239, 68, 68, 0.1)"
                  }`,
                }}
              >
                <Typography variant="body1" fontWeight="500">
                  {error}
                </Typography>
              </Alert>
            ) : chartData.labels && chartData.labels.length > 0 ? (
              <Box sx={{ height: "100%", position: "relative" }}>
                <Line data={enhancedChartData} options={chartOptions} />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  No Data Available
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  Chart data is not available for this cryptocurrency at the
                  moment.
                </Typography>
              </Box>
            )}
          </Box>

          {/* Footer */}
          <Box
            sx={{
              p: 3,
              pt: 2,
              borderTop: `1px solid ${
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)"
              }`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Data provided by CoinGecko API
            </Typography>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                backgroundColor: "#4A90E2",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "0.95rem",
                "&:hover": {
                  backgroundColor: "#3A7BCF",
                  transform: "translateY(-1px)",
                  boxShadow: "0 8px 25px rgba(74, 144, 226, 0.3)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              Close
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Modal>
  );
}
