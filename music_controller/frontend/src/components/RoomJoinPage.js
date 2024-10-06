import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

const RoomJoinPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState({
    isError: false,
    errorMsg: "",
  });
  const navigate = useNavigate();

  function handleTextFieldChange(e) {
    setRoomCode(e.target.value);
  }

  function handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          // redirect user
          navigate(`/room/${roomCode}`);
        } else {
          setError({ isError: true, errorMsg: "Room Not Found" });
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <Grid container spacing={1} align="center">
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={error.isError}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={error.errorMsg}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
        <Grid item xs={12} style={{ paddingTop: "8px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRoomButtonPressed}
          >
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: "8px" }}>
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RoomJoinPage;
