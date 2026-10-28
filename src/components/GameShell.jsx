// 游戏外壳：顶部导航（返回大厅 + 游戏标题），下方挂载具体游戏组件
export default function GameShell({ game, onBack }) {
  const { Component } = game;
  return (
    <main className="shell">
      <div className="shell-top">
        <button type="button" className="back-btn" onClick={onBack}>
          ← 返回大厅
        </button>
        <div className="shell-title">
          <h2>{game.name}</h2>
          <span className="tag">{game.category}</span>
        </div>
      </div>
      <div className="shell-body">
        <Component />
      </div>
    </main>
  );
}
