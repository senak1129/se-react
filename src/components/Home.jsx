import GameCard from './GameCard';

export default function Home({ games, onOpen }) {
  return (
    <main className="home">
      <section className="hero">
        <h1>小游戏大全</h1>
        <p className="hero-subtitle">闲暇时刻，随时开一局</p>
        <span className="hero-count">已收录 {games.length} 款游戏</span>
      </section>

      <section className="game-grid">
        {games.map((game) => (
          <GameCard key={game.id} game={game} onOpen={onOpen} />
        ))}
        <div className="game-card game-card-placeholder">
          <div className="placeholder-plus">+</div>
          <p>更多游戏即将上线</p>
        </div>
      </section>
    </main>
  );
}
