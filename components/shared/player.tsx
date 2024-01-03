import React from "react";
import { Progress } from "@/components/ui/progress";
import { TbPlayerSkipBackFilled } from "react-icons/tb";
import { TbPlayerSkipForwardFilled } from "react-icons/tb";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { TbPlayerPlayFilled } from "react-icons/tb";

const Player = () => {
  return (
    <div className="flex flex-col space-y-2 mt-10">
      <div className="text-[18px] flex items-center space-x-4 justify-between">
        <div>2:34</div>
        <div className="w-[90vw] text-[24px] font-[600]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. In,
          similique.
        </div>
        <div>3:34</div>
      </div>
      <Progress value={33} className="text-white" />
      <div className="mx-auto flex items-center space-x-4 justify-center ">
        <div className="">
          <TbPlayerSkipBackFilled className="text-[48px] cursor-pointer hover:text-white/80 transition-all duration-300" />
        </div>
        <div>
          <div>
            <TbPlayerPauseFilled className="text-[64px] cursor-pointer hover:text-white/80 transition-all duration-300" />
          </div>
          <div className="hidden">
            <TbPlayerPlayFilled className="text-[64px] cursor-pointer hover:text-white/80 transition-all duration-300" />
          </div>
        </div>
        <div>
          <TbPlayerSkipForwardFilled className="text-[48px] cursor-pointer hover:text-white/80 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Player;
