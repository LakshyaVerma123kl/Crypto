"use client";
import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
  useRef,
} from "react";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";

export function useCoinData() {
  const { currency } = useContext(ThemeContext);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [open, setOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCoins = useCallback(
    async (curr = currency) => {
      setLoading(true);
      setError(null);
      try {
        // Use internal API route instead of direct CoinGecko API
        const response = await axios.get(`/api/coins?currency=${curr}`, {
          timeout: 15000,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setCoins(response.data);
      } catch (err) {
        if (err.response?.data?.error) {
          setError(err.response.data.error);
        } else if (err.code === "ECONNABORTED") {
          setError("Request timeout. Please try again.");
        } else {
          setError("Failed to fetch data. Please try again.");
        }
        console.error("Error fetching coins:", err);
      } finally {
        setLoading(false);
      }
    },
    [currency]
  );

  // Initial fetch and auto-refresh
  useEffect(() => {
    fetchCoins();
    const interval = setInterval(() => fetchCoins(), 300000); // 5 minutes
    return () => clearInterval(interval);
  }, [fetchCoins]);

  const requestSort = useCallback((key) => {
    setSortConfig((prev) => {
      const direction =
        prev.key === key && prev.direction === "ascending"
          ? "descending"
          : "ascending";

      return { key, direction };
    });
  }, []);

  const getSortDirection = (key) =>
    sortConfig.key === key ? sortConfig.direction : undefined;

  // Apply sorting to coins
  const sortedCoins = useMemo(() => {
    if (!sortConfig.key) return coins;

    return [...coins].sort((a, b) => {
      const { key, direction } = sortConfig;

      if (key === "name") {
        const result = a[key].localeCompare(b[key]);
        return direction === "ascending" ? result : -result;
      }

      // Handle numeric values
      const aValue = a[key] || 0;
      const bValue = b[key] || 0;
      const result = aValue - bValue;
      return direction === "ascending" ? result : -result;
    });
  }, [coins, sortConfig]);

  // Apply search filter
  const filteredCoins = useMemo(() => {
    if (!searchTerm.trim()) return sortedCoins;

    return sortedCoins.filter((coin) => {
      const searchLower = searchTerm.toLowerCase().trim();
      return (
        coin.name.toLowerCase().includes(searchLower) ||
        coin.symbol.toLowerCase().includes(searchLower) ||
        coin.id.toLowerCase().includes(searchLower)
      );
    });
  }, [sortedCoins, searchTerm]);

  return {
    coins,
    setCoins,
    selectedCoin,
    setSelectedCoin,
    open,
    setOpen,
    sortConfig,
    requestSort,
    getSortDirection,
    loading,
    error,
    fetchCoins,
    searchTerm,
    setSearchTerm,
    filteredCoins,
    currency,
  };
}
