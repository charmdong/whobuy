import React from 'react';
import { List } from 'react-native-paper';
import { Game } from '../types/Game';
import { useNavigation } from '@react-navigation/native';

interface GameListProps {
  title?: string;
  gameList?: Game[];
}

/**
 * 게임 목록을 보여준다
 * @date 2023. 8. 12. - 오후 5:17:04
 *
 * @param {GameListProps} props
 * @returns {*}
 */
function GameList(props: GameListProps) {
  const { title, gameList } = props;

  const navigation = useNavigation(); // 네비게이션 훅 사용

  const handleGamePress = (game: Game) => {
    navigation.navigate(game.screenName); // 해당 스크린으로 이동
  };

  // FIXME: Card로 리팩토링
  return (
    <List.Section title={title}>
      {gameList?.map((game, idx) => (
        <List.Item
          key={idx}
          title={game.title}
          description={game.description}
          left={props => <List.Icon {...props} icon={game.icon || ''} />}
          onPress={() => handleGamePress(game)}
        />
      ))}
    </List.Section>
  );
}

export default GameList;
