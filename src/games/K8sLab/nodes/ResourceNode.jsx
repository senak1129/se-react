import { Handle, Position } from '@xyflow/react';
import ResourceIcon from '../resources/ResourceIcon';
import { hasSourceHandle, hasTargetHandle } from '../resources/definitions';

// 自定义资源节点：handle 由资源类型决定
export default function ResourceNode({ data, selected }) {
  const { kind, label } = data;
  return (
    <div
      className={`resource-node rn-${kind.toLowerCase()} ${selected ? 'rn-selected' : ''}`}
      data-kind={kind}
    >
      {hasTargetHandle(kind) ? (
        <Handle type="target" position={Position.Left} />
      ) : null}
      {hasSourceHandle(kind) ? (
        <Handle type="source" position={Position.Right} />
      ) : null}
      <div className="rn-header">
        <ResourceIcon kind={kind} />
        <span className="rn-kind">{kind}</span>
      </div>
      <div className="rn-label">{label}</div>
    </div>
  );
}
