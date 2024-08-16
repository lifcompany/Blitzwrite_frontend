import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    unreadCount: 0,
  },
  reducers: {
    // addNotification: (state, action) => {
    //   state.notifications.push({ content: action.payload, read: false });
    //    state.unreadCount += 1;
    // },

    setNotifications: (state, action) => {
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(noti => !noti.read).length;
      },

    clearNotifications: (state) => {
        state.notifications = [];
        state.unreadCount = 0;
      },
    markAllAsRead: (state) => {
      state.notifications.forEach(noti => noti.read = true);
      state.unreadCount = 0;
    },
  },
});

export const { setNotifications,clearNotifications, markAllAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
