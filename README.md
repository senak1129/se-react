# 小游戏大全

基于 React 19 + Vite 的小游戏合集，目前收录井字棋与 K8S 实验室，后续可按下方步骤持续添加新游戏。

## 本地运行

```bash
npm install
npm run dev      # 开发
npm run build    # 构建
npm run preview  # 预览构建产物
```

## 目录结构

```
src/
├── App.jsx               # 顶层：轻量 hash 路由（#/ 大厅，#/game/<id> 游戏）
├── App.css               # 全局样式 + 大厅 / 卡片 / 外壳样式
├── components/
│   ├── Home.jsx          # 游戏大厅（Hero + 游戏卡片网格）
│   ├── GameCard.jsx      # 游戏入口卡片
│   └── GameShell.jsx     # 游戏外壳（返回大厅 + 游戏标题）
└── games/
    ├── index.js          # 游戏注册表（唯一需要登记的地方）
    ├── TicTacToe/        # 井字棋
    │   ├── index.jsx     # 游戏组件
    │   ├── TicTacToe.css # 游戏样式（选择器均以 .tictactoe 限定）
    │   └── Icon.jsx      # 大厅卡片图标
    └── K8sLab/           # K8S 实验室（拖拽资源拓扑 + YAML 对照闯关）
        ├── index.jsx     # 游戏主组件（资源库 | 画布 | 引导+YAML）
        ├── levels.js     # 关卡定义（故事 + 分步引导）
        ├── validate.js   # 步骤检查纯函数
        ├── yaml.js       # 各资源 YAML 生成（带中文注释，连线后字段出现）
        ├── resources/
        │   ├── definitions.js   # 资源库、合法连线、handle 与配色
        │   └── ResourceIcon.jsx # 资源图标
        ├── nodes/ResourceNode.jsx   # 自定义资源节点
        ├── panels/
        │   ├── Sidebar.jsx     # 资源库（拖拽/点击）
        │   ├── GuidePanel.jsx  # 分步引导、部署按钮与终端
        │   └── YamlPanel.jsx   # YAML 只读面板（轻量高亮）
        ├── K8sLab.css
        └── Icon.jsx      # 大厅卡片图标
```

## 如何添加一款新游戏

1. 在 `src/games/` 下新建游戏目录，例如 `src/games/Snake/`，包含：
   - `index.jsx`：游戏组件（默认导出）
   - `游戏名.css`：样式，选择器用游戏自己的根类名限定，避免污染其他游戏
   - `Icon.jsx`：大厅卡片图标（默认导出 SVG 组件）
2. 打开 `src/games/index.js`，在 `games` 数组追加一条元数据：

```js
import Snake from './Snake';
import SnakeIcon from './Snake/Icon';

export const games = [
  // ...已有游戏
  {
    id: 'snake',          // 唯一标识，用于 URL
    name: '贪吃蛇',
    category: '休闲',      // 分类
    difficulty: '入门',    // 难度：入门 / 进阶 / 困难
    players: '单人',
    description: '一句话游戏简介。',
    Icon: SnakeIcon,
    Component: Snake,
  },
];
```

保存后大厅会自动生成新卡片，无需改动路由或其他文件。

## 路由说明

- `#/`：游戏大厅
- `#/game/<id>`：具体游戏

使用 hash 路由，无需额外依赖，支持刷新保持页面与浏览器前进 / 后退。
