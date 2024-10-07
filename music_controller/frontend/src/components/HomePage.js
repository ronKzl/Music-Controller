import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Grid, Button, ButtonGroup } from "@material-ui/core";

const HomePage = () => {
  //need to check if user is already in a room then redirect them into it
  const [roomCode, setRoomCode] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      fetch("/api/user-in-room")
        .then((response) => response.json())
        .then((data) => {
          setRoomCode(data.code);
        });
    };

    fetchData();
    console.log(roomCode);
  }, []);

  useEffect(() => {
    if (roomCode != null) {
      navigate(`/room/${roomCode}`);
    }
  }, [roomCode, navigate]);

  function renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" component="h3">
            Beach Blast Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  return renderHomePage();
};

export default HomePage;
