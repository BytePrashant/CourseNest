import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Card,
  TextField,
} from "@mui/material";

function UpdateCourse(props) {
  console.log(props.course); // Add this line to check the values in the console
  const navigate = useNavigate();
  let { courseId } = useParams();
  const [title, setTitle] = useState(props.course.title);
  const [description, setDescription] = useState(props.course.description);
  const [image, setImage] = useState(props.course.imageLink);
  const [price, setPrice] = useState(props.course.price);
  console.log(title);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 80,
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
            value={title}
          />
          <br /> <br />
          <TextField
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Course Description"
            variant="outlined"
            value={description}
          />
          <br /> <br />
          <TextField
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth={true}
            label="Image Link"
            variant="outlined"
            value={image}
          />
          <br /> <br />
          <TextField
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth={true}
            label="Price"
            variant="outlined"
            value={price}
          />
          <br /> <br />
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              fetch(`http://localhost:3000/admin/courses/${courseId}`, {
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
                  const updatedCourse = {
                    ...props.course,
                    title: title,
                    description: description,
                    imageLink: image,
                    published: true,
                  };
                  props.setCourse(updatedCourse);
                  alert("Course Updated");
                  navigate("/Courses");
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

export default UpdateCourse;
