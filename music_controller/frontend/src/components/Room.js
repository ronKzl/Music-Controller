import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Room = () => {
  const [parameters, setParameters] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });
  const { roomCode } = useParams();

  useEffect(() => {
    getRoomDetails();
  }, [roomCode]);

  function getRoomDetails() {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => response.json())
      .then((data) => {
        setParameters({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }

  return (
    <div>
      <h3>{roomCode}</h3>
      <p>Votes: {parameters.votesToSkip}</p>
      <p>Guest Can Pause: {parameters.guestCanPause.toString()}</p>
      <p>Host: {parameters.isHost.toString()}</p>
    </div>
  );
};

export default Room;
