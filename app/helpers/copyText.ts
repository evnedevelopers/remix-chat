import { handleErrors } from "~/helpers/handleErrors";

export const copyText = (text: string) => {
  navigator.clipboard
    .writeText(
      text
        .split('<br>')
        .join('\n')
        .split('<b>')
        .join('')
        .split('</b>')
        .join(''),
    )
    .then()
    .catch((error) => {
      handleErrors(error);
    });
};
