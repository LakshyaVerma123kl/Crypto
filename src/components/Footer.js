"use client";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <Box sx={{ mt: 6, textAlign: "center", color: "text.secondary" }}>
      <Typography variant="body2">
        Built with ❤️ by Lakshya | Data from CoinGecko |{" "}
        <a
          href="https://www.coingecko.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </a>
      </Typography>
    </Box>
  );
}
