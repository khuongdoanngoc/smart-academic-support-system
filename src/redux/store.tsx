import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {},
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: (selector: (state: RootState) => any) => any =
    useSelector;
