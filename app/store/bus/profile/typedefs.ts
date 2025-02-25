//payload types_________________________________
export type FillProfileActionPayload = IProfile;
export type ChangePhotoActionPayload = {
  photo: string | null;
};
// INJECT

//common types__________________________________
export interface IProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  onBoarding: boolean;
  paypalPaymentStatus: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  ennealogyNumber: number | null;
  photo: string | null;
  visualAdjustments: boolean;
  showUpdateModalWindow: boolean;
}

export interface IScaleImage {
  type: string;
  image: string;
  shortImage: string;
  ratio: string;
  separator: string;
  chatId: number;
  isSwap?: boolean;
  id?: number | string;
  isShare: boolean;
  isDelete?: boolean;
  handleDelete?: any;
}