import { createRoot } from 'react-dom/client';

import App from 'app';

import { appStarted } from 'shared/config/init';

import './i18n';
import '/node_modules/pay-people-ui-kit/dist/style.css';

const MOCKS_ENABLED = process.env.VITE_APP_MOCKS_ENABLED === 'true';

async function prepareEnvironment() {
  if (MOCKS_ENABLED) {
    const { startMocking } = await import('./mocks');
    return startMocking();
  }
}

const root = createRoot(document.getElementById('root') as HTMLElement);

prepareEnvironment().then(() => {
  root.render(<App />);
  appStarted();
});
