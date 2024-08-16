import { configureStore } from "@reduxjs/toolkit";
import VersionSlice from "../features/VersionSlice";
import SiteSlice from "../features/SiteSlice";
import notificationSlice from "../features/notificationSlice";

const combinedReducer = {
    version: VersionSlice,
    site: SiteSlice,
    notifications: notificationSlice, 
};

export default configureStore({
  reducer: combinedReducer,
});