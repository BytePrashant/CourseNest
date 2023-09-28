import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UpdateCourse from "./UpdateCourse";
import {
  atom,
} from "recoil";

function Course() {
  let { courseId } = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/admin/courses/${courseId}`, {
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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [courseId]);

  return (
    <div>
      <UpdateCourse course={course} setCourse={setCourse} />
    </div>
  );
}

export default Course;

const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
