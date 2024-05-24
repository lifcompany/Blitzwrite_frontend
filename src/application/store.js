import { configureStore } from "@reduxjs/toolkit";
import VersionSlice from "../features/common/VersionSlice";
import SiteSlice from "../features/common/SiteSlice";

const combinedReducer = {
    version: VersionSlice,
    site: SiteSlice,
};

export default configureStore({
  reducer: combinedReducer,
});