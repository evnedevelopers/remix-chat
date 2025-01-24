import * as Sentry from '@sentry/react';

export const handleErrors = (error: any, type?: any, title?: string) => {
  if (process.env.NODE_ENV !== 'development') {
    if (title) {
      Sentry.setExtras({ info_title: `${title} -> ${error}` });
    } else {
      Sentry.captureException(error);
    }

    return;
  }
  switch (type) {
    case 'log':
      console.log('ON CLIENT', error);
      break;
    case 'warn':
      console.warn('ON CLIENT', error);
      break;
    case 'info':
      console.info('ON CLIENT', error);
      break;
    default:
      console.log('ON CLIENT', error);
  }
};
