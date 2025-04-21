import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Card, TextField } from "@mui/material";
import { BASE_URL } from "../config";

function UpdateCourse(props) {
  let { courseId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      setTitle(props.course.title);
      setDescription(props.course.description);
      setImage(props.course.imageLink);
      setPrice(props.course.price);
  }, [props.course]);
  
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
            variant="outlined"
            value={title}
          />
          <br /> <br />
          <TextField
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            variant="outlined"
            value={description}
          />
          <br /> <br />
          <TextField
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth={true}
            variant="outlined"
            value={image}
          />
          <br /> <br />
          <TextField
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth={true}
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
                  price: price,
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
                    price: price,
                    published: true,
                  };
                  props.setCourse(updatedCourse);
                });
              alert("Course Updated!");
              navigate("/Courses");
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
