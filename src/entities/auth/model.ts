import { createEvent, createStore, sample } from 'effector';
import { getErrorMessage } from 'pay-people-ui-kit';

import { tokenExpired, tokenReceived } from 'entities/current-user';

import { createEffect } from 'shared/lib/effector';

import { authApi } from './api';
import { SignInDTO } from './interface';

// export const checkTwoFactorFx = createEffect(authApi.checkTwoFactor);
export const signInFx = createEffect(authApi.signIn);
export const signOutFx = createEffect(authApi.signOut);
// export const recoveryFx = createEffect(authApi.recovery);

export const signOut = createEvent();
export const clearFormErrorMessage = createEvent<void>();
// export const clearFormSuccessMessage = createEvent<void>();
// export const clearTwoFactor = createEvent();
// export const resetRecovery = createEvent();

// export const $twoFactor = createStore<{
//   codeSended: boolean;
//   isPasswordRequiredGlobal: boolean;
//   isPasswordRequiredUser: boolean | null;
// }>({
//   codeSended: false,
//   isPasswordRequiredGlobal: false,
//   isPasswordRequiredUser: false,
// });

// export const $recovery = createStore<{
//   codeSended: boolean;
// }>({
//   codeSended: false,
// });

// export const $formSuccessMessage = createStore<string | null>(null);

export const $formErrors = createStore<Partial<SignInDTO>>({})
  .on(signInFx.failData, (state, payload) => {
    return {
      ...state,
      [payload.status === 404 ? 'email' : 'password']: getErrorMessage(payload),
    };
  })
  .reset(clearFormErrorMessage);

// $twoFactor
//   .on([checkTwoFactorFx.doneData], data => {
//     return { ...data, codeSended: true };
//   })
//   .on([checkTwoFactorFx.failData], (data, payload) => {
// if (String(payload.response?.status) == '400') {
//   return { ...data, isPasswordRequiredUser: String(payload.response?.status) == '400', codeSended: false };
// } else {
//   return { ...data };
// }
//   })
//   .on([getAuthGlobalFx.doneData], (data, payload) => ({
//     ...data,
//     isPasswordRequiredGlobal: payload.data.require_password_users,
//   }))
// .on([clearTwoFactor], data => ({
//   ...data,
//   codeSended: false,
//   required: null,
// }));

// $formErrorMessage.on(
//   [checkTwoFactorFx.failData, signInFx.failData, sendEmailFx.failData, recoveryFx.failData],
//   (_, payload) => getErrorMessage(payload),
// );

// $formSuccessMessage
//   .on([sendEmailFx.doneData, checkTwoFactorFx.doneData], (_, payload) => payload.data.message)
//   .on(clearFormSuccessMessage, () => null);

// $recovery.on([sendEmailFx.doneData], () => ({ codeSended: true })).on(resetRecovery, () => ({ codeSended: false }));

sample({
  clock: [signInFx.doneData],
  fn: clk => clk.data.token,
  target: tokenReceived,
});

sample({
  clock: signOut,
  target: [signOutFx],
});

sample({
  clock: signOutFx.done,
  // target: [tokenExpired, clearTwoFactor],
  target: [tokenExpired],
});

// redirect({
//   clock: recoveryFx.doneData,
//   route: routes.public.auth,
// });

// export const $userFormForm = createStore<string | null>(null);
// export const addUserFormPhone = createEvent<string | null>();
// $userFormForm.on(addUserFormPhone, (_, payload) => payload);

// persist({
//   key: 'ppsp/userFormForm',
//   store: $userFormForm,
// });
