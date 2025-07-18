import { CONFIG_RELATIVE_PATH } from 'shared/config/consts';

export const getConfigPath = () => {
  const origin = window.location.origin;
  const configPath = `${origin}${CONFIG_RELATIVE_PATH}`;

  return configPath;
};
