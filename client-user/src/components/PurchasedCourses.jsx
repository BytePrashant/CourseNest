import { useEffect, useState } from "react";
import "../index.css";
import "./coursesStyles.css";
import CourseCard from "./CourseCard";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

function PurchasedCourses() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3000/user/purchasedCourses`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPurchasedCourses(res.data.purchasedCourses);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Typography
        variant="h4"
        component="div"
        style={{
          flexGrow: 1,
          padding: "10px",
          borderRadius: "4px",
          fontWeight: "bold",
          color: "#101460",
          textAlign: "center",
          marginTop: "70px",
          marginLeft: "230px",
        }}
      >
        Purchased Courses
      </Typography>
      <div className="all-courses">
        {isLoading ? (
          <div style={{ display: "flex", gap: "20px" }}>
            <Skeleton variant="rectangular" width={345} height={400} />
            <Skeleton variant="rectangular" width={345} height={400} />
            <Skeleton variant="rectangular" width={345} height={400} />
          </div>
        ) : (
          <>
            {purchasedCourses.length > 0
              ? purchasedCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))
              : "No course has yet been bought!"}
          </>
        )}
      </div>
    </div>
  );
}

export default PurchasedCourses;
