import { Handle, Position } from '@xyflow/react';
import ResourceIcon from '../ResourceIcon';

// 自定义资源节点：Pod 只接收连线，Deployment / Service 只发起连线
export default function ResourceNode({ data }) {
  const { kind, label, image } = data;
  return (
    <div className={`resource-node rn-${kind.toLowerCase()}`} data-kind={kind}>
      {kind === 'Pod' ? (
        <Handle type="target" position={Position.Left} />
      ) : (
        <Handle type="source" position={Position.Right} />
      )}
      <div className="rn-header">
        <ResourceIcon kind={kind} />
        <span className="rn-kind">{kind}</span>
      </div>
      <div className="rn-label">{label}</div>
      {image ? <div className="rn-image">{image}</div> : null}
    </div>
  );
}
