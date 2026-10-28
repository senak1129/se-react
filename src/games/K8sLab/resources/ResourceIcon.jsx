// K8S 资源类型图标
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

  if (kind === 'ConfigMap') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 3.5 H15 L19 7.5 V20.5 H6 Z" />
        <path d="M15 3.5 V7.5 H19" />
        <path d="M8.5 12 H15.5 M8.5 15.5 H15.5" />
      </svg>
    );
  }

  if (kind === 'Secret') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10 V7.5 a4 4 0 0 1 8 0 V10" />
        <circle cx="12" cy="15" r="1.4" />
        <path d="M12 16.4 V18" />
      </svg>
    );
  }

  // ServiceAccount：人像工牌
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8.5" r="3" />
      <path d="M5.5 19.5 c0 -3.2 2.9 -5 6.5 -5 s6.5 1.8 6.5 5" />
    </svg>
  );
}
