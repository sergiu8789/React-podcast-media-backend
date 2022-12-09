import React from "react";
import Card from "@mui/material/Card";
import CloseIcon from "@mui/icons-material/Close";
import playList from "./SongList.tsx";
import SongWithCover from "./SongWithCover.tsx"
import Box from "@mui/material/Box";

import "./style.css";
export default function PlayList(props) {
  // console.log(playList);
  return (
    <Box  >
      <Card 
        sx={{
          position: "absolute",
          top: "55%",
          left: "12%",
          transform: "translate(-50%,-50%)",
          width: "25%",
          height: "90%",
          // borderRadius: "15px",
          border: "none",
          background: "#30343b",
          overflowY: "scroll",
          '&::-webkit-scrollbar': {
            width: "5px",
            // background: "white"
         },
         
         '&::-webkit-scrollbar-thumb': {
          background: '#575757',
          paddingLeft: "5px",
          borderRadius: "10px"
        }
        }}
      >
        {/* <CloseIcon
          sx={{
            color: "#FFFFFF",
            cursor: "pointer",
            height: "2rem",
            width: "2rem",
            padding: "1rem",
          }}
          onClick={() => props.close()}
        /> */}
        {playList.map((element,i)=>{
          return <SongWithCover key={i} songL={element} setSong={props.songlistItem} />
        })}
      </Card>
    </Box>
  );
}
