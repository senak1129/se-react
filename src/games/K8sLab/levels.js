// 关卡定义：故事 + 分步引导
export const level1 = {
  id: 1,
  title: '部署 hello-web',
  story:
    '你是新来的运维实习生，导师让你把团队的第一个 Web 应用 hello-web 部署到集群，它要连接外部数据库。跟着步骤把资源拖到画布并连线，YAML 会实时变化。',
  steps: [
    {
      id: 'deployment',
      title: '运行应用：Deployment',
      guide:
        'Deployment 是应用的"管家"，它保证始终有指定数量的应用副本在运行。Pod 由它自动创建，不需要手动拖。',
    },
    {
      id: 'configmap',
      title: '应用配置：ConfigMap',
      guide:
        '数据库地址这类不保密的配置放 ConfigMap。配置与镜像分离，改配置不用重新打包，连线 Deployment → ConfigMap 表示挂载它。',
    },
    {
      id: 'secret',
      title: '敏感信息：Secret',
      guide:
        '数据库密码是敏感信息，用 Secret 单独存放，内容经 base64 编码，避免明文写进配置。连线 Deployment → Secret 表示挂载它。',
    },
    {
      id: 'sa',
      title: 'Pod 身份：ServiceAccount',
      guide:
        'ServiceAccount 是 Pod 在集群里的"工牌"，Pod 访问其他资源时用它表明身份。连线 Deployment → ServiceAccount 表示使用它。',
    },
    {
      id: 'service',
      title: '暴露应用：Service',
      guide:
        'Pod 的 IP 会随重启变化，Service 提供固定入口。它通过 selector 找到带对应 label 的 Pod 并转发流量，连线 Service → Deployment。',
    },
  ],
};

export const levels = [level1];
