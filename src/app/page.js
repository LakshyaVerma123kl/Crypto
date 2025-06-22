// page.js
"use client";
import { useEffect, useState } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useTheme } from "../utils/Theme";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useCoinData } from "../hooks/useCoinData";
import Header from "../components/Header";
import CoinTable from "../components/CoinTable";
import ModalChart from "../components/ModalChart";
import Footer from "../components/Footer";

function AppContent() {
  const { muiTheme } = useTheme();
  const { theme } = useContext(ThemeContext);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const coinData = useCoinData();

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "";
  }, [theme]);

  const handleCoinClick = (coin) => {
    console.log("Coin clicked in page:", coin);
    setSelectedCoin(coin);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCoin(null);
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div style={{ minHeight: "100vh" }}>
        <Header coinData={coinData} />
        <CoinTable coinData={coinData} onCoinClick={handleCoinClick} />
        <ModalChart
          open={modalOpen}
          selectedCoin={selectedCoin}
          onClose={handleModalClose}
        />
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
