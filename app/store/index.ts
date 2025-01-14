import { configureStore } from "@reduxjs/toolkit";
import { wsSlice } from "~/store/slices/ws.slice";
import { projectsSlice } from "~/store/slices/projects.slice";
import { profileSlice } from "~/store/slices/profile.slice";

const store = configureStore({
  reducer: {
    [wsSlice.name]: wsSlice.reducer,
    [projectsSlice.name]: projectsSlice.reducer,
    [profileSlice.name]: profileSlice.reducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
