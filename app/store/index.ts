import { configureStore } from "@reduxjs/toolkit";

import { wsSlice } from "~/store/slices/ws.slice";
import { projectsSlice } from "~/store/slices/projects.slice";
import { profileSlice } from "~/store/slices/profile.slice";
import { modalSlice } from "~/store/slices/modal.slice";
import { chatSlice } from "~/store/slices/chat.slice";
import { savedMessagesSlice } from "~/store/slices/saved-messages.slice";
import { uiSlice } from "~/store/slices/ui.slice";
import { settingsSlice } from "~/store/slices/settings.slice";

const store = configureStore({
  reducer: {
    [modalSlice.name]: modalSlice.reducer,
    [uiSlice.name]: uiSlice.reducer,
    [settingsSlice.name]: settingsSlice.reducer,
    [wsSlice.name]: wsSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [projectsSlice.name]: projectsSlice.reducer,
    [savedMessagesSlice.name]: savedMessagesSlice.reducer,
    [profileSlice.name]: profileSlice.reducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
