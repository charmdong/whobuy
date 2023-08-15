import React from 'react';
import Topbar from './components/Topbar';
import MenuList from './components/GameList';
import { gameList } from './sample/gameList';

/**
 * 메인 화면. 게임 목록을 보여준다.
 * @date 2023. 8. 12. - 오후 4:51:52
 *
 * @export
 * @returns {*}
 */
export default function Main() {
  return (
    <>
      <MenuList title={'Game List'} gameList={gameList} />
    </>
  );
}
