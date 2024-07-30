import { configureStore } from "@reduxjs/toolkit";
import VersionSlice from "../features/VersionSlice";
import SiteSlice from "../features/SiteSlice";

const combinedReducer = {
    version: VersionSlice,
    site: SiteSlice,
};

export default configureStore({
  reducer: combinedReducer,
});