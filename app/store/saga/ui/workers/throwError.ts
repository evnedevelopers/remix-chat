import { call } from 'redux-saga/effects';

type ErrorType = {
  status_code: number;
  details: {
    code?: string;
    detail: string;
  };
};

export function* throwError(response: any) {
  let errorText = 'Unknown error occurred';

  if (response.status) {
    try {
      const responseClone = response.clone();
      const json: { error: string } = yield call([responseClone, 'json']);
      errorText = json.error || errorText;
    } catch (e) {
      console.error('Error in parsing JSON', e);
    }

    throw new Error(errorText, {
      cause: {
        status: response.status,
        error: errorText,
      },
    });
  } else {
    throw new Error('Unhandled error', {
      cause: {
        error: errorText,
        status: 500,
      },
    });
  }
}
