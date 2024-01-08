import { create } from "zustand";

type IHooks = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useAddAudio = create<IHooks>()((set) => ({
  isOpen: false,
  onClose: () =>
    set(() => ({
      isOpen: false,
    })),
  onOpen: () =>
    set(() => ({
      isOpen: true,
    })),
}));
