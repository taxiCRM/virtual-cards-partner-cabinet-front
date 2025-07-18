import { createStore, sample } from 'effector';

import { router } from 'shared/config/router';

export const $routePathName = createStore('Главная');
export const $backRoute = createStore('');

export const initMenuItem = { label: 'Главная', route: '/' };

sample({
  clock: router.$path,
  fn: clk => {
    return clk;
  },
  target: $routePathName,
});
