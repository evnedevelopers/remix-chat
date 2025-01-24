import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Typography, useTheme } from "@mui/material";
import { keyframes } from "@emotion/react";

import Generate from "~/components/icons/Generate";
import ImageGallery from "~/components/icons/ImageGallery";
import Warning from "~/components/icons/Warning";
import Visibility from "~/components/icons/Visibility";

import { ratioSplitting } from "~/helpers/ratioSplitting";

import { getScaleImage } from "~/store/selectors/profile.selector";
import { getIsImageLoading } from "~/store/selectors/chat.selector";
import { profileSlice } from "~/store/slices/profile.slice";

import { styles } from './styles';

type MessageImageItemProps = {
  id: string;
  image: string;
  short_image: string;
  isError: string;
  ratio?: string | null;
  chatId: string;
  separator?: string;
  isDeleted?: boolean;
};

export const MessageImageItem: FC<MessageImageItemProps> = ({
  id,
  image,
  isError,
  ratio = '16:9',
  chatId,
  short_image,
  separator = ':',
  isDeleted = false,
}) => {
  const theme = useTheme();
  const scaleImage = useSelector(getScaleImage);
  const dispatch = useDispatch();
  const isImageLoading = useSelector(getIsImageLoading);
  const [imageLoaded, setImageLoaded] = useState(false);
  const loading = keyframes`
    to {
      background-position-x: -20%;
    }
`;

  const isLoading =
    !imageLoaded || (isImageLoading && id.toString().includes('mock'));

  const handleScaleImage = (image: string, ratio: string) => {
    !isLoading &&
    !scaleImage &&
    dispatch(
      profileSlice.actions.setScaleImage({
        image,
        ratio,
        chatId,
        short_image,
        separator,
        type: '',
        isShare: false,
      }),
    );
  };
  const handleLoad = () => {
    setImageLoaded(true);
  };

  const [widthRatio, heightRatio] = ratioSplitting(separator, ratio);

  return (
    <Box
      sx={(theme) =>
        isLoading
          ? styles.loading((heightRatio / widthRatio) * 100)
          : styles.loaded(theme, (heightRatio / widthRatio) * 100)
      }
      id={id.toString()}
      onClick={() => handleScaleImage(image, ratio ?? '16:9')}>
      {!imageLoaded && image && !isError && !isDeleted && (
        <Box
          sx={[
            styles.imageMockWrapper,
            {
              animation: `1.5s ${loading} ease-in-out infinite`,
            },
          ]}>
          <Typography
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            variant={'body1'}
            color={'text.secondary'}>
            Visualizing
          </Typography>
        </Box>
      )}
      {isLoading && !image && !isError && !isDeleted && (
        <Box
          sx={[
            styles.imageMockWrapper,
            {
              animation: `1.5s ${loading} ease-in-out infinite`,
            },
          ]}>
          <Box sx={styles.loader}>
            <Generate
              fontSize={'small'}
              htmlColor={theme.palette.text.secondary}
            />
            <Typography
              variant={'caption'}
              color={'text.secondary'}
              maxWidth={'150px'}>
              This Image will be ready in the gallery soon
            </Typography>
          </Box>
        </Box>
      )}
      {isDeleted && (
        <Box sx={styles.imageMockWrapper}>
          <Box sx={styles.deletedImage}>
            <ImageGallery
              fontSize={'small'}
              htmlColor={theme.palette.text.secondary}
            />
            <Typography
              variant={'body1'}
              textAlign={'center'}
              color={'text.secondary'}>
              This image was deleted
            </Typography>
          </Box>
        </Box>
      )}
      {isError && (
        <Box sx={styles.imageErrorWrapper}>
          <Box>
            <Warning fontSize={'small'} htmlColor={theme.palette.error.main} />
            <Typography
              variant={'body1'}
              color={'text.secondary'}
              textAlign={'center'}>
              {isError}
            </Typography>
          </Box>
        </Box>
      )}
      <Box sx={styles.imageWrapper}>
        <Box
          component={'img'}
          src={image}
          width={'100%'}
          borderRadius={'10px'}
          onLoad={handleLoad}
        />
        {(!isLoading || !imageLoaded) && (
          <>
            <Box sx={styles.imageOverlay} />
            <Box sx={styles.eye}>
              <Visibility
                fontSize={'small'}
                htmlColor={theme.palette.common.white}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};