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
  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch("https://nudemy-backend.vercel.app/admin/courses/${courseId}", {
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
        setCourse(data.course);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [courseId]);

  const coursePage = course.find((course) => course.id === parseInt(courseId));

  if (!coursePage) {
    return <div>Course not found.</div>;
  }

  return (
    <div>
      <CourseCard course={course} />
      <UpdateCourse course={course} setCourse={setCourse} />
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
              fetch(
                "https://nudemy-backend.vercel.app/admin/courses/${props.course.id}",
                {
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
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  const updatedCourse = {
                    ...props.course,
                    title: title,
                    description: description,
                    imageLink: image,
                    published: true,
                  };
                  props.setCourse(updatedCourse);
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
