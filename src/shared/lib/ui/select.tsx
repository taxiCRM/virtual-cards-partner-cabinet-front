import { ReactNode } from 'react';

import { Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

export type ButtonOptionUtilParams = {
  label: string;
  value?: string;
  prefix?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
};

export const toButtonOption = ({
  loading,
  disabled,
  prefix,
  label,
  value = label,
  onClick,
}: ButtonOptionUtilParams): DefaultOptionType => ({
  disabled,
  value,
  label: (
    <div
      onClick={e => {
        e.stopPropagation();
        onClick();
      }}
    >
      {loading ? <Spin size='small' /> : prefix}
      {label}
    </div>
  ),
});
