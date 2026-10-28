// 井字棋卡片图标：3×3 网格 + 一枚 X、一枚 O
export default function TicTacToeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M16 2.5 V45.5" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 2.5 V45.5" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <path d="M2.5 16 H45.5" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <path d="M2.5 32 H45.5" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M4.5 4.5 L11.5 11.5 M11.5 4.5 L4.5 11.5"
        stroke="#60a5fa"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="40" cy="40" r="5" stroke="#f472b6" strokeWidth="3" />
    </svg>
  );
}
