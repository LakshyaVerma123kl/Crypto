export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top", labels: { color: "text.primary" } },
    title: {
      display: true,
      text: "Price Chart (7 Days)",
      color: "text.primary",
    },
  },
  scales: {
    x: { ticks: { color: "text.secondary" } },
    y: { ticks: { color: "text.secondary" } },
  },
};
