import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UpdateCourse from "./UpdateCourse";
import { atom } from "recoil";
import { BASE_URL } from "../config";

function Course() {
  let { courseId } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    fetch(`${BASE_URL}/admin/course/${courseId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error("Network response was not ok>>>>>>>>>>>>>>>>>");
        }
        return res.json();
      })
      .then((data ) => {
        if (data && data.course) {
          setCourse(data.course);
        } else {
          console.error("Course data not found in the response");
        }
      })
      .catch((error) => {
        console.error("Error fetching data>>>:", error);
      });
  }, [courseId]);
  console.log(course);
  return (
    <div>
      <UpdateCourse course={course} />
    </div>
  );
}

export default Course;

const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
