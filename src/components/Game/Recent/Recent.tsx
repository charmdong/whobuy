import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import { Participant } from '../../../types/Participant';

/**
 * 최근 구매 횟수를 기반으로 참가자별 개수가 다른 목록을 생성한 뒤, 해당 목록을 돌려 당첨자를 발표한다.
 * @date 2023. 8. 15. - 오후 8:02:10
 *
 * @returns {*}
 */
function Recent() {
  const route = useRoute();
  const { participants } = route.params;

  const [participantList, setParticipantList] = useState<Participant[]>(
    participants || [],
  );

  useEffect(() => {
    setParticipantList(participants);
  }, []);

  const setRandomWheel = () => {};

  return <Text>hello</Text>;
}

export default Recent;
