import { useTranslation } from 'react-i18next';

import { useUnit } from 'effector-react';
import { LogOutIcon } from 'lucide-react';
import { Button, ProfileMenu as ProfileMenuPP } from 'pay-people-ui-kit';

import { signOut } from 'entities/auth/model';

// const fullnameProfileFormatter = (str = ' '): string => {
//   const [lastName, firstName, secondName] = str.split(' ');

//   return `${str}`;
// };

export const ProfileMenu = () => {
  const { t } = useTranslation(['common']);

  // const currentUser = useUnit($currentUser);

  const [fetchSignOut] = useUnit([signOut]);

  return (
    <ProfileMenuPP
      // username={fullnameProfileFormatter(currentUser?.first_name)}
      username={t('empty')}
      items={[
        // {
        //   label: (
        //     <Button
        //       type='text'
        //       icon={<EditIcon />}
        //       size='large'
        //       iconPosition='end'
        //       onClick={() => {
        //         if (currentUser?.id) {
        //           routes.private.settings.user.navigate({
        //             params: {
        //               id: currentUser.id,
        //             },
        //             query: {},
        //           });
        //         }
        //       }}
        //     >
        //       Профиль
        //     </Button>
        //   ),
        //   key: 'profile',
        // },
        // {
        //   label: (
        //     <Button type='text' icon={<CogIcon />} size='large' iconPosition='end' onClick={openSecurityModal}>
        //       Безопасность
        //     </Button>
        //   ),
        //   key: 'settings',
        // },
        {
          label: (
            <Button type='link' danger icon={<LogOutIcon />} size='large' iconPosition='end' onClick={fetchSignOut}>
              {t('logout')}
            </Button>
          ),
          key: 'logout',
        },
      ]}
    />
  );
};
