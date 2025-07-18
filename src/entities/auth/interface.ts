export type SignInDTO = {
  email: string;
  code?: string;
  password: string;
};

export type SendCodeDTO = Pick<SignInDTO, 'email'>;

export type TwoFactorDTO = Pick<SignInDTO, 'email'>;

export type RecoveryDTO = Pick<SignInDTO, 'email'> & {
  code: string;
  new_password: string;
  confirm_new_password: string;
};
