import { put } from 'redux-saga/effects';
import * as Sentry from '@sentry/react';
import { profileSlice } from "~/store/slices/profile.slice";
import { projectsSlice } from "~/store/slices/projects.slice";
import { modalSlice } from "~/store/slices/modal.slice";

export function* handleError(error: any) {
  const statusCode = error.cause?.status;
  if (statusCode >= 500) {
    yield put(
      modalSlice.actions.modal({
        component: 'ServerError',
        forceClose: false,
      }),
    );
  }
  if (statusCode === 401) {
    // yield put(authActions.clearData());
    // yield put(createdImagesActions.clearData());
    yield put(profileSlice.actions.clearData());
    yield put(projectsSlice.actions.clearProjects());
  } else {
    process.env.NODE_ENV !== 'development' && Sentry.captureException(error);
  }
}
