import { api } from 'shared/api';
import { Path } from 'shared/lib/consts/path';

import { SignInDTO } from './interface';

export const authApi = {
  // checkTwoFactor: (body: TwoFactorDTO) =>
  //   api.get<{ message: string }>(`${Path.AUTH}/${Path['CHECK-TWO-FACTOR']}`, {
  //     params: { ...body, password: body.password ?? null },
  //     force: true,
  //   }),

  signIn: (body: SignInDTO) => api.post<{ token: string }>(`${Path['LOGIN']}`, body),

  signOut: () => api.post(`${Path['LOGOUT']}`),

  // recovery: (body: RecoveryDTO) => api.patch(`${Path.AUTH}/${Path['PASSWORD-RECOVERY']}`, body),

  // sendEmail: (body: { phone: string }) =>
  //   api.post<{ message: string }>(`${Path.AUTH}/${Path['SEND-EMAIL-CODE']}`, body),
};
