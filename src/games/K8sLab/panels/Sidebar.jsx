import ResourceIcon from '../resources/ResourceIcon';
import { RESOURCE_LIBRARY } from '../resources/definitions';

// 左侧资源库：拖拽到画布，或点击添加
export default function Sidebar({ onAdd }) {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">资源库</h3>
      <p className="sidebar-hint">拖拽到画布，或点击添加</p>

      {RESOURCE_LIBRARY.map((resource) => (
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
        连线方向：Service → Deployment → ConfigMap / Secret / ServiceAccount
      </div>
    </aside>
  );
}
