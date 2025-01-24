import { IGuidanceEntity } from "~/utils/typedefs";

export const guidances: IGuidanceEntity[] = [
  {
    id: '1',
    text: 'First Guidance Text',
    is_read: false,
    title: 'First Guidance Title',
  },
  {
    id: '2',
    text: 'Second Guidance Text',
    is_read: false,
    title: 'Second Guidance Title',
  },
  {
    id: '3',
    text: 'Sub Guidance Text for Second Guidance Text',
    is_read: false,
    title: 'Sub Guidance Title for Second Guidance Title',
    parentId: '2',
  }
];