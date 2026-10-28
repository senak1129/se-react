import ResourceIcon from './ResourceIcon';

export const RESOURCES = [
  { kind: 'Deployment', desc: '管理 Pod 副本' },
  { kind: 'Service', desc: '暴露 Pod 访问' },
  { kind: 'Pod', desc: '运行容器的最小单元' },
];

// 左侧资源库：支持拖拽到画布，也支持点击添加
export default function Sidebar({ onAdd }) {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">资源库</h3>
      <p className="sidebar-hint">拖拽到画布，或点击添加</p>

      {RESOURCES.map((resource) => (
        <div
          key={resource.kind}
          className="resource-item"
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData('application/k8s-resource', resource.kind);
            event.dataTransfer.effectAllowed = 'move';
          }}
          onClick={() => onAdd(resource.kind)}
        >
          <ResourceIcon kind={resource.kind} />
          <div>
            <div className="ri-name">{resource.kind}</div>
            <div className="ri-desc">{resource.desc}</div>
          </div>
        </div>
      ))}

      <div className="sidebar-tip">
        从 Deployment / Service 右侧圆点拖出连线，连到 Pod 左侧圆点。
      </div>
    </aside>
  );
}
