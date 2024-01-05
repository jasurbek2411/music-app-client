"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { HiDotsVertical } from "react-icons/hi";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Trash } from "lucide-react";
import { ITrack } from "@/types";
import { useStore } from "@/store";

interface Props {
  track: ITrack;
}

const List = ({ track, }: Props) => {
  const { setChangeTrack } = useStore();

  const onClick = (track: ITrack) => {
    setChangeTrack(track);
  };




  return (
    <div
      onClick={() => onClick(track)}
      className="flex items-center w-full justify-between hover:bg-neutral-800/50 p-1 transition rounded-sm cursor-pointer duration-300"
    >
      <Avatar>
        <AvatarImage src={`http://localhost:5000/${track.picture}`} alt="A" />
        <AvatarFallback>{track.name[0]}</AvatarFallback>
      </Avatar>
      <h2 className="text-white ml-4 w-[80%]">{track.name}</h2>
      <div className="flex items-center w-auto justify-end">
        <Popover>
          <PopoverTrigger>
            <HiDotsVertical className="text-white" />
          </PopoverTrigger>
          <PopoverContent className="p-2 max-w-[150px] bg-neutral-800">
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-slate-900 p-1 rounded-md transition-all duration-300">
              <Trash size={20} className="text-white" />
              <span className="text-white">Trash</span>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default List;
