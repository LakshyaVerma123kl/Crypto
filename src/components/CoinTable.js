// CoinTable.js
"use client";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";

const AnimatedTableRow = motion(TableRow);

export default function CoinTable({ coinData, onCoinClick }) {
  const { theme, currency } = useContext(ThemeContext);

  const {
    sortConfig,
    requestSort,
    getSortDirection,
    filteredCoins,
    loading,
    error,
  } = coinData;

  const handleCoinClick = (coin) => {
    if (onCoinClick) {
      onCoinClick(coin);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <CircularProgress
          sx={{ color: theme === "dark" ? "#4A90E2" : "#2E6BC5" }}
        />
        <Typography variant="body1" sx={{ ml: 2, color: "text.secondary" }}>
          Loading coins...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2, borderRadius: 2 }}>
        {error}
      </Alert>
    );
  }

  if (filteredCoins.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <Typography variant="body1" color="text.secondary">
          No coins found matching your search.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ width: "30%", padding: "16px", color: "text.primary" }}
            >
              <TableSortLabel
                active={sortConfig.key === "name"}
                direction={getSortDirection("name")}
                onClick={() => requestSort("name")}
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{ width: "20%", padding: "16px", color: "text.primary" }}
            >
              <TableSortLabel
                active={sortConfig.key === "current_price"}
                direction={getSortDirection("current_price")}
                onClick={() => requestSort("current_price")}
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                Price
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{ width: "25%", padding: "16px", color: "text.primary" }}
            >
              <TableSortLabel
                active={sortConfig.key === "price_change_percentage_24h"}
                direction={getSortDirection("price_change_percentage_24h")}
                onClick={() => requestSort("price_change_percentage_24h")}
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                24h Change
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{ width: "25%", padding: "16px", color: "text.primary" }}
            >
              <TableSortLabel
                active={sortConfig.key === "market_cap"}
                direction={getSortDirection("market_cap")}
                onClick={() => requestSort("market_cap")}
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                Market Cap
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCoins.map((coin) => (
            <AnimatedTableRow
              key={coin.id}
              hover
              onClick={() => handleCoinClick(coin)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  background:
                    theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "#F0F4F8",
                },
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TableCell sx={{ padding: "12px" }}>
                <Box display="flex" alignItems="center">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    width={24}
                    height={24}
                    style={{ marginRight: 12 }}
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, color: "text.primary" }}
                  >
                    {coin.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ padding: "12px" }}>
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  {currency.toUpperCase()}{" "}
                  {coin.current_price?.toLocaleString() || "N/A"}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  padding: "12px",
                  color:
                    coin.price_change_percentage_24h >= 0
                      ? "#2E7D32"
                      : "#D32F2F",
                }}
              >
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  {coin.price_change_percentage_24h?.toFixed(2) || "N/A"}%
                </Typography>
              </TableCell>
              <TableCell sx={{ padding: "12px" }}>
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  {currency.toUpperCase()}{" "}
                  {coin.market_cap?.toLocaleString() || "N/A"}
                </Typography>
              </TableCell>
            </AnimatedTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
