// 大厅卡片图标：K8S 风格舵轮
const SPOKES = [0, 60, 120, 180, 240, 300].map((deg) => {
  const rad = (deg * Math.PI) / 180;
  return { x: 24 + 13 * Math.cos(rad), y: 24 + 13 * Math.sin(rad) };
});

export default function K8sLabIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="18" stroke="#60a5fa" strokeWidth="2.2" />
      {SPOKES.map((p, i) => (
        <line
          key={`line-${i}`}
          x1="24"
          y1="24"
          x2={p.x}
          y2={p.y}
          stroke="#60a5fa"
          strokeWidth="1.7"
        />
      ))}
      {SPOKES.map((p, i) => (
        <circle
          key={`cap-${i}`}
          cx={p.x}
          cy={p.y}
          r="2.7"
          fill="#3b82f6"
          stroke="#0f172a"
          strokeWidth="1.1"
        />
      ))}
      <circle cx="24" cy="24" r="4.2" fill="#3b82f6" />
    </svg>
  );
}
