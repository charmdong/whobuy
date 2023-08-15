import React, { useState } from 'react';
import { DataTable, IconButton, Text } from 'react-native-paper';
import { Participant } from '../../../types/Participant';
import { TouchableOpacity, View } from 'react-native';

const DEFAULT_PARTICIPANT_LIST: Participant[] = [
  { name: 'USER 1', recentCount: 0 },
  { name: 'USER 2', recentCount: 0 },
];

const MIN_LIMIT_CNT = 0;
const MAX_LIMIT_CNT = 100;

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
    const nextCnt = participantList.length + 1;
    setParticipantList(prev => [
      ...prev,
      { name: `USER ${nextCnt}`, recentCount: 0 },
    ]);
  };

  /**
   * 참가자 삭제
   * @date 2023. 8. 12. - 오후 6:12:47
   */
  const handlePressDeleteParticipant = () => {
    setParticipantList(prev => prev.slice(0, prev.length - 1));
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

  return (
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
        />
        <IconButton icon="plus" size={20} onPress={handlePressAddParticipant} />
      </View>
      <DataTable.Header>
        <DataTable.Title>참가자</DataTable.Title>
        <DataTable.Title>최근 구매수</DataTable.Title>
      </DataTable.Header>

      {participantList.map((participant, idx) => (
        <DataTable.Row key={idx}>
          <DataTable.Cell>{participant.name}</DataTable.Cell>
          <DataTable.Cell>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

      {/* TODO: 버튼 추가 */}
    </DataTable>
  );
}

export default RecentInput;
