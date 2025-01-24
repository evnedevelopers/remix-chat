import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  ChangeChatActionPayload,
  ChangePhotoActionPayload,
  FillProfileActionPayload,
  FillTokensSettingsActionPayload,
  IScaleImage,
  UpdateGuidanceActionPayload
} from "~/store/typedefs";
import { IProjects, ISubscription, IUser } from "~/utils/typedefs";

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isFetching: false,
    isProfileFetched: false,
    isTokensFetched: false,
    profile: null as IUser | null,
    isUserInfoDirty: false,
    isUserPasswordDirty: false,
    scaleImage: null as IScaleImage | null,
    amountOfUsers: 1,
    showProfileTooltip: false,
    isDatasetsOpen: false,
    currentDataset: null as IProjects | null,
    scrollTo: null as string | null,
  },
  reducers: {
    startFetching(state) {
      state.isFetching = true;
    },
    setProfileFetched(state) {
      state.isProfileFetched = true;
    },
    setTokensFetched(state) {
      state.isTokensFetched = true;
    },
    setScaleImage(state, action: PayloadAction<IScaleImage | null>) {
      state.scaleImage = action.payload;
    },
    setScrollTo(state, action: PayloadAction<string | null>) {
      state.scrollTo = action.payload;
    },
    stopFetching(state) {
      state.isFetching = false;
    },
    showProfileTooltip(state) {
      state.showProfileTooltip = true;
    },
    closeProfileTooltip(state) {
      state.showProfileTooltip = false;
    },
    fillProfile(state, action: PayloadAction<FillProfileActionPayload>) {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      } else {
        state.profile = action.payload;
      }
    },
    setUserInfoDirty(state, action: PayloadAction<boolean>) {
      state.isUserInfoDirty = action.payload;
    },
    setAmountOfUsers(state, action: PayloadAction<number>) {
      state.amountOfUsers = action.payload;
    },
    setUserPasswordDirty(state, action: PayloadAction<boolean>) {
      state.isUserPasswordDirty = action.payload;
    },
    clearData(state) {
      state.profile = null;
      state.currentDataset = null;
      localStorage.clear();
      sessionStorage.clear();
    },
    updateSubscription(state, action: PayloadAction<ISubscription>) {
      if (state.profile) {
        state.profile = {
          ...state.profile,
          tokens: action.payload?.tokens ?? state.profile.tokens,
          subscription: {
            ...action.payload,
          },
        };
      }
    },
    cancelSubscription(state) {
      if (state?.profile?.subscription) {
        state.profile = {
          ...state.profile,
          subscription: {
            ...state.profile.subscription,
            paypal_status: 'CANCELLED',
          },
        };
      }
    },
    changePhoto(state, action: PayloadAction<ChangePhotoActionPayload>) {
      if (state.profile) {
        state.profile = {
          ...state.profile,
          ...action.payload,
        };
      }
    },
    setDatasetsOpen(state) {
      state.isDatasetsOpen = true;
    },
    setDatasetsClosed(state) {
      state.isDatasetsOpen = false;
    },
    setCurrentDataset(state, action: PayloadAction<IProjects | null>) {
      state.currentDataset = action.payload;
    },
    updateGuidance(state, action: PayloadAction<UpdateGuidanceActionPayload>) {
      if (state.currentDataset) {
        state.currentDataset = {
          ...state.currentDataset,
          guidances: state.currentDataset.guidances.map((guide) => {
            if (action.payload.guide.id === guide.id) {
              return action.payload.guide;
            }

            return guide;
          }),
        };
      }
    },
    changeCurrentDataset(
      state,
      action: PayloadAction<ChangeChatActionPayload>,
    ) {
      if (state.currentDataset) {
        state.currentDataset = {
          ...state.currentDataset,
          chats: state.currentDataset.chats.map((chat) => {
            if (chat.id === action.payload.id) {
              return { ...chat, ...action.payload };
            }

            return chat;
          }),
          years: state.currentDataset.years?.map((year) => {
            return {
              ...year,
              months: year.months?.map((month) => {
                return {
                  ...month,
                  chats: month.chats.map((chat) => {
                    if (chat.id === action.payload.id) {
                      return { ...chat, ...action.payload };
                    }

                    return chat;
                  }),
                };
              }),
            };
          }),
        };
      }
    },
    removeChat(state, action: PayloadAction<string>) {
      if (state.currentDataset) {
        state.currentDataset = {
          ...state.currentDataset,
          chats: state.currentDataset.chats.filter(
            (chat) => chat.id !== action.payload,
          ),
          years: state.currentDataset.years
            ?.map((year) => {
              return {
                ...year,
                months: year.months
                  ?.map((month) => {
                    return {
                      ...month,
                      chats: month.chats.filter(
                        (chat) => chat.id !== action.payload,
                      ),
                    };
                  })
                  .filter((item) => !!item.chats.length),
              };
            })
            .filter((year) => !!year.months.length),
        };
      }
    },
    fillTokensSettings(
      state,
      action: PayloadAction<FillTokensSettingsActionPayload>,
    ) {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    removeChatFile(
      state,
      action: PayloadAction<{ chatId: string; fileId: string }>,
    ) {
      if (state.currentDataset) {
        state.currentDataset = {
          ...state.currentDataset,
          chats: state.currentDataset.chats.map((chat) => {
            if (chat.id !== action.payload.chatId) {
              return chat;
            }

            return {
              ...chat,
              files: chat.files.filter(
                (file) => file.id !== action.payload.fileId,
              ),
            };
          }),
        };
      }
    },
  },
})