import { ReactNode } from 'react';

import { Flex, Text, Tooltip } from 'pay-people-ui-kit';

export const renderCellWithTooltip = ({
  title,
  defaultValue,
  currentValue,
}: {
  title: string;
  defaultValue: string | number;
  currentValue?: ReactNode;
}) => (
  <Flex gap={4} align='center'>
    {currentValue ?? defaultValue}
    {currentValue && (
      <Tooltip
        styles={{ root: { maxWidth: 300 } }}
        title={
          <>
            <Text weight={'m'} style={{ color: 'var(--text-white)' }}>
              {defaultValue}
            </Text>
            <br />
            <Text size={14} style={{ color: '#FFFFFF9E' }}>
              {title}
            </Text>
          </>
        }
      />
    )}
  </Flex>
);
