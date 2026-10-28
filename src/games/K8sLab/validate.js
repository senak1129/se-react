// 关卡校验：纯函数，输入画布上的 nodes / edges，输出每项检查是否通过
const kindOf = (node) => node.data?.kind;

function hasLink(nodes, edges, sourceKind, targetKind) {
  return edges.some((edge) => {
    const source = nodes.find((n) => n.id === edge.source);
    const target = nodes.find((n) => n.id === edge.target);
    return (
      source &&
      target &&
      kindOf(source) === sourceKind &&
      kindOf(target) === targetKind
    );
  });
}

const countAtLeast = (nodes, kind) =>
  nodes.some((n) => kindOf(n) === kind);

const testers = {
  deployment: (nodes) => countAtLeast(nodes, 'Deployment'),
  service: (nodes) => countAtLeast(nodes, 'Service'),
  pod: (nodes) => countAtLeast(nodes, 'Pod'),
  'dep-manages-pod': (nodes, edges) =>
    hasLink(nodes, edges, 'Deployment', 'Pod'),
  'svc-selects-pod': (nodes, edges) =>
    hasLink(nodes, edges, 'Service', 'Pod'),
};

export function validateLevel(level, nodes, edges) {
  return level.checks.map((check) => ({
    id: check.id,
    label: check.label,
    passed: testers[check.id](nodes, edges),
  }));
}
