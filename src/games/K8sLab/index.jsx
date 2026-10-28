import { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import ResourceNode from './nodes/ResourceNode';
import Sidebar from './panels/Sidebar';
import GuidePanel from './panels/GuidePanel';
import YamlPanel from './panels/YamlPanel';
import {
  RESOURCE_LIBRARY,
  getLinkRule,
  KIND_COLORS,
} from './resources/definitions';
import { level1 } from './levels';
import { evaluateSteps } from './validate';
import './K8sLab.css';

const nodeTypes = { resource: ResourceNode };

// 每种资源在本关的固定名称（真实场景里名字即资源标识）
const RESOURCE_NAMES = {
  Deployment: 'hello-web',
  Service: 'hello-web-svc',
  ConfigMap: 'app-config',
  Secret: 'db-password',
  ServiceAccount: 'hello-web-sa',
};

let seq = 0;
function makeNode(kind, position) {
  seq += 1;
  return {
    id: `k8s-${seq}`,
    type: 'resource',
    position,
    data: { kind, label: RESOURCE_NAMES[kind] },
  };
}

function Lab() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [rfInstance, setRfInstance] = useState(null);
  const [selectedKind, setSelectedKind] = useState('Deployment');
  const [manualStepId, setManualStepId] = useState(null);
  const [solved, setSolved] = useState(false);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  const stepResults = useMemo(
    () => evaluateSteps(level1.steps, nodes, edges),
    [nodes, edges]
  );
  const allDone = stepResults.every((r) => r.passed);

  // Deployment 已连到哪些资源（供 YAML 条件生成）
  const linked = useMemo(() => {
    const result = {};
    edges.forEach((edge) => {
      const source = nodes.find((n) => n.id === edge.source);
      const target = nodes.find((n) => n.id === edge.target);
      if (source && target && source.data.kind === 'Deployment') {
        result[target.data.kind] = true;
      }
    });
    return result;
  }, [nodes, edges]);

  // 当前步骤：用户手动查看的步骤优先（未完成时），否则为第一个未完成步骤
  const activeStepId = useMemo(() => {
    if (manualStepId) {
      const manual = stepResults.find((r) => r.id === manualStepId);
      if (manual && !manual.passed) return manualStepId;
    }
    const next = stepResults.find((r) => !r.passed);
    return next ? next.id : level1.steps[level1.steps.length - 1].id;
  }, [manualStepId, stepResults]);

  const addNode = useCallback(
    (kind, position) => {
      setNodes((current) => {
        if (current.some((n) => n.data.kind === kind)) return current;
        const def = RESOURCE_LIBRARY.find((r) => r.kind === kind);
        return [...current, makeNode(kind, position ?? def.position)];
      });
      setSelectedKind(kind);
    },
    [setNodes]
  );

  const onConnect = useCallback(
    (connection) => {
      const source = nodes.find((n) => n.id === connection.source);
      const target = nodes.find((n) => n.id === connection.target);
      if (!source || !target) return;
      const rule = getLinkRule(source.data.kind, target.data.kind);
      if (!rule) return; // 非法连线，直接忽略
      setEdges((current) => {
        const duplicated = current.some(
          (e) => e.source === connection.source && e.target === connection.target
        );
        if (duplicated) return current;
        return addEdge(
          {
            ...connection,
            label: rule.label,
            labelStyle: { fill: '#cbd5e1', fontSize: 11 },
            labelBgStyle: { fill: '#1e293b', fillOpacity: 0.85 },
            labelBgPadding: [4, 2],
            labelBgBorderRadius: 4,
            animated: true,
            style: { stroke: KIND_COLORS[source.data.kind], strokeWidth: 2 },
          },
          current
        );
      });
    },
    [nodes, setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const kind = event.dataTransfer.getData('application/k8s-resource');
      if (!kind || !rfInstance) return;
      const position = rfInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      addNode(kind, position);
    },
    [rfInstance, addNode]
  );

  const onNodeClick = useCallback((_, node) => {
    setSelectedKind(node.data.kind);
  }, []);

  const handleReset = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSolved(false);
    setManualStepId(null);
    setSelectedKind('Deployment');
  }, [setNodes, setEdges]);

  const handleDeploy = useCallback(() => {
    if (allDone) setSolved(true);
  }, [allDone]);

  return (
    <div
      className={`k8s-lab ${solved ? 'lab-solved' : ''} ${
        leftCollapsed ? 'left-collapsed' : ''
      } ${rightCollapsed ? 'right-collapsed' : ''}`}
    >
      <div className="sidebar-zone">
        <Sidebar onAdd={(kind) => addNode(kind)} />
        <button
          type="button"
          className="zone-toggle"
          onClick={() => setLeftCollapsed((v) => !v)}
          aria-label="折叠或展开资源库"
        >
          {leftCollapsed ? '›' : '‹'}
        </button>
      </div>

      <div className="canvas-wrap" onDrop={onDrop} onDragOver={onDragOver}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onInit={setRfInstance}
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
            nodeColor={(node) => KIND_COLORS[node.data.kind]}
            maskColor="rgba(15,23,42,0.72)"
            style={{ width: 120, height: 84 }}
            pannable
            zoomable
          />
        </ReactFlow>
      </div>

      <div className="right-panel">
        <div className="right-content">
          <div className="guide-wrap">
            <GuidePanel
              level={level1}
              stepResults={stepResults}
              activeStepId={activeStepId}
              onStepClick={setManualStepId}
              allDone={allDone}
              solved={solved}
              onDeploy={handleDeploy}
              onReset={handleReset}
            />
          </div>
          <div className="yaml-wrap">
            <YamlPanel
              nodes={nodes}
              selectedKind={selectedKind}
              onSelectKind={setSelectedKind}
              solved={solved}
              linked={linked}
            />
          </div>
        </div>
        <button
          type="button"
          className="zone-toggle right-toggle"
          onClick={() => setRightCollapsed((v) => !v)}
          aria-label="折叠或展开右侧面板"
        >
          {rightCollapsed ? '‹' : '›'}
        </button>
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
