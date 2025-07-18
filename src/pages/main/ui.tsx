import { useTranslation } from 'react-i18next';

import { Flex, Text, Toolbar } from 'pay-people-ui-kit';

export function MainPage() {
  const { t } = useTranslation(['common']);

  return (
    <>
      <Toolbar
        title={t('main')}
        containerStyle={{
          marginTop: '0px !important',
        }}
      />

      <Flex vertical gap={24} style={{ maxWidth: 750 }}>
        <Text>
          Идейные соображения высшего порядка, а также сложившаяся структура организации играет важную роль в
          формировании модели развития. Не следует, однако забывать, что дальнейшее развитие различных форм деятельности
          требуют определения и уточнения форм развития.
        </Text>

        <Text>
          Таким образом реализация намеченных плановых заданий влечет за собой процесс внедрения и модернизации
          соответствующий условий активизации. Товарищи! реализация намеченных плановых заданий способствует подготовки
          и реализации новых предложений.
        </Text>

        <img
          src='https://animals.pibig.info/uploads/posts/2024-02/1708609321_animals-pibig-info-p-obezyana-za-noutbukom-pinterest-1.jpg'
          alt='Monkey with laptop'
          style={{ borderRadius: 4 }}
        />

        <Text>
          Товарищи! рамки и место обучения кадров способствует подготовки и реализации позиций, занимаемых участниками в
          отношении поставленных задач. Повседневная практика показывает, что постоянный количественный рост и сфера
          нашей активности представляет собой интересный эксперимент проверки дальнейших направлений развития. Не
          следует, однако забывать, что дальнейшее развитие различных форм деятельности влечет за собой процесс
          внедрения и модернизации форм развития.
        </Text>

        <Text>
          Равным образом консультация с широким активом требуют определения и уточнения дальнейших направлений развития.
          Равным образом сложившаяся структура организации позволяет оценить значение форм развития. Таким образом
          дальнейшее развитие различных форм деятельности требуют от нас анализа системы обучения кадров, соответствует
          насущным потребностям. Повседневная практика показывает, что дальнейшее развитие различных форм деятельности
          способствует подготовки и реализации соответствующий условий активизации. Повседневная практика показывает,
          что начало повседневной работы по формированию позиции играет важную роль в формировании существенных
          финансовых и административных условий. Не следует, однако забывать, что рамки и место обучения кадров играет
          важную роль в формировании форм развития.
        </Text>

        <Text>
          Равным образом начало повседневной работы по формированию позиции обеспечивает широкому кругу (специалистов)
          участие в формировании дальнейших направлений развития. Таким образом сложившаяся структура организации в
          значительной степени обуславливает создание систем массового участия. Не следует, однако забывать, что
          постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обуславливает
          создание соответствующий условий активизации. Не следует, однако забывать, что постоянный количественный рост
          и сфера нашей активности представляет собой интересный эксперимент проверки форм развития.
        </Text>
      </Flex>
    </>
  );
}
