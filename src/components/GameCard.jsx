export default function GameCard({ game, onOpen }) {
  const { Icon } = game;
  return (
    <button type="button" className="game-card" onClick={() => onOpen(game.id)}>
      <div className="card-icon">
        <Icon />
      </div>
      <div className="card-tags">
        <span className="tag">{game.category}</span>
        <span className="tag tag-difficulty">{game.difficulty}</span>
      </div>
      <h3>{game.name}</h3>
      <p className="card-desc">{game.description}</p>
      <div className="card-footer">
        <span className="card-players">{game.players}</span>
        <span className="play-btn">开始游戏</span>
      </div>
    </button>
  );
}
