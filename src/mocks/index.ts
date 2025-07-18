import { type StartOptions, setupWorker } from 'msw/browser';

import { authHandlers } from './auth/handler';

const handlers = [...authHandlers];

const mockeryOptions: StartOptions = {
  onUnhandledRequest: 'bypass',
};

const mockery = setupWorker(...handlers);

export const startMocking = () => mockery.start(mockeryOptions);
