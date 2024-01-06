"use client";
import Info from "@/components/shared/info";
import Player from "@/components/shared/player";
import Text from "@/components/shared/text";
import { useQuery } from "react-query";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useStore } from "@/store";
import { ITrack } from "@/types";

const Page = () => {
  const { tracks, setTracks } = useStore();

  // const { data, isLoading, isError } = useQuery("tracks", async () => {
  //   try {
  //     const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}`);
  //     const data = response.data;
  //     setTracks(data);
  //   } catch (error) {
  //     const res = error as Error;
  //     console.log(res.message);
  //   }
  // });


  return (
    <div className="container mx-auto text-white ">
      {/* {isLoading && (
        <div className="w-screen h-screen absolute bg-black/70 left-0 top-0 flex items-center justify-center ">
          <FaSpinner className="text-[32px] animate-spin" />
        </div>
      )} */}
      <div className="flex flex-col">
        <Info tracks={tracks} />
        {/* <Text /> */}
        <Player />
      </div>
    </div>
  );
};

export default Page;
