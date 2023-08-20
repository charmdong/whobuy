import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { Participant } from '../../../types/Participant';

// FIXME: 알맞은 프로퍼티를 추가합시다.
interface RecentResultProps {
  participant: Participant;
  isCaught: boolean;
  onPressNext: () => void;
}

function RecentResult({
  participant,
  isCaught,
  onPressNext,
}: RecentResultProps) {
  const [checkResultYn, setCheckResultYn] = useState<boolean>(false); // 결과 확인 여부

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>{participant.name}</Text>
      <Card style={{ width: '80%', height: 100, marginBottom: 20 }}>
        <Card.Content>
          <Text>{isCaught ? '님이 사셈 ㅋ' : '얻어 먹을 준비 ㄱ'}</Text>
        </Card.Content>
      </Card>
      <View style={{ flexDirection: 'row' }}>
        <Button
          mode="contained"
          style={{ marginRight: 10 }}
          onPress={() => setCheckResultYn(true)}
        >
          결과 확인
        </Button>
        <Button mode="contained" onPress={onPressNext}>
          다음
        </Button>
      </View>
    </View>
  );
}

export default RecentResult;
