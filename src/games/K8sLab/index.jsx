import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  MarkerType,
  addEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import ResourceNode from './nodes/ResourceNode';
import Sidebar from './Sidebar';
import GoalPanel from './GoalPanel';
import { levels } from './levels';
import { validateLevel } from './validate';
import './K8sLab.css';

const nodeTypes = { resource: ResourceNode };

const RESOURCE_DEFAULTS = {
  Deployment: { label: 'nginx-deployment', image: 'nginx:latest' },
  Service: { label: 'nginx-service' },
  Pod: { label: 'nginx-pod', image: 'nginx:latest' },
};

// 点击添加时各资源的默认画布位置（三角形，便于连线）
const DEFAULT_POSITIONS = {
  Deployment: { x: 40, y: 50 },
  Service: { x: 330, y: 50 },
  Pod: { x: 175, y: 220 },
};

let seq = 0;
function makeNode(kind, position) {
  seq += 1;
  return {
    id: `${kind.toLowerCase()}-${seq}`,
    type: 'resource',
    position,
    data: { kind, ...RESOURCE_DEFAULTS[kind] },
  };
}

function Lab() {
  const level = levels[0];
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [results, setResults] = useState(null);
  const [solved, setSolved] = useState(false);
  const [rfInstance, setRfInstance] = useState(null);

  // 画布结构发生变化后，旧的校验结果失效
  useEffect(() => {
    setResults(null);
    setSolved(false);
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        const duplicated = eds.some(
          (e) => e.source === params.source && e.target === params.target
        );
        if (duplicated) {
          return eds;
        }
        return addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: '#818cf8', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#818cf8' },
          },
          eds
        );
      });
    },
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const kind = event.dataTransfer.getData('application/k8s-resource');
      if (!kind || !rfInstance) {
        return;
      }
      const position = rfInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      setNodes((nds) => nds.concat(makeNode(kind, position)));
    },
    [rfInstance, setNodes]
  );

  // 点击物料栏：按类型摆放到默认位置，同类型重复添加时错开
  const addNode = useCallback(
    (kind) => {
      const base = DEFAULT_POSITIONS[kind];
      const sameKindCount = nodes.filter((n) => n.data.kind === kind).length;
      const jitter = sameKindCount * 26;
      setNodes((nds) =>
        nds.concat(makeNode(kind, { x: base.x + jitter, y: base.y + jitter }))
      );
    },
    [nodes, setNodes]
  );

  const handleValidate = useCallback(() => {
    const result = validateLevel(level, nodes, edges);
    setResults(result);
    if (result.every((item) => item.passed)) {
      setSolved(true);
    }
  }, [level, nodes, edges]);

  const handleReset = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setResults(null);
    setSolved(false);
  }, [setNodes, setEdges]);

  const minimapColor = (node) =>
    ({
      Deployment: '#3b82f6',
      Service: '#8b5cf6',
      Pod: '#06b6d4',
    })[node.data.kind] || '#64748b';

  return (
    <div className={`k8s-lab ${solved ? 'solved' : ''}`}>
      <div className="k8s-lab-body">
        <Sidebar onAdd={addNode} />

        <div className="canvas-wrap">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setRfInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            colorMode="dark"
            fitView
            deleteKeyCode={['Delete', 'Backspace']}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={22}
              size={1.5}
              color="#334155"
            />
            <Controls />
            <MiniMap
              nodeColor={minimapColor}
              maskColor="rgba(15,23,42,0.72)"
              style={{ width: 120, height: 84 }}
              pannable
              zoomable
            />
          </ReactFlow>
        </div>

        <GoalPanel
          level={level}
          results={results}
          solved={solved}
          onValidate={handleValidate}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}

export default function K8sLab() {
  return (
    <ReactFlowProvider>
      <Lab />
    </ReactFlowProvider>
  );
}
