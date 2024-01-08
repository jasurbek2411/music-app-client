"use clinet";
import React, { useState } from "react";
import { MdAlbum } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import List from "./list";
import { Input } from "../ui/input";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../ui/button";
import { useStore } from "@/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAddAudio } from "@/app/hooks/useAddAudio";

const Info = () => {
  const [changePicture, setChangePicture] = useState(false);
  const [changeAudio, setChangeAudio] = useState(false);

  const { isOpen, onClose, onOpen } = useAddAudio();

  const { handleSubmit, control, register } = useForm();
  const { tracks } = useStore();

  const { refresh } = useRouter();

  const handleFormSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("picture", data.picture[0]);
    formData.append("audio", data.audio[0]);
    formData.append("name", data.name);
    formData.append("artist", data.artist);
    formData.append("text", data.text);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}`, formData);
      refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pt-4 flex items-center space-x-4 justify-end">
      <div>
        <Dialog open={isOpen}>
          <DialogTrigger
            onClick={onOpen}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <IoIosAddCircle className="text-white text-[48px] group-hover:text-white/80 transition-all duration-300" />
            Add
          </DialogTrigger>
          <DialogContent className="bg-neutral-700 rounded-none">
            <DialogHeader>
              <DialogTitle className="text-white font-[500]">
                Add track:
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-2 outline-none test max-h-[400px]">
              <form
                className="flex flex-col space-y-3"
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                <Input
                  placeholder="Track name"
                  {...register("name", {
                    required: "Please write the track name",
                  })}
                />
                <Input
                  placeholder="Artist name"
                  {...register("artist", {
                    required: "Please write the artist name",
                  })}
                />
                <Input
                  placeholder="Text"
                  {...register("text", {
                    required: "Please write the text",
                  })}
                />
                <label className="flex items-center" htmlFor="picture">
                  <Controller
                    control={control}
                    name="picture"
                    render={({ field }) => (
                      <Input
                        type="file"
                        className="hidden"
                        id="picture"
                        onChange={(e) => {
                          field.onChange(e.target.files);
                          setChangePicture(true);
                        }}
                      />
                    )}
                  />
                  <div className="px-[20px] py-[12px] bg-white text-black rounded-md cursor-pointer">
                    Picture
                  </div>
                  <span className="ml-2 text-white">
                    {changePicture ? "Optional" : "Not optional"}
                  </span>
                </label>
                <label className="flex items-center" htmlFor="music">
                  <Controller
                    control={control}
                    name="audio"
                    render={({ field }) => (
                      <Input
                        type="file"
                        className="hidden"
                        id="music"
                        onChange={(e) => {
                          field.onChange(e.target.files);
                          setChangeAudio(true);
                        }}
                      />
                    )}
                  />
                  <div className="px-[20px] py-[12px] bg-white text-black rounded-md cursor-pointer">
                    Music
                  </div>
                  <span className="ml-2 text-white">
                    {changeAudio ? "Optional" : "Not optional"}
                  </span>
                </label>
                <Button variant={"secondary"}>Add</Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <Dialog>
          <DialogTrigger className="flex items-center space-x-2 cursor-pointer group">
            <MdAlbum className="text-white text-[48px] group-hover:text-white/80 transition-all duration-300" />
            Album
          </DialogTrigger>
          <DialogContent className="bg-neutral-700 rounded-none">
            <DialogHeader>
              <DialogTitle className="text-white font-[500]">
                Album:
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-2 overflow-y-scroll test max-h-[400px]">
              {tracks?.map((track, i) => (
                <List key={track._id} track={track} />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Info;
