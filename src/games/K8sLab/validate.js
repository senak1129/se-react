// 步骤检查：输入画布 nodes / edges，返回每步是否完成
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

export const stepChecks = {
  deployment: (nodes) => nodes.some((n) => kindOf(n) === 'Deployment'),
  configmap: (nodes, edges) => hasLink(nodes, edges, 'Deployment', 'ConfigMap'),
  secret: (nodes, edges) => hasLink(nodes, edges, 'Deployment', 'Secret'),
  sa: (nodes, edges) => hasLink(nodes, edges, 'Deployment', 'ServiceAccount'),
  service: (nodes, edges) => hasLink(nodes, edges, 'Service', 'Deployment'),
};

export function evaluateSteps(steps, nodes, edges) {
  return steps.map((step) => ({
    id: step.id,
    passed: stepChecks[step.id](nodes, edges),
  }));
}
