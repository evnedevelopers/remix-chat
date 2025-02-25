//payload types_________________________________
export type FillSettingsActionPayload = ISettings;
// INJECT

//common types__________________________________
export interface ISettings {
  audioRecordingLimit: number;
  timeLeftToVisualize: number;
}
