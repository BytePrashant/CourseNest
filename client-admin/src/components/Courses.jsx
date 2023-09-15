import AppBar from "@mui/material/AppBar";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Card, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("https://nudemy.vercel.app/admin/courses/", {
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
              <GetCourse course={item} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Add a button or additional content if needed */}
      {/* <Container maxWidth="md">
        <Button variant="contained" color="primary" fullWidth>
          Load More
        </Button>
      </Container> */}
    </div>
  );
}

export function GetCourse(props) {
  const navigate = useNavigate();
  function deleteCourse() {
    var userInput = window.prompt("Type DELETE to delete the course: ");
    const id = props.course._id;
    if (userInput === "DELETE") {
      axios
        .delete(`https://nudemy.vercel.app/admin/courses/${props.courseId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setCourses(courses.filter((course) => course._id !== id));
          toast.success(res.data.message);
          navigate("/courses");
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <main>
      <CssBaseline>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  // 16:9
                  pt: "56.25%",
                }}
                image={props.course.imageLink}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.course.title}
                </Typography>
                <Typography>{props.course.description}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate("/course/" + props.course._id)}
                >
                  Edit
                </Button>
                
                <Button size="small" onClick={() => deleteCourse()}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Container>
      </CssBaseline>
    </main>
  );
}

export default Courses;
