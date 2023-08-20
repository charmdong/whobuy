import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Participant } from '../../../types/Participant';
import RecentResult from './Result';

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

  const [rateList, setRateList] = useState<number[]>([]);
  const [curIndex, setCurIndex] = useState<number>(0); // 현재 참가자 인덱스
  const [isGameOver, setIsGameOver] = useState<boolean>(false); // 당첨자 발생 여부

  useEffect(() => {
    setParticipantList(participants);
  }, []);

  useEffect(() => {
    setRateList(
      new Array(participantList.length).fill(100 / participantList.length),
    );
  }, [participantList]);

  useEffect(() => {
    getRateList();
  }, [rateList]);

  /**
   * 참가자별 걸릴 확률 구하기
   * @date 2023. 8. 20.
   */
  const getRateList = () => {
    const totalBuyCount = participantList.reduce(
      (acc, cur) => acc + cur.recentCount,
      0,
    );

    const perRate = 100 / participantList.length;

    setRateList(
      participantList.map((cur, idx) => {
        if (cur.recentCount === 0) return rateList[idx];

        const discountRate = cur.recentCount / totalBuyCount;
        const resultRate = perRate * (1 - discountRate);
        return Math.max(1, resultRate);
      }),
    );
  };

  // TODO: 내기에 진 사람 구하기

  const handleOnPressNext = () => {
    // 마지막 참가자 순서
    if (curIndex + 1 === participantList.length) {
      if (!isGameOver) {
        setCurIndex(0);
      }
    } else {
      setCurIndex(prev => prev + 1);
    }
  };

  return (
    <RecentResult
      participant={participantList[curIndex]}
      isCaught={true}
      onPressNext={handleOnPressNext}
    />
  );
}

export default Recent;
