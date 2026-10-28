// 资源库：顺序、简介与默认画布位置（流向：Service → Deployment → ConfigMap/Secret/SA）
export const RESOURCE_LIBRARY = [
  {
    kind: 'Deployment',
    desc: '运行应用副本',
    position: { x: 270, y: 175 },
  },
  {
    kind: 'Service',
    desc: '暴露应用访问',
    position: { x: 30, y: 185 },
  },
  {
    kind: 'ConfigMap',
    desc: '应用配置文件',
    position: { x: 555, y: 25 },
  },
  {
    kind: 'Secret',
    desc: '数据库密码',
    position: { x: 555, y: 175 },
  },
  {
    kind: 'ServiceAccount',
    desc: 'Pod 的身份',
    position: { x: 555, y: 325 },
  },
];

// 合法连线：source kind → target kind，以及关系标签（显示在连线上）
export const VALID_LINKS = [
  { source: 'Service', target: 'Deployment', label: 'selector 选择' },
  { source: 'Deployment', target: 'ConfigMap', label: '挂载配置' },
  { source: 'Deployment', target: 'Secret', label: '挂载密码' },
  { source: 'Deployment', target: 'ServiceAccount', label: '使用身份' },
];

export function getLinkRule(sourceKind, targetKind) {
  return (
    VALID_LINKS.find(
      (rule) => rule.source === sourceKind && rule.target === targetKind
    ) ?? null
  );
}

// 节点上的 handle 配置：Deployment 既发起挂载/引用，又被 Service 选择
export function hasSourceHandle(kind) {
  return kind === 'Deployment' || kind === 'Service';
}

export function hasTargetHandle(kind) {
  return (
    kind === 'Deployment' ||
    kind === 'ConfigMap' ||
    kind === 'Secret' ||
    kind === 'ServiceAccount'
  );
}

// 资源主题色
export const KIND_COLORS = {
  Deployment: '#3b82f6',
  Service: '#8b5cf6',
  ConfigMap: '#f59e0b',
  Secret: '#ef4444',
  ServiceAccount: '#10b981',
};
