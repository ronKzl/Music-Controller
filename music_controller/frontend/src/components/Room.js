import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";

const Room = () => {
  const [parameters, setParameters] = useState({
    votesToSkip: 1,
    guestCanPause: false,
    isHost: false,
  });
  const { roomCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController instance
    const signal = controller.signal; // Get the signal from the controller

    const getRoomDetails = async () => {
      try {
        const response = await fetch("/api/get-room?code=" + roomCode, {
          signal,
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok:`);
        }
        const data = await response.json();

        setParameters({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      } catch (error) {
        navigate("/");
        console.error("Error fetching room details:", error);
      }
    };

    getRoomDetails();

    return () => {
      controller.abort(); // Abort the fetch request when the component unmounts
    };
  }, [roomCode, navigate]);

  function handleLeaveRoom() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      navigate(`/`);
    });
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h5" component="h5">
          Votes: {parameters.votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h5" component="h5">
          Guest Can Pause: {parameters.guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h5" component="h5">
          Host: {parameters.isHost.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={handleLeaveRoom}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default Room;
