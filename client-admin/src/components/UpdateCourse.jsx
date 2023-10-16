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
