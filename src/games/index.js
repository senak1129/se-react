// ============================================================
// 游戏注册表：小游戏大全的唯一入口
// 新增游戏步骤：
//   1. 在 src/games/ 下新建游戏目录（组件 + 样式 + 图标）
//   2. 在下方 games 数组中追加一条元数据即可，大厅会自动生成卡片
// ============================================================
import TicTacToe from './TicTacToe';
import TicTacToeIcon from './TicTacToe/Icon';

export const games = [
  {
    id: 'tictactoe',
    name: '井字棋',
    category: '棋类',
    difficulty: '入门',
    players: '双人本地',
    description: '经典 3×3 三连棋。双方轮流落子，率先将三子连成横线、竖线或斜线者获胜。',
    Icon: TicTacToeIcon,
    Component: TicTacToe,
  },
];

export function getGame(id) {
  return games.find((game) => game.id === id) ?? null;
}
