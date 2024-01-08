"use client";
import Info from "@/components/shared/info";
import Player from "@/components/shared/player";
import { useQuery } from "react-query";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useStore } from "@/store";

const Page = () => {
  const { setTracks } = useStore();

  const { isLoading } = useQuery("tracks", async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}`);
      const data = response.data;
      setTracks(data);
    } catch (error) {
      const res = error as Error;
      console.log(res.message);
    }
  });

  return (
    <div className="container mx-auto text-white ">
      {isLoading && (
        <div className="w-screen h-screen absolute bg-black/70 left-0 top-0 flex items-center justify-center ">
          <FaSpinner className="text-[32px] animate-spin" />
        </div>
      )}
      <div className="flex flex-col">
        <Info />
        <Player />
      </div>
    </div>
  );
};

export default Page;
