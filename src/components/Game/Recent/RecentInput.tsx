import React, { useRef, useState } from 'react';
import {
  Button,
  DataTable,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';
import { Participant } from '../../../types/Participant';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DEFAULT_PARTICIPANT_LIST: Participant[] = [
  { name: 'USER 1', recentCount: 0 },
  { name: 'USER 2', recentCount: 0 },
];

const MIN_LIMIT_CNT = 0;
const MAX_LIMIT_CNT = 100;
const MIN_USER_CNT = 2;
const MAX_USER_CNT = 10;

/**
 * Recent 게임 참가자 정보를 입력받는다
 * @date 2023. 8. 12. - 오후 5:43:06
 *
 * @returns {*}
 */
function RecentInput() {
  const [participantList, setParticipantList] = useState<Participant[]>(
    DEFAULT_PARTICIPANT_LIST,
  );

  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);

  /**
   * -, + 버튼 클릭 이벤트 핸들러
   * @date 2023. 8. 12. - 오후 6:12:10
   *
   * @param {number} idx
   * @param {boolean} [isPlus=true]
   */
  const handleRecentCountByBtn = (idx: number, isPlus: boolean = true) => {
    const operValue = isPlus ? 1 : -1;

    setParticipantList(prev =>
      prev.map((participant, index) => {
        if (index === idx) {
          return {
            ...participant,
            recentCount: isValidCount(participant.recentCount + operValue)
              ? participant.recentCount + operValue
              : participant.recentCount,
          };
        } else {
          return participant;
        }
      }),
    );
  };

  /**
   * 참가자 추가
   * @date 2023. 8. 12. - 오후 6:12:28
   */
  const handlePressAddParticipant = () => {
    if (participantList.length >= MAX_USER_CNT) return;

    const nextCnt = participantList.length + 1;

    setParticipantList(prev => [
      ...prev,
      { name: `USER ${nextCnt}`, recentCount: 0 },
    ]);

    scrollToNewRow();
  };

  /**
   * 참가자 삭제
   * @date 2023. 8. 12. - 오후 6:12:47
   */
  const handlePressDeleteParticipant = () => {
    if (participantList.length <= MIN_USER_CNT) return;

    setParticipantList(prev => prev.slice(0, prev.length - 1));
  };

  /**
   * 참가자 이름 수정 FIXME: 한글자 입력하면 포커싱이 빠져버림
   * @date 2023. 8. 15. - 오후 7:53:28
   *
   * @param {string} name
   * @param {number} idx
   */
  const handleChangeParticipantName = (name: string, idx: number) => {
    const changedParticipantList = participantList.map((participant, index) => {
      if (index === idx) {
        return { ...participant, name: name };
      } else return participant;
    });

    setParticipantList(changedParticipantList);
  };

  /**
   * 다음 버튼 이벤트 핸들러
   * @date 2023. 8. 15. - 오후 7:54:01
   */
  const handlePressNextButton = () => {
    navigation.navigate('Recent', { participants: participantList });
  };

  /**
   * 구매수 유효성 검사
   * @date 2023. 8. 12. - 오후 6:12:58
   *
   * @param {number} nextNumber
   * @returns {boolean}
   */
  const isValidCount = (nextNumber: number) => {
    return nextNumber >= MIN_LIMIT_CNT && nextNumber <= MAX_LIMIT_CNT;
  };

  /**
   * 참가자 추가 시 화면 이동
   * @date 2023. 8. 15. - 오후 7:48:33
   */
  const scrollToNewRow = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <>
      <ScrollView ref={scrollViewRef}>
        <DataTable>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <IconButton
              icon="minus"
              size={20}
              onPress={handlePressDeleteParticipant}
              iconColor="red"
            />
            <IconButton
              icon="plus"
              size={20}
              onPress={handlePressAddParticipant}
              iconColor="blue"
            />
          </View>
          <DataTable.Header>
            <DataTable.Title
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              참가자
            </DataTable.Title>
            <DataTable.Title
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              최근 구매수
            </DataTable.Title>
          </DataTable.Header>

          {participantList.map((participant, idx) => (
            <DataTable.Row key={idx}>
              <DataTable.Cell
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TextInput
                  style={{ width: '100%' }}
                  mode="outlined"
                  dense
                  value={participant.name}
                  onChangeText={text => handleChangeParticipantName(text, idx)}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleRecentCountByBtn(idx, false)}
                  >
                    <IconButton icon="minus" size={20} />
                  </TouchableOpacity>
                  <Text>{participant.recentCount}</Text>
                  <TouchableOpacity onPress={() => handleRecentCountByBtn(idx)}>
                    <IconButton icon="plus" size={20} />
                  </TouchableOpacity>
                </View>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 50,
        }}
      >
        <Button mode="contained" onPress={handlePressNextButton}>
          다음
        </Button>
      </View>
    </>
  );
}

export default RecentInput;
