import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/users/courses/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourses(res.data.courses);
      });
  }, []);
  return (
    <div>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "background.paper",
          paddingTop: 8,
          paddingBottom: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Courses
          </Typography>
        </Container>
      </Box>

      {/* Course List */}
      <Container sx={{ paddingTop: 8, paddingBottom: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {courses.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <GetCourse course={item} onDeleteCourse={handleDeleteCourse} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default HomePage;
