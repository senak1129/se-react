import { resourceYaml, allInOneYaml } from '../yaml';

// 逐行轻量高亮（YAML 只读，无需完整编辑器）
function HighlightedLine({ line }) {
  const trimmed = line.trimStart();

  if (trimmed.startsWith('#')) {
    return <span className="yaml-comment">{line}</span>;
  }

  // 分离行内注释（要求 # 前有空格，避免误伤字符串）
  const hashIdx = line.indexOf(' #');
  let code = line;
  let comment = '';
  if (hashIdx >= 0) {
    code = line.slice(0, hashIdx);
    comment = line.slice(hashIdx);
  }

  // key: value
  const kv = code.match(/^(\s*)(- )?([\w.-]+):(.*)$/);
  if (kv) {
    return (
      <>
        {kv[1]}
        {kv[2] || ''}
        <span className="yaml-key">{kv[3]}:</span>
        <span className="yaml-value">{kv[4]}</span>
        {comment ? <span className="yaml-comment">{comment}</span> : null}
      </>
    );
  }

  // 数组项 - value
  const arr = code.match(/^(\s*)- (.*)$/);
  if (arr) {
    return (
      <>
        {arr[1]}- <span className="yaml-value">{arr[2]}</span>
        {comment ? <span className="yaml-comment">{comment}</span> : null}
      </>
    );
  }

  return (
    <>
      {code}
      {comment ? <span className="yaml-comment">{comment}</span> : null}
    </>
  );
}

export default function YamlPanel({ nodes, selectedKind, onSelectKind, solved, linked }) {
  // 已创建的资源按固定顺序展示 tab
  const presentKinds = ['Deployment', 'Service', 'ConfigMap', 'Secret', 'ServiceAccount']
    .filter((kind) => nodes.some((n) => n.data.kind === kind));

  const activeKind = solved ? null : selectedKind && presentKinds.includes(selectedKind)
    ? selectedKind
    : presentKinds[0] ?? null;

  const yaml = solved ? allInOneYaml(linked) : activeKind ? resourceYaml(activeKind, linked) : '';

  function copyYaml() {
    navigator.clipboard?.writeText(yaml);
  }

  return (
    <div className="yaml-panel">
      <div className="yaml-panel-head">
        <span className="yaml-panel-title">{solved ? '完整部署文件' : 'YAML 对照（只读）'}</span>
        {yaml ? (
          <button type="button" className="yaml-copy" onClick={copyYaml}>
            复制
          </button>
        ) : null}
      </div>

      {!solved ? (
        <div className="yaml-tabs">
          {presentKinds.length ? (
            presentKinds.map((kind) => (
              <button
                type="button"
                key={kind}
                className={`yaml-tab ${kind === activeKind ? 'yaml-tab-active' : ''}`}
                onClick={() => onSelectKind(kind)}
              >
                {kind}
              </button>
            ))
          ) : (
            <span className="yaml-empty">从资源库添加资源后，这里显示对应 YAML</span>
          )}
        </div>
      ) : null}

      <pre className="yaml-code">
        {yaml
          ? yaml.split('\n').map((line, i) => (
              <div key={i}>
                <HighlightedLine line={line} />
              </div>
            ))
          : null}
      </pre>
    </div>
  );
}
