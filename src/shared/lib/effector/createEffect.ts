import { createEffect as createEffectEffector } from 'effector';
import { ResultErrors } from 'pay-people-ui-kit';

export const createEffect = <Params, Done>(handler: (params: Params) => Done | Promise<Done>) =>
  createEffectEffector<Params, Done, ResultErrors>(handler);
