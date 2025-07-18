import MockAdapter from 'axios-mock-adapter';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { api } from 'shared/api';
import { getBaseUrlByConfig } from 'shared/lib/api';

vi.useFakeTimers();

describe('createDefaultApi', () => {
  const mock = new MockAdapter(api);
  const testUrl = '/test';
  const testData = { foo: 'bar' };

  beforeEach(() => {
    mock.reset();
    localStorage.clear();
  });
  it('возвращает базовый URL по ключу', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ api: 'https://example.com' }),
      }),
    ) as any;

    const url = await getBaseUrlByConfig({
      configPath: '/config.json',
      key: 'api',
    });

    expect(url).toBe('https://example.com');
  });

  it('должен вернуть данные из кэша при втором запросе', async () => {
    let requestCount = 0;

    mock.onGet(testUrl).reply(() => {
      requestCount++;
      return [200, testData];
    });

    const res1 = await api.get(testUrl);
    expect(res1.data).toEqual(testData);
    expect(requestCount).toBe(1);

    const res2 = await api.get(testUrl).catch(e => e);
    expect(res2.data).toEqual(testData);
    expect(res2.__fromCache).toBe(true);
    expect(requestCount).toBe(1);
  });

  it('должен обновить кэш при использовании force', async () => {
    mock.onGet('/users/list').reply(() => [200, { users: [] }]);

    const resFromCache = await api.get('/users/list');
    expect(resFromCache.data).toStrictEqual({ users: [] });

    mock.onGet('/users/list').reply(() => [200, { users: ['new'] }]);

    const resAfterForce = await api.get('/users/list', { force: true });
    expect(resAfterForce.data).toEqual({ users: ['new'] });
  });
});
