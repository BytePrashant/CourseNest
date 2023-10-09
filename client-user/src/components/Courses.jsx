import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Card, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/user/courses/", {
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
    </div>
  );
}

export function GetCourse(props) {
  const navigate = useNavigate();
  const [isMoveOver, setIsMoueOver] = useState(false);
  return (
    <div>
      <Card
        sx={{ maxWidth: 345, height: 300 }}
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          border: isMoveOver ? "1px solid #bc1c44" : "1px solid lightsteelblue",
        }}
        onMouseOver={() => setIsMoueOver(true)}
        onMouseLeave={() => setIsMoueOver(false)}
        onClick={() => {
          navigate(`/course/${props.course._id}`);
        }}
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
              component="div"
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
            <br />
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{ fontWeight: "900" }}
            >
              ${props.course.price}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default Courses;
