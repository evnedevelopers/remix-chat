import { FC } from "react";

import { Grid } from "~/components/common/Grid";
import { MessageImageItem } from "~/components/common/MessageImageItem";

import { ratioSplitting } from "~/helpers/ratioSplitting";

import { styles } from './styles';

type MessageImagesListProps = {
  images: any[];
  isSharing?: boolean;
};

export const MessageImagesList: FC<MessageImagesListProps> = ({
  images,
  isSharing = false,
}) => {
  return (
    <Grid container columnSpacing={'20px'} rowSpacing={'20px'}>
      {images.map((image) => {
        const [widthRatio, heightRatio] = ratioSplitting(image.ratio);

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
              id={image.id}
              image={image.image}
              isError={image.error}
              ratio={image.ratio}
              chatId={image.chat_id}
              short_image={image.short_image}
              isDeleted={!!image.deleted_at}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};