import { createEvent, restore, sample } from 'effector';
import Cookies from 'js-cookie';

import { appStarted } from 'shared/config/init';
import { routes } from 'shared/config/router';
import { STORAGE_PREFIX } from 'shared/lib/consts/storage';

export const STORAGE_TOKEN_KEY = `${STORAGE_PREFIX}/token`;
export const STORAGE_CURRENT_USER_KEY = `${STORAGE_PREFIX}/current-user`;
export const STORAGE_PASS_KEY = `${STORAGE_PREFIX}/pass`;

export const tokenReceived = createEvent<string>();
export const tokenExpired = createEvent();
export const refreshPass = createEvent();

export const $token = restore<string>(tokenReceived, '').reset(tokenExpired);

export const $authorized = $token.map(state => state.length > 0);

sample({
  clock: appStarted,
  filter: () => Cookies.get(STORAGE_TOKEN_KEY) !== undefined,
  fn: () => Cookies.get(STORAGE_TOKEN_KEY) || '',
  target: $token,
});

sample({
  clock: tokenReceived,
  source: $token,
  fn: source => Cookies.set(STORAGE_TOKEN_KEY, source, { expires: 7 }),
});

sample({
  clock: tokenExpired,
  fn: () => Cookies.remove(STORAGE_TOKEN_KEY),
});

sample({
  clock: $token,
  filter: token => token.length === 0,
  fn: () => {
    return {
      replace: true,
      query: {},
      params: {},
    };
  },
  target: routes.public.auth.navigate,
});

sample({
  clock: tokenReceived,
  source: $token,
  filter: token => token.length > 0,
  fn: () => {
    return {
      replace: true,
      query: {},
      params: {},
    };
  },
  target: routes.private.main.navigate,
});
