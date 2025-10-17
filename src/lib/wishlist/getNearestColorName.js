export default function getNearestColorName(hex) {
  if (!hex) return "Unknown";

  const hexColor = hex.toLowerCase();
  const colorMap = {
    red: ["#f50606", "#cb1111", "#c80018"],
    blue: ["#063af5", "#06caf5"],
    green: ["#00c12b"],
    yellow: ["#f5dd06"],
    black: ["#000000"],
    white: ["#ffffff", "#f0f0f0"],
    pink: ["#f506a4"],
    orange: ["#f57906"],
    purple: ["#7d06f5"],
    brown: ["#4f4631", "#314f4a", "#31344f"],
  };

  for (const [name, shades] of Object.entries(colorMap)) {
    if (shades.includes(hexColor)) return name;
  }

  return "Custom";
}
