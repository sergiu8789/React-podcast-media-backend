// import { url } from "inspector";
import { useEffect, useState } from "react";

export const useAudio = (url) => {
  // console.log("alg:", url)
  const [audio, setAudio] = useState<HTMLAudioElement>(new Audio(url));
  const [playing, setPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [time, setTime] = useState<number>(audio.currentTime);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    audio.currentTime = 0;
    audio.pause();
    audio.remove();
    setAudio(new Audio(url));
    
  }, [url]);

  useEffect(() => {
    // console.log(audio)
    if (playing) {
      audio.load();
      audio.play();
    }
  }, [audio]);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);
  useEffect(() => {
    audio.addEventListener("timeupdate", () => {
      setTime(audio.currentTime);
      setDuration(audio.duration);
    });
  }, [progress, audio]);
  useEffect(() => {
    setProgress((time / duration) * 100);
  }, [time]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);
  return [playing, toggle, progress, audio, duration, setPlaying];
};
