"use clinet";
import React from "react";
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
import { ITrack } from "@/types";
import { Input } from "../ui/input";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../ui/button";

interface Props {
  tracks: ITrack[];
}

const Info = ({ tracks }: Props) => {
  const { handleSubmit, control, register } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="pt-4 flex items-center space-x-4 justify-end">
      <div>
        <Dialog>
          <DialogTrigger className="flex items-center space-x-2 cursor-pointer group">
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
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  placeholder="Track name"
                  {...register("name", {
                    required: "Please write the track name",
                  })}
                />
                <Input
                  placeholder="Artist name"
                  {...register("artis", {
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
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    )}
                  />
                  <div className="px-[20px] py-[12px] bg-white text-black rounded-md cursor-pointer">
                    Picture
                  </div>
                  <span className="ml-2 text-white">Not optional</span>
                </label>
                <label className="flex items-center" htmlFor="music">
                  <Controller
                    control={control}
                    name="track"
                    render={({ field }) => (
                      <Input
                        type="file"
                        className="hidden"
                        id="music"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    )}
                  />
                  <div className="px-[20px] py-[12px] bg-white text-black rounded-md cursor-pointer">
                    Music
                  </div>
                  <span className="ml-2 text-white">Not optional</span>
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
              {tracks?.map((track) => (
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
