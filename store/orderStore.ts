import { create } from "zustand";

interface Order {
  user: any;
  image: string;
  paper: any;
  frame: any;
  size: any;
  pincode: number;
  price: number;
  totalAmount: number;
  shippingAddress: string;
  setOrder: (order: Partial<Order>) => void;
  clearOrder: () => void;
  setUser: (user: any) => void;
  setImage: (image: string) => void;
  setPaper: (paper: any) => void;
  setFrame: (frame: any) => void;
  setSize: (size: any) => void;
  setPincode: (pincode: number) => void;
  setPrice: (price: number) => void;
  setTotalAmount: (totalAmount: number) => void;
  setShippingAddress: (shippingAddress: string) => void;
}

const useOrderStore = create<Order>((set) => ({
  user: "",
  image: "",
  paper: {},
  frame: "",
  size: {},
  pincode: 0,
  price: 0,
  totalAmount: 0,
  shippingAddress: "",
  setOrder: (order) => set((state) => ({ ...state, ...order })),
  clearOrder: () =>
    set({
      user: "",
      image: "",
      paper: {},
      frame: "",
      size: {},
      price: 0,
      totalAmount: 0,
      shippingAddress: "",
    }),
  setUser: (user) => set({ user }),
  setImage: (image) => set({ image }),
  setPaper: (paper) => set({ paper }),
  setFrame: (frame) => set({ frame }),
  setSize: (size) => set({ size }),
  setPincode: (pincode) => set({pincode}),
  setPrice: (price) => set({ price }),
  setTotalAmount: (totalAmount) => set({ totalAmount }),
  setShippingAddress: (shippingAddress) => set({ shippingAddress }),
}));

export default useOrderStore;
