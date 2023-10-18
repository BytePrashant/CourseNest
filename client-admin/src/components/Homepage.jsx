import { Typography, Button } from "@mui/material";
function HomePage() {
  return (
    <div>
      <div
        style={{
          position: "relative",
          marginLeft: "100px",
          marginBottom: "20px",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src="https://s.udemycdn.com/browse_components/billboard/fallback_banner_image_udlite.jpg"
          alt="Welcome Image"
          style={{ maxWidth: "90%", height: "auto", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "10%", // Adjust left position
            transform: "translateY(-50%)",
            textAlign: "left", // Align text to the left
            color: "FAED26", // Yellow text color
            backgroundColor: "#00A693", // Semi-transparent background
            padding: "10px",
          }}
        >
          <Typography variant="h4">The best way to learn</Typography>
          <Typography variant="h2">is to TEACH</Typography>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
