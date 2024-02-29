import { create } from "zustand";

const useLoginStore = create((set) => ({
  loginStatus: false,
  setLoginStatus: (arg) => {
    set((state) => ({ loginStatus: arg }));
  },
}));

export default useLoginStore;
