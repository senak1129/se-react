// 关卡定义：每关由若干可视化检查项组成
export const levels = [
  {
    id: 1,
    title: '部署 Nginx',
    brief:
      '团队的第一个 Web 服务要上线了。请从资源库拖出 1 个 Deployment、1 个 Service、1 个 Pod，并用连线表达它们的关系：Deployment 管理 Pod，Service 暴露 Pod。',
    checks: [
      { id: 'deployment', label: '创建 1 个 Deployment' },
      { id: 'service', label: '创建 1 个 Service' },
      { id: 'pod', label: '创建 1 个 Pod' },
      { id: 'dep-manages-pod', label: '连线：Deployment → Pod（管理）' },
      { id: 'svc-selects-pod', label: '连线：Service → Pod（暴露）' },
    ],
  },
];
