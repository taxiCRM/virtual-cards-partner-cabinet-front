import { notification } from 'antd';
import { ResultErrors, getErrorMessage } from 'pay-people-ui-kit';

import { createEffect } from '../effector/createEffect';

export const showSuccessMessageFx = createEffect((message: string) => {
  notification.success({
    message,
  });
});
export const showErrorMessageFx = createEffect((error: ResultErrors) => {
  notification.error({
    message: getErrorMessage(error),
  });
});
