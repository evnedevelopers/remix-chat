import { FC } from "react";
import { useSelector } from "react-redux";

import { Box, Button, Typography } from "@mui/material";

import { ModalTypes } from "~/store/types";
import { getProfile, getSubscriptionCoupon } from "~/store/selectors/profile.selector";

import { styles } from './styles';

type LimitExhaustedProps = {
  text: string;
  buttonLabel: string;
  limitText: string;
};

export const LimitExhausted: FC<
  ModalTypes.ModalComponentProps<LimitExhaustedProps>
> = ({ closeFn, text, buttonLabel, limitText }) => {
  const profile = useSelector(getProfile);
  const coupon = useSelector(getSubscriptionCoupon);

  const closeModal = () => {
    closeFn();
  };

  return (
    <Box sx={styles.limitExhausted}>
      <Box sx={styles.container}>
        <Typography variant={'h5'} color={'text.primary'}>
          {profile?.subscription?.subscription_plan.code === 'free' && !coupon
            ? 'Free CREATE tokens exhausted!'
            : 'Limits exhausted!'}
        </Typography>
        {(!!coupon ||
          profile?.subscription?.subscription_plan.code !== 'free') && (
          <Typography variant={'subtitle2'} color={'text.primary'}>
            {limitText}
          </Typography>
        )}
        <Typography variant={'body1'} color={'text.primary'}>
          {text}
        </Typography>
        <Button
          variant={'primary'}
          fullWidth
          sx={{ marginTop: '40px' }}
          onClick={closeModal}>
          {buttonLabel}
        </Button>
      </Box>
    </Box>
  );
};

export const LimitExhaustedContent = {
  updateSubscription: {
    text: 'CREATE available, but inactive without subscription. Renew for complete access.',
    buttonLabel: 'Upgrade plan',
  },
  buyTokens: {
    text_line_1: {
      text: 'Extend your access instantly with CREATE. Purchase now for uninterrupted usage.',
      buttonLabel: 'Purchase CREATE on Demand',
    },
    text_line_2: {
      text: 'Extend your access instantly with CREATE. Purchase now for uninterrupted usage.',
      buttonLabel: 'Purchase CREATE on Demand',
    },
    text_line_3: {
      text: 'Extend your access instantly with CREATE. Purchase now for uninterrupted usage.',
      buttonLabel: 'Purchase CREATE on Demand',
    },
    text_line_4: {
      text: 'You have used all metametrics for this month. Purchase CREATE now for uninterrupted usage',
      buttonLabel: 'Purchase CREATE on Demand',
    },
    text_line_5: {
      text: 'Extend your access instantly with CREATE. Purchase now for uninterrupted usage.',
      buttonLabel: 'Purchase CREATE on Demand',
    },
  },
};