// K8S 资源类型的小图标
export default function ResourceIcon({ kind, size = 22 }) {
  if (kind === 'Deployment') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      >
        <path d="M12 2.6 L20.8 7 V17 L12 21.4 L3.2 17 V7 Z" />
        <path d="M3.2 7 L12 11.4 L20.8 7 M12 11.4 V21.4" />
      </svg>
    );
  }

  if (kind === 'Service') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      >
        <circle cx="12" cy="4.8" r="2.1" />
        <rect x="3.2" y="16.2" width="5" height="4.6" rx="0.9" />
        <rect x="9.5" y="16.2" width="5" height="4.6" rx="0.9" />
        <rect x="15.8" y="16.2" width="5" height="4.6" rx="0.9" />
        <path d="M12 6.9 V11.5 M12 11.5 H5.7 V16.2 M12 11.5 H18.3 V16.2 M12 11.5 V16.2" />
      </svg>
    );
  }

  // Pod
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    >
      <rect x="4" y="4.5" width="16" height="15" rx="2.6" />
      <path d="M8 10 H16 M8 14 H13" />
    </svg>
  );
}
