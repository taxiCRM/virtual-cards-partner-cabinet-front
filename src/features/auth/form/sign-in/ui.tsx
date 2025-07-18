import { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

import { Rule } from 'antd/es/form';
import { useForm } from 'antd/lib/form/Form';
import { useUnit } from 'effector-react';
import {
  Button,
  Flex,
  FormItem,
  Input,
  PasswordInput,
  SignInForm as SignInFormComponent,
  Text,
  Title,
} from 'pay-people-ui-kit';

import { SignInDTO } from 'entities/auth/interface';
import { $formErrors, clearFormErrorMessage, signInFx } from 'entities/auth/model';

import { emailPattern } from 'shared/lib/validators';

const titleStyle: CSSProperties = { textAlign: 'center', margin: 0, marginBottom: 0 };

export const SignInForm = () => {
  const { t } = useTranslation(['common', 'auth']);

  const [form] = useForm<SignInDTO>();

  const [signIn, signInIsLoading] = useUnit([signInFx, signInFx.pending]);

  const [clearFormError, formErrors] = useUnit([clearFormErrorMessage, $formErrors]);

  const emailHelpText = formErrors?.email ? (
    <Text type='danger' size={15} data-testid='error-message'>
      {formErrors?.email}
    </Text>
  ) : null;

  const emailRules: Rule[] = [
    {
      required: true,
      message: t('common:email-required'),
    },
    {
      pattern: emailPattern,
      message: t('common:email-valid'),
    },
  ];

  const passwordHelpText = formErrors?.password ? (
    <Text type='danger' size={15} data-testid='error-message'>
      {formErrors?.password}
    </Text>
  ) : null;

  const title = t('auth:authorization');

  const submitText = t('auth:sign-in');

  const submit = (values: SignInDTO) =>
    signIn({
      password: values.password,
      email: values.email,
    });

  return (
    <SignInFormComponent disabled={signInIsLoading} form={form} onFinish={submit} onFieldsChange={clearFormError}>
      <Flex gap={16} vertical>
        <FormItem>
          <Title level={1} style={titleStyle}>
            {title}
          </Title>
        </FormItem>

        <Flex vertical style={{ paddingBottom: '1rem' }}>
          <FormItem<SignInDTO> label={t('email')} name='email' help={emailHelpText} rules={emailRules}>
            <Input
              type='email'
              size='middle'
              autoComplete='email'
              autoFocus
              placeholder={t('common:email-placeholder')}
              data-testid='email-input'
            />
          </FormItem>

          <FormItem<SignInDTO> noStyle>
            <PasswordInput
              size='middle'
              autoComplete='password'
              formItemProps={{
                help: passwordHelpText,
              }}
              data-testid='password-input'
            />
          </FormItem>
        </Flex>

        <Button loading={signInIsLoading} htmlType='submit' type='primary' data-testid='submit-button'>
          {submitText}
        </Button>
      </Flex>
    </SignInFormComponent>
  );
};
