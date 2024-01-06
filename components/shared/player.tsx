'use client';
import { useStore } from '@/store';
import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TbPlayerSkipBackFilled } from 'react-icons/tb';
import { TbPlayerSkipForwardFilled } from 'react-icons/tb';
import { TbPlayerPauseFilled } from 'react-icons/tb';
import { TbPlayerPlayFilled } from 'react-icons/tb';

const Player = () => {
  const refAudio = useRef<HTMLAudioElement | null>(null);
  const [pause, setPause] = useState(true);
  const [time, setTime] = useState(0);
  const { changeTrack } = useStore();

  const onPause = () => {
    if (refAudio.current) {
      if (pause) {
        setPause(false);
        refAudio.current.play();
      } else {
        setPause(true);
        refAudio.current.pause();
      }
    }
  };

  useEffect(() => {
    setInterval(() => {
      if (refAudio.current) {
        setTime(refAudio.current.currentTime);
      }
    }, 1000);
  }, [refAudio]);

  const changeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    if (refAudio.current) {
      refAudio.current.currentTime = Number(e.target.value);
    }
  };

  return (
    <div className="fixed bottom-[24px] w-[90vw] left-0 right-0 mx-auto flex  flex-col space-y-2 mt-10">
      <div className="text-[18px] flex items-center space-x-4 justify-between mx-5">
        <div>
          {changeTrack
            ? '--:--'
            : String(Math.floor(time / 60)).padStart(2, '0') +
              ':' +
              String(Math.floor(time % 60)).padStart(2, '0')}
        </div>
        <div className="w-[70vw] text-[24px] font-[600]">
          {changeTrack?.name}
        </div>
        <div className="flex items-center">
          {!refAudio?.current?.duration
            ? '--:--'
            : Math.floor(refAudio?.current?.duration / 60) +
              ':' +
              Math.floor(refAudio?.current?.duration % 60)}
        </div>
      </div>
      <audio src="http://localhost:3000/qattu.mp3" ref={refAudio}></audio>
      <input
        max={
          Number.isNaN(refAudio?.current?.duration)
            ? 0
            : refAudio?.current?.duration
        }
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
            <button onClick={onPause}>
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
