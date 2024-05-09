import { configureStore } from "@reduxjs/toolkit";
import VersionSlice from "../features/common/VersionSlice";

const combinedReducer = {
    version: VersionSlice,
};

export default configureStore({
  reducer: combinedReducer,
});