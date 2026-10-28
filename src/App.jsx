import './App.css';
import { useEffect, useState } from 'react';
import { games, getGame } from './games';
import Home from './components/Home';
import GameShell from './components/GameShell';

// 轻量 hash 路由：#/ 表示大厅，#/game/<id> 表示具体游戏
// 不引入路由库，支持刷新保持页面与浏览器前进/后退
function gameIdFromHash() {
  const match = window.location.hash.match(/^#\/game\/([\w-]+)/);
  return match ? match[1] : null;
}

export default function App() {
  const [gameId, setGameId] = useState(gameIdFromHash);

  useEffect(() => {
    function handleHashChange() {
      setGameId(gameIdFromHash());
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  function openGame(id) {
    window.location.hash = `/game/${id}`;
  }

  function goHome() {
    window.location.hash = '/';
  }

  const currentGame = gameId ? getGame(gameId) : null;

  return currentGame ? (
    <GameShell game={currentGame} onBack={goHome} />
  ) : (
    <Home games={games} onOpen={openGame} />
  );
}
