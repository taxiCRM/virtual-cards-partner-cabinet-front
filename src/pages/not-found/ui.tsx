import { Layout } from 'antd';
import { Result } from 'antd/lib';
import { Button } from 'pay-people-ui-kit';

import { routes } from 'shared/config/router';

export function NotFoundPage() {
  return (
    <Layout
      style={{
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Result
        status='404'
        title='404'
        subTitle='Страница не найдена'
        extra={
          <Button type='primary' onClick={routes.private.main.navigate}>
            Вернуться на главную
          </Button>
        }
      />
    </Layout>
  );
}
