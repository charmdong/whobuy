import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';

interface TopbarProps {
  title?: string;
  onPressTitle?: () => void;
}

/**
 * Topbar. 페이지 이동을 관리한다.
 * @date 2023. 8. 12. - 오후 4:52:08
 *
 * @param {TopbarProps} props
 * @returns {*}
 */
function Topbar(props: TopbarProps) {
  const { title, onPressTitle } = props;
  const navigation = useNavigation();
  const [isMain, setIsMain] = useState<boolean>(true);

  useEffect(() => {
    const state = navigation.getState();
    setIsMain(state.index === 0);
  }, []);

  /**
   * 이전 페이지로 이동
   * @date 2023. 8. 12. - 오후 5:08:17
   */
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <Appbar.Header mode="center-aligned">
      {!isMain && <Appbar.BackAction onPress={handleBackPress} />}
      <Appbar.Content title={title} onPress={onPressTitle} />
    </Appbar.Header>
  );
}

export default Topbar;
