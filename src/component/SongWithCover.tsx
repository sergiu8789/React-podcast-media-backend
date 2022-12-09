import React, { useContext, useState,useEffect } from "react";
import img from "../img/music.jpeg";
import Box from "@mui/material/Box";
import Context from "../context/CreateContext.tsx";
import { useAudio } from "../customHooks/audioHooks.ts";
import wave from "../img/wave.gif"

export default function SongWithCover(props) {
  const { setSongname, setCover, songname, playSong } = useContext<{
    setSongname: Function;
    setCover: Function;
    setColor: Function;
    songname: string;
    playSong: boolean;
  }>(Context);
  const [playing, toggle, progress, audio, duration,setPlaying] = useAudio(songname);
  // const [color, setColor] = useState<string>("#30343b");
  const [currentSongName, setCurrentSongName] = useState(props.songL.song);

  useEffect(() => {
    setCurrentSongName(props.songL.song);
    
  }, [props])
  
  const handleSongList = () => {
    setSongname(props.songL.song);
    setCover(props.songL.cover);
    
  };
  
 
  return (
    <Box
      sx={{
        width: "90%",
        margin: "auto",
        height: "4rem",
        background: songname === currentSongName ? "#5d5d5d" : "#30343b",
        marginLeft: "1rem",
        marginTop: "1rem",
        cursor: "pointer",
      }}
      onClick={handleSongList}
    >
      
        {songname===currentSongName&&playSong===true?<img
          style={{
            height: "100%",
            width: "4rem",
            borderRadius: "50%"
            
          }}
          src={wave}
          alt=""
        />:<img
        style={{
          height: "100%",
          width: "4rem",
          borderRadius: "50%",
          
        }}
        src={props.songL.cover}
        alt=""
      />}
      <span
        style={{
          marginTop: "1rem",
          color: "#FFFFFF",
          position: "absolute",
          left: "6.2rem",
          fontSize: "15px",
          // top: "10rem"
        }}
      >
        {currentSongName.split("/")[currentSongName.split("/").length - 1]}
      </span>
    </Box>
  );
}
