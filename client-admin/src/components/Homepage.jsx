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
      <div style={{ marginTop: "300px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Center both horizontally and vertically
            marginBottom: "20px", // Adjust the top margin for spacing
          }}
        >
          <img
            src="https://s.udemycdn.com/home/non-student-cta/instructor-1x-v3.jpg"
            alt="Instructor Image"
            // style={{ maxWidth: "90%", height: "90%" }}
          />
          <div style={{ marginLeft: "20px" }}>
            <Typography variant="h2">Become an instructor</Typography>
            <Typography variant="h6">
              Instructors from around the world teach
            </Typography>
            <Typography variant="h6">
              millions of students on Nudemy. We provide the
            </Typography>
            <Typography variant="h6">
              tools and skills to teach what you love.
            </Typography>
            <Button
              size="large"
              variant="contained"
              style={{
                marginTop: "20px",
              }}
            >
              Start Teaching Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
