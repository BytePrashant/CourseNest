import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  CircularProgress,
  Button,
  Card,
  TextField,
} from "@mui/material";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function Course() {
  let { courseId } = useParams();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/admin/course", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json(); 
      })
      .then((data) => {
        setCourses(data.courses);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log("courses:", courses);
  const course = courses.find((course) => course.id === parseInt(courseId));

  // if (isLoading) {
  //   return <CircularProgress />;
  // }
  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <div>
      <CourseCard course={course} />
      <UpdateCourse courses={courses} course={course} setCourses={setCourses} />
    </div>
  );
}

function CourseCard(props) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          margin: 10,
          width: 300,
          minHeight: 200,
          overflow: "hidden",
        }}
      >
        <Typography textAlign={"center"} variant="h5">
          {props.course.title}
        </Typography>
        <Typography textAlign={"center"} variant="subtitle1">
          {props.course.description}
        </Typography>
        <img
          src={props.course.imageLink}
          alt={props.course.title}
          style={{ width: 300 }}
        />
      </Card>
    </div>
  );
}

function UpdateCourse(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 150,
          marginBottom: 10,
        }}
      >
        <Typography variant={"h6"}>Update your course here!</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth={true}
            label="Course Title"
            variant="outlined"
          />
          <br /> <br />
          <TextField
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Course Description"
            variant="outlined"
          />
          <br /> <br />
          <TextField
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth={true}
            label="Image Link"
            variant="outlined"
          />
          <br /> <br />
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              fetch("http://localhost:3000/admin/courses/" + props.course.id, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                  title: title,
                  description: description,
                  imageLink: image,
                  published: true,
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  const updatedCourses = props.courses.map((item) =>
                    props.course.id === item.id
                      ? {
                          id: item.id,
                          title: title,
                          description: description,
                          imageLink: image,
                          published: true,
                        }
                      : props.course
                  );
                  props.setCourses(updatedCourses);
                });
            }}
          >
            Update Course
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Course;

const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
