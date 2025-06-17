import getConfig from 'next/config';

const { appName, devTeam, tokenName, fullYear, recapchaSiteKey, website } = getConfig().publicRuntimeConfig;

export {
  appName,
  devTeam,
  tokenName,
  fullYear,
  recapchaSiteKey,
  website,
};
