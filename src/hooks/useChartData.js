"use client";
import { useState, useCallback, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";

export function useChartData(selectedCoin, open) {
  const { currency } = useContext(ThemeContext);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChartData = useCallback(
    async (coinId) => {
      if (!coinId) return;

      setLoading(true);
      setError(null);
      try {
        // Use internal API route instead of direct CoinGecko API
        const response = await axios.get(
          `/api/chart?coinId=${coinId}&currency=${currency}&days=7`,
          {
            timeout: 15000,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const prices = response.data.prices || [];

        setChartData({
          labels: prices.map((price) =>
            new Date(price[0]).toLocaleDateString()
          ),
          datasets: [
            {
              label: `${selectedCoin?.name || coinId} Price`,
              data: prices.map((price) => price[1] || 0),
              borderColor: "#4A90E2",
              backgroundColor: "rgba(74, 144, 226, 0.2)",
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#4A90E2",
              pointBorderColor: "#4A90E2",
              pointRadius: 3,
              pointHoverRadius: 5,
            },
          ],
        });
      } catch (err) {
        if (err.response?.data?.error) {
          setError(err.response.data.error);
        } else if (err.code === "ECONNABORTED") {
          setError("Request timeout. Please try again.");
        } else {
          setError("Failed to fetch chart data.");
        }
        console.error("Error fetching chart data:", err);
        setChartData({ labels: [], datasets: [] });
      } finally {
        setLoading(false);
      }
    },
    [currency, selectedCoin]
  );

  useEffect(() => {
    if (selectedCoin && open) {
      fetchChartData(selectedCoin.id);
    }
  }, [selectedCoin, fetchChartData, open]);

  return { chartData, loading, error, fetchChartData };
}
