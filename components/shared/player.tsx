"use client";
import { useStore } from "@/store";
import React, { ChangeEvent, useEffect, useState } from "react";
import { TbPlayerSkipBackFilled } from "react-icons/tb";
import { TbPlayerSkipForwardFilled } from "react-icons/tb";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { TbPlayerPlayFilled } from "react-icons/tb";

let audio: HTMLAudioElement;

const Player = () => {
  const [pause, setPause] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const { changeTrack } = useStore();

  if (!audio) {
    audio = new Audio();
  }

  useEffect(() => {
    if (changeTrack) {
      audio.src = `http://localhost:5000/${changeTrack.audio}`;
      audio.play();
      setPause(false);
    }
  }, [changeTrack]);

  const onPause = () => {
    if (pause) {
      setPause(false);
      audio.play();
    } else {
      setPause(true);
      audio.pause();
    }
  };

  setInterval(() => {
    setTime(Math.ceil(audio.currentTime));
  }, 1000);
  
  setTimeout(() => {
    setDuration(Math.ceil(audio.duration));
  }, 5);

  const changeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
  };

  return (
    <div className="fixed bottom-[24px] w-[90vw] left-0 right-0 mx-auto flex  flex-col space-y-2 mt-10">
      <div className="text-[18px] flex items-center space-x-4 justify-between mx-5">
        <div>
          {!changeTrack
            ? "--:--"
            : Math.floor(time / 60) + ":" + Math.floor(time % 60)}
        </div>
        <div className="w-[70vw] text-[24px] font-[600]">
          {changeTrack?.name}
        </div>
        <div className="flex items-center">
          {!changeTrack
            ? "--:--"
            : Math.floor(duration / 60) + ":" + Math.floor(duration % 60)}
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

      <div className="mx-auto flex items-center space-x-4 justify-center ">
        <div className="">
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
        <div>
          <TbPlayerSkipForwardFilled className="text-[48px] cursor-pointer hover:text-white/80 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Player;
