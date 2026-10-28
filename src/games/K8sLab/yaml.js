// 各资源 YAML 生成：带中文注释；连线后对应字段自动出现，未连线时显示注释占位
function deploymentYaml(linked) {
  const { ConfigMap: cm, Secret: secret, ServiceAccount: sa } = linked;
  const lines = [
    'apiVersion: apps/v1',
    'kind: Deployment',
    'metadata:',
    '  name: hello-web',
    '  labels:',
    '    app: hello-web',
    'spec:',
    '  replicas: 1                       # 始终保持 1 个应用副本',
    '  selector:',
    '    matchLabels:',
    '      app: hello-web                # Deployment 靠这个标签找到自己的 Pod',
    '  template:                         # Pod 模板：Pod 由它自动生成',
    '    metadata:',
    '      labels:',
    '        app: hello-web',
    '    spec:',
  ];

  if (sa) {
    lines.push('      serviceAccountName: hello-web-sa   # Pod 使用的身份');
  } else {
    lines.push('      # serviceAccountName: hello-web-sa  ← 连线 ServiceAccount 后出现');
  }

  lines.push(
    '      containers:',
    '        - name: hello-web',
    '          image: hello-web:v1        # 应用镜像',
    '          ports:',
    '            - containerPort: 8080'
  );

  if (cm || secret) {
    lines.push('          volumeMounts:                # 把配置/密码挂进容器');
    if (cm) {
      lines.push(
        '            - name: app-config',
        '              mountPath: /etc/app/app.conf',
        '              subPath: app.conf'
      );
    }
    if (secret) {
      lines.push(
        '            - name: db-password',
        '              mountPath: /etc/app/db-password',
        '              readOnly: true'
      );
    }
  } else {
    lines.push('          # volumeMounts:  ← 连线 ConfigMap / Secret 后出现');
  }

  if (cm || secret) {
    lines.push('      volumes:                        # 挂载的来源');
    if (cm) {
      lines.push(
        '        - name: app-config',
        '          configMap:',
        '            name: app-config'
      );
    }
    if (secret) {
      lines.push(
        '        - name: db-password',
        '          secret:',
        '            secretName: db-password'
      );
    }
  } else {
    lines.push('      # volumes:  ← 连线后出现');
  }

  return lines.join('\n');
}

function configMapYaml() {
  return [
    'apiVersion: v1',
    'kind: ConfigMap',
    'metadata:',
    '  name: app-config',
    'data:',
    '  app.conf: |                      # 配置文件内容',
    '    # 外部数据库地址（不保密，可明文）',
    '    database.host=mysql.company.internal',
    '    database.port=3306',
  ].join('\n');
}

function secretYaml() {
  return [
    'apiVersion: v1',
    'kind: Secret',
    'metadata:',
    '  name: db-password',
    'type: Opaque',
    'data:',
    '  # 密码先 base64 编码（明文 s3cret → czNjcmV0）',
    '  password: czNjcmV0',
  ].join('\n');
}

function serviceAccountYaml() {
  return [
    'apiVersion: v1',
    'kind: ServiceAccount',
    'metadata:',
    '  name: hello-web-sa',
  ].join('\n');
}

function serviceYaml() {
  return [
    'apiVersion: v1',
    'kind: Service',
    'metadata:',
    '  name: hello-web-svc',
    'spec:',
    '  selector:',
    '    app: hello-web                 # 流量转发给带这个 label 的 Pod',
    '  ports:',
    '    - port: 80                     # Service 对外端口',
    '      targetPort: 8080             # 转发到容器端口',
  ].join('\n');
}

export function resourceYaml(kind, linked = {}) {
  switch (kind) {
    case 'Deployment':
      return deploymentYaml(linked);
    case 'ConfigMap':
      return configMapYaml();
    case 'Secret':
      return secretYaml();
    case 'ServiceAccount':
      return serviceAccountYaml();
    case 'Service':
      return serviceYaml();
    default:
      return '';
  }
}

// 部署顺序：被依赖的资源在前，应用在中间，暴露入口在最后
const APPLY_ORDER = ['ConfigMap', 'Secret', 'ServiceAccount', 'Deployment', 'Service'];

export function allInOneYaml(linked) {
  return APPLY_ORDER.map((kind) => resourceYaml(kind, linked)).join('\n---\n');
}
