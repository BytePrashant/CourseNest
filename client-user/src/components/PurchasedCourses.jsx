import { useEffect, useState } from "react";
import "../index.css";
import "./coursesStyles.css";
import CourseCard from "./CourseCard";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

function PurchasedCourses() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://nudemy-server.vercel.app/user/purchasedCourses`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPurchasedCourses(res.purchasedCourses);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Typography
        variant="h4"
        component="div"
        style={{
          fontWeight: "bold",
          color: "#101460",
          marginTop: "20px",
        }}
      >
        Purchased Courses
      </Typography>
      <Container sx={{ paddingTop: 8, paddingBottom: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {purchasedCourses.length > 0
            ? purchasedCourses.map((course) => (
                <Grid item key={course} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ maxWidth: 345, height: 300 }}
                    style={{
                      display: "flex",
                      flex: 1,
                      flexDirection: "column",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    <CourseCard
                      key={course._id}
                      course={course}
                    />
                  </Card>
                </Grid>
              ))
            : "No course has yet been bought!"}
        </Grid>
      </Container>
    </div>
  );
}

export default PurchasedCourses;
