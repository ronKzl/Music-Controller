import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

const CreateRoomPage = () => {
  const [parameters, setParameters] = useState({
    votesToSkip: 2,
    guestCanPause: true,
  });

  const navigate = useNavigate();

  function handleVotesChange(e) {
    setParameters({ ...parameters, votesToSkip: e.target.value });
  }

  function handleGuestCanPauseChange() {
    setParameters({ ...parameters, guestCanPause: !parameters.guestCanPause });
  }

  /*
  Sends POST request with state params to Django backend and gets response to console log
  guest_can_pause - true/false if guest users in a room can pause
  votes_to_skip - integer number equal or bigger to 1 indicating how many skips are needed for next song
   */
  function handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_can_pause: parameters.guestCanPause,
        votes_to_skip: parameters.votesToSkip,
      }),
    };
    fetch("/api/create-room/", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate(`/room/${data.code}`));
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create A Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText style={{ textAlign: "center" }}>
            Guest Control of Playback State
          </FormHelperText>
          <RadioGroup
            row
            value={parameters.guestCanPause.toString()}
            onChange={() => handleGuestCanPauseChange()}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            onChange={handleVotesChange}
            value={parameters.votesToSkip}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
          />
          <FormHelperText style={{ textAlign: "center" }}>
            Votes Required To Skip Song
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >
          Create A Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateRoomPage;
