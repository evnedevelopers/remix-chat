import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";

import { wsSlice } from "~/store/slices/ws.slice";
import { projectsSlice } from "~/store/slices/projects.slice";
import { profileSlice } from "~/store/slices/profile.slice";
import { modalSlice } from "~/store/slices/modal.slice";
import { chatSlice } from "~/store/slices/chat.slice";
import { savedMessagesSlice } from "~/store/slices/saved-messages.slice";
import { uiSlice } from "~/store/slices/ui.slice";
import { settingsSlice } from "~/store/slices/settings.slice";
import { aiConversationSlice } from "~/store/slices/aiConversation.slice";
import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

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
    [aiConversationSlice.name]: aiConversationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type RootStore = typeof store;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  any
>;

export default store;
