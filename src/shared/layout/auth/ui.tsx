import { PropsWithChildren } from 'react';

import { AuthLayout as PPAuthLayout } from 'pay-people-ui-kit';

export function AuthLayout({ children }: PropsWithChildren) {
  return <PPAuthLayout>{children}</PPAuthLayout>;
}
