import { IConfig } from 'pay-people-ui-kit';

export const getBaseUrlByConfig = async (config: IConfig): Promise<string | undefined> => {
  const json: Record<string, string> = await fetch(config.configPath).then(res => res.json());

  return json[config.key];
};
