import { Typography, Button } from "@mui/material";
function HomePage() {
  return (
    <div>
      <div
        style={{
          position: "relative",
          marginLeft: "100px",
          marginTop: "50px",
          marginBottom: "20px",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src="https://img-b.udemycdn.com/notices/home_carousel_slide/image/1a871a12-4289-4d90-90e8-641d10a73f69.jpg"
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
            backgroundColor: "#FFFDD0", // Semi-transparent background
            padding: "10px",
          }}
        >
          <Typography variant="h4">Learn from the best</Typography>
          <Typography variant="h2">NUDEMY</Typography>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
