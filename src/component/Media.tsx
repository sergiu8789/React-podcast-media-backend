import React, { useState, useContext } from "react";
import Context from "../context/CreateContext.tsx";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Slider from "@mui/material/Slider";
import Replay10Icon from "@mui/icons-material/Replay10";
import Button from "@mui/material/Button";
import Forward30Icon from "@mui/icons-material/Forward30";
import Box from "@mui/material/Box";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useEffect } from "react";
import { useAudio } from "../customHooks/audioHooks.ts";
import PlayList from "./PlayList.tsx";
import img from "../img/music.jpeg";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Media() {
  const navigate = useNavigate();

  if (localStorage.getItem("auth-token") === null) {
    navigate("/login");
  }

  const { songname, cover, setPlaySong } = useContext<{
    songname: string;
    cover: string;
    setPlaySong: Function;
  }>(Context);
  const [playing, toggle, progress, audio, duration, setPlaying] =
    useAudio(songname);
  if (audio.currentTime === duration) {
    setPlaySong(false);
  } else {
    setPlaySong(playing);
  }
  const [totalVol, setTotalVol] = useState<number>(100);
  const songName: string = songname.split("/")[songname.split("/").length - 1];
  const [minut, setMinut] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [hour, setHour] = useState<number>(0);
  const [currentsec, setcurrentsec] = useState<number>(0);
  const sec = currentsec - Math.floor(currentsec / 60) * 60;
  useEffect(() => {
    setHour(Math.floor(duration / 3600));
    setMinut(Math.floor(duration / 60) - hour * 60);
    if (hour > 0) {
      setSeconds(Math.floor(duration) - hour * 60 * 60);
    } else {
      setSeconds(Math.floor(duration) - minut * 60);
    }
      setcurrentsec(Math.floor(audio.currentTime));
  }, [audio.currentTime]);
    const moveNext30 = (): void => {
    audio.currentTime = audio.currentTime + 30;
  };

  const moveBack10 = (): void => {
    audio.currentTime = audio.currentTime - 10;
  };
  const handleVolumeChange = (e): void => {
    setTotalVol(e.target.value);
    audio.volume = e.target.value / 100;
  };
  const [increase, setIncrease] = useState<number>(1);
  const icreeaseSpeed = (): void => {
    setIncrease((preVal) => preVal + 0.25);
  };
  const decressesSpeed = (): void => {
    setIncrease((preVal) => preVal - 0.25);
  };
  audio.playbackRate = increase;
  return (
    <>
      <PlayList />
      <div className="card">
        <Card
          sx={{
            width: "100%",
            height: "40rem",
            borderRadius: "15px",
            border: "none",
            background: "#30343b",
          }}
        >
          {cover === "" ? (
            <CardMedia
              component="img"
              height="140"
              image={img}
              alt="green iguana"
              sx={{ width: "100%", height: "80%" }}
            />
          ) : (
            <CardMedia
              component="img"
              height="140"
              image={cover}
              alt="green iguana"
              sx={{ width: "100%", height: "80%" }}
            />
          )}
          <span
            style={{
              position: "absolute",
              top: "2rem",
              left: "52%",
              transform: "translate(-50%,-50%)",
              color: "white",
              fontSize: "16px",
            }}
          >
            <h4>{songName}</h4>
          </span>

          <Box>
            <Slider
              aria-label="Temperature"
              defaultValue={30}
              value={progress}
              sx={{
                position: "absolute",
                left: "6.5rem",
                top: "32.9rem",
                width: "80%",
                color: "gray",
                height: "0.7rem",
              }}
            />
          </Box>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              position: "relative",
            }}
          >
            <Box>
              <span
                style={{
                  position: "absolute",
                  top: "3.6rem",
                  left: "6rem",
                  color: "#cccccc",
                  fontSize: "1.6rem",
                }}
              >
                {increase}X
              </span>
              <Button
                sx={{
                  position: "absolute",
                  left: "12.3rem",
                  top: "4rem",
                  minWidth: "1.7rem",
                  fontSize: "2rem",
                  color: "#cccccc",
                  height: "1.7rem",
                  padding: "0rem",
                  border: "3px solid #cccccc",
                }}
                onClick={icreeaseSpeed}
              >
                +
              </Button>
              {increase === 0 ? (
                <Button
                  disabled
                  sx={{
                    position: "absolute",
                    left: "10.2rem",
                    top: "4rem",
                    minWidth: "1.7rem",
                    fontSize: "2rem",
                    color: "#cccccc",
                    height: "1.7rem",
                    padding: "0rem",
                    border: "3px solid #cccccc",
                  }}
                  onClick={decressesSpeed}
                >
                  -
                </Button>
              ) : (
                <Button
                  sx={{
                    position: "absolute",
                    left: "10.2rem",
                    top: "4rem",
                    minWidth: "1.7rem",
                    fontSize: "2rem",
                    color: "#cccccc",
                    height: "1.7rem",
                    padding: "0rem",
                    border: "3px solid #cccccc",
                  }}
                  onClick={decressesSpeed}
                >
                  -
                </Button>
              )}
              {playing === false ? (
                <PlayCircleIcon
                  sx={{
                    height: "6rem",
                    width: "6rem",
                    cursor: "pointer",
                    position: "absolute",
                    top: "0.4rem",
                    left: "0rem",
                    color: "#cccccc",
                  }}
                  onClick={toggle}
                ></PlayCircleIcon>
              ) : (
                <PauseCircleIcon
                  sx={{
                    height: "6rem",
                    width: "6rem",
                    cursor: "pointer",
                    position: "absolute",
                    top: "0.4rem",
                    left: "0rem",
                    color: "#cccccc",
                  }}
                  onClick={toggle}
                ></PauseCircleIcon>
              )}
            </Box>

            <Box sx={{ position: "absolute", left: "12.5rem", top: "0rem" }}>
              <Replay10Icon
                sx={{
                  color: "#cccccc",
                  height: "3rem",
                  width: "3rem",
                  cursor: "pointer",
                  position: "absolute",
                  top: "3.5rem",
                  left: "2rem",
                }}
                onClick={moveBack10}
              ></Replay10Icon>
              <Forward30Icon
                sx={{
                  color: "#cccccc",
                  height: "3rem",
                  width: "3rem",
                  cursor: "pointer",
                  position: "absolute",
                  top: "3.5rem",
                  left: "4.5rem",
                }}
                onClick={moveNext30}
              ></Forward30Icon>
            </Box>
            <VolumeUpIcon
              sx={{
                color: "#cccccc",
                height: "3rem",
                width: "3rem",
                cursor: "pointer",
                position: "absolute",
                top: "3.5rem",
                left: "20.5rem",
              }}
            ></VolumeUpIcon>
            <div
              style={{
                color: "#cccccc",
                position: "absolute",
                right: "4.5rem",
                top: "4rem",
                fontSize: "1rem",
              }}
            >
              {Math.floor(currentsec / 60) > 9 ? (
                <span>{Math.floor(currentsec / 60)}</span>
              ) : (
                <span>0{Math.floor(currentsec / 60)}</span>
              )}
              :{sec > 9 ? <span>{sec}</span> : <span>0{sec}</span>}/
            </div>
            <div
              style={{
                color: "#cccccc",
                position: "absolute",
                right: "2rem",
                top: "4rem",
                fontSize: "1rem",
              }}
            >
              {/* {hour > 9 ? <span>{hour}</span> : <span>0{hour}</span>}: */}
              {minut > 9 ? <span>{minut}</span> : <span>0{minut}</span>}:
              {seconds > 9 ? <span>{seconds}</span> : <span>0{seconds}</span>}
            </div>
            <Slider
              value={totalVol}
              aria-label="Volume"
              sx={{
                width: "7rem",
                position: "absolute",
                left: "23.5rem",
                top: "4rem",
                color: "grey",
              }}
              onChange={handleVolumeChange}
            />
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </div>
    </>
  );
}
