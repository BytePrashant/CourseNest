import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Card, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/courses/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourses(res.data.courses);
      });
  }, []);

  // Callback function to delete a course and update the courses state
  const handleDeleteCourse = (deletedCourseId) => {
    // Filter out the deleted course from the courses array
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course._id !== deletedCourseId)
    );
  };
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

export function GetCourse(props) {
  const navigate = useNavigate();
  const [isMoveOver, setIsMoueOver] = useState(false);
  const buttonStyle = {
    fontWeight: "bold",
    borderRadius: "25px", // Rounded corners
    marginLeft: "-10px",
    marginRight: "30px", // Add some margin between buttons
    backgroundColor: "#2196F3", // Change the background color
    color: "white", // Change the text color to white
    "&:hover": {
      backgroundColor: "#0D47A1", // Change background color on hover
    },
  };

  function deleteCourse() {
    var userInput = window.prompt("Type DELETE to delete the course: ");
    const id = props.course._id;
    if (userInput === "DELETE") {
      axios
        .delete(`http://localhost:3000/admin/courses/${props.course._id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          props.onDeleteCourse(id);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div>
      <Card
        sx={{ maxWidth: 345, height: 320 }}
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          border: isMoveOver ? "1px solid #bc1c44" : "1px solid lightsteelblue",
        }}
        onMouseOver={() => setIsMoueOver(true)}
        onMouseLeave={() => setIsMoueOver(false)}
        // onClick={() => {
        //   navigate(`/course/${props.course._id}`);
        // }}
      >
        <div>
          <CardMedia
            component="div"
            sx={{
              // 16:9
              pt: "56.25%",
            }}
            image={props.course.imageLink}
          />
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{
                fontWeight: "700",
                color: isMoveOver && "#bc1c44",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                "-webkit-line-clamp": 2, // Set the maximum number of lines to 2
                "-webkit-box-orient": "vertical",
              }}
            >
              {props.course.title}
            </Typography>
            <Typography
              gutterBottom
              variant="h8"
              component="div"
              style={{
                fontWeight: "50",
                fontFamily: "inherit",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {props.course.description}
            </Typography>
            {/* <br /> */}
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{ fontWeight: "900" }}
            >
              ₹{props.course.price}
            </Typography>
            <CardActions>
              <Button
                style={buttonStyle} // Apply the custom style
                size="small"
                onClick={() => navigate("/courses/" + props.course._id)}
              >
                Edit
              </Button>

              <Button
                style={buttonStyle} // Apply the custom style
                size="small"
                onClick={() => deleteCourse()}
              >
                Delete
              </Button>
            </CardActions>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default Courses;
