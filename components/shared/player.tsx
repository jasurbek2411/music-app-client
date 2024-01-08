"use client";
import { useStore } from "@/store";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { TbPlayerSkipBackFilled } from "react-icons/tb";
import { TbPlayerSkipForwardFilled } from "react-icons/tb";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { TbPlayerPlayFilled } from "react-icons/tb";

const Player = () => {
  const [pause, setPause] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState<number | undefined>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { changeTrack, tracks, setChangeTrack } = useStore();

  useEffect(() => {
    if (changeTrack) {
      audioRef.current?.play();
      setPause(false);
    }
  }, [audioRef, changeTrack]);

  useEffect(() => {
    setDuration(audioRef.current?.duration);
    setInterval(() => {
      if (audioRef.current) {
        setTime(Math.ceil(audioRef?.current?.currentTime));
      }
    }, 1000);
  }, [audioRef.current?.currentTime]);

  const onPause = () => {
    if (pause) {
      setPause(false);
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else {
      setPause(true);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  };

  const changeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };

  const handlerNext = () => {
    tracks.forEach((audio, i) => {
      if (audio === changeTrack) {
        if (tracks.length === i + 1) {
          setChangeTrack(tracks[0]);
        } else {
          setChangeTrack(tracks[i + 1]);
        }
      }
    });
  };

  const handlerBack = () => {
    tracks.forEach((audio, i) => {
      if (audio === changeTrack) {
        if (i === 0) {
          setChangeTrack(tracks[tracks.length - 1]);
        } else {
          setChangeTrack(tracks[i - 1]);
        }
      }
    });
  };

  return (
    <div className="fixed bottom-[24px] w-[90vw] left-0 right-0 mx-auto flex  flex-col space-y-2 mt-10">
      <div className="text-[18px] flex items-center space-x-4 justify-between mx-5">
        <div className="w-[10%]">
          {!changeTrack
            ? "--:--"
            : String(Math.floor(time / 60)).padStart(2, "0") +
              ":" +
              String(Math.floor(time % 60)).padStart(2, "0")}
        </div>
        <div className="w-[70vw] text-[24px] font-[600]">
          {changeTrack?.name}
        </div>
        <div className="flex items-center">
          {!changeTrack
            ? "--:--"
            : String(Math.floor(duration! / 60)).padStart(2, "0") +
              ":" +
              String(Math.floor(duration! % 60)).padStart(2, "0")}
        </div>
      </div>
      <input
        max={Number.isNaN(duration) ? 0 : duration}
        min={0}
        className="cursor-pointer"
        type="range"
        value={time}
        onChange={changeProgress}
      />

      <audio
        ref={audioRef}
        src={changeTrack ? `http://localhost:5000/${changeTrack?.audio}` : ""}
      />

      <div className="mx-auto flex items-center space-x-4 justify-center ">
        <div className="" onClick={handlerBack}>
          <TbPlayerSkipBackFilled className="text-[48px] cursor-pointer hover:text-white/80 transition-all duration-300" />
        </div>
        <div>
          {pause ? (
            <button disabled={!changeTrack} onClick={onPause}>
              <TbPlayerPlayFilled className="text-[64px] cursor-pointer hover:text-white/80 transition-all duration-300" />
            </button>
          ) : (
            <button onClick={onPause}>
              <TbPlayerPauseFilled className="text-[64px] cursor-pointer hover:text-white/80 transition-all duration-300" />
            </button>
          )}
        </div>
        <div onClick={handlerNext}>
          <TbPlayerSkipForwardFilled className="text-[48px] cursor-pointer hover:text-white/80 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Player;
