import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProjects, IScaleImage, IUser } from "~/utils/typedefs";

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
    fillProfile(state, action: PayloadAction<IUser>) {
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
    setDatasetsOpen(state) {
      state.isDatasetsOpen = true;
    },
    setDatasetsClosed(state) {
      state.isDatasetsOpen = false;
    },
    setCurrentDataset(state, action: PayloadAction<IProjects | null>) {
      state.currentDataset = action.payload;
    },
  },
})