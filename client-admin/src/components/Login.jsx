import { Typography, Button, Card, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <Typography variant={"h6"}>Welcome back. Log in below</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br /> <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
          />
          <br /> <br />
          <Button
            size="large"
            variant="contained"
            onClick={async () => {
              const res = await axios.post(
                "https://nudemy-backend.vercel.app/admin/login",
                {
                  username: email,
                  password: password,
                }
              );
              localStorage.setItem("token", res.data.token);
              window.location = "/courses";
            }}
            style={{ color: "#ffffff" }}
          >
            Log In
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Login;
