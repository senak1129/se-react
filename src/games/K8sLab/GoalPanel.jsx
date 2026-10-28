// 右侧关卡目标面板：要求清单 + 校验 + 部署结果
export default function GoalPanel({
  level,
  results,
  solved,
  onValidate,
  onReset,
}) {
  return (
    <aside className="goal-panel">
      <div className="level-badge">第 {level.id} 关</div>
      <h2 className="level-title">{level.title}</h2>
      <p className="level-brief">{level.brief}</p>

      <div className="checks">
        <h3>任务目标</h3>
        <ul>
          {level.checks.map((check, i) => {
            const result = results ? results[i] : null;
            const cls = result ? (result.passed ? 'pass' : 'fail') : 'pending';
            const mark = result ? (result.passed ? '✓' : '✗') : '○';
            return (
              <li key={check.id} className={cls}>
                <span className="check-mark">{mark}</span>
                <span>{check.label}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="goal-actions">
        <button type="button" className="validate-btn" onClick={onValidate}>
          校验部署
        </button>
        <button type="button" className="reset-btn" onClick={onReset}>
          清空画布
        </button>
      </div>

      {solved ? (
        <div className="terminal">
          <div className="terminal-title">部署结果</div>
          <pre>{`$ kubectl get pods
NAME              READY  STATUS   RESTARTS  AGE
nginx-pod         1/1    Running  0         3s

$ kubectl get svc
NAME           TYPE        CLUSTER-IP    PORT(S)
nginx-service  ClusterIP   10.96.42.10   80/TCP

$ curl http://nginx-service
Welcome to nginx!`}</pre>
        </div>
      ) : null}
    </aside>
  );
}
