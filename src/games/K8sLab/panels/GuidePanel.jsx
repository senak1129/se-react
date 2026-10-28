// 分步引导面板：步骤状态、讲解、部署按钮、成功后模拟终端
const TERMINAL_LINES = [
  '$ kubectl apply -f all-in-one.yaml',
  'configmap/app-config created',
  'secret/db-password created',
  'serviceaccount/hello-web-sa created',
  'deployment.apps/hello-web created',
  'service/hello-web-svc created',
  '',
  '$ kubectl get pods',
  'NAME                        READY  STATUS   RESTARTS  AGE',
  'hello-web-7f9c4d6b8-x2k9p   1/1    Running  0         3s',
  '',
  '# hello-web 启动日志',
  '读取配置：database.host=mysql.company.internal',
  '读取密码：********',
  '连接数据库成功',
  '监听 0.0.0.0:8080',
];

export default function GuidePanel({
  level,
  stepResults,
  activeStepId,
  onStepClick,
  allDone,
  solved,
  onDeploy,
  onReset,
}) {
  const activeStep = level.steps.find((s) => s.id === activeStepId);

  return (
    <div className="guide-panel">
      <div className="level-badge">第 {level.id} 关</div>
      <h2 className="level-title">{level.title}</h2>
      <p className="level-story">{level.story}</p>

      <ol className="steps">
        {level.steps.map((step, i) => {
          const passed = stepResults[i]?.passed;
          const cls = passed
            ? 'step-done'
            : step.id === activeStepId
              ? 'step-active'
              : 'step-todo';
          return (
            <li
              key={step.id}
              className={cls}
              onClick={() => onStepClick(step.id)}
            >
              <span className="step-num">{passed ? '✓' : i + 1}</span>
              <span className="step-title">{step.title}</span>
            </li>
          );
        })}
      </ol>

      {activeStep && !solved ? (
        <div className="step-guide">
          <strong>{activeStep.title}</strong>
          <p>{activeStep.guide}</p>
        </div>
      ) : null}

      <div className="guide-actions">
        <button
          type="button"
          className="deploy-btn"
          disabled={!allDone || solved}
          onClick={onDeploy}
        >
          {solved ? '部署成功' : '部署应用'}
        </button>
        <button type="button" className="reset-btn" onClick={onReset}>
          清空
        </button>
      </div>

      {solved ? (
        <div className="deploy-terminal">
          <div className="terminal-title">部署结果</div>
          <pre className="terminal-body">
            {TERMINAL_LINES.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </pre>
        </div>
      ) : null}
    </div>
  );
}
