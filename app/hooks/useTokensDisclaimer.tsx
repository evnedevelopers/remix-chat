import { useLoaderData } from "@remix-run/react";

import {
  useSnackbar,
  OptionsWithExtraProps,
  VariantType,
  closeSnackbar,
} from 'notistack';

import { useTheme } from '@mui/material';

import Close from "~/components/icons/Close";

import { ILoaderFunctionResult } from "~/routes/chat";

type Settings = {
  questions: boolean;
  visualizations: boolean;
  stories: boolean;
};

type SetSettings = {
  questions?: boolean;
  visualizations?: boolean;
  stories?: boolean;
};

type Setting = 'questions' | 'visualizations' | 'stories';

const setSettings = ({ questions, visualizations, stories }: SetSettings) => {
  const { questions: q, visualizations: v, stories: s } = getSettings();
  window.localStorage.setItem(
    'isTokenDisclaimerShowedFor',
    JSON.stringify({
      questions: questions ?? q,
      visualizations: visualizations ?? v,
      stories: stories ?? s,
    }),
  );
};

const getSettings = (): Settings => {
  const settings: string | null = window.localStorage?.getItem(
    'isTokenDisclaimerShowedFor',
  );

  if (settings?.length) return JSON.parse(settings) as Settings;

  return {
    questions: false,
    visualizations: false,
    stories: false,
  };
};

const setSettingsItem = (setting: Setting, value: boolean) => {
  setSettings({ [setting]: value });
};

const getSettingsItem = (setting: Setting): boolean => {
  return getSettings()[setting];
};

export const useTokensDisclaimer = (type: Setting) => {
  const theme = useTheme();
  const { authUser: profile } = useLoaderData<ILoaderFunctionResult>();
  const { enqueueSnackbar } = useSnackbar();
  const snackbarOptions: OptionsWithExtraProps<VariantType> = {
    variant: 'infoSnackbar',
    autoHideDuration: 10000,
    preventDuplicate: true,
    action: (id: number | string) => (
      <Close
        fontSize={'small'}
        htmlColor={theme.palette.common.surface['surface 5']}
        onClick={() => closeSnackbar(id)}
        sx={{ cursor: 'pointer' }}
      />
    ),
  };

  const isEnoughTokens = (price?: number) => {
    const existAvailableTokens = profile?.tokens && profile?.subscription;

    return existAvailableTokens && profile.tokens >= (price ?? 0);
  };

  const getLimitInfo = (type: Setting) => {
    const limits = {
      questions: {
        amount: profile?.subscription?.limits ?? 0,
        enoughTokens: isEnoughTokens(profile?.token_question_price),
      },
      visualizations: {
        amount: profile?.subscription?.visualize_limits ?? 0,
        enoughTokens: isEnoughTokens(profile?.token_visualization_price),
      },
      stories: {
        amount: profile?.subscription?.storyteller_limit ?? 0,
        enoughTokens: isEnoughTokens(profile?.token_story_price),
      },
    };

    return {
      value: limits[type].amount,
      isExhausted: limits[type].amount === 0,
      enoughTokens: limits[type].enoughTokens,
    };
  };

  const handle = () => {
    const isDisclaimerShowed = getSettingsItem(type);
    const { isExhausted, enoughTokens } = getLimitInfo(type);

    if (isDisclaimerShowed && !isExhausted) {
      setSettingsItem(type, false);
    } else if (
      !isDisclaimerShowed &&
      isExhausted &&
      profile?.subscription?.subscription_plan.code !== 'free'
    ) {
      setSettingsItem(type, true);
      if (enoughTokens) {
        enqueueSnackbar(
          `Subscription limits for ${type} are exhausted! The system now utilizes available CREATE for continued access.`,
          snackbarOptions,
        );
      } else {
        enqueueSnackbar(
          `Subscription limits for ${type} are exhausted and current CREATE are insufficient for continued access. Purchase more CREATEs to resume your activities.`,
          snackbarOptions,
        );
      }
    }
  };

  return { handle };
};