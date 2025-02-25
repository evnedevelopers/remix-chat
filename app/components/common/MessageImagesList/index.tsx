import { FC } from "react";

import { Grid } from "~/components/common/Grid";
import { MessageImageItem } from "~/components/common/MessageImageItem";

import { ratioSplitting } from "~/helpers/ratioSplitting";
import { IMessageImage } from "~/store/bus/chat/typedefs";

import { styles } from './styles';

type MessageImagesListProps = {
  images: IMessageImage[];
  isSharing?: boolean;
};

export const MessageImagesList: FC<MessageImagesListProps> = ({
  images,
  isSharing = false,
}) => {
  return (
    <Grid container columnSpacing={'20px'} rowSpacing={'20px'}>
      {images.map((image) => {
        const [widthRatio, heightRatio] = ratioSplitting(image.ratio!);

        return (
          <Grid
            key={image.id}
            item
            lg={3}
            md={6}
            xs={12}
            display={'flex'}
            sx={[
              images.length > 4 && widthRatio <= heightRatio && styles.list,
              isSharing && styles.sharing,
            ]}>
            <MessageImageItem
              id={image.id as string}
              image={image.image!}
              isError={image.error as string}
              ratio={image.ratio}
              chatId={image.chatId!}
              shortImage={image.shortImage!}
              isDeleted={!!image.deletedAt}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};