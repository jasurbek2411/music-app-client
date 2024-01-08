import { ITrack } from "@/types";
import { create } from "zustand";

type Store = {
  tracks: ITrack[];
  changeTrack: ITrack | null;
  setChangeTrack: (track: ITrack | null) => void;
  setTracks: (tracks: ITrack[]) => void;
};

export const useStore = create<Store>()((set) => ({
  tracks: [],
  changeTrack: null,
  setChangeTrack: (changeTrack) => set(() => ({ changeTrack })),
  setTracks: (tracks) =>
    set(() => {
      const songs = tracks.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      return {
        tracks: songs,
      };
    }),
    
}));
