import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const ImageGallery: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M22.3468 7.10675H19.1526L18.8104 3.43349C18.7876 3.18252 18.5594 3 18.2856 3L1.58486 4.57425C1.47078 4.57425 1.33389 4.6427 1.26544 4.73396C1.17418 4.82522 1.15137 4.96211 1.15137 5.07619L2.45184 18.811C2.47465 19.062 2.67999 19.2445 2.93096 19.2445H2.97659L5.12123 19.0391V21.3663C5.12123 21.6173 5.32656 21.8454 5.60035 21.8454H22.3696C22.6206 21.8454 22.8487 21.6401 22.8487 21.3663V7.56306C22.8259 7.31209 22.6206 7.10675 22.3468 7.10675ZM21.8676 17.579L17.875 12.0349C17.7837 11.9208 17.624 11.8295 17.4871 11.8295C17.3274 11.8295 17.1905 11.898 17.0993 12.0349L13.2435 17.693L9.88962 14.8868C9.7071 14.7271 9.45613 14.7271 9.27361 14.8868L6.05665 17.7387V8.04218H21.8905V17.579H21.8676ZM3.34163 18.2634L2.15524 5.46405L17.8978 3.98106L18.1944 7.08394H5.57753C5.32656 7.08394 5.09841 7.28927 5.09841 7.56306V18.0809L3.34163 18.2634ZM6.05665 18.9935L9.59302 15.8678L12.6959 18.4916L11.0532 20.8872H6.05665V18.9935ZM12.2168 20.8872L17.5099 13.13L21.8905 19.176V20.8872H12.2168Z" />
      <path d="M9.68424 13.2669C10.6881 13.2669 11.4867 12.4455 11.4867 11.4645C11.4867 10.4834 10.6653 9.66208 9.68424 9.66208C8.70319 9.66208 7.88184 10.4606 7.88184 11.4645C7.88184 12.4684 8.70319 13.2669 9.68424 13.2669ZM9.68424 10.5975C10.1634 10.5975 10.5512 10.9854 10.5512 11.4645C10.5512 11.9436 10.1634 12.3315 9.68424 12.3315C9.20512 12.3315 8.81726 11.9436 8.81726 11.4645C8.84008 10.9854 9.20512 10.5975 9.68424 10.5975Z" />
    </SvgIcon>
  );
};

export default ImageGallery;
